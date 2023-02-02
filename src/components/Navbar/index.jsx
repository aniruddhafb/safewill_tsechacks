import Link from "next/link";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import safeWillPng from "../../../public/images/Safewill.png";

const Navbar = ({ connectToContract }) => {
  // IT CONNECTS TO USER WALLET
  const connectToWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    connectToContract(signer);
    const network = await provider.getNetwork();
    if (network.chainId !== 80001)
      return alert("Please Switch To Matic Network");
  };

  useEffect(() => {}, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image src={safeWillPng} height={60} width={60} />
          <span className="ml-3 text-xl">SafeWill</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/create_will" className="mr-5 hover:text-gray-900">
            Create Will
          </Link>
          <Link href="/get_loan" className="mr-5 hover:text-gray-900">
            Get Loan
          </Link>
          <Link href="/stake_earn" className="mr-5 hover:text-gray-900">
            Stake Assets
          </Link>
        </nav>
        <Link href="/connect_wallet">
          <button
            // onClick={connectToWallet}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Get Started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
        {/* <Link href={"/createproject"}>
          <button
            onClick={connectToWallet}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Create Project
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link> */}
      </div>
    </header>
  );
};

export default Navbar;
