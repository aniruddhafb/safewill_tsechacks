import "@/styles/globals.css";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../artifacts/contracts/WillFactory.sol/WillFactory.json";
import Footer from "@/components/footer";
export default function App({ Component, pageProps }) {
  const contractAddress = "0xF9d5731fC2d2fA261Dc5B7e4f523F0f3DDF45B78";
  // const contractAddress = "0xF53F0bFbd8Ed9217f673B61271d5C2e2eA9D1167";
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  const connectToContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let _user_address = await signer.getAddress();
    setUserAddress(_user_address);
    const ProjectFactoryContract = new ethers.Contract(
      contractAddress,
      abi.abi,
      signer
    );
    setProvider(ProjectFactoryContract);
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    connectToContract();
  }, [userAddress]);

  return (
    <>
      <Navbar connectToContract={connectToContract} userAddress={userAddress} />
      <Component
        {...pageProps}
        provider={provider}
        connectToContract={connectToContract}
        userAddress={userAddress}
      />
      <Footer />
    </>
  );
}
