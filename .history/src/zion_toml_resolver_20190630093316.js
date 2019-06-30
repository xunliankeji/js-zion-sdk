import axios from 'axios';
import toml from 'toml';
import { Config } from './config';

// STELLAR_TOML_MAX_SIZE is the maximum size of zion.toml file
export const STELLAR_TOML_MAX_SIZE = 100 * 1024;

/**
 * StellarTomlResolver allows resolving `zion.toml` files.
 */
export class StellarTomlResolver {
  /**
   * Returns a parsed `zion.toml` file for a given domain.
   * ```js
   * ZionSdk.StellarTomlResolver.resolve('acme.com')
   *   .then(stellarToml => {
   *     // stellarToml in an object representing domain zion.toml file.
   *   })
   *   .catch(error => {
   *     // zion.toml does not exist or is invalid
   *   });
   * ```
   * @see <a href="https://www.zion.org/developers/guides/concepts/zion-toml.html" target="_blank">Zion.toml doc</a>
   * @param {string} domain Domain to get zion.toml file for
   * @param {object} [opts] Options object
   * @param {boolean} [opts.allowHttp] - Allow connecting to http servers, default: `false`. This must be set to false in production deployments!
   * @param {number} [opts.timeout] - Allow a timeout, default: 0. Allows user to avoid nasty lag due to TOML resolve issue.
   * @returns {Promise} A `Promise` that resolves to the parsed zion.toml object
   */
  static resolve(domain, opts = {}) {
    let allowHttp = Config.isAllowHttp();
    let timeout = Config.getTimeout();

    if (typeof opts.allowHttp !== 'undefined') {
      allowHttp = opts.allowHttp;
    }

    if (typeof opts.timeout === 'number') {
      timeout = opts.timeout;
    }

    let protocol = 'https';
    if (allowHttp) {
      protocol = 'http';
    }

    return axios
      .get(`${protocol}://${domain}/.well-known/zion.toml`, {
        maxContentLength: STELLAR_TOML_MAX_SIZE,
        timeout
      })
      .then((response) => {
        try {
          const tomlObject = toml.parse(response.data);
          return Promise.resolve(tomlObject);
        } catch (e) {
          return Promise.reject(
            new Error(
              `Parsing error on line ${e.line}, column ${e.column}: ${
                e.message
              }`
            )
          );
        }
      })
      .catch((err) => {
        if (err.message.match(/^maxContentLength size/)) {
          throw new Error(
            `zion.toml file exceeds allowed size of ${STELLAR_TOML_MAX_SIZE}`
          );
        } else {
          throw err;
        }
      });
  }
}
