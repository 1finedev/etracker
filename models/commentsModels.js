const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [true, "comment cannot be empty"],
    },
    likes: {
      type: Number,
      min: 0,
    },
    dislikes: {
      type: Number,
      min: 0,
    },

    // parent referencing
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name photo",
  });
  next();
});

const Comments =
  mongoose.models.CommentSchema || mongoose.model("Comments", CommentSchema);

module.exports = Comments;
