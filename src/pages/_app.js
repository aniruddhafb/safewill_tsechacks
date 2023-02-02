import "@/styles/globals.css";
import Navbar from "../components/navbar";
import { useState } from "react";
import { ethers } from "ethers";
// import abi from "../../artifacts/contracts/ProjectFactory.sol/ProjectFactory.json";
import Footer from "@/components/footer";
export default function App({ Component, pageProps }) {
  const contractAddress = "0x60E5aABd492a9c6479D74dCec24B0dAa78a89b0B";
  const [provider, setProvider] = useState(null);

  const connectToContract = async (signer) => {
    const ProjectFactoryContract = new ethers.Contract(
      contractAddress,
      abi.abi,
      signer
    );
    console.log("connected to contract");
    setProvider(ProjectFactoryContract);
  };

  return (
    <>
      <Navbar connectToContract={connectToContract} />
      <Component {...pageProps} provider={provider} />
      <Footer />
    </>
  );
}
