interface Window {
  phantom?: {
    solana?: {
      isConnected: boolean
      connect: () => Promise<{ publicKey: { toString: () => string } }>
    }
  }
}
