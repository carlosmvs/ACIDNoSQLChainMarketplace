import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  wallet: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Customer', CustomerSchema)