import "dotenv/config";
import { ExchangeService, QuoationService } from "../src";

const UBIT_ACCESS_KEY = String(process.env.UBIT_ACCESS_KEY);
const UBIT_SECRET_KEY = String(process.env.UBIT_SECRET_KEY);

const exchangeService = new ExchangeService(UBIT_ACCESS_KEY, UBIT_SECRET_KEY);
const quoationService = new QuoationService();

(async () => {
  try {
    //마켓 코드 조회
    const res = await quoationService.getMarketAllInfo();

    // 분 캔들 조회
    const res2 = await quoationService.getMinutesCandles({
      minutes: "60",
      marketCoin: "KRW-BTC",
      count: 10,
    });

    // 일 캔들 조회
    const res3 = await quoationService.getDayCandles({
      marketCoin: "KRW-BTC",
      count: 10,
    });

    // 현재가 정보 조회
    const res4 = await quoationService.getTicker(["KRW-BTC"]);

    // 호가 정보 조회
    const res5 = await quoationService.getOrderbook(["KRW-BTC"]);

    //전체 계좌 조회
    const res6 = await exchangeService.getAllAccount();

    //주문 가능 정보
    const res7 = await exchangeService.getOrderChance("KRW-XRP");

    // API 키 리스트 조회
    const res8 = await exchangeService.getApiKeyStatus();
  } catch (err) {
    console.log(err);
  }
})();
