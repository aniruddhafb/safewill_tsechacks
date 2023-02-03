import Link from "next/link";
import React from "react";
import safeWillPng from "../../../public/images/Safewill.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image alt="" src={safeWillPng} height={60} width={60} />
            <span className="ml-3 text-xl">SafeWill</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Securly Manage Your Wills With SafeWill
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/create_will"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Create Will
                </Link>
              </li>
              <li>
                <Link
                  href="/action_will"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Claim Will
                </Link>
              </li>
              <li>
                <Link
                  href="/get_loan"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Get Loan
                </Link>
              </li>
              <li>
                <Link
                  href="/stake_earn"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Stake Assets
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms and conditions
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              Subscribe To Newsletter
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                {/* <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">Placeholder</label> */}
                <input
                  type="email"
                  id="footer-field"
                  placeholder="email"
                  name="footer-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              {/* <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Subscribe
              </button> */}
            </div>
            <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
              Get regular updates
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 SafeWill
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
