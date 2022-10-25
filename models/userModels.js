const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a user must have a user name"],
      minlength: 4,
    },

    email: {
      type: String,
      required: [true, "a user must have an email address"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "email address must be valid",
      },
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
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
