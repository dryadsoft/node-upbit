import crypto from "crypto";
import jwt from "jsonwebtoken";
import querystring from "querystring";
import { v4 as uuidv4 } from "uuid";

export default class AuthorizationToken {
  private readonly UBIT_ACCESS_KEY: string;
  private readonly UBIT_SECRET_KEY: string;

  constructor(UBIT_ACCESS_KEY?: string, UBIT_SECRET_KEY?: string) {
    this.UBIT_ACCESS_KEY = UBIT_ACCESS_KEY || "";
    this.UBIT_SECRET_KEY = UBIT_SECRET_KEY || "";
  }

  private Validation() {
    if (this.UBIT_ACCESS_KEY === "" || this.UBIT_SECRET_KEY === "") {
      console.log("업비트 ACCESS_KEY 또는 SECRET_KEY를 확인하십시오.");
      return false;
    }
    return true;
  }
  /**
   * 파라미터가 없는경우
   */
  protected getAuthorizationTokenNoParam() {
    if (!this.Validation()) {
      throw new Error("업비트 ACCESS_KEY 또는 SECRET_KEY를 확인하십시오.");
    }
    const payload = {
      access_key: this.UBIT_ACCESS_KEY,
      nonce: uuidv4(),
    };

    const jwtToken = jwt.sign(payload, this.UBIT_SECRET_KEY);
    return `Bearer ${jwtToken}`;
  }

  /**
   * 파라미터가 존재하는 경우
   */
  protected getAuthorizationToken(params: {}) {
    if (!this.Validation()) {
      throw new Error("업비트 ACCESS_KEY 또는 SECRET_KEY를 확인하십시오.");
    }
    const query = querystring.encode(params); // 요청할 파라미터 세팅
    const hash = crypto.createHash("sha512");
    const queryHash = hash.update(query, "utf-8").digest("hex");

    const payload = {
      access_key: this.UBIT_ACCESS_KEY,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: "SHA512",
    };

    const jwtToken = jwt.sign(payload, this.UBIT_SECRET_KEY);
    return { authorizationToken: `Bearer ${jwtToken}`, query };
  }
}
