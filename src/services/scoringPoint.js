import { apiClient } from '~/services/apiClient';

/**
 * Get Client scoring data
 * @returns { Promise<AxiosResponse<any>> }
 */
const getScoringData = params => apiClient.post('/gulchitay/scoring/score-points/personal-info', params);

export { getScoringData };
