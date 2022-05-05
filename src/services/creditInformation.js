import { apiClient } from '~/services/apiClient';

/**
 * Get Client credit information
 * @returns { Promise<AxiosResponse<any>> }
 */
const creditInformation = params => apiClient.post('/gulchitay/scoring/score-points/credit-bureau', params);

export { creditInformation };
