import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant";

export default function ClaimHistory({ selectedUser, darkMode }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    if (!selectedUser?._id) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/api/history/${selectedUser._id}`
      );
      setHistory(res.data);
    } catch (error) {
      console.log("fetch failed:", error);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [selectedUser]);

  return (
    <div
      className={`${
        darkMode ? "bg-[#1B1A1D] text-white" : "bg-white text-black"
      } p-6 rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300 w-full`}
    >
      <h2 className=" text-left text-lg font-semibold mb-2">Claim History</h2>
      {!selectedUser ? (
        <div>
          <p className="text-gray-500 text-left text-sm mb-1">
            Select a user to view history.
          </p>
          <img
            className="h-[150px] w-[150px]"
            src="/nodata.png"
            alt="no data"
          />
        </div>
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-sm">No claim history found.</p>
      ) : (
        <ul className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
          {history?.map((entry) => (
            <li
              key={entry._id}
              className="flex justify-between items-center bg-[#dbf3fa] px-4 py-3 rounded-md"
            >
              <div className="text-black font-medium">{selectedUser.name}</div>

              <div className="flex items-center gap-2 text-blue-800 font-semibold">
                +{entry.pointsClaimed}
                <img className="h-[20px]" src="/point.png" />
              </div>

              <div className="text-right text-sm text-gray-500">
                <div>
                  {new Date(entry.claimedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs">
                  {new Date(entry.claimedAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
