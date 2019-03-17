import { Dispatch } from "redux";
import mockVideos from "./../Configs/videos";

export interface IVideo {
  channelId?: string;
  channelTitle?: string;
  description?: string;
  duration?: number;
  editing?: boolean;
  id: string;
  syncTime?: number;
  syncDisabled?: boolean | null;
  publishDate?: number;
  removing?: boolean;
  statistics?: any;
  tags?: string[];
  title: string;
  thumbnails: any;
  updating?: boolean;
}

// load
export const loadVideos = (dispatch: Dispatch) => () => {
  dispatch({
    type: "VIDEOS/LOAD"
  });

  setTimeout(() => loadVideosSuccess(dispatch)(mockVideos), 2000);
};

export const loadVideosSuccess = (dispatch: Dispatch) => (videos: IVideo[]) => {
  dispatch({
    payload: videos,
    type: "VIDEOS/LOAD--success"
  });
};

// edit
export const editVideo = (dispatch: Dispatch) => (video: IVideo) => {
  dispatch({
    payload: video,
    type: "VIDEOS/EDIT"
  });
};

export const submitEditVideo = (dispatch: Dispatch) => (newTitle: string) => {
  dispatch({
    type: "VIDEOS/EDIT--submit"
  });

  setTimeout(() => editVideosSuccess(dispatch)(newTitle), 1000);
};

export const editVideosSuccess = (dispatch: Dispatch) => (newTitle: string) => {
  dispatch({
    payload: newTitle,
    type: "VIDEOS/EDIT--success"
  });
};

export const cancelEditVideo = (dispatch: Dispatch) => () => {
  dispatch({
    type: "VIDEOS/EDIT--cancel"
  });
};

// add
export const addVideo = (dispatch: Dispatch) => () => {
  dispatch({
    type: "VIDEOS/ADD"
  });
};

export const submitAddVideo = (dispatch: Dispatch) => (video: IVideo) => {
  dispatch({
    payload: video,
    type: "VIDEOS/ADD--submit"
  });
  setTimeout(() => addVideoSuccess(dispatch)(video), 1000);
};

export const addVideoSuccess = (dispatch: Dispatch) => (video: IVideo) => {
  dispatch({
    payload: video,
    type: "VIDEOS/ADD--success"
  });
};

export const cancelAddVideo = (dispatch: Dispatch) => () => {
  dispatch({
    type: "VIDEOS/ADD--cancel"
  });
};

// delete
export const deleteVideos = (dispatch: Dispatch) => (videosId: string) => {
  dispatch({
    payload: videosId,
    type: "VIDEOS/DELETE"
  });

  setTimeout(() => deleteVideosSuccess(dispatch)(videosId), 1000);
};

const deleteVideosSuccess = (dispatch: Dispatch) => (videosId: string) => {
  dispatch({
    payload: videosId,
    type: "VIDEOS/DELETE--success"
  });
};
