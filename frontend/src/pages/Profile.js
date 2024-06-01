import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FriendRequestButton from "../components/Profile/FriendRequestButton";
import Profileinfo from "../components/Profile/Profileinfo";
import Profilepic from "../components/Profile/Profilepic";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGet } from "../hooks/useGet";

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
            {user && user.username === username ? (
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
                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                  Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
