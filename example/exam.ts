import { UtilsService } from "../src";

(async () => {
  try {
    const maCount = 20;
    const type = "60";
    const coin = "KRW-XRP";
    const util = new UtilsService();
    let result = await util.getCmbr(type, coin, maCount);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();
