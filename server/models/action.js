const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: String,
  cardId: { type: Schema.Types.ObjectId,
            required: [true, 'The card id is required'],
            ref: 'Card' 
          },
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

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;