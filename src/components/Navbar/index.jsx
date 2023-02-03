import Link from "next/link";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import safeWillPng from "../../../public/images/Safewill.png";
import polygonPng from "../../../public/images/polygon.png";
import ethereumPng from "../../../public/images/ethereum.png";
import filPng from "../../../public/images/fil.png";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const Navbar = ({ connectToContract, userAddress }) => {
  // IT CONNECTS TO USER WALLET
  const [chainIdMain, setChainIdMain] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const connectToWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    connectToContract(signer);
    const network = await provider.getNetwork();
    const { chainId } = await provider.getNetwork();
    setChainIdMain(chainId);
    console.log(chainIdMain);
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  // switch or add chain mainnets
  const switchEthereumChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      setChainIdMain("5");
      setShowNetworkPopup(!showNetworkPopup);
      // window.location.reload(false);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x5",
                chainName: "Goerli",
                nativeCurrency: {
                  name: "Goerli",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://etherscan.io"],
                rpcUrls: ["https://goerli.blockpi.network/v1/rpc/public	"],
              },
            ],
          });
          setChainIdMain("5");
          setShowNetworkPopup(!showNetworkPopup);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const switchFilChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xC45" }],
      });
      setChainIdMain("3141");
      setShowNetworkPopup(!showNetworkPopup);
      // window.location.reload(false);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xC45",
                chainName: "Filecoin - Hyperspace testnet",
                nativeCurrency: {
                  name: "Filecoin",
                  symbol: "Fil",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://fil.com"],
                rpcUrls: ["https://api.hyperspace.node.glif.io/rpc/v1	"],
              },
            ],
          });
          setChainIdMain("3141");
          setShowNetworkPopup(!showNetworkPopup);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const switchPolygonChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      setChainIdMain("80001");
      setShowNetworkPopup(!showNetworkPopup);
      // window.location.reload(false);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "Polygon",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com	"],
              },
            ],
          });
          setChainIdMain("80001");
          setShowNetworkPopup(!showNetworkPopup);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const Dropdown = () => {
    return (
      <div className="p-3 rounded-lg shadow-lg text-black absolute right-[-60px] top-12 flex w-[200px]">
        <div className="flex flex-col justify-center">
          <Link href={"/edit_profile"}>Edit Profile</Link>
          <Link href={"/update_presence"}>Update Presence</Link>
          <Link href={"/action_will"}>My Wills</Link>
        </div>
      </div>
    );
  };

  // network popup
  // const networkPopup = () => {
  //   return (
  //     <>
  //       <div className="flex flex-col justify-center w-[200px] absolute top-25 right-0 mt-7 bg-[#2c323d] z-10 text-sm shadow-4xl rounded-b-lg">
  //         {chainIdMain != 1 && (
  //           <div
  //             className="flex flex-row justify-center mt-4 mb-2"
  //             onClick={() => switchEthereumChain()}
  //           >
  //             <Image src={ethereumPng} height="26px" width="28px" />
  //             <p className="pl-1 pr-2 font-bold text-[#b8c6dc] text-lg">
  //               Ethereum
  //             </p>
  //           </div>
  //         )}
  //         {chainIdMain != 56 && (
  //           <div
  //             className="flex flex-row justify-center mt-4 mb-2"
  //             onClick={() => switchBinanceChain()}
  //           >
  //             <Image src={binance} height="26px" width="28px" />
  //             <p className="pl-1 pr-2 font-bold text-[#b8c6dc] text-lg">
  //               Binance
  //             </p>
  //           </div>
  //         )}
  //         {chainIdMain != 137 && (
  //           <div
  //             className="flex flex-row justify-center mt-2 mb-4"
  //             onClick={() => switchPolygonChain()}
  //           >
  //             <Image src={polygon} height="26px" width="28px" />
  //             <p className="pl-1 pr-2 font-bold text-[#b8c6dc] text-lg">
  //               Polygon
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image alt="" src={safeWillPng} height={60} width={60} />
          <span className="ml-3 text-xl">SafeWill</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/create_will" className="mr-5 hover:text-gray-900">
            Create Will
          </Link>
          <Link href="/action_will" className="mr-5 hover:text-gray-900">
            Claim Will
          </Link>
          <Link href="/get_loan" className="mr-5 hover:text-gray-900">
            Get Loan
          </Link>
          {/* <Link href="/stake_earn" className="mr-5 hover:text-gray-900">
            Stake Assets
          </Link> */}
        </nav>
        {userAddress ? (
          <>
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-x-6 cursor-pointer"
            >
              <img
                class="object-cover w-8 h-8 rounded-full ring ring-gray-300 dark:ring-gray-600"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
              />
              <BsChevronDown />
            </div>
            <div className="relative">
              <ul>{openDropdown && <Dropdown />}</ul>
            </div>
          </>
        ) : (
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
        )}

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
