// import SearchBar from "../components/SearchBar"
import { useState } from "react";
import NavBar from "../components/NavBar";
import Simplesearchbar from "../components/Simplesearchbar";
import { Link } from "react-router-dom";

export default function Rooms() {
  const [selected, setSelected] = useState("active-rooms");

  const handleClick = (id) => {
    setSelected(id);
  };

  const getActiveRooms = () => {
    return ["Room 1", "Room 2"];
  };

  const getRoomInvitations = () => {
    return ["Room 3", "Room 4"];
  };

  const getInNetworkRooms = () => {
    return ["Room 5", "Room 6"];    
};

  return (
    <div className="flex flex-col w-screen h-screen font-mono text-white bg-dark-1">
      <NavBar />
      <div className="w-full px-1 mt-5">
        <Simplesearchbar />
      </div>
      <div className="flex flex-grow">
        <div className="flex-col flex-grow border-4 rounded-2xl p-9 m-9">
          <div className="h-[50px] flex flex-row justify-between border-b border-gray-300">
            <div
              id="active-rooms"
              className={`w-3/4 text-center hover:text-blue-300 cursor-pointer ${
                selected === "active-rooms" ? "border-b-4 border-blue-300" : ""
              }`}
              onClick={() => handleClick("active-rooms")}
            >
              Active
            </div>
            <div
              id="room-invitations"
              className={`w-3/4 text-center hover:text-blue-300 cursor-pointer ${
                selected === "room-invitations"
                  ? "border-b-4 border-blue-300"
                  : ""
              }`}
              onClick={() => handleClick("room-invitations")}
            >
              Invites
            </div>
            <div
              id="in-network-rooms"
              className={`w-3/4 text-center hover:text-blue-300 cursor-pointer ${
                selected === "in-network-rooms"
                  ? "border-b-4 border-blue-300"
                  : ""
              }`}
              onClick={() => handleClick("in-network-rooms")}
            >
              In Network
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow overflow-auto">
            {selected === "active-rooms" ? (
              <div className="overflow-y-auto">
                {getActiveRooms().map((room, index) => (
                  <Link
                    key={index}
                    className="flex items-center justify-between p-4 bg-dark-1"
                    to={`/room/${room}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                      <div className="ml-4">
                        <div className="text-lg font-bold">{room}</div>
                        <div className="text-xs">Online</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : selected === "room-invitations" ? (
              <div className="overflow-y-auto">
                {getRoomInvitations().map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-dark-1"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                      <div className="ml-4">
                        <div className="text-lg font-bold">{room}</div>
                        <div className="text-xs">Online</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-y-auto">
                {getInNetworkRooms().map((room, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-dark-1"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                      <div className="ml-4">
                        <div className="text-lg font-bold">{room}</div>
                        <div className="text-xs">Online</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
