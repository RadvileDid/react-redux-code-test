import * as React from "react";

import { Button, Icon, Input } from "antd";

import Form, { FormComponentProps } from "antd/lib/form";
import { IVideo } from "src/Actions/VideosActions";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface IProps extends FormComponentProps {
  loading: boolean;
  videos: IVideo[];
  onCancelAdd: any;
  onSubmit: any;
}

class AddForm extends React.Component<IProps> {
  public handleCancelEdit = () => {
    this.props.onCancelAdd();
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newVideo = {
          id: values.videoTitle,
          statistics: {
            views: values.videoViews
          },
          thumbnails: {
            maxres: {
              height: 720,
              url: values.videoThumbnail,
              width: 1280
            }
          },
          title: values.videoTitle
        };

        this.props.onSubmit(newVideo);
      }
    });
  };

  public render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { loading } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <div>
          <Form.Item label="Title">
            {getFieldDecorator("videoTitle", {
              rules: [{ required: true, message: "Please input video title!" }]
            })(
              <Input
                prefix={<Icon type="edit" />}
                placeholder="your video title"
              />
            )}
          </Form.Item>
          <Form.Item label="URL">
            {getFieldDecorator("videoThumbnail", {
              rules: [
                { required: true, message: "Please enter your video URL!" }
              ]
            })(
              <Input
                prefix={<Icon type="video-camera" />}
                placeholder="your video title"
              />
            )}
          </Form.Item>
          <Form.Item label="Current views">
            {getFieldDecorator("videoViews", {
              rules: [
                {
                  message: "Please enter your video views till now",
                  required: true
                }
              ]
            })(
              <Input
                prefix={<Icon type="eye" />}
                placeholder="your video views till now"
              />
            )}
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{
              background: "#68CBB7",
              border: "#68CBB7",
              color: "white"
            }}
            loading={loading}
            block={true}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
