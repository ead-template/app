import { getEnv } from './getEnv';
import instance from './Api';

export default class FeedbackService {
  /**
   * Retorna o host da API.
   *
   * @return {string} O host da API.
   */
  host() {
    return getEnv('NEXT_PUBLIC_HOST_API');
  }

  async makeRequest(url, method, data = null, params = null) {
    try {
      const response = await instance({
        url: `${url}`,
        method,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição: ', error);
      throw new Error(error && error.response.data.message);
    }
  }

  async createFeedbackAula(feedback) {
    return await this.makeRequest('/api/v1/feedbacks/aula', 'post', feedback);
  }

  async filtrarFeedbackAula(params) {
    return await this.makeRequest(
      '/api/v1/feedbacks/aula/filtrar',
      'get',
      null,
      params,
    );
  }

  async summaryFeedbackAula(uuid) {
    return await this.makeRequest(
      `/api/v1/feedbacks/aula/summary/${uuid}`,
      'get',
    );
  }

  async deleteFeedbackAula(uuid) {
    return await this.makeRequest(`/api/v1/feedbacks/aula/${uuid}`, 'delete');
  }

  async updateFeedbackAula(uuid, updatedFeedback) {
    return await this.makeRequest(
      `/api/v1/feedbacks/aula/${uuid}`,
      'put',
      updatedFeedback,
    );
  }
}
