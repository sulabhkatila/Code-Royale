const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    friends: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    friendRequestsIn: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    friendRequestsOut: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Friends", friendsSchema);