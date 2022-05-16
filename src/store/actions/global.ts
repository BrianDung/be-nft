import { globalActions } from './../constants/global';

export const toggleSidebar = () => {
  return {
    type: globalActions.TOGGLE_SIDEBAR,
  };
};

export const updateMyPoint = (point: string) => {
  return {
    type: globalActions.UPDATE_USER_POINT,
    payload: point,
  };
};

export const setSidebarShow = () => {
    return {
        type: globalActions.SIDEBAR_SHOW
    }
}
