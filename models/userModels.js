const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "a user must have a username"],
      minlength: 4,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "a user must have a pasword"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "a user must confirm password"],
      validate: {
        validator: function (currEl) {
          return currEl === this.password;
        },
        message: "passwords are not equal",
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

// creating a virtual field for all posts for a particular user...
UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
});

UserSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.models.UserSchema || mongoose.model("User", UserSchema);

module.exports = User;
