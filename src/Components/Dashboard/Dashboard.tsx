import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Col, Icon, Modal, Row, Spin } from "antd";

import {
  addVideo,
  cancelEditVideo,
  deleteVideos,
  editVideo,
  IVideo,
  loadVideos,
  submitEditVideo
} from "../../Actions/VideosActions";

import EditForm from "./../EditForm/EditForm";

import VideoCard from "../VideoCard/VideoCard";

interface IProps {
  videos: IVideo[];
  loadVideos: ReturnType<typeof loadVideos>;
  deleteVideos: ReturnType<typeof deleteVideos>;
  editVideo: ReturnType<typeof editVideo>;
  cancelEditVideo: ReturnType<typeof cancelEditVideo>;
  loaded: boolean;
  editingVideoRef: IVideo;
  editingLoading: boolean;
  deletingId: string;
  deleting: boolean;
  editing: boolean;
  submitEditVideo: ReturnType<typeof submitEditVideo>;
}

const StyledDashboard = styled.div`
  width: 100%;
  padding: 32px;
  margin: 0 auto;
`;

const StyledSpinner = styled.div`
  margin: 50px auto;
`;

export class Dashboard extends React.Component<IProps> {
  public handleCancelEditVideo = this.props.cancelEditVideo;

  public handleSubmitEditVideo = this.props.submitEditVideo;

  public handleEditVideo = this.props.editVideo;

  public handleDeleteVideos = this.props.deleteVideos;

  public componentWillMount() {
    this.props.loadVideos();
  }

  public render() {
    const {
      props: {
        deletingId,
        deleting,
        editing,
        editingLoading,
        editingVideoRef,
        videos,
        loaded
      },
      handleEditVideo,
      handleCancelEditVideo,
      handleDeleteVideos,
      handleSubmitEditVideo
    } = this;

    const loadingIcon = (
      <Icon
        type="loading"
        style={{ fontSize: "100px", color: "orange" }}
        spin={true}
      />
    );

    const content = loaded ? (
      videos.map((video: IVideo) => (
        <a href={`http://youtu.be/${video.id}`}>
          <Col xs={24} sm={12} lg={8} key={video.id}>
            <VideoCard
              video={video}
              onEdit={handleEditVideo}
              onRemove={handleDeleteVideos}
              onCancelEdit={cancelEditVideo}
              deletingId={deletingId}
              deleting={deleting}
            />
          </Col>
        </a>
      ))
    ) : (
      <StyledSpinner>
        <Spin indicator={loadingIcon} />
      </StyledSpinner>
    );

    return (
      <StyledDashboard>
        <Row gutter={16}>
          {content}
          <Modal
            title="Edit Video"
            visible={editing}
            footer={null}
            onCancel={handleCancelEditVideo}
          >
            {editingVideoRef ? (
              <EditForm
                loading={editingLoading}
                video={editingVideoRef}
                onCancelEdit={handleCancelEditVideo}
                onSubmit={handleSubmitEditVideo}
              />
            ) : null}
          </Modal>
        </Row>
      </StyledDashboard>
    );
  }
}

const mapStateToProps = (store: any) => ({
  addingVideo: store.videos.addingVideo,
  deleting: store.videos.deleting,
  deletingId: store.videos.deletingId,
  editing: store.videos.editing,
  editingLoading: store.videos.editingLoading,
  editingVideoRef: store.videos.editingVideoRef,
  loaded: store.videos.loaded,
  videos: store.videos.videos
});

const mapDispatchToProps = (dispatch: any) => ({
  addVideo: addVideo(dispatch),
  cancelEditVideo: cancelEditVideo(dispatch),
  deleteVideos: deleteVideos(dispatch),
  editVideo: editVideo(dispatch),
  loadVideos: loadVideos(dispatch),
  submitEditVideo: submitEditVideo(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
