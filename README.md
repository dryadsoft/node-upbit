# node-upbit

[![npm version](https://img.shields.io/npm/v/node-upbit.svg?style=flat-square)](https://www.npmjs.org/package/node-upbit)
[![npm downloads](https://img.shields.io/npm/dm/node-upbit.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-upbit)

npm 사용:

```bash
$ npm i node-upbit
```

yarn 사용:

```bash
$ yarn add node-upbit
```

## 예제(usage)

### TypeScript 사용 예제

```typescript
import { ExchangeService, QuoationService } from "node-upbit";
```

### Quoation API

> 업비트 ACCESS_KEY없이 코인 시세정보를 조회할 수 있는 API

```typescript
const quoationService = new QuoationService();
```

```typescript
//마켓 코드 조회
const res = await quoationService.getMarketAllInfo();
```

```typescript
// 분 캔들 조회
const res2 = await quoationService.getMinutesCandles({
  minutes: "60",
  marketCoin: "KRW-BTC",
  count: 10,
});
```

```typescript
// 일 캔들 조회
const res3 = await quoationService.getDayCandles({
  marketCoin: "KRW-BTC",
  count: 10,
});
```

```typescript
// 현재가 정보 조회
const res4 = await quoationService.getTicker(["KRW-BTC"]);
```

```typescript
// 호가 정보 조회
const res5 = await quoationService.getOrderbook(["KRW-BTC"]);
```

### Exchange API

> 업비트에서 발급받은 ACCESS_KEY, SERET_KEY를 이용하여 자산조회,주문 등을 할 수 있는 API

```typescript
// UBIT_ACCESS_KEY 업비트에서 발급받은 ACCESS_KEY
// UBIT_SECRET_KEY 업비트에서 발급받은 SECRET_KEY
const exchangeService = new ExchangeService(UBIT_ACCESS_KEY, UBIT_SECRET_KEY);
```

```typescript
//전체 계좌 조회
const res6 = await exchangeService.getAllAccount();
```

```typescript
//주문 가능 정보
const res7 = await exchangeService.getOrderChance("KRW-BTC");
```

```typescript
// API 키 리스트 조회
const res8 = await exchangeService.getApiKeyStatus();
```

## Resources

- [CHANGELOG](https://github.com/dryadsoft/node-upbit/blob/master/CHANGELOG.md)

## License

[MIT](LICENSE)
