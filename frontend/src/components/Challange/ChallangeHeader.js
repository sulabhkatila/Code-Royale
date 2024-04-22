export default function ChallangeHeader() {

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching");
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
        <button className="flex items-center justify-center p-2 ml-2 text-white bg-blue-500 rounded-lg h-[50px] hover:bg-blue-700 transition-colors duration-200 px-3">
          <span className="mr-3 font-extrabold text-[40px]">+</span>
          <span className="">
            {" "}
            Create <br></br>Room
          </span>
        </button>
      </div>
    </div>
  );
}
