import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../artifacts/contracts/WillFactory.sol/WillFactory.json";
import Footer from "@/components/Footer";
export default function App({ Component, pageProps }) {
  const contractMumbaiAddress = "0x067Bf3A474F54BCe1e0818FFb95FEDF99d100Af2";
  const contractGoerliAddress = "0x60E5aABd492a9c6479D74dCec24B0dAa78a89b0B";
  const contractFilAddress = "0xF53F0bFbd8Ed9217f673B61271d5C2e2eA9D1167";
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState();

  const connectToContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    setSigner(signer);

    let _user_address = await signer.getAddress();
    setUserAddress(_user_address);

    const network = await provider.getNetwork();
    let contractAddress;
    let chainIdMain = network.chainId;
    if (chainIdMain == 5) {
      contractAddress = contractGoerliAddress;
    }
    else if (chainIdMain == 80001) {
      contractAddress = contractMumbaiAddress;
    }
    else {
      contractAddress = contractFilAddress;
    }

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
      <Navbar connectToContract={connectToContract} userAddress={userAddress} provider={provider} />
      <Component
        {...pageProps}
        provider={provider}
        connectToContract={connectToContract}
        userAddress={userAddress}
        signer={signer}
      />
      <Footer />
    </>
  );
}
