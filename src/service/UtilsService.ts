import { IOhlcavExtend, IOhlcavProps, TCandle } from "../@types/quotation";
import UtilsInterface from "../interface/UtilsInterface";
import QuoationService from "./QuoationService";

export default class UtilsService
  extends QuoationService
  implements UtilsInterface
{
  /**
   * constructor
   */
  constructor() {
    super();
  }
  /**
   * get_ohlcv
   * 시가, 고가, 저가, 종가, 누적거래금액, 누적거래양을 조회한다.
   * @param type string: 캔들시간
   * @param market string: 마켓 코드 (ex. KRW-BTC)
   * @param count number: 캔들 개수
   * @param to? string: 마지막 캔들 시각
   * @return  market: 코인 코드
   * @return  time: 캔들 기준 시각(KST 기준)
   * @return  open:  시가
   * @return  high:  고가
   * @return  low:  저가
   * @return  close:  종가
   * @return  accPrice: 누적 거래 금액
   * @return  volume: 누적 거래량
   */
  async getOhlcav(
    type: TCandle,
    market: string,
    count: number,
    to?: string
  ): Promise<IOhlcavProps[]> {
    try {
      let arrayCandleData;
      switch (type) {
        case "day":
          arrayCandleData = await this.getDayCandles({
            marketCoin: market,
            count: count,
            to,
            //   to: "2021-04-18 23:59:59",
          }); //
          break;
        case "1":
        case "3":
        case "5":
        case "10":
        case "15":
        case "30":
        case "60":
        case "240":
          arrayCandleData = await this.getMinutesCandles({
            minutes: type,
            marketCoin: market,
            count: count,
            to,
          });
          break;
      }

      const ohlcv = arrayCandleData.map((item: any) => {
        return {
          market: item.market, // 코인 코드
          time: item.candle_date_time_kst, // 캔들 기준 시각(KST 기준)
          open: item.opening_price, // 시가
          high: item.high_price, // 고가
          low: item.low_price, // 저가
          close: item.trade_price, // 종가
          accPrice: item.candle_acc_trade_price, // 누적 거래 금액
          volume: item.candle_acc_trade_volume, // 누적 거래량
        };
      });

      return ohlcv;
    } catch (err) {
      throw err;
    }
  }

  /**
   * getOhlcvPlusOne
   * 전 봉 이동평균값을 구하기위하여 +1을 하여 캔들을 조회
   * @param type string: 캔들시간
   * @param market string: 마켓 코드 (ex. KRW-BTC)
   * @param count number: 캔들 개수
   * @param to? string: 마지막 캔들 시각("2021-04-18 23:59:59")
   * @return  market: 코인 코드
   * @return  time: 캔들 기준 시각(KST 기준)
   * @return  open:  시가
   * @return  high:  고가
   * @return  low:  저가
   * @return  close:  종가
   * @return  accPrice: 누적 거래 금액
   * @return  volume: 누적 거래량
   */
  async getOhlcvPlusOne(
    type: TCandle,
    market: string,
    count: number,
    to?: string
  ) {
    count = count + 8 + 1;
    try {
      const ohlcv: IOhlcavExtend[] = await this.getOhlcav(
        type,
        market,
        count,
        to
      );
      return ohlcv;
    } catch (err) {
      throw err;
    }
  }

  /**
   * getPrevMaAvg 이동평균값 (전일봉)
   */
  getPrevMaAvg(df: IOhlcavExtend[], maCount: number) {
    for (let i = df.length - 1; i >= 0; i--) {
      if (i >= maCount - 1) {
        let maSum = 0;
        for (let j = i; j >= i - (maCount - 1); j--) {
          maSum += df[j].close || 0;
        }
        df[i].maAvg = maSum / maCount;
      }
    }
    return df;
  }

  /**
   * getBollingerBand 볼린저밴드
   * 선행작업으로 이동평균값이 먼저 구해져있어야한다.
   */
  getBollingerBand(df: IOhlcavExtend[], maCount: number) {
    for (let i = df.length - 1; i >= 0; i--) {
      if (i >= maCount - 1) {
        let deviation: number[] = []; // 편차(종가 - 이평선 평균값)
        const maAvg = df[i].maAvg || 0;
        for (let j = i; j >= i - (maCount - 1); j--) {
          deviation.push(df[j].close - maAvg);
        }
        const sumDeviation = deviation.reduce((acc, cur) => {
          acc += cur * cur;
          return acc;
        }, 0);
        const sqrt = Math.sqrt(sumDeviation / maCount);
        df[i].bollingerHigh = maAvg + sqrt * 2;
        df[i].bollingerLow = maAvg - sqrt * 2;
      }
    }
    return df;
  }

  /**
   * getRsi RSI지표
   */
  getRsi(df: IOhlcavExtend[], maCount: number) {
    for (let i = df.length - 1; i > 0; i--) {
      df[i].rs = df[i].close - df[i - 1].close || 0; //  현재종가 - 전일종가
      df[i].rsiU = (df[i].rs || 0) > 0 ? df[i].rs : 0;
      df[i].rsiD = ((df[i].rs || 0) < 0 ? df[i].rs || 0 : 0) * -1;
    }
    let maSumPlus = 0;
    let maSumMinus = 0;
    // 15, 28
    for (let j = df.length - maCount; j < df.length; j++) {
      if (j === df.length - maCount) {
        // k > j - maCount  인지 k >= j - maCount 인지 검증할것!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for (let k = j; k > j - maCount; k--) {
          maSumPlus += df[k].rsiU || 0; //  현재종가 - 전일종가
          maSumMinus += df[k].rsiD || 0;
        }
        df[j].rsiAU = maSumPlus / maCount;
        df[j].rsiDU = maSumMinus / maCount;
      } else {
        df[j].rsiAU =
          ((df[j - 1].rsiAU || 0) * (maCount - 1) + (df[j].rsiU || 0)) /
          maCount;
        df[j].rsiDU =
          ((df[j - 1].rsiDU || 0) * (maCount - 1) + (df[j].rsiD || 0)) /
          maCount;
      }
      df[j].rsi =
        ((df[j].rsiAU || 0) / ((df[j].rsiAU || 0) + (df[j].rsiDU || 0))) * 100;
      // console.log(maSumPlus, maSumMinus);
    }
    return df;
  }

  /**
   * getCmbr
   * 종가, 이동평균값, 볼린저밴드High,Low값, Rsi지표
   */
  async getCmbr(type: TCandle, market: string, count: number, to?: string) {
    let df = await this.getOhlcvPlusOne(type, market, count, to);
    df = this.getPrevMaAvg(df, count); // 이동평균값
    df = this.getBollingerBand(df, count); // 볼린저밴드값
    df = this.getRsi(df, 14); // rsi지표
    const lastIndex = df.length - 1;
    return {
      market: df[lastIndex].market,
      close: this.getFixed(df[lastIndex].close, 3),
      maAvg: this.getFixed(<number>df[lastIndex].maAvg, 3),
      bollingerHigh: this.getFixed(<number>df[lastIndex].bollingerHigh, 3),
      bollingerLow: this.getFixed(<number>df[lastIndex].bollingerLow, 3),
      rsi: this.getFixed(<number>df[lastIndex].rsi, 3),
    };
  }

  /**
   * getFixed
   * @param num: number
   * @param digits: number
   * @return num: number
   */
  getFixed(num: number, digits: number) {
    if (!Number.isInteger(num)) {
      return parseFloat(num.toFixed(digits));
    }
    return num;
  }
}
