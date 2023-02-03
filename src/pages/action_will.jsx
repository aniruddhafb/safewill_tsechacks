import React, { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";
import will_abi from "../../contracts/will.json";
import Link from "next/link";
import { ethers } from "ethers";
import metamaskFox from "../../public/images/fox.png";
import Image from "next/image";

const action_will = ({ provider, userAddress, connectToContract }) => {
  const [wills, setWills] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState();

  const fetch_wills = async () => {
    console.log("fun called");
    const wills = await provider.get_wills();
    let _beneficiaries = wills.map((e) => e.beneficiaries);
    let all_beneficiaries = _beneficiaries.map((e) => e);
    setBeneficiaries(all_beneficiaries[0]);
    setWills(wills);
  };

  // const getWillAddress = async () => {
  //   const
  // }

  const claimToken = async () => {
    const claim = new ethers.Contract();
  };

  useEffect(() => {
    if (!provider) return;
    fetch_wills();
  }, [userAddress]);

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
    // if (network.chainId !== 80001)
    //   return alert("Please Switch To Matic Network");
  };

  useEffect(() => {}, []);

  return (
    <section className="text-gray-600 body-font">
      {userAddress ? (
        <div className="container px-5 py-24 mt-[-70px]">
          <h2 className="text-center font-bold text-3xl mt-2">Your Wills</h2>
          <p className="text-center text-1xl mt-2">
            Below you will find wills created or to be claimed by you
          </p>
          <div className="flex flex-wrap m-4 justify-center">
            <div className="p-4 lg:w-1/3">
              {wills.map((e, index) => {
                return beneficiaries.includes(userAddress) ? (
                  <div
                    key={index}
                    className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                  >
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {e.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{e.description}</p>
                    <a
                      onClick={claimToken}
                      className="text-indigo-500 inline-flex items-center cursor-pointer"
                    >
                      Claim Will
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
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        500 MATIC
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm border-r-2 border-gray-200 pr-3 py-1">
                        <IoIosPeople className="text-xl" /> 3
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm pl-3">
                        <a href="polygonscan.com" className="flex">
                          View Contract{" "}
                          <GoLinkExternal className="text-l pl-1" />
                        </a>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      ) : (
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
                    Please connect your wallet to access <br /> all the features
                    on safewill platform
                  </p>
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
      )}
    </section>
  );
};

export default action_will;
