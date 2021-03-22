const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: String,
  cardId: { type: Schema.Types.ObjectId,
            required: [true, 'The card id is required'],
            ref: 'Card' 
          },
}, {timestamps: true})

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;