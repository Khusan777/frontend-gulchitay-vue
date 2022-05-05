import { apiClient, clearCookie } from '~/services/apiClient';
import { app } from '~/main';
import { objCheckType } from '~/utils/computeFunc';

const END_POINT = '/auth';

/**
 * Set authentication setting after login
 * @param {Object} res
 * @param {boolean} rememberMe
 * @returns {*}
 */

const setAuth = (res) => {
  const data = res?.data;
  const accessToken = data?.access_token;
  const tokenType = data?.token_type;
  const expiresIn = data?.expires_in ?? 1;
  const token = tokenType + ' ' + accessToken;

  if (objCheckType(accessToken, 'string') && objCheckType(tokenType, 'string')) {
    const $cookie = app.config.globalProperties?.$cookie;
    if ($cookie) {
      clearCookie().finally(() => {
        $cookie.set('auth', token, {
          expires: `${expiresIn}s`,
        });
      });
      apiClient.defaults.headers['Authorization'] = token;
    }
  }
  return res;
};

/**
 * Set authorization login user
 * @param {Object} params - Request params
 * @param {boolean} rememberMe
 * @returns {Promise<*>}
 */

const login = params =>
  apiClient.post(`${END_POINT}/login-password`, {...params }).then(response => {
    setAuth(response);
  });

export { login };
