import * as FormData from 'form-data';
import { BASE_SALESFORCE } from '~/domain/constants/domain.constant';

const base = BASE_SALESFORCE;

export const Endpoints = {
  authenticationSystem: (): any => {
    const formData = new FormData();

    formData.append('grant_type', base.grant_type);
    formData.append('client_id', base.client_id);
    formData.append('client_secret', base.client_secret);
    formData.append('username', base.username);
    formData.append('password', base.password);

    return {
      url: `/services/oauth2/token`,
      method: "post",
      headers: {
        ...formData.getHeaders(),
      },
      data: formData
    };
  }
};
