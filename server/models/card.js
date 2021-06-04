const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "The Card title is required"],
    },
    description: String,
    labels: [String],
    listId: {
      type: Schema.Types.ObjectId,
      required: [true, "The list id is required"],
      ref: "List",
    },
    position: Number,
    archived: Boolean,
    dueDate: Date,
    completed: Boolean,
    boardId: {
      type: Schema.Types.ObjectId,
      required: [true, "The board id is required"],
      ref: "Board",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    actions: [{ type: Schema.Types.ObjectId, ref: "Action" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

CardSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
