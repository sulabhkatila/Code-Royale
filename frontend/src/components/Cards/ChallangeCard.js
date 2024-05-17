import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGet } from "../../hooks/useGet";

export default function ChallangeCard() {
  const { user } = useAuthContext();
  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = useGet("/api/friend/all/" + user.username, false);

  const urlforsendingInvitation = "/api/friend/invite";

  const sendInvitationToANewUser = (e) => {
    e.preventDefault();

    console.log(e.target[0].value);
    const email = e.target[0].value;
    const authorization = user ? user.token : null;

    const fetchData = async () => {
      try {
        const res = await fetch(urlforsendingInvitation, {
          method: "POST",
          headers: {
            ...(authorization && {
              Authorization: `Bearer ${authorization}`,
            }),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          return;
        }

        const json = await res.json();
        console.log("the email was sent ", json);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  };

  return (
    <div className="max-w-full h-[320px] mx-6 mt-7 font-mono border rounded-2xl shadow-xl bg-slate-800 text-white border-slate-400 backdrop-filter backdrop-blur-md bg-opacity-70">
      <h3 className="justify-center font-blod h-[60px] flex items-center">
        Friends
      </h3>
      {/* sticky */}
      <div className="h-[220px] overflow-x-hidden overflow-y-auto">
        {friendsData && friendsData.friends.length > 0 ? (
          <>
            {friendsData.friends.map((friend, index) => (
              <Link
                to=""
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                  <div className="ml-4">
                    <div className="text-lg font-bold">{friend.username}</div>
                    <div className="text-sm">Online?</div>
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
        ) : friendsData ? (
          <div className="flex items-center justify-center h-full text-white"></div>
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
