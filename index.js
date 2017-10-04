const crypto = require('crypto')

/**
 * @typedef {Object} hashOptions
 * @property {string} [method] - Name of the hash algorithm (default: "sha256").
 * @property {string[]} [supportedMethods] - Array of supported algorithms (default: ["sha256", "sha512"])
 */

/**
 * @typedef {Object} hashObject
 * @property {string} algorithm
 * @property {string} salt
 * @property {string} digest
 */

/**
 * Class that allows you to create hashed string-representations of a password.
 */
class HashGenerator {
  /**
   * Creates a new HashGenerator instance.
   * @param {hashOptions} opt - Options for the HashGenerator
   */
  constructor(opt = {}) {
    const {
      algorithm = 'sha256',
      supportedAlgorithms = ['sha256', 'sha512'],
      saltLength = 64
    } = opt

    this.algorithm = algorithm
    this.supportedAlgorithms = supportedAlgorithms
    this.saltLength = saltLength
  }

  /**
   * Creates a hashString from the given password.
   * @param {string} password 
   * @returns {string}
   */
  create(password) {
    const salt = crypto.randomBytes(this.saltLength).toString('base64')

    return HashGenerator.hash(password, this.algorithm, salt)
  }

  /**
   * Returns a boolean that shows if the password matches the hashString. If the hashString is malformed of the algorithm is not suppored, an error gets thrown.
   * @param {string} password
   * @param {string} hashString
   * @returns {boolean}
   */
  verify(password, hashString) {
    const {
      algorithm,
      salt
    } = HashGenerator.parse(hashString)

    if (!this.supportedAlgorithms.includes(algorithm)) {
      throw new Error('invalid_algorithm')
    }

    const newHashString = HashGenerator.hash(password, algorithm, salt)

    return newHashString === hashString
  }

  /**
   * Returns a hashString representing the password.
   * @param {string} password
   * @param {string} algorithm - One of the supported algorithms.
   * @param {string} salt - A base64 encoded string representing the salt.
   * @returns {string}
   */
  static hash(password, algorithm, salt) {
    const hash = crypto.createHash(algorithm)
    hash.update(password)

    hash.update(salt, 'base64')

    const digest = hash.digest('base64')

    return `${algorithm}:${salt}:${digest}`
  }

  /**
   * Parses a hashString and returns an object with its properties.
   * @param {string} hashString 
   * @returns {hashObject}
   */
  static parse(hashString) {
    const parts = hashString.split(':')

    if (parts.length !== 3) {
      throw new Error('invalid_hashString')
    }

    const [algorithm, salt, digest] = parts

    return {
      algorithm,
      salt,
      digest
    }
  }

  get HashGenerator() {
    return HashGenerator
  }
}

module.exports = new HashGenerator()
