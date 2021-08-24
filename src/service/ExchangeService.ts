import {
  IAccountProps,
  IApiKeyStatusProps,
  IOrderChanceProps,
} from "../@types/exchange";
import Constants from "../Constants";
import ExchangeInterface from "../interface/ExchangeInterface";
import CustomAxios from "./CustomAxios";

export default class ExchangeService
  extends CustomAxios
  implements ExchangeInterface
{
  /**
   * constructor
   * @param UBIT_ACCESS_KEY: string
   * @param UBIT_SECRET_KEY: string
   */
  constructor(UBIT_ACCESS_KEY: string, UBIT_SECRET_KEY: string) {
    super(UBIT_ACCESS_KEY, UBIT_SECRET_KEY);
  }

  /******************************************************************************
   * 자산
   ******************************************************************************/
  /**
   * 전체 계좌 조회
   * @return Promise<IGetAccountProps[]>
   */
  async getAllAccount(): Promise<IAccountProps[]> {
    try {
      const { data } = await super.getAuthData<IAccountProps[]>({
        method: "GET",
        url: Constants.ACCOUNT_URL,
      });

      return data;
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }

  /******************************************************************************
   * 주문
   ******************************************************************************/

  /**
   * 주문 가능 정보
   * @return Promise<IOrderChanceProps>
   */
  async getOrderChance(coin: string): Promise<IOrderChanceProps> {
    try {
      const { data } = await super.getAuthParamData<IOrderChanceProps>({
        method: "GET",
        url: Constants.ORDER_CHANCE_URL,
        params: { market: coin },
      });

      return data;
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }
  /**
   * 개별 주문 정보
   */

  /**
   * 주문 리스트 조회
   */

  /**
   *  주문 취소 접수
   */

  /**
   * 주문하기
   */

  /******************************************************************************
   * 출금
   ******************************************************************************/

  /******************************************************************************
   * 입금
   ******************************************************************************/

  /******************************************************************************
   * 서비스 정보
   ******************************************************************************/
  /**
   * API 키 리스트 조회
   * @return IApiKeyStatusProps[]
   */
  async getApiKeyStatus() {
    try {
      const { data } = await super.getAuthData<IApiKeyStatusProps[]>({
        method: "GET",
        url: Constants.API_KEYS_URL,
      });

      return data;
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }
}
