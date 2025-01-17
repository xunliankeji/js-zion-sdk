import { CallBuilder } from './call_builder';

export class PaymentCallBuilder extends CallBuilder {
  /**
   * Creates a new {@link PaymentCallBuilder} pointed to server defined by serverUrl.
   *
   * Do not create this object directly, use {@link Server#payments}.
   * @see [All Payments](https://www.zion.org/developers/equator/reference/endpoints/payments-all.html)
   * @constructor
   * @extends CallBuilder
   * @param {string} serverUrl Horizon server URL.
   */
  constructor(serverUrl) {
    super(serverUrl);
    this.url.segment('payments');
  }

  /**
   * This endpoint responds with a collection of Payment operations where the given account was either the sender or receiver.
   * @see [Payments for Account](https://www.zion.org/developers/equator/reference/endpoints/payments-for-account.html)
   * @param {string} accountId For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
   * @returns {PaymentCallBuilder} this PaymentCallBuilder instance
   */
  forAccount(accountId) {
    this.filter.push(['accounts', accountId, 'payments']);
    return this;
  }

  /**
   * This endpoint represents all payment operations that are part of a valid transactions in a given ledger.
   * @see [Payments for Ledger](https://www.zion.org/developers/equator/reference/endpoints/payments-for-ledger.html)
   * @param {number|string} sequence Ledger sequence
   * @returns {PaymentCallBuilder} this PaymentCallBuilder instance
   */
  forLedger(sequence) {
    this.filter.push([
      'ledgers',
      typeof sequence === 'number' ? sequence.toString() : sequence,
      'payments'
    ]);
    return this;
  }

  /**
   * This endpoint represents all payment operations that are part of a given transaction.
   * @see [Payments for Transaction](https://www.zion.org/developers/equator/reference/endpoints/payments-for-transaction.html)
   * @param {string} transactionId Transaction ID
   * @returns {PaymentCallBuilder} this PaymentCallBuilder instance
   */
  forTransaction(transactionId) {
    this.filter.push(['transactions', transactionId, 'payments']);
    return this;
  }
}
