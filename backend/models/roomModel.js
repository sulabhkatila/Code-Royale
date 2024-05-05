const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v);
        },
        message: (props) => `${props.value} cannot contain spaces`,
      },
    },
    admin: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    users: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    messages: {
      type: [
        {
          user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
          message: { type: String, required: true },
          timestamp: { type: Date, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);