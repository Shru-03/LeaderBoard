import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LeaderBoardSkeleton() {
  return (
    <div className="w-full  p-4 rounded-md space-y-4">
      <div className="border-t-4 border-gray-300 flex flex-col items-center rounded-t-lg p-3 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)] h-40 w-full animate-pulse">
        <div className="mt-[-50px]">
          <div className="h-[100px] w-[100px] bg-gray-200 rounded-full" />
        </div>

        <div className="mt-2 h-4 w-24 bg-gray-300 rounded mb-3"></div>

        <div className="flex items-center gap-2 bg-[#FEF2D7] py-1 px-5 rounded-2xl">
          <div className="h-[20px] w-[20px] bg-gray-300 rounded-full" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>
      </div>
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white flex justify-between items-center p-4 rounded-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 bg-gray-300 rounded-full" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
}
