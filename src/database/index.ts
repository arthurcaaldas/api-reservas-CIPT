require('dotenv').config();

import mongoose from 'mongoose';

mongoose.connect(String(process.env.MONGO_CONNECTION_URL));
mongoose.Promise = global.Promise;

export default mongoose;