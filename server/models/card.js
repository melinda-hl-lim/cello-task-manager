const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: String,
  labels: [String],
  listId: { type: Schema.Types.ObjectId,
            required: [true, 'The list id is required'],
            ref: 'List' 
          },
  position: Number,
  archived: Boolean,
  dueDate: Date,
  completed: Boolean,
  boardId: { type: Schema.Types.ObjectId,
            required: [true, 'The board id is required'],
            ref: 'Board' 
          },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }]
}, {timestamps: true})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;