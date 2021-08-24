import {
  ICandleDayReturnProps,
  ICandleReturnProps,
  ICandlesDayProps,
  ICandlesMinutesProps,
  IMarketAllInfoProps,
  IMarketCoinProps,
  IOrderbookProps,
  ITickerProps,
} from "../@types/quotation";
import Constants from "../Constants";
import QuotationInterface from "../interface/QuotationInterface";
import CustomAxios from "./CustomAxios";

export default class QuoationService
  extends CustomAxios
  implements QuotationInterface
{
  /**
   * constructor
   */
  constructor() {
    super();
  }

  /******************************************************************************
   * 시세 종목 조회
   ******************************************************************************/
  /**
   * 마켓 코드 조회 (access key 필요없음)
   */
  async getMarketAllInfo() {
    try {
      const { data } = await super.getData<IMarketCoinProps[]>({
        method: "GET",
        url: Constants.MARKET_ALL_URL,
      });

      let returnObj: IMarketAllInfoProps = { KRW: [], BTC: [], USDT: [] };
      data.forEach((item) => {
        const marketPlace = item.market.split("-")[0];
        if (marketPlace === "KRW") {
          returnObj["KRW"].push(item);
        } else if (marketPlace === "BTC") {
          returnObj["BTC"].push(item);
        } else {
          returnObj["USDT"].push(item);
        }
      });
      return returnObj;
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }

  /******************************************************************************
   * 시세 캔들 조회
   ******************************************************************************/
  /**
   * 분 캔들 조회 (access key 필요없음)
   */
  async getMinutesCandles({
    minutes,
    marketCoin,
    count,
    to,
  }: ICandlesMinutesProps) {
    try {
      const { data } = await super.getData<ICandleReturnProps[]>({
        method: "GET",
        url: `${
          Constants.CANDLES_MINUTES_URL
        }/${minutes}?market=${marketCoin}&count=${count}${
          to ? `&to=${to}` : ""
        }`,
      });

      return data.reverse();
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }

  /**
   * 일 캔들 조회 (access key 필요없음)
   */
  async getDayCandles({ marketCoin, count, to }: ICandlesDayProps) {
    try {
      const { data } = await super.getData<ICandleDayReturnProps[]>({
        method: "GET",
        url: `${
          Constants.CANDLES_DAY_URL
        }/?market=${marketCoin}&count=${count}${to ? `&to=${to}` : ""}`,
      });

      return data.reverse();
    } catch (err) {
      const {
        response: { data },
      } = err;
      throw data;
    }
  }

  /**
   * 주 캔들 조회 (access key 필요없음)
   */

  /**
   * 월 캔들 조회 (access key 필요없음)
   */

  /******************************************************************************
   * 시세 Ticker 조회
   ******************************************************************************/
  /**
   *  현재가 정보 조회 (access key 필요없음)
   * @desc 요청 당시 종목의 스냅샷을 반환한다.
   * @param marketCoinCode: string[]  => KRW-BTC  or   KRW-BTC,BTC-IOST
   * @return Promise<ITickerProps[]>
   */
  async getTicker(marketCoinCode: string[]): Promise<ITickerProps[]> {
    try {
      const { data } = await super.getData<ITickerProps[]>({
        method: "GET",
        url: `${Constants.TICKER_URL}?markets=${marketCoinCode.join(",")}`,
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
   * 시세 호가 정보(Orderbook) 조회
   ******************************************************************************/
  /**
   *  호가 정보 조회 (access key 필요없음)
   * @param marketCoinCode: string  => KRW-BTC  or   KRW-BTC,BTC-IOST
   * @return Promise<IOrderbookProps[]>
   */
  async getOrderbook(marketCoinCode: string[]) {
    try {
      const { data } = await super.getData<IOrderbookProps[]>({
        method: "GET",
        url: `${Constants.ORDER_BOOK_URL}?markets=${marketCoinCode.join(",")}`,
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