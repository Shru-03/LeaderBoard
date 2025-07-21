import "./App.css";
import AddUser from "./components/AddUser";
import ClaimHistory from "./components/ClaimHistory";
import Leaderboard from "./components/LeaderBoard";
import SelectUserCard from "./components/SelectUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constant";
import { ToastContainer } from "react-fox-toast";
import { Navbar } from "./components/Navbar";

function App() {
  const [users, setUsers] = useState([]);
  const [showCoins, setShowCoins] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const res = await axios.get(`${BASE_URL}/api/leaderboard`);
      setUsers(res.data);
    } catch (error) {
      console.log("Leaderboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-950 min-h-screen py-3"
          : "bg-[url(/bg.png)] bg-cover bg-center min-h-screen py-3"
      }
    >
      <ToastContainer
        position={"top-center"}
        toastTypeTheming={{
          success: {
            style: {
              backgroundColor: "green",
              color: "#ffffffff",
            },
            className: "bg-green-10",
            icon: "🦊",
          },
          warning: {
            style: {
              backgroundColor: "#f4dd75ff",
              color: "#000000ff",
            },
            className: "warn-toast-class",
            icon: "🦊",
          },
          error: {
            style: {
              backgroundColor: "#921414ff",
              color: "#ffffffff",
            },
            className: "error-toast-class",
            icon: "🦊",
          },
          info: {
            style: {
              backgroundColor: "white",
              color: "#000000ff",
            },
            className: "info-toast-class",
            icon: "🦊",
          },
          custom: {
            style: {
              backgroundColor: "yellow",
              color: "#6B7280",
            },
            className: "custom-toast-class",
            icon: "🦊",
          },
        }}
      />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="py-4 py-4 px-4 sm:px-10 lg:px-30 w-full flex flex-col justify-center items-center gap-15">
        <section className="w-full flex flex-wrap md:flex-nowrap gap-4">
          <AddUser darkMode={darkMode} fetchLeaderboard={fetchLeaderboard} />
          <SelectUserCard
            darkMode={darkMode}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setShowCoins={setShowCoins}
            users={users}
            fetchLeaderboard={fetchLeaderboard}
          />
          <ClaimHistory darkMode={darkMode} selectedUser={selectedUser} />
        </section>
        <section className="w-full flex flex-col items-center ">
          {/*<img className="absolute top-12 h-[250px] w-[250px]" src="/t3.png" />*/}
          <div className=" w-full ">
            <Leaderboard darkMode={darkMode} users={users} loading={loading} />
          </div>
        </section>
      </div>
      {showCoins && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src="/point.png"
              alt="coin"
              className="falling-coin absolute w-6 h-6 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
