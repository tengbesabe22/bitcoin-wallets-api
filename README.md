# Bitcoin Wallets API

## Overview
---
Bitcoin Wallets API is a REST API for generation of Bitcoin Wallets
There are three kinds of wallet that the API can make, these are:

- Transitional Segwit Wallet (P2SH) using BIP49 standard
- Native Segwit Wallet (bech32) using BIP85 standard
- Multisignature Pay-to-ScriptHash(P2SH)


## Tech
---
API uses a number of packages to generate Bitcoin address

- [BIP39](https://www.npmjs.com/package/bip39) - implementation of mnemonic seed for generation of deterministic wallets
- [BIP32](https://www.npmjs.com/package/bip32) - standard for creating HD (Hierarchical Deterministic) wallets
- [bitcoinjs-lib](https://www.npmjs.com/package/bitcoinjs-lib) - aid to help generate bitcoin wallets
- [body-parser](https://www.npmjs.com/package/body-parser) - parse incoming request body
- [express](https://www.npmjs.com/package/express) - framework for REST API

## Setup
---
```sh
git clone https://github.com/tengbesabe22/bitcoin-wallets-api

cd crypto-wallet-api

npm install

npm start
```

## Endpoints
---
##### `POST /wallets/multisig`
##### Request Body:

```json
{
    "n": 2,
    "m": 3,
    "publicKeys": [
        "02022098663e8234a41c674dae616aad7a73d5b21e63a2ab7024daa58bd4dee3ba",
        "030c0e7fad3809eb32a6d65b0f9e558da6266509647318e2894eb13f3c8ad773fa",
        "030cac2016e648506f0e0ac40555ad538f361a9454efffbfd7278a01912078100b"
    ]
}
```
##### Response Body:
```json
{
    "address": "35URh6yUJTP1uh5XgEtTsidXRgqw85wJ4K"
}
```
##### Validations:
- `n` and `m` should be valid whole numbers
- `publicKeys` array length should be equal to `m`
- `publicKeys[i]` string length should be length 66 (public key specification)


##### `POST /wallets/segwit/bip49`
##### Request Body:
```json
{
    "mnemonic": "ocean trend spy slab have below process angle thunder asthma panda wrestle",
    "path": "m/49'/0'/0'/0/0"
}
```

##### Response Body:
```json
{
    "address": "37YwJrDzHedhFiaTzgcQbQiSVBZC4PJne2",
    "publicKey": "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
    "privateKey": "L433tM5urMc1NqfytCFjQage3uGV9dWSb8zX9e3AUjDxJa5JHK3R"
}
```

##### Validations:
- `mnemonic` should adhere to [bip49 standards](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) with 12 random dictionary words

##### `POST /wallets/segwit/bech32`
##### Request Body:
```json
{
    "mnemonic": "ocean trend spy slab have below process angle thunder asthma panda wrestle",
    "path": "m/84'/0'/0'/0/4"
}
```
##### Response Body:
```json
{
    "address": "bc1qlx5g67uxj4l5xyl8kt0tq2taew4a2swfexnk7m",
    "publicKey": "022d44cab5c314c04b5897c6a0d58c30d407ea3ca31ed0bf308c649117c3d8fef3",
    "privateKey": "KwdkECHjnHEPdA5VsNeznDZ8biS1E4FwPbwy1NnW5DpUU7vxJf2Z"
}
```
##### Validations:
- `mnemonic` should adhere to [bip49 standards](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) with 12 random dictionary words

