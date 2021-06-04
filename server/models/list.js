const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: { type: Schema.Types.ObjectId,
            required: [true, 'The board id is required'],
            ref: 'Board' 
          },
  position: Number,
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
}, {
  timestamps: true,
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  }
})

const List = mongoose.model('List', ListSchema);

module.exports = List;