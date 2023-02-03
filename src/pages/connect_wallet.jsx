import Link from "next/link";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import metamaskFox from "../../public/images/fox.png";
import Image from "next/image";

const Connect_wallet = ({ connectToContract }) => {
  // IT CONNECTS TO USER WALLET
  const connectToWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    localStorage.setItem("signer", signer);
    let address = await signer.getAddress();
    localStorage.setItem("wallet_address", address);
    connectToContract(signer);
    const network = await provider.getNetwork();
    if (network.chainId !== 80001)
      return alert("Please Switch To Polygon Or Ethereum Or Filecoin Test Networks");
  };

  useEffect(() => { }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 py-12 mx-auto">
        <div className="flex flex-wrap m-4 justify-center">
          <div className="p-4 lg:w-1/2">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                METAMASK
              </h2>
              <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                Connect Wallet
              </h1>
              <p className="leading-relaxed mb-3 flex justify-center">
                <Image alt="" src={metamaskFox} height={200} width={200} />
              </p>
              <button onClick={connectToWallet}>
                <a className="text-indigo-500 inline-flex items-center">
                  Connect
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect_wallet;
