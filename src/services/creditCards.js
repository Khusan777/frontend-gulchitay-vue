import { apiClient } from '~/services/apiClient';

/**
 * Get Client credits card data
 * @returns { Promise<AxiosResponse<any>> }
 */
const getCreditCards = params => apiClient.post('/gulchitay/scoring/score-points/credit-card', params);

export { getCreditCards };
