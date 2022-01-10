const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

const newPair = new Keypair();

// extracting publicKey from accountInfo
// type String
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

// extracting sectretKey
// type Uint8Array
// length 64
const secretKey = newPair._keypair.secretKey;

// Wallet balance

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`
    );
  } catch (error) {
    console.log(error);
  }
};

// airdropping SOL
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`-- Airdropping 2 SOL --`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// driver function

const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};
driverFunction();
