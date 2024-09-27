import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return action.payload;
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationReducer.actions;

export const setNotification = (notification, time = 5) => {
  return async (dispatch) => {
    dispatch(displayNotification(notification));
    setTimeout(() => dispatch(removeNotification('')), time * 1000);
  };
};

export default notificationReducer.reducer;
