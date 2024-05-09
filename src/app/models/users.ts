import mongoose from '../../database';

const Schema = new mongoose.Schema({
  fullName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  phoneNumber: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    select: false
  },
  lastLoginAt: {
    type: mongoose.Schema.Types.Date,
    default: null
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: null
  },
}, { timestamps: { createdAt: 'createdAt' }});

const Users = mongoose.model('Users', Schema);

export default Users;