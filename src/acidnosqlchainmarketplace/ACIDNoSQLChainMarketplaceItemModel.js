import mongoose from 'mongoose'

const ACIDNoSQLChainItemSchema = new mongoose.Schema({
  item: {
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

export default mongoose.model('Item', ACIDNoSQLChainItemSchema)