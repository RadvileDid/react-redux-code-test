import * as React from "react";

import { Card, Spin } from "antd";
const { Meta } = Card;

import { IVideo } from "../../Actions/VideosActions";
import getThumbnailUrlFromVideo from "./../Dashboard/Helpers/getThumbnailUrlFromVideo";

import VideoCardMenu from "../VideoCardMenu/VideoCardMenu";

interface IProps {
  onEdit: any;
  onRemove: any;
  video: IVideo;
  onCancelEdit: any;
  deletingId: string;
  deleting: boolean;
}

export default class Component extends React.PureComponent<IProps, {}> {
  public handleEditVideo = this.props.onEdit;

  public handleCancelEditVideo = this.props.onCancelEdit;

  public handleRemoveVideo = this.props.onRemove;

  public render() {
    const {
      props: { deletingId, deleting, video },
      handleEditVideo,
      handleRemoveVideo,
      handleCancelEditVideo
    } = this;

    return (
      <Card
        hoverable={true}
        cover={
          <div
            style={{
              backgroundImage: `url(${getThumbnailUrlFromVideo(
                video.thumbnails
              )})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
              width: "auto"
            }}
          />
        }
        style={{ marginBottom: "32px" }}
      >
        {video.id === deletingId && deleting ? (
          <Spin tip="Deleting..." size={"small"} />
        ) : (
          <div>
            <Meta
              title={video.title}
              description={`${video.statistics.views} views`}
              style={{ textAlign: "left" }}
            />
          </div>
        )}

        <VideoCardMenu
          video={video}
          onEdit={handleEditVideo}
          onRemove={handleRemoveVideo}
          onCancelEdit={handleCancelEditVideo}
        />
      </Card>
    );
  }
}
