import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FriendRequestButton from "../components/Profile/FriendRequestButton";
import Profileinfo from "../components/Profile/Profileinfo";
import Profilepic from "../components/Profile/Profilepic";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGet } from "../hooks/useGet";
import { socket } from "../socket";
import { Link } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();
  const { user } = useAuthContext();

  // fetch the user whose profile is being looked from the backend
  // while fetching the user, also send information on which user is making the request
  const {
    data: profileUser,
    loading,
    error,
  } = useGet(`/api/user/${username}`, false);

  const {
    data: userwithfriends,
    loading: ufloading,
    error: uferror,
  } = useGet(`/api/user/friendsandrequests`, true);

  const [friends, setFriends] = useState([]);
  const [friendRequestsIn, setFriendRequestsIn] = useState([]);
  const [friendRequestsOut, setFriendRequestsOut] = useState([]);

  const [showSendFR, setShowSendFR] = useState(false);
  const [showCancelFR, setShowCancelFR] = useState(false);
  const [showAcceptReject, setShowAcceptReject] = useState(false);

  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    if (userwithfriends && userwithfriends.friends) {
      const { friends, friendRequestsIn, friendRequestsOut } =
        userwithfriends.friends;

      if (friends) setFriends(friends);
      if (friendRequestsIn) setFriendRequestsIn(friendRequestsIn);
      if (friendRequestsOut) setFriendRequestsOut(friendRequestsOut);

      if (user.username === username) {
        setShowSendFR(false);
        setShowCancelFR(false);
        setShowAcceptReject(false);
      } else if (friends.includes(profileUser._id)) {
        setShowSendFR(false);
        setShowCancelFR(false);
        setShowAcceptReject(false);
      } else if (friendRequestsOut.includes(profileUser._id)) {
        setShowSendFR(false);
        setShowCancelFR(true);
        setShowAcceptReject(false);
      } else if (friendRequestsIn.includes(profileUser._id)) {
        setShowSendFR(false);
        setShowCancelFR(false);
        setShowAcceptReject(true);
      } else {
        setShowSendFR(true);
        setShowCancelFR(false);
        setShowAcceptReject(false);
      }
    }
  }, [userwithfriends]);

  useEffect(() => {
    if (user) {
      socket.io.opts.query = {
        token: user.token,
        connectToUser: username,
      };
      socket.connect();
    }
  }, [user]);

  const acceptFR = () => {
    setShowAcceptReject(false);
  };
  const rejectFR = () => {
    setShowAcceptReject(false);
    setShowSendFR(true);
  };
  const removeFriend = () => {
    setShowSendFR(true);
  };
  const sendFR = () => {
    setShowSendFR(false);
    setShowCancelFR(true);
  };
  const cancelFR = () => {
    setShowCancelFR(false);
    setShowSendFR(true);
  };

  const toggleChatBox = (val) => {
    setShowChatBox(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    console.log("the message is",message);
    const to = username;
    console.log("the message is going to",to);
    socket.emit("sendMessage", { message, to });
    e.target[0].value = "";
  }
  
  return (
    <div className="w-screen h-screen font-mono text-white bg-dark-1">
      <div className="flex flex-col w-full h-full">
        <NavBar />

        <div className="flex flex-col items-center justify-between w-full h-full my-5">
          <Profilepic />
          <div className="w-full h-full overflow-auto">
            {profileUser ? (
              <Profileinfo profileUser={profileUser} />
            ) : error ? (
              <>Error {{ error }}</>
            ) : (
              <>loading ...</>
            )}
          </div>
          <div className="">
            {user ? (
              user.username === username ? (
                <>Edit Profile</>
              ) : showSendFR ? (
                <FriendRequestButton
                  user={user}
                  profileUser={profileUser}
                  task={0}
                  onClic={sendFR}
                />
              ) : showCancelFR ? (
                <FriendRequestButton
                  user={user}
                  profileUser={profileUser}
                  task={1}
                  onClic={cancelFR}
                />
              ) : showAcceptReject ? (
                <div className="flex flex-row justify-between w-[500px]">
                  <FriendRequestButton
                    user={user}
                    profileUser={profileUser}
                    task={2}
                    onClic={acceptFR}
                  />
                  <FriendRequestButton
                    user={user}
                    profileUser={profileUser}
                    task={3}
                    onClic={rejectFR}
                  />
                </div>
              ) : (
                <div className="flex flex-row justify-between w-[500px]">
                  <FriendRequestButton
                    user={user}
                    profileUser={profileUser}
                    task={4}
                    onClic={removeFriend}
                  />
                  <button
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => toggleChatBox(true)}
                  >
                    Message
                  </button>
                  {showChatBox && (
                    <div className="fixed m-4 bg-gray-500 rounded shadow-lg bottom-16 right-4 w-[600px] h-[600px]">
                      <div className="flex flex-col justify-between w-full h-full">
                        <nav className="flex justify-between w-full p-4 h-[30px]">
                          <div>Chat</div>
                          <button
                            className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-lg"
                            onClick={() => toggleChatBox(false)}
                          >
                            X
                          </button>
                        </nav>
                        <div className="flex flex-col overflow-y-auto"></div>
                        <form onSubmit={handleSubmit} className="flex p-1 felx-row">
                          <input
                            className="flex-grow p-2 mr-2 text-black bg-white rounded shadow"
                            type="text"
                            placeholder="Type a message..."
                          />
                          <button className="p-2 text-white bg-blue-500 rounded shadow">
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <Link to="/accounts/login" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
