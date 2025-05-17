interface Puzzle {
  id: string
  story: string
  hint: string
  answer: string
  explanation: string
  hasImage?: boolean
  imageUrl?: string
  hasLink?: boolean
  link?: string
  answerType: "text" | "network" | "ascii" | "hidden"
}

const level1Puzzles: Puzzle[] = [
  {
    id: "l1p1",
    story: `Terminal Log #1: 
    
    The first barrier to the Solcada network requires authentication. 
    
    A message appears on your screen:
    
    "To proceed, you must identify the consensus mechanism that powers Solana. It creates a historical record proving events occurred at specific moments in time."
    
    The system awaits your response...`,
    hint: "It's a novel approach that creates a historical record proving that an event occurred at a specific moment in time.",
    answer: "proof of history",
    explanation:
      "Proof of History (PoH) is Solana's novel approach to consensus that creates a historical record proving that an event occurred at a specific moment in time. It's not a consensus protocol itself but a cryptographic clock that enables Solana's high throughput.",
    answerType: "text",
  },
  {
    id: "l1p2",
    story: `Terminal Log #2:
    
    Access granted to the first layer. As you navigate deeper, you encounter a digital vault.
    
    The terminal displays:
    
    "This vault can only be unlocked with the name of Solana's native token. It shares its name with a celestial body that gives light to all."
    
    A text input field appears, awaiting the key...`,
    hint: "It shares its name with our sun.",
    answer: "sol",
    explanation:
      "SOL is Solana's native token, used for transaction fees, staking, and governance. The name is inspired by 'sol', the Spanish word for sun, reflecting Solana's focus on speed and energy.",
    answerType: "text",
  },
  {
    id: "l1p3",
    story: `Terminal Log #3:
    
    The vault opens to reveal a digital library. A holographic projection appears:
    
    "To access the core repositories, identify the programming language primarily used for Solana smart contracts. This language is known for memory safety without garbage collection."
    
    The system scans for your knowledge...`,
    hint: "It's known for memory safety without garbage collection.",
    answer: "rust",
    explanation:
      "Rust is the primary language for Solana smart contract development. It was chosen for its performance, memory safety, and lack of garbage collection, which are critical for blockchain applications where efficiency and security are paramount.",
    answerType: "text",
  },
  {
    id: "l1p4",
    story: `Terminal Log #4:
    
    The library grants you access to a secure terminal. A message appears:
    
    "Identify the runtime environment where Solana smart contracts execute. Named after a reference point used to measure elevations on Earth."
    
    The cursor blinks, waiting for your input...`,
    hint: "It's named after a reference point used to measure elevations on Earth.",
    answer: "sealevel",
    explanation:
      "Sealevel is Solana's parallel runtime environment that allows thousands of smart contracts to run concurrently. This parallelization is key to Solana's high throughput and is one of its main technical innovations.",
    answerType: "text",
  },
  {
    id: "l1p5",
    story: `Terminal Log #5:
    
    As you prepare to advance to the next level, a final challenge appears:
    
    "Before proceeding, you must demonstrate knowledge of Solana's capabilities. What is the maximum theoretical transactions per second (TPS) that Solana can process?"
    
    The system requires a precise numerical answer...`,
    hint: "It's over 60,000 but less than 70,000.",
    answer: "65000",
    explanation:
      "Solana's theoretical maximum is 65,000 transactions per second (TPS), making it one of the fastest blockchains. This high throughput is achieved through a combination of Proof of History, parallel transaction processing, and other optimizations.",
    answerType: "text",
  },
]

const level2Puzzles: Puzzle[] = [
  {
    id: "l2p1",
    story: `Terminal Log #6:
    
    Level 2 access granted. You've entered a more secure area of the Solcada network.
    
    A terminal displays a corrupted image with fragments of code. After running a repair algorithm, a message appears:
    
    "Identify Solana's parallel transaction processing engine. Named after a warm Atlantic Ocean current that influences weather patterns."
    
    The system awaits your response...`,
    hint: "It's named after a warm Atlantic Ocean current.",
    answer: "gulf stream",
    explanation:
      "Gulf Stream is Solana's parallel transaction processing engine that allows validators to forward transactions to upcoming leaders before the current block is finalized, reducing confirmation times and increasing throughput.",
    hasImage: true,
    imageUrl: "/images/corrupted-code.png",
    answerType: "text",
  },
  {
    id: "l2p2",
    story: `Terminal Log #7:
    
    As you navigate deeper, you encounter a development environment with partially compiled code.
    
    A notification appears:
    
    "To proceed, identify Solana's programming framework that provides stability for smart contract development. Like its nautical namesake, it secures vessels in turbulent waters."
    
    The compiler awaits your input...`,
    hint: "It's something that provides stability and is used to secure a vessel.",
    answer: "anchor",
    explanation:
      "Anchor is a framework for Solana's Sealevel runtime that provides several developer tools to build secure smart contracts. It's similar to Hardhat or Truffle in the Ethereum ecosystem but specifically designed for Solana.",
    answerType: "ascii",
    hasLink: true,
    link: "https://solana.com/docs",
  },
  {
    id: "l2p3",
    story: `Terminal Log #8:
    
    You've reached a digital gallery displaying various tokens and collectibles.
    
    A holographic curator approaches:
    
    "To access the rare collections, identify Solana's token standard for NFTs. This comprehensive suite enables creation and management of digital assets."
    
    The gallery entrance awaits your credentials...`,
    hint: "It's a comprehensive suite for creating and managing NFTs on Solana.",
    answer: "metaplex",
    explanation:
      "Metaplex is Solana's NFT standard and toolset that provides a comprehensive solution for creating, selling, and managing NFTs. It includes on-chain programs, JavaScript SDKs, and a UI for NFT storefronts.",
    answerType: "hidden",
    hasImage: true,
    imageUrl: "/images/nft-gallery.png",
  },
  {
    id: "l2p4",
    story: `Terminal Log #9:
    
    You discover an interface that allows programs to communicate with each other.
    
    A system message appears:
    
    "To establish cross-program communication, identify Solana's feature that allows programs to call other programs directly. The acronym stands for the exact feature name."
    
    The interface requires proper identification...`,
    hint: "The acronym stands for the exact feature name.",
    answer: "cpi",
    explanation:
      "Cross-Program Invocation (CPI) is a feature that allows Solana programs to call other programs directly. This enables composability, where programs can build on top of each other, creating more complex applications.",
    answerType: "network",
  },
  {
    id: "l2p5",
    story: `Terminal Log #10:
    
    You approach a cryptographic vault securing wallet key pairs.
    
    A security prompt appears:
    
    "To access the vault, identify the encryption scheme commonly used for wallet key pairs in Solana. It's an Edwards-curve Digital Signature Algorithm."
    
    The vault scanner awaits your cryptographic knowledge...`,
    hint: "It's an Edwards-curve Digital Signature Algorithm.",
    answer: "ed25519",
    explanation:
      "Ed25519 is the elliptic curve cryptography scheme used for Solana wallet key pairs. It provides strong security with fast signature verification, which is important for a high-throughput blockchain like Solana.",
    answerType: "ascii",
  },
]

