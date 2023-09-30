import { getEnv } from './getEnv';
import instance from './Api';

/**
 * FeedbackService handles all API calls related to feedback.
 */
export default class FeedbackService {
  /**
   * Retorna o host da API.
   *
   * @return {string} O host da API.
   */
  host() {
    return getEnv('NEXT_PUBLIC_HOST_API');
  }
  /**
   * Makes a request to the specified URL using the specified HTTP method.
   *
   * @param {string} url - The URL to make the request to.
   * @param {string} method - The HTTP method to use for the request.
   * @param {Object|null} data - Optional data to send with the request.
   * @param {Object|null} params - Optional query parameters to include in the request URL.
   * @return {Promise<any>} A promise that resolves to the response data from the request.
   */
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

  /**
   * Creates a feedback for the Aula API.
   *
   * @param {Object} feedback - The feedback object to be created.
   * @return {Promise} A promise that resolves with the created feedback.
   */
  async createFeedbackAula(feedback) {
    return await this.makeRequest('/api/v1/feedbacks/aula', 'post', feedback);
  }
  /**
   * Asynchronously filters feedbacks for aula.
   *
   * @param {Object} params - The parameters for filtering the feedbacks.
   * @return {Promise} Returns a promise that resolves to the filtered feedbacks.
   */
  async filtrarFeedbackAula(params) {
    return await this.makeRequest(
      '/api/v1/feedbacks/aula/filtrar',
      'get',
      null,
      params,
    );
  }
  /**
   * Retrieves the summary feedback for a specific Aula.
   *
   * @param {string} uuid - The UUID of the Aula.
   * @return {Promise} Returns a Promise that resolves to the summary feedback.
   */
  async summaryFeedbackAula(uuid) {
    return await this.makeRequest(
      `/api/v1/feedbacks/aula/summary/${uuid}`,
      'get',
    );
  }
  /**
   * Deletes a feedback for a specific Aula by UUID.
   *
   * @param {string} uuid - The UUID of the Aula feedback to be deleted.
   * @return {Promise} A promise that resolves with the result of the delete request.
   */
  async deleteFeedbackAula(uuid) {
    return await this.makeRequest(`/api/v1/feedbacks/aula/${uuid}`, 'delete');
  }
  /**
   * Updates the feedback for a specific Aula.
   *
   * @param {string} uuid - The UUID of the Aula.
   * @param {object} updatedFeedback - The updated feedback object.
   * @return {Promise} A promise that resolves with the updated feedback.
   */
  async updateFeedbackAula(uuid, updatedFeedback) {
    return await this.makeRequest(
      `/api/v1/feedbacks/aula/${uuid}`,
      'put',
      updatedFeedback,
    );
  }
}
