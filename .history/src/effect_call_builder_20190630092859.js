import { CallBuilder } from './call_builder';

/**
 * Creates a new {@link EffectCallBuilder} pointed to server defined by serverUrl.
 * Do not create this object directly, use {@link Server#effects}.
 *
 * @class EffectCallBuilder
 * @extends CallBuilder
 * @see [All Effects](https://www.zion.org/developers/equator/reference/endpoints/effects-all.html)
 * @constructor
 * @param {string} serverUrl Horizon server URL.
 */
export class EffectCallBuilder extends CallBuilder {
  constructor(serverUrl) {
    super(serverUrl);
    this.url.segment('effects');
  }

  /**
   * This endpoint represents all effects that changed a given account. It will return relevant effects from the creation of the account to the current ledger.
   * @see [Effects for Account](https://www.zion.org/developers/equator/reference/endpoints/effects-for-account.html)
   * @param {string} accountId For example: `GDGQVOKHW4VEJRU2TETD6DBRKEO5ERCNF353LW5WBFW3JJWQ2BRQ6KDD`
   * @returns {EffectCallBuilder} this EffectCallBuilder instance
   */
  forAccount(accountId) {
    this.filter.push(['accounts', accountId, 'effects']);
    return this;
  }

  /**
   * Effects are the specific ways that the ledger was changed by any operation.
   *
   * This endpoint represents all effects that occurred in the given ledger.
   * @see [Effects for Ledger](https://www.zion.org/developers/equator/reference/endpoints/effects-for-ledger.html)
   * @param {number|string} sequence Ledger sequence
   * @returns {EffectCallBuilder} this EffectCallBuilder instance
   */
  forLedger(sequence) {
    this.filter.push([
      'ledgers',
      typeof sequence === 'number' ? sequence.toString() : sequence,
      'effects'
    ]);
    return this;
  }

  /**
   * This endpoint represents all effects that occurred as a result of a given transaction.
   * @see [Effects for Transaction](https://www.zion.org/developers/equator/reference/endpoints/effects-for-transaction.html)
   * @param {string} transactionId Transaction ID
   * @returns {EffectCallBuilder} this EffectCallBuilder instance
   */
  forTransaction(transactionId) {
    this.filter.push(['transactions', transactionId, 'effects']);
    return this;
  }

  /**
   * This endpoint represents all effects that occurred as a result of a given operation.
   * @see [Effects for Operation](https://www.zion.org/developers/equator/reference/endpoints/effects-for-operation.html)
   * @param {number} operationId Operation ID
   * @returns {EffectCallBuilder} this EffectCallBuilder instance
   */
  forOperation(operationId) {
    this.filter.push(['operations', operationId, 'effects']);
    return this;
  }
}
