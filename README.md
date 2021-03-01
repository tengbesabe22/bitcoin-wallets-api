# Bitcoin Wallets API

## Overview
---
Bitcoin Wallets API is a REST API for generation of Bitcoin Wallets
There are three kinds of wallet that the API can make, these are:

- Transitional Segwit Wallet (P2SH) using BIP49 standard
- Native Segwit Wallet (bech32) using BIP84 standard
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

mv sample.env .env

npm start
```

## Endpoints
---
##### `POST /wallets/multisig`
Generate `n-out-of-m` multisignature Pay-to-ScriptHash (P2SH) bitcoin address 
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
`200`
```json
{
    "timestamp": "2021-02-28T13:57:03.757Z",
    "status": 200,
    "message": "OK",
    "data": {
        "address": "3LHVRfPEtYooSnknqv4mXgmM7U9aNcEDn4"
    }
}
```

`400`
```json
{
    "timestamp": "2021-02-28T07:00:10.313Z",
    "status": 400,
    "message": "Invalid Public Key on index 0"
}
```

`500`
```json
{
    "timestamp": "2021-02-28T13:59:04.363Z",
    "status": 500,
    "message": "Something went wrong message"
}
```
}
##### Validations:
- `n` and `m` should be valid whole numbers
- `publicKeys` array length should be equal to `m`
- `publicKeys[i]` string length should be length 66 (public key specification)

***
##### `POST /wallets/segwit/p2sh`
Generate Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path using P2SH
##### Request Body:
```json
{
    "mnemonic": "ocean trend spy slab have below process angle thunder asthma panda wrestle",
    "path": "m/49'/0'/0'/0/0"
}
```

##### Response Body:
`200`
```json
{
    "timestamp": "2021-02-28T13:57:44.254Z",
    "status": 200,
    "message": "OK",
    "data": {
        "address": "38xmkTFyCcPtLjM1vcUnz3V6b8w8gZNu39",
        "publicKey": "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
        "privateKey": "819d03847b88898aeafc75831c5233acc0fb0bc390a1360c581dbae9c488237f"
    }
}
```

`400`
```json
{
    "timestamp": "2021-02-28T13:59:04.363Z",
    "status": 400,
    "message": "Invalid Mnemonic"
}
```

`500`
```json
{
    "timestamp": "2021-02-28T13:59:04.363Z",
    "status": 500,
    "message": "Something went wrong message"
}
```

##### Validations:
- `mnemonic` should adhere to [bip49 standards](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) with 12 random dictionary words
- `path` should adhere to [bip 44 derivation path standard](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

***
##### `POST /wallets/segwit/bech32`
Generate Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path using Bech32
##### Request Body:
```json
{
    "mnemonic": "ocean trend spy slab have below process angle thunder asthma panda wrestle",
    "path": "m/84'/0'/0'/0/4"
}
```
##### Response Body:
`200`
```json
{
    "timestamp": "2021-02-28T13:54:01.209Z",
    "status": 200,
    "message": "OK",
    "data": {
        "address": "bc1qlx5g67uxj4l5xyl8kt0tq2taew4a2swfexnk7m",
        "publicKey": "022d44cab5c314c04b5897c6a0d58c30d407ea3ca31ed0bf308c649117c3d8fef3",
        "privateKey": "0c5d58cc2d5f20013f6b1c8482a2d32328e5e6f828e6f1a218d41957451d0247"
    }
}
```

`400`
```json
{
    "timestamp": "2021-02-28T14:00:48.635Z",
    "status": 400,
    "message": "Invalid Mnemonic"
}
```

`500`
```json
{
    "timestamp": "2021-02-28T13:59:04.363Z",
    "status": 500,
    "message": "Something went wrong message"
}
```
##### Validations:
- `mnemonic` should adhere to [bip49 standards](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) with 12 random dictionary words
- `path` should adhere to [bip 44 derivation path standard](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
