import { CallBuilder } from './call_builder';

/**
 * Creates a new {@link LedgerCallBuilder} pointed to server defined by serverUrl.
 * Do not create this object directly, use {@link Server#ledgers}.
 *
 * @see [All Ledgers](https://www.zion.org/developers/equator/reference/endpoints/ledgers-all.html)
 * @constructor
 * @class LedgerCallBuilder
 * @extends CallBuilder
 * @param {string} serverUrl Horizon server URL.
 */
export class LedgerCallBuilder extends CallBuilder {
  constructor(serverUrl) {
    super(serverUrl);
    this.url.segment('ledgers');
  }

  /**
   * Provides information on a single ledger.
   * @param {number|string} sequence Ledger sequence
   * @returns {LedgerCallBuilder} current LedgerCallBuilder instance
   */
  ledger(sequence) {
    this.filter.push(['ledgers', sequence.toString()]);
    return this;
  }
}
