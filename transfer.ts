import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  
  PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
  `\n\n✅ Loaded our own keypair, the destination public key, and connected to Solana\n\n`
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;



const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.\n\n `
);
console.log(`Transaction signature is ${signature}!`);


// looks like the transactions costs 5000 lamports to send
//https://explorer.solana.com/tx/5WauJcsDtV6w9vy7b3BFkhPh76WJv499wdcKMkUvNsWChAEnDVrQBGkA3wDEgAeucaakRYa89ozsC97bzZVdnBUt?cluster=devnet
//transaction took seconds
//transaction is confirmed when blocks are computed, and have the right signature