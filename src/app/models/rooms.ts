import mongoose from '../../database';

const Schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  number: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: null
  },
});

const Rooms = mongoose.model('Rooms', Schema);

export default Rooms;