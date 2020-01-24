import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
  store: {
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

export default mongoose.model('Store', StoreSchema)