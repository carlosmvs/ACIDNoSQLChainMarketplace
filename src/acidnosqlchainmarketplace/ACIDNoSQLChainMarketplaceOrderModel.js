import mongoose from 'mongoose'

const ACIDNoSQLChainOrderSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Order', ACIDNoSQLChainOrderSchema)