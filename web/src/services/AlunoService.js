import instance from './Api'
import { getEnv } from './getEnv.js'

/**
 * Classe de serviço para operações relacionadas a alunos.
 */
export default class AlunoService {
  /**
   * Retorna o host da API.
   *
   * @return {string} O host da API.
   */
  host() {
    return getEnv('NEXT_PUBLIC_HOST_API')
  }

  /**
   * Atualiza os dados do aluno.
   *
   * @param {Object} alunoDTO - Objeto contendo dados para atualização do aluno.
   * @return {Promise} Uma Promise com o resultado da operação.
   */
  async updateAluno(alunoDTO) {
    try {
      return await instance.post(`/api/v1/aluno`, alunoDTO)
    } catch (error) {
      throw error
    }
  }

  /**
   * Altera a senha do usuário.
   *
   * @param {Object} usuarioTrocaSenhaDTO - Objeto contendo a senha atual e a nova senha.
   * @return {Promise} Uma Promise com o resultado da operação.
   */
  async changePassword(usuarioTrocaSenhaDTO) {
    try {
      const response = await instance.post(
        `/api/v1/user/changePassword`,
        usuarioTrocaSenhaDTO,
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}
