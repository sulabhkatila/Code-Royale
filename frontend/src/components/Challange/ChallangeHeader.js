import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChallangeHeader() {
  const [createRoom, setCreateRoom] = useState(false);
  const [showPasswordForCreateRoom, setShowPasswordForCreateRoom] =
    useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching");
  };

  const toggleCreateRoom = () => {
    setCreateRoom(!createRoom);
  };

  return (
    <div className="flex justify-between w-full border-b border-gray-300">
      <form onSubmit={handleSearch} className="flex items-center w-full p-3">
        <input
          placeholder="Enter room id"
          className={`p-1 overflow-x-auto bg-gray-600 rounded-xl w-full h-[50px] px-7 mr-7`}
        />
      </form>
      <div className="p-3">
        <button
          onClick={toggleCreateRoom}
          className="flex items-center justify-center p-2 ml-2 text-white bg-blue-500 rounded-lg h-[50px] hover:bg-blue-700 transition-colors duration-200 px-3"
        >
          <span className="mr-3 font-extrabold text-[40px]">+</span>
          <span className="">
            {" "}
            Create <br></br>Room
          </span>
        </button>
      </div>
      {createRoom && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-60">
          <div className="relative border-2 rounded-3xl h-[60vh] w-[80vw] bg-dark-2">
            <button
              onClick={toggleCreateRoom}
              className="absolute top-5 right-5 flex items-center justify-center p-2 text-white bg-red-500 rounded-lg h-[50px] hover:bg-red-700 transition-colors duration-200 px-3"
            >
              <span className="mr-3 font-extrabold text-[40px]">-</span>
              <span className=""> Close</span>
            </button>
            <div className="flex items-center justify-between w-full h-full p-3">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-between w-full h-full p-3">
                  <div className="flex items-center mb-4">
                    <label htmlFor="roomId" className="ml-[5vw] w-[15vw]">
                      Room Id:
                    </label>
                    <input
                      id="roomId"
                      className="ml-4 px-5 h-[40px] bg-gray-600 rounded-lg w-[40vw]"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="password" className="ml-[5vw] w-[15vw]">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPasswordForCreateRoom ? "text" : "password"}
                        className="ml-4 px-5 h-[40px] bg-gray-600 rounded-lg w-[40vw]"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordForCreateRoom(!showPasswordForCreateRoom)}
                        className="absolute text-lg transform -translate-y-1/2 right-2 top-1/2"
                      >
                        {showPasswordForCreateRoom ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={``}
              className="absolute bottom-5 right-5 flex items-center justify-center p-2 text-white bg-blue-500 rounded-lg h-[50px] hover:bg-blue-700 transition-colors duration-200 px-3"
            >
              <span className=""> Create Room</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
