import * as React from "react";

import { Button, Dropdown, Menu } from "antd";

import { IVideo } from "../../Actions/VideosActions";

interface IProps {
  onEdit: any;
  onRemove: any;
  video: IVideo;
  onCancelEdit: any;
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

  public handleMenuClick = (event: any) => {
    event.preventDefault();
  };

  public render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={this.handleEdit}>Edit</Menu.Item>
        <Menu.Item onClick={this.handleRemove}>Remove</Menu.Item>
      </Menu>
    );

    return (
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Dropdown overlay={menu} trigger={["hover"]}>
          <Button
            shape="circle"
            size="small"
            icon="ellipsis"
            style={{ transform: "rotate(90deg)" }}
            onClick={this.handleMenuClick}
          />
        </Dropdown>
      </div>
    );
  }
}
