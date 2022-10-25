const mongoose = require("mongoose");
const slugify = require("slugify");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A post must have a title"],
      unique: true,
      maxlength: [
        40,
        "A post title must have less than or equal to 40 characters",
      ],
      minlength: [
        3,
        "A post title must have more than or equal to 3 characters",
      ],
    },
    slug: String,
    content: {
      type: String,
      trim: true,
      required: [true, "A post must have content"],
    },
    upvotes: {
      type: Number,
      min: 0,
    },
    downvotes: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "downVoted", "flagged", "deleted"],
        message: "status is either ACTIVE, DOWNVOTED, FLAGGED or DELETED",
      },
    },
    tags: [String],
    lng: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    sponsored: {
      type: Boolean,
      default: false,
    },

    // creator of post --> parent referencing..
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

PostSchema.index({ slug: 1 });

// creating a virtual field for the comments..
PostSchema.virtual("comments", {
  ref: "Comments",
  foreignField: "post",
  localField: "_id",
});

// slugify the post title
PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name photo",
  });
  next();
});

const Post = mongoose.models.PostSchema || mongoose.model("Post", PostSchema);

module.exports = Post;
