import axios from "axios";
import { useState } from "react";
import { FaUpload, FaUserPlus } from "react-icons/fa";
import { BASE_URL } from "../constant";
import { Oval } from "react-loader-spinner";
import { toast } from "react-fox-toast";

export default function AddUser({ fetchLeaderboard, darkMode }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warning("Name is required");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
      await axios.post(`${BASE_URL}/api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User created!");
      await fetchLeaderboard();
      setName("");
      setImage("");
    } catch (error) {
      toast.error("Something went wrong! Try again");
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
      <h2 className="  text-left text-lg font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleAddUser} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="px-4 py-2 rounded-md   border border-gray-300 focus:outline-none "
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-start gap-2 cursor-pointer px-4 py-2 border border-gray-300 bg-transparent text-gray-400 rounded-md font-small w-full transition duration-200"
          >
            <FaUpload />
            Upload Image
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          {image && (
            <span className="text-sm text-gray-700 truncate">
              Selected: {image.name}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-3 bg-blue-800 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 active:scale-95 transition-all duration-200 text-white font-semibold py-2 w-full rounded-lg shadow-sm"
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
              Add <FaUserPlus />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
