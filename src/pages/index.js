import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import heroImage from "../../public/images/heroImg.svg";
import featureImg from "../../public/images/featureImg.png";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SafeWill - Manage Your Wills Securely</title>
        <meta
          name="description"
          content="Safewill is a decentralized platform where you can manage your wills"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* hero section  */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              We Never Let You Die Completely
            </h1>
            <p className="mb-8 leading-relaxed">
              Automatically Manage your wills with safewill backed by the
              security and assurity of blockchain. Get high APY on your NFT
              Assets by stake/loan methods.
            </p>
            <div className="flex justify-center">
              <Link href="/create_will">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Create a Will
                </button>
              </Link>
              <Link href="/action_will">
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Claim a Will
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image alt="hero" src={heroImage} className="w-[33rem]" />
          </div>
        </div>
      </section>

      {/* features section */}
      <section>
        <div className="container px-6 py-10 mx-auto">
          {/* up div  */}
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl text-center">
            {" "}
            our Awesome Features
          </h1>

          <div className="mt-2 text-center">
            <span className="inline-block w-40 h-1 bg-indigo-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 ml-1 bg-indigo-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 ml-1 bg-indigo-500 rounded-full"></span>
          </div>

          {/* down div  */}
          <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
            <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
              <Image
                alt=""
                className="w-[14rem] h-[14rem] flex-shrink-0  xl:w-[24rem] xl:h-[24rem]"
                src={featureImg}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
              <div className="space-y-3">
                <span className="inline-block p-3 text-indigo-500 bg-indigo-100 rounded-xl dark:text-white dark:bg-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize ">
                  Create Will
                </h1>

                <p className="text-gray-500 ">
                  Create a will, add your benificiaries and automatically
                  transfer your alloted funds in case of invincible incidents
                  like death
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-indigo-500 bg-indigo-100 rounded-xl dark:text-white dark:bg-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize ">
                  Claim Will
                </h1>

                <p className="text-gray-500 ">
                  Claim a will created by your parents/grandparents after they
                  get devoided of life.
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-indigo-500 bg-indigo-100 rounded-xl dark:text-white dark:bg-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize ">
                  Take Easy Loans
                </h1>

                <p className="text-gray-500 ">
                  Take easy loans on your assets with minimal interest rate for
                  long term.
                </p>
              </div>

              <div className="space-y-3">
                <span className="inline-block p-3 text-indigo-500 bg-indigo-100 rounded-xl dark:text-white dark:bg-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>

                <h1 className="text-2xl font-semibold text-gray-700 capitalize ">
                  Stake & Earn
                </h1>

                <p className="text-gray-500 ">
                  Stake your valuable NFTs and get high APY depending on the
                  rarity of your nft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
