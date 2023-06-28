class Constants {
  /**
   * ubit server url
   */
  public static readonly UBIT_SERVER_URL = `https://api.upbit.com/v1` as const;

  /**
   * 전체 계좌 조회
   */
  public static readonly ACCOUNT_URL =
    `${Constants.UBIT_SERVER_URL}/accounts` as const;

  /**
   * 주문 가능 정보
   */
  public static readonly ORDER_CHANCE_URL =
    `${Constants.UBIT_SERVER_URL}/orders/chance` as const;

  /**
   * 마켓 코인정보
   */
  public static readonly MARKET_ALL_URL =
    `${Constants.UBIT_SERVER_URL}/market/all` as const;
  /**
   * Ticker 조회
   */
  public static readonly TICKER_URL =
    `${Constants.UBIT_SERVER_URL}/ticker` as const;
  /**
   * 분 Candle 조회
   */
  public static readonly CANDLES_MINUTES_URL =
    `${Constants.UBIT_SERVER_URL}/candles/minutes` as const;
  /**
   * 일 Candle 조회
   */
  public static readonly CANDLES_DAY_URL =
    `${Constants.UBIT_SERVER_URL}/candles/days` as const;

  /**
   * 주 Candle 조회
   */
  public static readonly CANDLES_WEEK_URL =
    `${Constants.UBIT_SERVER_URL}/candles/weeks` as const;

  /**
   * 월 Candle 조회
   */
  public static readonly CANDLES_MONTH_URL =
    `${Constants.UBIT_SERVER_URL}/candles/months` as const;

  /**
   * API 키 목록 조회
   */
  public static readonly API_KEYS_URL =
    `${Constants.UBIT_SERVER_URL}/api_keys` as const;

  /**
   * 호가 정보 조회
   */
  public static readonly ORDER_BOOK_URL =
    `${Constants.UBIT_SERVER_URL}/orderbook` as const;
}

export default Constants;
