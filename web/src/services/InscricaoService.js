import instance from './Api';
import { getEnv } from './getEnv.js';

/**
 * Classe de serviço para operações relacionadas a inscrições.
 */
export default class InscricaoService {
  /**
   * Retorna o host da API.
   *
   * @return {string} O host da API.
   */
  host() {
    return getEnv('NEXT_PUBLIC_HOST_API');
  }

  /**
   * Busca aulas associadas a um aluno específico.
   *
   * @param {Object} params - Parâmetros da busca.
   * @return {Promise<Object>} Dados das aulas inscritas pelo aluno.
   * @throws {Error} Lança um erro se a requisição falhar.
   */
  async buscarAulasPorAluno(params) {
    try {
      const response = await instance.get(`/api/v1/inscricoes/aluno`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        'Falha ao buscar as aulas para o estudante. Verifique sua conexão com a internet e tente novamente.',
      );
    }
  }
}
