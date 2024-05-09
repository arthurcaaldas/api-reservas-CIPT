import mongoose from "../../database";

const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  fullName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  document: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true
  },
  amountOfPeople: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  reservationStartDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  reservationEndDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: null
  }
}, { timestamps: { createdAt: 'createdAt' }});

const Reservations = mongoose.model('Reservations', Schema);

export default Reservations;