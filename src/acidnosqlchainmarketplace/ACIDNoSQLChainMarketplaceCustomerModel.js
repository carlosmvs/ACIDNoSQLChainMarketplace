import mongoose from 'mongoose'

const ACIDNoSQLChainCustomerSchema = new mongoose.Schema({
  customer: {
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

export default mongoose.model('Customer', ACIDNoSQLChainCustomerSchema)