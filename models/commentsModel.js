const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
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

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name photo",
  });
  next();
});

const Comments =
  mongoose.models.commentSchema || mongoose.model("Comments", commentSchema);

module.exports = Comments;
