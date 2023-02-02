import React from "react";

const edit_profile = () => {
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
      <div className="flex text-center justify-center">
        <h1 className="text-2xl">Edit Profile</h1>
      </div>
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Account settings
      </h2>

      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-black-200" for="username">
              Full Name
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-black-200" for="password">
              Profile Photo
            </label>
            <input
              id="password"
              type="file"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white rounded-md  dark:text-gray-300 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-black-200" for="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-black-200" for="passwordConfirmation">
              Country
            </label>
            <input
              id="passwordConfirmation"
              type="name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default edit_profile;
