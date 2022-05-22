import { AnyAction } from 'redux'
import { alertActions } from '../constants/alert'

type StateType = {
  type: string;
  message: string;
}

const initialState = {
  type: '',
  message: ''
}

export const alertReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {
    case alertActions.ALERT_MESSAGE: {
      return {
        type: 'success',
        message: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
