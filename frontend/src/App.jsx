// import { useWallet, useWalletKit } from "@mysten/wallet-adapter-react";
// import { JsonRpcProvider, TransactionBlock } from "@mysten/sui.js";
// import { useState } from "react";

// const PACKAGE_ID =
//   "0xca8abb005600086467afe45d35abd49aab10518ff6ad8f1c415853945ca75d7c";

// function App() {
//   const { connected, account, signAndExecuteTransactionBlock } = useWalletKit();
//   const [minting, setMinting] = useState(false);

//   const mint = async () => {
//     if (!connected) return alert("Connect your wallet first");
//     setMinting(true);
//     try {
//       const tx = new TransactionBlock();
//       tx.moveCall({
//         target: `${PACKAGE_ID}::zoofi_nft::mint_nft`,
//         arguments: [
//           tx.pure("MyFirstMeme"), // name string
//           tx.pure(1), // meme_level
//         ],
//       });
//       const result = await signAndExecuteTransactionBlock({
//         transactionBlock: tx,
//       });
//       console.log("Minted:", result);
//       alert("MemeAnimal minted!");
//     } catch (e) {
//       console.error(e);
//       alert("Mint failed");
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="p-8 space-y-4">
//       <h1 className="text-3xl font-bold">🐵 ZooFi MemeAnimals</h1>
//       {connected ? (
//         <p>Connected: {account.address}</p>
//       ) : (
//         <button onClick={() => useWalletKit().connect()} className="btn">
//           Connect Wallet
//         </button>
//       )}
//       <button onClick={mint} disabled={!connected || minting} className="btn">
//         {minting ? "Minting..." : "Mint MemeAnimal NFT"}
//       </button>
//     </div>
//   );
// }

// export default App;
import React from "react";

function App() {
  return (
    <div className="App" style={{ border: "2px solid red" }}>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
