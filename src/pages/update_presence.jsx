import React from "react";

const update_presence = () => {
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
      <div className="flex flex-col text-center justify-center">
        <h1 className="text-2xl">Important Action</h1>
        <p className="mt-3">
          Update your presence once in every 60 days to keep your funds locked
          in your will, your benificiaries will be able to claim the will
          amounts alloted to them if you miss this action
        </p>
      </div>
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Account settings
      </h2>

      <form>
        <div className="flex flex-col justify-center mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Update Presence
          </button>
          <p className="text-center">*Under Maintenance*</p>
        </div>
      </form>
    </section>
  );
};

export default update_presence;
