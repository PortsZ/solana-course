import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);

console.log(`The public key is: `, keypair.publicKey.toString());

console.log("\n");

// The public key is:  J3QCoyhDgtvBqwamSizf8dwu9s6iAkdbCCrF2EqgF8VA