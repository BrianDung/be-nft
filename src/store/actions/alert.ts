import { alertActions } from '../constants/alert'

export const alert = (msg: string)  => {
  return {
    type: alertActions.ALERT_MESSAGE,
    payload: msg
  }
}

export const clearAlert = ()  => {
  return {
    type: alertActions.CLEAR_MESSAGE,
  }
}
