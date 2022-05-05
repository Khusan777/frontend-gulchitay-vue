import { apiClient } from '~/services/apiClient';

/**
 * Get Client total point data in third card
 * @returns { Promise<AxiosResponse<any>> }
 */
const getTotalPoints = params => apiClient.post('/gulchitay/scoring/score-points/weighted-point', params);

export { getTotalPoints };