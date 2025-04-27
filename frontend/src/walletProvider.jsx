import React, { createContext, useContext, useState, useEffect } from "react";
import { WalletProvider } from "@mysten/wallet-adapter-react";
import { WalletStandardAdapterProvider } from "@mysten/wallet-adapter-wallet-standard";

// Create Wallet Context
const WalletContext = createContext(null);

// This will allow you to use Wallet context
export const useWalletContext = () => useContext(WalletContext);

export const WalletProviderWrapper = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Set up your wallet logic here
    // e.g., Set wallet from your connection process
  }, []);

  return (
    <WalletProvider>
      <WalletStandardAdapterProvider value={wallet}>
        {children}
      </WalletStandardAdapterProvider>
    </WalletProvider>
  );
};
