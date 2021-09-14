import { IOhlcavExtend, IOhlcavProps, TCandle } from "../@types/quotation";

export default interface UtilsInterface {
  getOhlcav: (
    type: TCandle,
    market: string,
    count: number,
    to?: string
  ) => Promise<IOhlcavProps[]>;

  getOhlcvPlusOne: (
    type: TCandle,
    market: string,
    count: number,
    to?: string
  ) => Promise<IOhlcavProps[]>;

  getPrevMaAvg: (df: IOhlcavProps[], maCount: number) => IOhlcavExtend[];

  getBollingerBand: (df: IOhlcavExtend[], maCount: number) => IOhlcavExtend[];
  getRsi: (df: IOhlcavExtend[], maCount: number) => IOhlcavExtend[];
}
