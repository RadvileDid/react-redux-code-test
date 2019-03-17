import { Reducer } from "redux";
// import { editVideo } from "src/Actions/VideosActions";

const initialState = {
  addingLoading: false,
  addingVideo: false,
  deleting: false,
  deletingId: null,
  editing: false,
  editingLoading: false,
  editingVideoRef: null,
  loaded: false,
  videos: undefined
};

const videoReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIDEOS/LOAD--success":
      return {
        ...state,
        loaded: true,
        videos: action.payload
      };

    case "VIDEOS/ADD":
      return {
        ...state,
        addingVideo: true
      };

    case "VIDEOS/ADD--submit":
      return {
        ...state,
        addingLoading: true,
        addingVideo: true
      };

    case "VIDEOS/ADD--success":
      return {
        ...state,
        addingLoading: false,
        addingVideo: false,
        videos: [action.payload, ...state.videos]
      };

    case "VIDEOS/ADD--cancel":
      return {
        ...state,
        addingVideo: false
      };

    case "VIDEOS/DELETE":
      return {
        ...state,
        deleting: true,
        deletingId: action.payload
      };

    case "VIDEOS/DELETE--success":
      return {
        ...state,
        deleting: false,
        deletingId: null,
        videos: state.videos.filter((video: any) => video.id !== action.payload)
      };

    case "VIDEOS/EDIT":
      return {
        ...state,
        editing: true,
        editingVideoRef: action.payload
      };

    case "VIDEOS/EDIT--cancel":
      return {
        ...state,
        editing: false,
        editingVideoRef: null
      };

    case "VIDEOS/EDIT--submit":
      return {
        ...state,
        editing: true,
        editingLoading: true
      };

    case "VIDEOS/EDIT--success":
      return {
        ...state,
        editing: false,
        editingLoading: false,
        editingVideoRef: action.payload.video,
        videos: state.videos.map((video: any) => {
          if (video === state.editingVideoRef) {
            return {
              ...video,
              title: action.payload
            };
          }
          return video;
        })
      };

    default:
      return state;
  }
};

export default videoReducer;
