import mongoose from 'mongoose'

const ACIDNoSQLChainPaymentSchema = new mongoose.Schema({
  hashCustomer: {
    type: String
  },
  hashItem: {
    type: Object
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  total: {
    type: Number
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Payment', ACIDNoSQLChainPaymentSchema)