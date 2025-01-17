import * as crypto from "crypto";

export class IdGenerator {
  static generate() {
    return crypto.randomUUID().toString();
  }
}