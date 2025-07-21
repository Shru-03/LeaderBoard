import { useEffect, useMemo, useState } from "react";
import LeaderBoardSkeleton from "./LeaderBoardSkeleton";
import { BASE_URL } from "../constant";
import { IoIosArrowForward } from "react-icons/io";

export default function Leaderboard({ users, loading, darkMode }) {
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const topUsers = users.slice(0, 3);
  const otherUsers = users.slice(3);

  const paginatedUsers = useMemo(() => {
    return otherUsers.slice((page - 1) * pageSize, page * pageSize);
  }, [otherUsers, page]);

  const totalPages = Math.ceil(otherUsers.length / pageSize);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className=" w-full ">
      {loading ? (
        <LeaderBoardSkeleton />
      ) : (
        <div>
          <div className="flex justify-center   items-end mb-[-10px] gap-1 sm:gap-2">
            {topUsers.map((user, index) => {
              const isRank1 = index === 0;
              const rank = index + 1;
              const borderColor =
                rank === 1
                  ? "border-yellow-400  bg-gradient-to-br from-[#FFF7D1] to-[#FFE794]"
                  : rank === 2
                  ? "border-gray-400 bg-gradient-to-br from-[#F2F4F6] to-[#DDE3E9]"
                  : "border-orange-800 bg-gradient-to-br from-[#FFE2C0] to-[#E6B88C]";

              return (
                <div
                  key={user._id || index}
                  className={` border-t-6 ${borderColor} flex flex-col items-center rounded-t-2xl p-3  shadow-[0_-2px_6px_rgba(0,0,0,0.1)] ${
                    isRank1 ? "h-68 md:h-58" : "h-64 md:h-50"
                  } w-full`}
                  style={{ order: isRank1 ? 2 : rank === 2 ? 1 : 3 }}
                >
                  <div className="mt-[-40px] sm:mt-[-70px]">
                    <img
                      className="h-[70px] sm:h-[150px]"
                      src={`/${rank}.png`}
                      alt={`Rank ${rank}`}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 ">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-col sm:flex-row items-center gap-3 ">
                        <div className="border border-black h-[50px] w-[50px] rounded-full">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={
                              user?.image
                                ? `${BASE_URL}${user.image}`
                                : "/fallback.webp"
                            }
                            alt={user?.name}
                          />
                        </div>
                        <div
                          className={`text-center  font-medium  ${
                            isRank1 ? "text-lg" : "text-md"
                          }`}
                        >
                          {user.name}
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-2 text-yellow-600 bg-[#FEF2D7] py-0.5 px-5 rounded-2xl font-bold ${
                          isRank1 ? "text-lg px-8" : "text-sm py-1"
                        }`}
                      >
                        <img
                          className="h-[20px]"
                          src="/trophy.webp"
                          alt="trophy"
                        />
                        {user.totalPoints}
                      </div>
                    </div>
                    {rank === 1 ? (
                      <img
                        src="/winner.png"
                        className="h-[70px] md:h-[100px] md"
                      />
                    ) : (
                      <img
                        src="/runner.png"
                        className="h-[70px] md:h-[100px] "
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <ul
            className={`${
              darkMode ? "bg-[#1B1A1D] text-white" : "bg-white text-black"
            } space-y-4  p-4 shadow-lg rounded-md`}
          >
            {paginatedUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No more users found.</p>
            ) : (
              paginatedUsers?.map((user, index) => (
                <li
                  key={index}
                  className={`${
                    darkMode ? "bg-[#2f2f2f]" : "bg-[#dbf3fa]"
                  } flex justify-between items-center  px-6 py-3 rounded-md`}
                >
                  <div className="flex items-center gap-2 sm:gap-10">
                    <div className="text-lg font-bold text-gray-600">
                      {index + 4 + (page - 1) * pageSize}
                    </div>
                    <div className="border border-black h-[50px] w-[50px] rounded-full">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={
                          user?.image
                            ? `${BASE_URL}${user.image}`
                            : "/fallback.webp"
                        }
                        alt={user?.name}
                      />
                    </div>

                    <div
                      className={`${
                        darkMode ? "text-white" : "text-black"
                      } font-medium`}
                    >
                      {user.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                    {user.totalPoints}
                    <img className="h-[30px]" src="/trophy.webp" alt="trophy" />
                  </div>
                </li>
              ))
            )}
            <div className="flex justify-center mt-6 gap-2 items-center text-sm">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9  border text-sm font-medium transition-all duration-200 
          ${
            pageNum === page
              ? "bg--700 text-blue-700 border-blue-700"
              : "bg-white text-gray-500 border-gray-400 hover:bg-blue-50 hover:border-blue-300"
          }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`w-9 h-9 flex items-center justify-center border text-lg font-bold
      ${
        page === totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-700 text-white hover:bg-blue-600 active:scale-95"
      }`}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
