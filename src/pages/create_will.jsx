import { ethers } from "ethers";
import { parseBytes32String } from "ethers/lib/utils";
import React, { useState } from "react";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Create_will = ({ provider }) => {
  const [benefecaries, setBenefecaries] = useState([
    { address: "", amount: "" },
  ]);

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleBeneficaries = (index, e) => {
    const values = [...benefecaries];
    values[index][e.target.name] = e.target.value;

    setBenefecaries(values);
  };
  const handleAddFileds = () => {
    setBenefecaries([...benefecaries, { address: "", amount: "" }]);
  };
  const handleRemoveFileds = (index) => {
    const values = [...benefecaries];
    values.splice(index, 1);
    setBenefecaries(values);
  };

  const handleOnChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let total_amount = 0;
    let amount_in_ethers = [];

    for (let i = 0; i < benefecaries.length; i++) {
      total_amount = total_amount + parseFloat(benefecaries[i].amount);
      amount_in_ethers.push(
        ethers.utils.parseEther(benefecaries[i].amount.toString())
      );
    }
    let finalAmount = total_amount.toString();

    let benefacries_address = benefecaries.map((e) => e.address);
    const txn = await provider.create_will(
      amount_in_ethers,
      benefacries_address,
      data.title,
      data.description,
      {
        value: ethers.utils.parseEther(finalAmount),
      }
    );
    // console.log(txn);
    window.location.replace("/action_will");

    // const all_wills = await provider.get_wills_by_beneficiary();
    // console.log(all_wills);
  };
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
      <div className="flex text-center justify-center">
        <h1 className="text-2xl">Create Will</h1>
      </div>
      <h2 className="text-lg font-semibold text-black capitalize dark:text-white">
        Account settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-black-200" for="username">
              Name
            </label>
            <input
              name="title"
              onChange={handleOnChange}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Will Name"
              required
            />
          </div>
          <dv>
            <label className="text-black-200" for="description">
              Description
            </label>
            <input
              name="description"
              id="description"
              onChange={handleOnChange}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Will Description"
              required
            />
          </dv>

          <div className="relative mt-5">
            <span className="absolute top-[-20px] font-bold">
              Add Beneficiaries -
            </span>

            <div className=" items-center justify-between w-full">
              {benefecaries.map((inputField, index) => {
                return (
                  <div className="flex " key={index}>
                    <input
                      value={inputField.address}
                      onChange={(e) => handleBeneficaries(index, e)}
                      id="walletAddress"
                      name="address"
                      type="name"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring mr-5"
                      placeholder="Wallet/ENS Address"
                      required
                    />
                    <input
                      value={inputField.amount}
                      onChange={(e) => handleBeneficaries(index, e)}
                      id="walletAddress"
                      name="amount"
                      type="number"
                      step="any"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-200 rounded-md dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring mr-3"
                      placeholder="Amount To Allot"
                      required
                    />
                    <IoMdRemoveCircle
                      onClick={() => handleRemoveFileds(index)}
                      className="h-14 w-14"
                    />
                    <IoMdAddCircle
                      onClick={handleAddFileds}
                      className="h-14 w-14"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create_will;
