import axios from "axios";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { BASE_URL } from "../constant";
import { toast } from "react-fox-toast";
import { Oval } from "react-loader-spinner";

export default function SelectUserCard({
  setSelectedUser,
  selectedUser,
  users,
  fetchLeaderboard,
  setShowCoins,
  darkMode,
}) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClaim = async (id) => {
    if (!id) return toast.warning("Please select a user!");
    setLoading(true);
    console.log(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const res = await axios.post(`${BASE_URL}/api/claim`, {
        userId: id,
      });
      toast.success(`${res.data.pointsClaimed} Points claimed 🪙`);

      await fetchLeaderboard();
      setShowCoins(true);
      setTimeout(() => setShowCoins(false), 3000);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Error in Claiming points");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-[#1B1A1D] text-white" : "bg-white text-black"
      } p-6 rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300 w-full`}
    >
      <h2 className=" text-left text-lg font-semibold mb-4">Select User</h2>
      <p className="text-sm text-gray-500 text-left mb-4">
        Click on a user’s name to view his/her recent claim history details.
      </p>

      <div className="relative">
        <div
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setSearch("");
          }}
          className="flex items-center justify-between px-4 py-2 text-left bg-white text-black border border-gray-300 rounded-md cursor-pointer"
        >
          {selectedUser?.name || "Select User"}
          <IoIosArrowDown />
        </div>

        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-2xl rounded-xl">
            <div className="flex border-b-1 border-gray-300 items-center bg-white px-3 py-2 shadow-md">
              <CiSearch className="bg-white text-black mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white outline-none text-black placeholder-gray-400"
              />
            </div>

            <ul className="max-h-40 overflow-y-auto no-scrollbar">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setDropdownOpen(false);
                    }}
                    className="px-4 text-left bg-white  py-2 text-black hover:bg-[#C2ECFE]  cursor-pointer"
                  >
                    {user.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No users found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => handleClaim(selectedUser._id)}
        className={`mt-4 flex justify-center items-center gap-3 bg-blue-800 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 active:scale-95 transition-all duration-200 text-white font-semibold py-2 w-full rounded-lg shadow-sm ${
          selectedUser ? "animate-pulse" : ""
        }`}
      >
        {loading ? (
          <Oval
            height={20}
            width={20}
            color="#fff"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#3b82f6"
            strokeWidth={4}
            strokeWidthSecondary={3}
          />
        ) : (
          <>
            Claim Points <img className="h-[20px]" src="/point.png" />{" "}
          </>
        )}
      </button>
    </div>
  );
}
