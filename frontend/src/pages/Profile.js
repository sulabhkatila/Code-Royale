import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  } = useGet(`/api/user/friendsandrequests/`, true);

  const [friends, setFriends] = useState([]);
  const [friendRequestsIn, setFriendRequestsIn] = useState([]);
  const [friendRequestsOut, setFriendRequestsOut] = useState([]);

  useEffect(() => {
    if (userwithfriends) {
      const existingFriends = userwithfriends.friends.friends;
      if (existingFriends) setFriends(existingFriends);
      if (userwithfriends.friendRequestsIn)
        setFriendRequestsIn(userwithfriends.friends.friendRequestsIn);
      if (userwithfriends.friendRequestsOut)
        setFriendRequestsOut(userwithfriends.friends.friendRequestsOut);
    }
  }, [userwithfriends]);

  return (
    <div className="w-screen h-screen text-white bg-dark-1">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <Profilepic />
        <div className="w-full h-full overflow-auto">
          {profileUser ? (
            <Profileinfo profileUser={profileUser} />
          ) : (
            <>loading ...</>
          )}
        </div>
        <div>
          {user && profileUser ? (
            user.username === username ? (
              <button> Edit Profile </button>
            ) : friends.includes(profileUser._id) ? (
              <button>Already Friends</button>
            ) : friendRequestsIn.includes(profileUser._id) ? (
              <FriendRequestButton
                user={user}
                profileUser={profileUser}
                task={2}
              />
            ) : friendRequestsOut.includes(profileUser._id) ? (
              <FriendRequestButton
                user={user}
                profileUser={profileUser}
                task={1}
              />
            ) : (
              <FriendRequestButton
                user={user}
                profileUser={profileUser}
                task={0}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
