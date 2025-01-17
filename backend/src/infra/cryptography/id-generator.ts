import * as crypto from "crypto";

export class IdGenerator {
  static execute() {
    return crypto.randomUUID().toString();
  }
}