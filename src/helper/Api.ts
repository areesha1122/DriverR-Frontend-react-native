import axios from 'axios';
import {ENV} from 'src/config/env';

const VALID_SUCCESS_CODE = [200, 201, 202, 203, 204];

interface Form {
  method: string;
  url: string;
  token: string | undefined;
  data: any;
}

class Api {
  static headers(token: string | undefined) {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  static request(
    type: string,
    route: string,
    token: string | undefined,
    params: any,
  ) {
    return this.func(route, params, type, token);
  }

  static requestMeet(params: any) {
    return this.meetFunc(params);
  }

  static formRequest({method, url, token, data = {}}: Form) {
    return axios({
      method,
      url: `${ENV.base_url}/${url}`,
      data,
      timeout: 20000,
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...(token && {Authorization: `Bearer ${token}`}),
      },
    })
      .then((resp: any) => {
        return resp.data;
      })
      .catch(async (error: any) => {
        console.log(
          'ERROR IN Api response is !------------->>>>>>2',
          error.response.data,
          url,
        );

        const {status, data} = error.response;
        throw {status, data};
      });
  }

  static async func(
    route: string,
    params: any,
    verb: string,
    token: string | undefined,
  ) {
    const url = `${ENV.base_url}/${route}`;

    const options: any = {
      method: verb,
      url,
      data: JSON.stringify(params),
      timeout: 20000,
      validateStatus: (status: any) => VALID_SUCCESS_CODE.includes(status),
    };
    options.headers = this.headers(token);
    return axios(options)
      .then((resp: any) => {
        return resp.data;
      })
      .catch(async (error: any) => {
        console.log(
          'ERROR IN Api response is !------------->>>>>>1',
          error.response.data,
          url,
        );

        const {status, data} = error.response;
        throw {status, data};
      });
  }
  static async meetFunc(params: any) {
    const url = `https://api.zoom.us/v2/users/me/meetings`;

    const options: any = {
      method: 'POST',
      url,
      data: JSON.stringify(params),
      timeout: 20000,
      validateStatus: (status: any) => VALID_SUCCESS_CODE.includes(status),
    };
    options.headers = this.headers(
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9heWlUSWpsUklhY3RzenhhWEhVTWciLCJleHAiOjE3MTQ4MjEwMDAsImlhdCI6MTY4MzE5MzI3Nn0.bA_5VKpCEsvtfTgBQnGj7-oVWrxAgJw8Sf82HaLETdM',
    );
    return axios(options)
      .then((resp: any) => {
        return resp.data;
      })
      .catch(async (error: any) => {
        console.log(
          'ERROR IN Meet Api response is !------------->>>>>>1',
          error.response.data,
          url,
        );

        const {status, data} = error.response;
        throw {status, data};
      });
  }
}

export default Api;
