const UPLOAD_ACC1 = process.env.REACT_APP_UPLOAD_ACC1 || '';
const UPLOAD_ACC2 = process.env.REACT_APP_UPLOAD_ACC2 || '';
const UPLOAD_ACC3 = process.env.REACT_APP_UPLOAD_ACC3 || '';

export const ACCEPT_UPLOAD = new Set([UPLOAD_ACC1, UPLOAD_ACC2, UPLOAD_ACC3]);
