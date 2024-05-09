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
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: null
  },
}, { timestamps: { createdAt: 'createdAt' }});

const Rooms = mongoose.model('Rooms', Schema);

export default Rooms;