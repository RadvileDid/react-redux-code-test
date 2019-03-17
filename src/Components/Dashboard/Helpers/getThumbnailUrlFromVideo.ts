import { IVideo } from "../../../Actions/VideosActions";

export default (thumbnails: IVideo["thumbnails"]) => {
  if (thumbnails.maxres) {
    return thumbnails.maxres.url;
  }

  if (thumbnails.high) {
    return thumbnails.high.url;
  }

  return thumbnails.default.url;
};
