export const SEND_VIDEO_REQUEST = 'SEND_VIDEO_REQUEST';
export const REQUEST_SENT = 'REQUEST_SENT';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE';
export const DELOAD_VIDEO = 'DELOAD_VIDEO';

export const sendVideoRequest = (videoID) => (dispatch) => {
  dispatch(requestSent());
  return fetch(`/api/replay/${videoID}`)
  .then(res => res.json())
  .then(data => {
    dispatch(requestCompleted(data));
  })
  .catch(e => {
    console.log("error, yo")
    console.log(JSON.stringify(e));
  });
}

function requestSent(){
  return {
    type: REQUEST_SENT
  }
}

function requestCompleted(data){
  return {
    type: REQUEST_COMPLETE,
    data
  }
}

export function updateActive(updates){
  return {
    type: UPDATE_ACTIVE,
    updates
  }
}

export function deloadVideo(){
  return {
    type: DELOAD_VIDEO
  }
}