const level3Puzzles: Puzzle[] = [
  {
    id: "l3p1",
    story: `Terminal Log #11:
    
    Level 3 access granted. You've reached the inner sanctum of the Solcada network.
    
    A complex cryptographic challenge appears:
    
    "Identify the cryptographic primitive used in Solana's Proof of History. It creates a sequence of computations that take a specific amount of time to complete but can be verified quickly."
    
    The system requires the three-letter acronym...`,
    hint: "It stands for Verifiable Delay Function.",
    answer: "vdf",
    explanation:
      "Verifiable Delay Function (VDF) is the cryptographic primitive behind Solana's Proof of History. It creates a sequence of computations that take a specific amount of time to complete but can be verified quickly, enabling a trustless time source.",
    answerType: "hidden",
    hasLink: true,
    link: "https://research.solana.com",
  },
  {
    id: "l3p2",
    story: `Terminal Log #12:
    
    You encounter a visualization of Solana's network architecture.
    
    A system prompt appears:
    
    "To proceed, identify Solana's sharding solution that breaks data into smaller chunks for faster network transmission. Named after a device that converts fluid flow to mechanical energy."
    
    The network diagram awaits your analysis...`,
    hint: "It's named after a device that converts fluid flow to mechanical energy.",
    answer: "turbine",
    explanation:
      "Turbine is Solana's block propagation protocol that breaks data into smaller chunks for faster network transmission. It's a key part of Solana's architecture that enables the network to scale without sacrificing decentralization.",
    answerType: "network",
    hasImage: true,
    imageUrl: "/images/network-diagram.png",
  },
  {
    id: "l3p3",
    story: `Terminal Log #13:
    
    You discover a security analysis tool monitoring transaction ordering.
    
    An alert appears:
    
    "To access the security protocols, identify the name of the attack where validators can manipulate transaction ordering for profit. It stands for Maximal Extractable Value."
    
    The security console awaits your expertise...`,
    hint: "It stands for Maximal Extractable Value.",
    answer: "mev",
    explanation:
      "MEV (Maximal Extractable Value) refers to the value that can be extracted by reordering, including, or censoring transactions. It's a challenge for all blockchains, and Solana has implemented various mechanisms to mitigate MEV attacks.",
    answerType: "ascii",
    hasLink: true,
    link: "https://solana.com/security",
  },
  {
    id: "l3p4",
    story: `Terminal Log #14:
    
    You access a database optimization tool for Solana's state storage.
    
    A system message appears:
    
    "Identify Solana's state compression technique that efficiently stores and accesses account data. The name relates directly to how Solana organizes its database of accounts."
    
    The optimization tool requires proper configuration...`,
    hint: "It's related to how Solana stores account data efficiently.",
    answer: "accountsdb",
    explanation:
      "AccountsDB is Solana's state compression technique that efficiently stores and accesses account data. It uses various optimizations to reduce storage requirements and improve access times, which is crucial for Solana's performance.",
    answerType: "hidden",
  },
  {
    id: "l3p5",
    story: `Terminal Log #15:
    
    You've reached the final challenge of the Solcada network.
    
    A cryptographic verification system activates:
    
    "For final verification, identify the hash function used in Solana's Proof of History implementation. This widely used cryptographic hash function belongs to the SHA-2 family."
    
    The system awaits your final answer...`,
    hint: "It's a widely used cryptographic hash function in the SHA-2 family.",
    answer: "sha256",
    explanation:
      "SHA-256 is the cryptographic hash function used in Solana's Proof of History implementation. It was chosen for its security properties and widespread use, making it a trusted component for Solana's consensus mechanism.",
    answerType: "network",
    hasImage: true,
    imageUrl: "/images/cryptographic-hash.png",
  },
]

export function getLevelPuzzles(level: number): Puzzle[] {
  switch (level) {
    case 1:
      return level1Puzzles
    case 2:
      return level2Puzzles
    case 3:
      return level3Puzzles
    default:
      return level1Puzzles
  }
}

export function getPuzzleById(id: string): Puzzle | undefined {
  const allPuzzles = [...level1Puzzles, ...level2Puzzles, ...level3Puzzles]
  return allPuzzles.find((puzzle) => puzzle.id === id)
}
