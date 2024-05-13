export default function FriendRequestButton({ user, profileUser, task }) {
  // task = 0: send friend request
  // task = 1: cancel friend request (that was sent)
  // task = 2: accept friend request
  // task = 3: delete friend request (that was received)
  // task = 4: remove friend (that was accepted)

  const handleFriendRequest = async () => {
    let method;
    if (task === 0) {
      method = "POST";
    } else if (task === 1 || task === 3) {
      method = "DELETE";
    } else if (task === 2 || task === 4) {
      method = "PUT";
    } else {
      throw new Error("Invalid task: must be 0, 1, 2, 3, or 4");
    }

    try {
      const res = await fetch(`/api/friend/${profileUser.username}`, {
        method: method,
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleFriendRequest}>
      {" "}
      {task === 0
        ? "Send Request"
        : task === 1
        ? "Cancel Request"
        : task === 2
        ? "Reject Invitation"
        : "Remove Friend"}{" "}
    </button>
  );
}
