import {
  ICandleDayReturnProps,
  ICandleReturnProps,
  ICandleWeekReturnProps,
  ICandlesDayProps,
  ICandlesMinutesProps,
  ICandlesMonthProps,
  ICandlesMonthReturnProps,
  ICandlesWeekProps,
  IMarketAllInfoProps,
  IOrderbookProps,
  ITickerProps,
} from "../@types/quotation";

export default interface QuotationInterface {
  /**
   * 마켓 코드 조회 (access key 필요없음)
   */
  getMarketAllInfo: () => Promise<IMarketAllInfoProps>;

  /******************************************************************************
   * 시세 캔들 조회
   ******************************************************************************/
  /**
   * 분 캔들 조회 (access key 필요없음)
   * @param minutes: "1" | "3" | "5" | "10" | "15" | "30" | "60" | "240";
   * @param marketCoin: string;
   * @param count: number;
   * @param to?: string;
   */
  getMinutesCandles: (
    param: ICandlesMinutesProps
  ) => Promise<ICandleReturnProps[]>;

  /**
   * 일 캔들 조회 (access key 필요없음)
   */
  getDayCandles: (param: ICandlesDayProps) => Promise<ICandleDayReturnProps[]>;

  /**
   * 주 캔들 조회 (access key 필요없음)
   */
  getWeekCandles: (
    param: ICandlesWeekProps
  ) => Promise<ICandleWeekReturnProps[]>;
  /**
   * 월 캔들 조회 (access key 필요없음)
   */
  getMonthCandles: (
    param: ICandlesMonthProps
  ) => Promise<ICandlesMonthReturnProps[]>;
  /******************************************************************************
   * 시세 Ticker 조회
   ******************************************************************************/
  /**
   *  현재가 정보 조회 (access key 필요없음)
   * @desc 요청 당시 종목의 스냅샷을 반환한다.
   * @param marketCoinCode: string  => KRW-BTC  or   KRW-BTC,BTC-IOST
   * @return Promise<ITickerProps[]>
   */
  getTicker(param: string[]): Promise<ITickerProps[]>;

  /******************************************************************************
   * 시세 호가 정보(Orderbook) 조회
   ******************************************************************************/
  /**
   *  호가 정보 조회 (access key 필요없음)
   * @param marketCoinCode: string  => KRW-BTC  or   KRW-BTC,BTC-IOST
   * @return Promise<IOrderbookProps[]>
   */
  getOrderbook: (param: string[]) => Promise<IOrderbookProps[]>;
}
