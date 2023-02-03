import React, { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { GoLinkExternal } from "react-icons/go";
import will_abi from "../../contracts/will.json";
import Link from "next/link";
import { ethers } from "ethers";
import metamaskFox from "../../public/images/fox.png";
import Image from "next/image";

const Action_will = ({ provider, userAddress, connectToContract, signer }) => {
  const [wills, setWills] = useState([]);
  const [wills_by_creator, setWill_by_creator] = useState([]);

  const Fetch_wills = async () => {
    const wills = await provider.get_wills();
    const get_wills_by_willsCreator = await provider.get_wills_by_beneficiary();
    setWill_by_creator(get_wills_by_willsCreator);
    console.log(get_wills_by_willsCreator);
    setWills(wills);
  };

  const claimToken = async (will_address) => {
    console.log({ will_address });
    const claim = new ethers.Contract(will_address, will_abi, signer);
    const txn = await claim.claimTokens();
    console.log(txn);
  };

  const cancelWill_of_beneficiary = async (will_address) => {
    const contract = new ethers.Contract(will_address, will_abi, signer);
    const txn = await contract.cancelWill();
    console.log(txn);
  };

  useEffect(() => {
    if (!provider) return;
    Fetch_wills();
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

  return (
    <section className="text-gray-600 body-font">
      {userAddress ? (
        <div className="container px-5 py-24 mt-[-70px] flex flex-col justify-center align-middle w-full">
          <h2 className="text-center font-bold text-3xl mt-2">Your Wills</h2>
          <p className="text-center text-1xl mt-2">
            Below you will find wills created or to be claimed by you
          </p>
          {/* will claimers  */}
          <div className="flex flex-wrap items-cez m-4 justify-center w-full">
            <div className="flex flex-wrap items-cez justify-between w-full p-4 lg:w-1/3">
              {wills.map((e, index) => {
                return e.beneficiaries.includes(userAddress) ? (
                  <div
                    key={index}
                    className="h-[200px] w-[100%] bg-gray-100 bg-opacity-75 rounded-lg overflow-hidden text-center relative m-4 pt-4 pb-4"
                  >
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {e.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{e.description}</p>
                    {!e.beneficiaries.includes(userAddress) ? (
                      <div
                        onClick={() => cancelWill_of_beneficiary(e.will)}
                        className="text-indigo-500 inline-flex items-center cursor-pointer text-red-500"
                      >
                        Cancel Will
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
                      </div>
                    ) : (
                      <div
                        onClick={() => claimToken(e.will)}
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
                      </div>
                    )}
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        20 MATIC
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm border-r-2 border-gray-200 pr-3 py-1">
                        <IoIosPeople className="text-xl" />{" "}
                        {e.beneficiaries.length}
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm pl-3">
                        <Link
                          href={`https://mumbai.polygonscan.com/address/${e.will}`}
                          target="_blank"
                          className="flex"
                        >
                          View Contract{" "}
                          <GoLinkExternal className="text-l pl-1" />
                        </Link>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
            <div className="flex flex-wrap justify-between align-middle p-4 lg:w-1/3">
              {wills_by_creator.map((e, index) => {
                return e.will.includes(
                  "0x0000000000000000000000000000000000000000"
                ) ? (
                  <div className={`text-center flex justify-center`}></div>
                ) : (
                  <div
                    key={index}
                    className="h-[200px] w-[100%] bg-gray-100 bg-opacity-75 rounded-lg overflow-hidden text-center relative pt-4 pb-4 mb-4"
                  >
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {e.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{e.description}</p>
                    {!e.beneficiaries.includes(userAddress) ? (
                      <div
                        onClick={() => cancelWill_of_beneficiary(e.will)}
                        className="text-indigo-500 inline-flex items-center cursor-pointer text-red-500"
                      >
                        Cancel Will
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
                      </div>
                    ) : (
                      <div
                        onClick={() => claimToken(e.will)}
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
                      </div>
                    )}
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        20 MATIC
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm border-r-2 border-gray-200 pr-3 py-1">
                        <IoIosPeople className="text-xl" />{" "}
                        {e.beneficiaries.length}
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm pl-3">
                        <Link
                          href={`https://mumbai.polygonscan.com/address/${e.will}`}
                          target="_blank"
                          className="flex"
                        >
                          View Contract{" "}
                          <GoLinkExternal className="text-l pl-1" />
                        </Link>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* for will creators  */}
          <div className="flex flex-wrap m-4 justify-center">
            <div className="p-4 lg:w-1/3">
              {wills.map((e, index) => {
                <div
                  key={index}
                  className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative mb-4"
                >
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {e.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{e.description}</p>
                  <div
                    onClick={() => claimToken(e.will)}
                    className="text-indigo-500 inline-flex items-center cursor-pointer"
                  >
                    cancel Will
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
                  </div>
                  <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      500 MATIC
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm border-r-2 border-gray-200 pr-3 py-1">
                      <IoIosPeople className="text-xl" /> 3
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm pl-3">
                      <Link href="polygonscan.com" className="flex">
                        View Contract <GoLinkExternal className="text-l pl-1" />
                      </Link>
                    </span>
                  </div>
                </div>;
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
                    <div className="text-indigo-500 inline-flex items-center">
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
                    </div>
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

export default Action_will;
