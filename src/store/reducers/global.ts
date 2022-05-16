import { AnyAction } from 'redux';
import { globalActions } from 'store/constants/global';

const initialState = {
  sidebarCollapsed: false,
  userPoint: '--',
};

export const globalReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case globalActions.TOGGLE_SIDEBAR: {
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    }
    case globalActions.UPDATE_USER_POINT: {
      return {
        ...state,
        userPoint: action.payload,
      };
    }
    case globalActions.SIDEBAR_SHOW: {
      return {
        ...state,
        sidebarCollapsed: false
      }
    }
    default: {
      return state;
    }
  }
};
