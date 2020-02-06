import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
  name: {
    type: String
  },
  wallet: {
    type: Object,
    default: {
      amount: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Store', StoreSchema)