export interface IAccountProps {
  currency: string; // 화폐를 의미하는 영문 대문자 코드
  balance: string; // 주문가능 금액/수량
  locked: string; // 주문 중 묶여있는 금액/수량
  avg_buy_price: string; // 매수평균가
  avg_buy_price_modified: boolean; // 매수평균가 수정 여부
  unit_currency: string; // 평단가 기준 화폐
}
export interface IBidAskProps {
  currency: string;
  price_unit: string | null;
  min_total: string;
}

export interface IMarketProps {
  id: string;
  name: string;
  order_types: string[];
  order_sides: string[];
  bid: IBidAskProps;
  ask: IBidAskProps;
}

export interface IOrderChanceProps {
  bid_fee: string;
  ask_fee: string;
  market: IMarketProps;
  bid_account: IAccountProps;
  ask_account: IAccountProps;
}
export interface IApiKeyStatusProps {
  access_key: string;
  expire_at: string;
}
