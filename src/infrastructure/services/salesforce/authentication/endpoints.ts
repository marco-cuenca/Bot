import { BASE_SALESFORCE } from '~/domain/constants/domain.constant';
 
const base = BASE_SALESFORCE;
 
export const Endpoints = {
  authenticationSystem: (): any => {
    const data = new URLSearchParams({
      grant_type: String(base.grant_type),
      client_id: base.client_id,
      client_secret: base.client_secret,
      username: base.username,
      password: base.password
    });
 
    return {
      url: `/services/oauth2/token`,
      method: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    };
  }
};
 