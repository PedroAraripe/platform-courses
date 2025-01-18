export class CurrentDateIsoGmtCleaned {
  static execute() {
    const now = new Date()

    return new Date(now.toISOString())
  }
}