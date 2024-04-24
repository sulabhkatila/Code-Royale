import { Link } from "react-router-dom";

export default function ChallengeBody() {
  let friendsData = [];
  for (let i = 0; i < 10; i++) {
    friendsData.push({ name: `name${i}` });
  }

  // const {
  //     data: friendsData,
  //     loading: friendsLoading,
  //     error: friendsError,
  //   } = { data: [{ name: "name1" }, {name: "name2"}], error: false, loading: false }; //useGet("/api/friends");

  const getClassNamesForIndex = (index) => {
    if (index % 2 === 0) {
      return "bg-dark-1";
    } else {
      return "bg-dark-2";
    }
  };

  const isUserOnline = (user) => {
    // Add logic to determine if the user is online
    return;
  };

  return (
    <div className="">
      <div className="">
        {friendsData ? (
          <>
            {friendsData.map((friend, index) => (
              <Link
                to=""
                key={index}
                className={`flex items-center justify-between p-4 ${getClassNamesForIndex(
                  index
                )}`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-lg font-bold">{friend.name}</div>
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <button className="flex items-center justify-center p-2 px-3 border rounded-lg">
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
