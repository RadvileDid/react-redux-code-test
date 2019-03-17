import * as React from "react";

import { Button, Icon, Input } from "antd";

import Form, { FormComponentProps } from "antd/lib/form";
import { IVideo } from "src/Actions/VideosActions";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface IProps extends FormComponentProps {
  loading: boolean;
  video: IVideo;
  onCancelEdit: any;
  onSubmit: any;
}

class EditForm extends React.Component<IProps> {
  public componentDidMount() {
    this.props.form.validateFields();
  }

  public handleCancelEdit = () => {
    this.props.onCancelEdit();
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.videoTitle);
      }
    });
  };

  public render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { loading, video } = this.props;

    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("videoTitle", {
            initialValue: video.title,
            rules: [{ required: true, message: "Please input video title!" }]
          })(
            <Input
              prefix={<Icon type="video-camera" />}
              placeholder="your video title"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={loading}
            style={{
              background: "#68CBB7",
              border: "#68CBB7"
            }}
            block={true}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditForm);
