import axios, { AxiosResponse } from "axios";
import { IAxiosProps } from "../@types/quotation";
import AuthorizationToken from "./AuthorizationToken";

export default class CustomAxios extends AuthorizationToken {
  /**
   * constructor
   */
  constructor(UBIT_ACCESS_KEY?: string, UBIT_SECRET_KEY?: string) {
    super(UBIT_ACCESS_KEY, UBIT_SECRET_KEY);
  }

  /**
   * getData
   * 업비트 ACCESS_KEY, SECRET_KEY 필요없이 사용가능한 API
   * @param IAxiosProps method: Method, url: string
   * @return Promise<AxiosResponse<T>>
   */
  protected async getData<T>({
    method,
    url,
  }: IAxiosProps): Promise<AxiosResponse<T>> {
    const res = await axios({
      method,
      url,
    });
    return res;
  }

  /**
   * getAuthData
   * 업비트 ACCESS_KEY, SECRET_KEY 가 꼭 필요한 API
   * 파라미터가 없는경우
   * @param IAxiosProps method: Method, url: string
   * @return Promise<AxiosResponse<T>>
   */
  protected async getAuthData<T>({
    method,
    url,
  }: IAxiosProps): Promise<AxiosResponse<T>> {
    const authorizationToken = super.getAuthorizationTokenNoParam();
    const res = await axios({
      method,
      url,
      headers: { Authorization: authorizationToken },
    });
    return res;
  }

  /**
   * getAuthParamData
   * 파라미터가 존재하는 경우
   * @param IAxiosProps method: Method, url: string, params: {}
   * @return Promise<AxiosResponse<T>>
   */
  protected async getAuthParamData<T>({
    method,
    url,
    params = {},
  }: IAxiosProps): Promise<AxiosResponse<T>> {
    const { authorizationToken, query } = super.getAuthorizationToken(params);
    const res = await axios({
      method,
      url: `${url}?${query}`,
      headers: { Authorization: authorizationToken },
    });
    return res;
  }
}
