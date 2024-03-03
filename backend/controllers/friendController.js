const User = require("../models/userModel");
const Friends = require("../models/friendsModel");
const nodemailer = require("nodemailer");

// Send frined request
const sendFriendRequest = async (req, res) => {
  const { userId } = req.user;
  const { receiverEmail } = req.body;
  const [user, receiver] = await Promise.all([
    User.findOne({ _id: userId }),
    User.findOne({ email: receiverEmail }),
  ]);

  if (!user || !receiver) {
    return res.status(403).json({ message: "User does not exist" });
  }

  const [userFriends, receiverFriends] = await Promise.all([
    Friends.findOne({ user: user._id }),
    Friends.findOne({ user: receiver._id }),
  ]);

  if (userFriends.friends.includes(receiver._id)) {
    return res.status(403).json({ message: "You are already friends" });
  }

  if (receiverFriends.friendRequestsIn.includes(receiver._id)) {
    return res.status(403).json({ message: "Friend request already sent" });
  }

  receiverFriends.friendRequestsIn.push(receiver._id);
  userFriends.friendRequestsOut.push(user._id);

  await Promise.all([userFriends.save(), receiverFriends.save()]);

  return res.status(200).json({ message: "Friend request sent" });
};

// Accept friend request
const acceptFriendRequest = async (req, res) => {
  const { userId } = req.user;
  const { senderId } = req.body;
  const [user, sender] = await Promise.all([
    User.findOne({ _id: userId }),
    User.findOne({ _id: senderId }),
  ]);

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
  userFriends.friendRequestsIn = userFriends.friendRequestsIn.filter(
    (friend) => friend !== sender._id
  );
  senderFriends.friendRequestsOut = senderFriends.friendRequestsOut.filter(
    (friend) => friend !== user._id
  );

  await Promise.all([userFriends.save(), senderFriends.save()]);

  return res.status(200).json({ message: "Friend request accepted" });
};

// Delete friend
const deleteFriend = async (req, res) => {
  const { userId } = req.user;
  const { friendId } = req.body;
  const [user, friend] = await Promise.all([
    User.findOne({ _id: userId }),
    User.findOne({ _id: friendId }),
  ]);

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

  userFriends.friends = userFriends.friends.filter(
    (friend) => friend !== friend._id
  );
  friendFriends.friends = friendFriends.friends.filter(
    (friend) => friend !== user._id
  );

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

  const { userId } = req.user;
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

module.exports = {
  inviteFriendEmail,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriend,
};
