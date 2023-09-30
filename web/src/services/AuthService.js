import axios from 'axios';
import { getEnv } from './getEnv.js';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_HOST_API;

const instance = axios.create({
  baseURL,
  timeout: 60000,
});
/**
 * Serviço de autenticação.
 * @namespace AuthService
 */
const AuthService = {
  /**
   * Obtém o usuário atual armazenado no local storage.
   * @function usuarioCorrente
   * @memberof AuthService
   * @return {Object|null} O usuário atual ou null se não estiver presente.
   */
  usuarioCorrente: () => {
    const conteudo = Cookies.get('usuario');
    if (conteudo) {
      return JSON.parse(conteudo);
    } else {
      return null;
    }
  },

  /**
   * Define o usuário e o token atual no local storage.
   * @function setUsuarioCorrente
   * @memberof AuthService
   * @param {Object} usuario - O objeto do usuário.
   */
  setUsuarioCorrente: (usuario) => {
    Cookies.set('usuario', JSON.stringify(usuario));
    Cookies.set('token', usuario.token);
  },

  /**
   * Remove o usuário atual do local storage.
   * @function removeUsuarioCorrente
   * @memberof AuthService
   */
  // removeUsuarioCorrente: () => {
  //   Cookies.remove('usuario');
  //   Cookies.remove('token');
  // },

  recovery: (email) => {
    return instance.post('/api/v1/password/recovery', email);
  },

  resetPassword: (data) => {
    return instance.post('/api/v1/password/reset', data);
  },

  /**
   * Obtém o token do usuário atual.
   * @function token
   * @memberof AuthService
   * @return {string|null} O token do usuário ou null se não estiver presente.
   */
  token: () => {
    return Cookies.get('token');
  },

  /**
   * Faz o logout, limpando o local e session storage.
   * @function logout
   * @memberof AuthService
   */
  logout: () => {
    Cookies.remove('usuario');
    Cookies.remove('token');
  },

  /**
   * Autentica um usuário com suas credenciais.
   * @function auth
   * @memberof AuthService
   * @param {Object} credenciais - Credenciais do usuário.
   * @return {Promise} Uma promessa que resolve com a resposta da autenticação.
   */
  auth: (credenciais) => {
    return instance.post('/api/v1/auth', credenciais);
  },

  /**
   * Registra um novo usuário.
   * @function register
   * @memberof AuthService
   * @param {Object} user - Informações do usuário.
   * @return {Promise} Uma promessa que resolve com a resposta do registro.
   */
  register: (user) => {
    return instance.post('/api/v1/register', user);
  },

  /**
   * Retorna o host da API.
   * @function host
   * @memberof AuthService
   * @return {string} O URL base da API.
   */
  host: () => {
    return getEnv('NEXT_PUBLIC_HOST_API');
  },
};

export default AuthService;
