import { useAuthContext } from "../hooks/useAuthContext";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";
import { Link } from "react-router-dom";

export default function ChallangeForm() {
  const { user } = useAuthContext();
  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = { data: [{ name: "name1" }], error: false, loading: false }; //useGet("/api/friends");

  const sendInvitationToANewUser = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const {
      data: invitationData,
      loading: invitationLoading,
      error: invitationError,
    } = { data: "invitationData", error: false, loading: false }; //usePost("/api/invite", { email });

    console.log(invitationData);
  };

  return (
    <div className="w-full h-[320px] mx-6 mt-7 font-mono border rounded-2xl shadow-xl bg-slate-800 text-white border-slate-400 backdrop-filter backdrop-blur-md bg-opacity-70">
      <h3 className="justify-center font-blod h-[60px] flex items-center">
        Friends
      </h3>
      {/* sticky */}
      <div className="h-[220px] overflow-x-hidden overflow-y-auto">
        {friendsData ? (
          <>
            {friendsData.map((friend, index) => (
              <Link to="" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-lg font-bold">{friend.name}</div>
                    <div className="text-sm">Online</div>
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
      <form
        className="h-[20px] px-3 flex flex-row items-center justify-center"
        onSubmit={sendInvitationToANewUser}
      >
        Invite a friend:
        <input
          type="email"
          placeholder="friend@email.com"
          className="p-1 ml-2 overflow-x-auto bg-gray-600 rounded-md"
        />
      </form>{" "}
    </div>
  );
}
