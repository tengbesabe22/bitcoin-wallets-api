declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      BITCOIN_NETWORK: 'bitcoin' | 'testnet',
      COIN_TYPE: string,
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}