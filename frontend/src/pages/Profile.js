import { useParams } from "react-router-dom";
import Profileinfo from "../components/Profile/Profileinfo";
import Profilepic from "../components/Profile/Profilepic";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGet } from "../hooks/useGet";

export default function Profile() {
  const { username } = useParams();
  const user = useAuthContext();

  // fetch the user whose profile is being looked from the backend
  // while fetching the user, also send information on which user is making the request
  const { data, loading, error } = useGet(`/api/user/${username}`, false);

  return (
    <div className="w-screen h-screen text-white bg-dark-1">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <Profilepic />
        <div className="w-full h-full overflow-auto">
          {data ? (<Profileinfo profileUser={data} />) : (<>loading ...</>)}
        </div>
        <div>
            {user.user ? (user.user.username === username ? (
                <button> Edit Profile </button>
            ) : (
                <button> Follow </button>
            )) : null}
        </div>
      </div>
    </div>
  );
}
