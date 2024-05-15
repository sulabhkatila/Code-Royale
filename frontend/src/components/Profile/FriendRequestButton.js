export default function FriendRequestButton({ user, profileUser, task }) {
  // task = 0: send friend request url-> add
  // task = 1: cancel friend request (that was sent) url-> cancel
  // task = 2: accept friend request url -> accept
  // task = 3: reject friend request (that was received) url -> reject
  // task = 4: remove friend (that was accepted) url -> delete

  const handleFriendRequest = async () => {
    let method;
    let url = `/api/friend/`;

    if (task === 1 || task === 4) {
      method = "DELETE";
    } else {
      method = "POST";
    }

    switch (task) {
      case 0:
        url += "add";
        break;
      case 1:
        url += "cancel";
        break;
      case 2:
        url += "accept";
        break;
      case 3:
        url += "reject";
        break;
      case 4:
        url += "delete";
        break;
      default:
        throw new Error("Invalid task: Task can only be 0, 1, 2, 3, or 4");
    }

    const bodyData = {
      profileUsername: profileUser.username,
    };

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      if (!res.ok) {
        console.log(await res.json())
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
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
        ? "Acceept Invitation"
        : task === 3
        ? "Reject Invitation"
        : "Remove Friend"}{" "}
    </button>
  );
}
