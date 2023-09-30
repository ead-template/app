import instance from './Api';
import { getEnv } from './getEnv.js';

/**
 * Classe de serviço para operações relacionadas a aulas.
 */
export default class AulaService {
  /**
   * Retorna o host da API.
   *
   * @return {string} O host da API.
   */
  host() {
    return getEnv('NEXT_PUBLIC_HOST_API');
  }

  /**
   * Busca informações completas da aula para um aluno específico.
   *
   * @param {string} uuidAula - O identificador UUID da aula.
   * @param {string} uuidAluno - O identificador UUID do aluno.
   * @return {Promise<Object>} Dados da aula.
   * @throws {Error} Lança um erro se a requisição falhar.
   */
  async buscarAulaCompleta(uuidAula, uuidAluno) {
    try {
      const response = await instance.get(
        `/api/v1/aula/${uuidAula}/aluno/${uuidAluno}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Marca conclusão de conteudo, aula, curso, e outros
   *
   * @param {Object} progressoData - Os dados necessários para marcar o progresso.
   * @return {Promise<Object>} Dados do progresso marcado.
   * @throws {Error} Lança um erro se a requisição falhar.
   */
  async marcarProgresso(progressoData) {
    try {
      const response = await instance.post(`/api/v1/progresso`, progressoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Desmarca o progresso da aula para um aluno específico.
   *
   * @param {string} uuid - O identificador UUID do progresso.
   * @return {Promise<Object>} Resposta da operação.
   * @throws {Error} Lança um erro se a requisição falhar.
   */
  async desmarcarProgresso(uuid) {
    try {
      const response = await instance.delete(`/api/v1/progresso/${uuid}`);
      return response.data;
    } catch (error) {
      throw error.response && error.response.data && error.response.data.message
        ? new Error(error.response.data.message)
        : new Error(
            'An error occurred while fetching the complete class data.',
          );
    }
  }
  async buscarAulasPorTermo({
    search,
    pagina = 0,
    tamanho = 10,
    ordenacao = 'titulo',
    direcao = 'ASC',
  }) {
    try {
      console.log(search);
      const response = await instance.get(`/api/v1/aula/buscar`, {
        params: {
          search,
          pagina,
          tamanho,
          ordenacao,
          direcao,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response && error.response.data && error.response.data.message
        ? new Error(error.response.data.message)
        : new Error('Um erro ocorreu durante a busca das aulas.');
    }
  }
}
