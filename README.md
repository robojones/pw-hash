# pw-hash

Easy and secure password hashing with salt.

[![Build Status](https://circleci.com/gh/robojones/pw-hash.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/robojones/pw-hash/tree/master)
[![Test Coverage](https://codeclimate.com/github/robojones/pw-hash/badges/coverage.svg)](https://codeclimate.com/github/robojones/pw-hash/coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![bitHound Code](https://www.bithound.io/github/robojones/pw-hash/badges/code.svg)](https://www.bithound.io/github/robojones/pw-hash)
[![bitHound Overall Score](https://www.bithound.io/github/robojones/pw-hash/badges/score.svg)](https://www.bithound.io/github/robojones/pw-hash)
[![bitHound Dependencies](https://www.bithound.io/github/robojones/pw-hash/badges/dependencies.svg)](https://www.bithound.io/github/robojones/pw-hash/master/dependencies/npm)

## Highlights
- __100%__ tested.
- No __dependencies__.
- Uses a __strong hash algorithm__ by default (sha256).
- Appends a random string (salt) to each password before hashing it (for extra security).
- JSDoc documentation for __completion__ in editors like VS Code.

## Installation

```
npm i pw-hash
```

## Usage

```javascript
const hash = require('pw-hash')

// hash a password:
const hashString = hash.create('example password')


// verify if a password matches
hash.verify('wrong password', hashString) // false
hash.verify('example password', hashString) // true
```

## API

### hash.create(password)

- password `<string>` - A string containing the password.

__Returns__ a string that can be stored in the database. It can be used with the verify method to check if a password matches.

### hash.verify(password, hashString)

- password `<string>` - A string containing the password.
- hashString `<string>` - A string that was created with the .create() method.

This method verifies if the password is the same password that you passed to the .create() method.
It __Returns__ `true` if the password matches or `false` if it doesn't.
