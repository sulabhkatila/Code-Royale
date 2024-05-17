const User = require("../models/userModel");
const Friends = require("../models/friendsModel");
const nodemailer = require("nodemailer");

// Send friend request
const sendFriendRequest = async (req, res) => {
  const user = req.user;
  const receiverUsername = req.body.profileUsername;
  const receiver = await User.findOne({ username: receiverUsername });

  if (!user || !receiver) {
    return res.status(403).json({ message: "User does not exist" });
  }

  let [userFriends, receiverFriends] = await Promise.all([
    Friends.findOne({ user: user._id }),
    Friends.findOne({ user: receiver._id }),
  ]);

  if (userFriends.friends.includes(receiver._id)) {
    return res.status(403).json({ message: "You are already friends" });
  }

  if (receiverFriends.friendRequestsIn.includes(user._id)) {
    return res.status(403).json({ message: "Friend request already sent" });
  }

  receiverFriends.friendRequestsIn.push(user._id);
  userFriends.friendRequestsOut.push(receiver._id);

  await Promise.all([userFriends.save(), receiverFriends.save()]);

  return res.status(200).json({ message: "Friend request sent" });
};

// Cancel friend request
const cancelFriendRequest = async (req, res) => {
  const user = req.user;
  const receiverUsername = req.body.profileUsername;

  try {
    const receiver = await User.findOne({ username: receiverUsername });

    if (!user || !receiver) {
      return res.status(403).json({ message: "User does not exist" });
    }

    const [userFriends, receiverFriends] = await Promise.all([
      Friends.findOne({ user: user._id }),
      Friends.findOne({ user: receiver._id }),
    ]);

    if (!userFriends.friendRequestsOut.includes(receiver._id)) {
      return res.status(403).json({ message: "No friend request found" });
    }

    const userIndex = userFriends.friendRequestsOut.indexOf(receiver._id);
    userFriends.friendRequestsOut.splice(userIndex, 1);
    const receiverIndex = receiverFriends.friendRequestsIn.indexOf(user._id);
    receiverFriends.friendRequestsIn.splice(receiverIndex, 1);

    await Promise.all([userFriends.save(), receiverFriends.save()]);

    return res.status(200).json({ message: "Friend request cancelled" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Accept friend request
const acceptFriendRequest = async (req, res) => {
  const user = req.user;
  const senderUsername = req.body.profileUsername;

  try {
    const sender = await User.findOne({ username: senderUsername });

    if (!user || !sender) {
      return res.status(403).json({ message: "User does not exist" });
    }

    const [userFriends, senderFriends] = await Promise.all([
      Friends.findOne({ user: user._id }),
      Friends.findOne({ user: sender._id }),
    ]);

    if (userFriends.friends.includes(sender._id)) {
      return res.status(403).json({ message: "You are already friends" });
    }

    if (!userFriends.friendRequestsIn.includes(sender._id)) {
      return res.status(403).json({ message: "No friend request found" });
    }

    userFriends.friends.push(sender._id);
    senderFriends.friends.push(user._id);

    const senderIndex = userFriends.friendRequestsIn.indexOf(sender._id);
    userFriends.friendRequestsIn.splice(senderIndex, 1);
    const userIndex = senderFriends.friendRequestsOut.indexOf(user._id);
    senderFriends.friendRequestsOut.splice(userIndex, 1);

    await Promise.all([userFriends.save(), senderFriends.save()]);

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Reject friend request
const rejectFriendRequest = async (req, res) => {
  const user = req.user;
  const senderUsername = req.body.profileUsername;

  try {
    const sender = await User.findOne({ username: senderUsername });

    if (!user || !sender) {
      return res.status(403).json({ message: "User does not exist" });
    }

    const [userFriends, senderFriends] = await Promise.all([
      Friends.findOne({ user: user._id }),
      Friends.findOne({ user: sender._id }),
    ]);

    if (!userFriends.friendRequestsIn.includes(sender._id)) {
      return res.status(403).json({ message: "No friend request found" });
    }

    // remove from the list
    const userIndex = userFriends.friendRequestsIn.indexOf(sender._id);
    userFriends.friendRequestsIn.splice(userIndex, 1);
    const senderIndex = senderFriends.friendRequestsOut.indexOf(user._id);
    senderFriends.friendRequestsOut.splice(senderIndex, 1);

    await Promise.all([userFriends.save(), senderFriends.save()]);
    return res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete friend
const deleteFriend = async (req, res) => {
  const user = req.user;
  const friendUsername = req.body.profileUsername;
  const friend_ = await User.findOne({ username: friendUsername });
  const friend = await User.findOne({ _id: friend_._id });

  if (!user || !friend) {
    return res.status(403).json({ message: "User does not exist" });
  }

  const [userFriends, friendFriends] = await Promise.all([
    Friends.findOne({ user: user._id }),
    Friends.findOne({ user: friend._id }),
  ]);

  if (!userFriends.friends.includes(friend._id)) {
    return res.status(403).json({ message: "You are not friends" });
  }

  const userIndex = userFriends.friends.indexOf(friend._id);
  userFriends.friends.splice(userIndex, 1);

  const friendIndex = friendFriends.friends.indexOf(user._id);
  friendFriends.friends.splice(friendIndex, 1);

  await Promise.all([userFriends.save(), friendFriends.save()]);

  return res.status(200).json({ message: "Friend deleted" });
};

// Invite a user to join CodeRoyale
const inviteFriendEmail = async (req, res) => {
  // Function to send an email
  const sendEmail = (receiver, subject, message) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: receiver,
      subject: subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  const userId = req.user;
  const { email } = req.body;

  const [user, receiverUser] = await Promise.all([
    User.findOne({ _id: userId._id }),
    User.findOne({ email }),
  ]);
  if (receiverUser) {
    return res.status(403).json({ message: "User already exists" });
  }

  const subject = `${user.name ? user.name : user.email} has invited you`;
  const message = `
        <h1>CodeRoyale Time!!</h1>
        <p>Click the link below and join ${
          user.name ? user.name : user.email
        } on CodeRoyale</p>
        <a href="${process.env.CODE_ROYALE_URL}">Join me</a>
    `;

  sendEmail(email, subject, message);
};

// Show all friends
const showAllFriends = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  const userFriends = await Friends.findOne({ user: user._id }).populate(
    "friends"
  );

  return res.status(200).json({ friends: userFriends.friends });
};

// Show all friend requests
const showAllRequests = async (req, res) => {
  const user = req.user;
  const userFriends = await Friends.findOne({ user: user._id }).populate(
    "friendRequestsIn"
  );

  return res.status(200).json({ friendRequests: userFriends.friendRequestsIn });
};

module.exports = {
  inviteFriendEmail,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  showAllFriends,
  showAllRequests,
};
