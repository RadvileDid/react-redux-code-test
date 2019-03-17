import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button as AntdButton, Layout, Modal, Row } from "antd";
import AddForm from "../AddForm/AddForm";

import {
  addVideo,
  addVideoSuccess,
  cancelAddVideo,
  IVideo,
  submitAddVideo
} from "../../Actions/VideosActions";

const StyledTitle = styled.div`
  color: white;
  text-transform: uppercase;
  font-weight: 900;
`;

interface IProps {
  logo: string;
  addingLoading: boolean;
  addingVideo: boolean;
  addVideo: ReturnType<typeof addVideo>;
  cancelAddVideo: ReturnType<typeof cancelAddVideo>;
  submitAddVideo: ReturnType<typeof submitAddVideo>;
  videos: IVideo[];
}

export class HeaderComponent extends React.Component<IProps, {}> {
  public handleSubmitAddVideo = this.props.submitAddVideo;

  public handleAddVideo = () => this.props.addVideo();

  public handleCancelAddVideo = () => this.props.cancelAddVideo();

  public render() {
    const {
      props: { addingLoading, addingVideo, videos },
      handleAddVideo,
      handleCancelAddVideo,
      handleSubmitAddVideo
    } = this;

    return (
      <Layout.Header style={{ backgroundColor: "#2D3142" }}>
        <Row type="flex" justify="space-between" align="bottom">
          <StyledTitle>Hippo dance</StyledTitle>
          <div>
            <AntdButton
              onClick={handleAddVideo}
              style={{
                background: "#EF8354",
                border: "#EF8354",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Add video
            </AntdButton>
          </div>
        </Row>
        {addingVideo && (
          <Modal
            title="Add video"
            visible={addingVideo}
            footer={null}
            onCancel={handleCancelAddVideo}
          >
            <AddForm
              videos={videos}
              onCancelAdd={handleCancelAddVideo}
              loading={addingLoading}
              onSubmit={handleSubmitAddVideo}
            />
          </Modal>
        )}
      </Layout.Header>
    );
  }
}

const mapStateToProps = (store: any) => ({
  addingLoading: store.videos.addingLoading,
  addingVideo: store.videos.addingVideo,
  videos: store.videos.videos
});

const mapDispatchToProps = (dispatch: any) => ({
  addVideo: addVideo(dispatch),
  addVideoSuccess: addVideoSuccess(dispatch),
  cancelAddVideo: cancelAddVideo(dispatch),
  submitAddVideo: submitAddVideo(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
