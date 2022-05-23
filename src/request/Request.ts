import { updateUserSignature } from 'store/actions/user';
import configureStore from '../store/configureStore';
const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';

// const version = 9;
// console.log('Version: ', version);

export class BaseRequest {
  isSolana: boolean | undefined = false;

  constructor(isSolana?: boolean) {
    this.isSolana = isSolana;
  }

  static getInstance() {
    return new BaseRequest();
  }

  getSignatureMessage(isInvestor: boolean = false) {
    const msgSignature = MESSAGE_INVESTOR_SIGNATURE;
    return msgSignature;
  }

  getHeader(isInvestor: boolean = false) {
    const token = localStorage.getItem('access_token');

    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      msgSignature: this.getSignatureMessage(isInvestor),
    };
  }

  buildUrl(url: string) {
    // remove both leading and trailing a slash
    url = url.replace(/^\/+|\/+$/g, '');
    return `${this.getUrlPrefix()}/api/${url}`;
  }

  getUrlPrefix() {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    return BASE_URL;
  }

  async post(url: string, data: object, isInvestor: boolean = false) {
    let resObj: Response;

    try {
      return fetch(this.buildUrl(url), {
        method: 'POST',
        headers: this.getHeader(isInvestor),
        body: JSON.stringify(data),
      })
        .then((response) => {
          resObj = response.clone();
          return response.json();
        })
        .then((data) => {
          if (data.status && data.status === 401) {
            configureStore().store.dispatch(updateUserSignature(null));
          }

          return resObj;
        });
    } catch (e) {
      throw e;
    }
  }

  async postImage(url: string, signature: string, wallet: string, data: FormData) {
    try {
      return fetch(this.buildUrl(url), {
        method: 'POST',
        headers: {
          Accept: '*/*',
          signature,
          wallet_address: wallet,
        },
        body: data,
      });
    } catch (e) {
      throw e;
    }
  }

  async put(url: string, data: object) {
    try {
      return this._responseHandler(
        fetch(this.buildUrl(url), {
          method: 'PUT',
          headers: this.getHeader(),
          body: JSON.stringify(data),
        })
      );
    } catch (e) {
      throw e;
    }
  }

  async patch(url: string, data: object) {
    try {
      return this._responseHandler(
        fetch(this.buildUrl(url), {
          method: 'PATH',
          headers: this.getHeader(),
          body: JSON.stringify(data),
        })
      ).catch((e: any) => console.log(e.message));
    } catch (e) {
      throw e;
    }
  }

  async get(url: string, isInvestor: boolean = false) {
    let resObj: Response;

    try {
      return fetch(this.buildUrl(url), {
        method: 'GET',
        headers: this.getHeader(),
      })
        .then((response) => {
          resObj = response.clone();
          return response.json();
        })
        .then((data) => {
          if (data.status && data.status === 401) {
            configureStore().store.dispatch(updateUserSignature(null));
          }

          return resObj;
        });
    } catch (e) {
      throw e;
    }
  }

  async delete(url: string, data: object) {
    try {
      return this._responseHandler(
        fetch(this.buildUrl(url), {
          method: 'DELETE',
          headers: this.getHeader(),
          body: JSON.stringify(data),
        })
      );
    } catch (e) {
      throw e;
    }
  }

  async _responseHandler(response = {}) {
    return response;
  }
}
