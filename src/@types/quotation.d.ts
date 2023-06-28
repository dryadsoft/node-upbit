import { Method } from "axios";

export interface IMarketCoinProps {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface IMarketAllInfoProps {
  KRW: IMarketCoinProps[];
  BTC: IMarketCoinProps[];
  USDT: IMarketCoinProps[];
}

export interface IMarketCoinProps {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface ICandlesMinutesProps {
  minutes: "1" | "3" | "5" | "10" | "15" | "30" | "60" | "240";
  marketCoin: string;
  count: number;
  to?: string;
}

export interface ICandleReturnProps {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

export interface ICandlesDayProps {
  marketCoin: string;
  count: number;
  to?: string;
  convertingPriceUnit?: string;
}

export interface ICandleDayReturnProps {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
}

export interface ICandlesWeekProps {
  marketCoin: string;
  count: number;
  to?: string;
}
export interface ICandleWeekReturnProps {
  market: string; // 마켓명 String
  candle_date_time_utc: string; // 캔들 기준 시각(UTC 기준)
  candle_date_time_kst: string; // 캔들 기준 시각(KST 기준)
  opening_price: number; // 시가 Double
  high_price: number; // 고가 Double
  low_price: number; // 저가 Double
  trade_price: number; // 종가 Double
  timestamp: number; // 마지막 틱이 저장된 시각 Long
  candle_acc_trade_price: number; // 누적 거래 금액 Double
  candle_acc_trade_volume: number; // 누적 거래량 Double
  first_day_of_period: string; // 캔들 기간의 가장 첫 날 String
}
export interface ICandlesMonthProps {
  marketCoin: string;
  count: number;
  to?: string;
}
export interface ICandlesMonthReturnProps {
  market: string; // 마켓명	String
  candle_date_time_utc: string; // 캔들 기준 시각(UTC 기준)
  candle_date_time_kst: string; // 캔들 기준 시각(KST 기준)
  opening_price: number; // 시가 Double
  high_price: snumbertring; // 고가 Double
  low_price: number; // 저가 Double
  trade_price: number; // 종가 Double
  timestamp: number; // 마지막 틱이 저장된 시각 Long
  candle_acc_trade_price: number; // 누적 거래 금액 Double
  candle_acc_trade_volume: number; // 누적 거래량 Double
  first_day_of_period: string; // 캔들 기간의 가장 첫 날 String
}
export interface ITickerProps {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface IOrderbookProps {
  market: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: IOrderbook_unitsProps[];
}

export interface IAxiosProps {
  method: Method;
  url: string;
  params?: {};
}

export interface IOhlcavProps {
  market: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  accPrice: number;
  volume: number;
}
export interface IOhlcavOption {
  maAvg?: number; // ma이평선값
  bollingerHigh?: number; // 볼린저밴드 high
  bollingerLow?: number; // 볼린저밴드 low
  rsi?: number; // rsi지표
  rs?: number;
  rsiU?: number;
  rsiD?: number;
  rsiAU?: number;
  rsiDU?: number;
}

export type IOhlcavExtend = IOhlcavProps & IOhlcavOption;
export type TMinutes = "1" | "3" | "5" | "10" | "15" | "30" | "60" | "240";
export type TCandle = TMinutes | "day";
