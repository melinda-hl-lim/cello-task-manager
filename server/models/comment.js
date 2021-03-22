const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  cardId: { type: Schema.Types.ObjectId,
            required: [true, 'The card id is required'],
            ref: 'Card' 
          },
  text: {
    type: String,
    required: [true, 'The comment text is required']
  }
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;