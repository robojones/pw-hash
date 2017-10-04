const assert = require('assert')

describe('pw-hash', function () {
  const hash = require('..')

  describe('create(password)', function () {
    it('should return a hashString', function () {
      const string = hash.create('test password')

      assert.strictEqual(typeof string, 'string')

      // test if the string is parsable
      const {
        algorithm,
        salt,
        digest
      } = hash.HashGenerator.parse(string)

      assert(algorithm)
      assert(salt)
      assert(digest)
    })
  })

  describe('verify(password, hashString)', function () {
    beforeEach(function () {
      this.pw = 'example'
    })

    it('should return true if the password matches', function () {
      const string = hash.create(this.pw)
      const result = hash.verify(this.pw, string)

      assert(result)
    })

    it('should return false if the password does not match', function () {
      const string = hash.create(this.pw)
      const result = hash.verify('asdf', string)

      assert(!result)
    })

    it('should throw an error if the algorithm is invalid', function () {
      const string = hash.HashGenerator.hash(this.pw, 'sha1', 'test_salt')
      assert.throws(() => {
        hash.verify(this.pw, string)
      })
    })

    it('should throw if the hashString is invalid', function () {
      const string = 'asdf:test:huhn:asdf'
      assert.throws(() => {
        hash.verify(this.pw, string)
      })
    })
  })
})
