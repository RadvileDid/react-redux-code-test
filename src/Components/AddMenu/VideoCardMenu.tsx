import * as React from "react";

import { Dropdown, Icon, Menu } from "antd";

import { IVideo } from "../../Actions/VideosActions";

interface IProps {
  onEdit: any;
  onRemove: any;
  video: IVideo;
}

export default class VideoCardMenuComponent extends React.PureComponent<
  IProps,
  {}
> {
  public handleRemove = () => {
    this.props.onRemove(this.props.video.id);
  };
  public handleEdit = () => {
    this.props.onEdit(this.props.video);
  };

  public render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.handleEdit}>Edit</Menu.Item>
        <Menu.Item onClick={this.handleRemove}>Remove</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Icon
          type="setting"
          style={{
            bottom: "75px",
            color: "orange",
            fontSize: "18px",
            position: "absolute",
            right: "24px"
          }}
        />
      </Dropdown>
    );
  }
}
