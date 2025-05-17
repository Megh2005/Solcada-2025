interface Question {
  question: string
  answer: string
  hint: string
  explanation: string
}

const level1Questions: Question[] = [
  {
    question: "What consensus mechanism does Solana use?",
    answer: "proof of history",
    hint: "It's a novel approach that creates a historical record proving that an event occurred at a specific moment in time.",
    explanation:
      "Solana uses Proof of History (PoH), a novel approach to consensus that creates a historical record proving that an event occurred at a specific moment in time. It's not a consensus protocol itself but a cryptographic clock that enables Solana's high throughput.",
  },
  {
    question: "What is the name of Solana's native token?",
    answer: "sol",
    hint: "It shares its name with our sun.",
    explanation:
      "SOL is Solana's native token, used for transaction fees, staking, and governance. The name is inspired by 'sol', the Spanish word for sun, reflecting Solana's focus on speed and energy.",
  },
  {
    question: "What programming language is primarily used for Solana smart contracts?",
    answer: "rust",
    hint: "It's known for memory safety without garbage collection.",
    explanation:
      "Rust is the primary language for Solana smart contract development. It was chosen for its performance, memory safety, and lack of garbage collection, which are critical for blockchain applications where efficiency and security are paramount.",
  },
  {
    question: "What is the name of Solana's runtime environment for smart contracts?",
    answer: "sealevel",
    hint: "It's named after a reference point used to measure elevations on Earth.",
    explanation:
      "Sealevel is Solana's parallel runtime environment that allows thousands of smart contracts to run concurrently. This parallelization is key to Solana's high throughput and is one of its main technical innovations.",
  },
  {
    question: "What is the maximum theoretical TPS that Solana can process?",
    answer: "65000",
    hint: "It's over 60,000 but less than 70,000.",
    explanation:
      "Solana's theoretical maximum is 65,000 transactions per second (TPS), making it one of the fastest blockchains. This high throughput is achieved through a combination of Proof of History, parallel transaction processing, and other optimizations.",
  },
]

const level2Questions: Question[] = [
  {
    question: "What is the name of Solana's parallel transaction processing engine?",
    answer: "gulf stream",
    hint: "It's named after a warm Atlantic Ocean current.",
    explanation:
      "Gulf Stream is Solana's parallel transaction processing engine that allows validators to forward transactions to upcoming leaders before the current block is finalized, reducing confirmation times and increasing throughput.",
  },
  {
    question: "What is the name of Solana's programming framework?",
    answer: "anchor",
    hint: "It's something that provides stability and is used to secure a vessel.",
    explanation:
      "Anchor is a framework for Solana's Sealevel runtime that provides several developer tools to build secure smart contracts. It's similar to Hardhat or Truffle in the Ethereum ecosystem but specifically designed for Solana.",
  },
  {
    question: "What is the name of Solana's token standard for NFTs?",
    answer: "metaplex",
    hint: "It's a comprehensive suite for creating and managing NFTs on Solana.",
    explanation:
      "Metaplex is Solana's NFT standard and toolset that provides a comprehensive solution for creating, selling, and managing NFTs. It includes on-chain programs, JavaScript SDKs, and a UI for NFT storefronts.",
  },
  {
    question: "What is the name of Solana's cross-program invocation feature?",
    answer: "cpi",
    hint: "The acronym stands for the exact feature name.",
    explanation:
      "Cross-Program Invocation (CPI) is a feature that allows Solana programs to call other programs directly. This enables composability, where programs can build on top of each other, creating more complex applications.",
  },
  {
    question: "What encryption scheme is commonly used for wallet key pairs in Solana?",
    answer: "ed25519",
    hint: "It's an Edwards-curve Digital Signature Algorithm.",
    explanation:
      "Ed25519 is the elliptic curve cryptography scheme used for Solana wallet key pairs. It provides strong security with fast signature verification, which is important for a high-throughput blockchain like Solana.",
  },
]

const level3Questions: Question[] = [
  {
    question: "What is the cryptographic primitive used in Solana's Proof of History?",
    answer: "vdf",
    hint: "It stands for Verifiable Delay Function.",
    explanation:
      "Verifiable Delay Function (VDF) is the cryptographic primitive behind Solana's Proof of History. It creates a sequence of computations that take a specific amount of time to complete but can be verified quickly, enabling a trustless time source.",
  },
  {
    question: "What is the name of Solana's sharding solution?",
    answer: "turbine",
    hint: "It's named after a device that converts fluid flow to mechanical energy.",
    explanation:
      "Turbine is Solana's block propagation protocol that breaks data into smaller chunks for faster network transmission. It's a key part of Solana's architecture that enables the network to scale without sacrificing decentralization.",
  },
  {
    question: "What is the name of the attack where validators can manipulate transaction ordering?",
    answer: "mev",
    hint: "It stands for Maximal Extractable Value.",
    explanation:
      "MEV (Maximal Extractable Value) refers to the value that can be extracted by reordering, including, or censoring transactions. It's a challenge for all blockchains, and Solana has implemented various mechanisms to mitigate MEV attacks.",
  },
  {
    question: "What is the name of Solana's state compression technique?",
    answer: "accountsdb",
    hint: "It's related to how Solana stores account data efficiently.",
    explanation:
      "AccountsDB is Solana's state compression technique that efficiently stores and accesses account data. It uses various optimizations to reduce storage requirements and improve access times, which is crucial for Solana's performance.",
  },
  {
    question: "What is the hash function used in Solana's Proof of History implementation?",
    answer: "sha256",
    hint: "It's a widely used cryptographic hash function in the SHA-2 family.",
    explanation:
      "SHA-256 is the cryptographic hash function used in Solana's Proof of History implementation. It was chosen for its security properties and widespread use, making it a trusted component for Solana's consensus mechanism.",
  },
]

export function getLevelQuestions(level: number): Question[] {
  switch (level) {
    case 1:
      return level1Questions
    case 2:
      return level2Questions
    case 3:
      return level3Questions
    default:
      return level1Questions
  }
}
