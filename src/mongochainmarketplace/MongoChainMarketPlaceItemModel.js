import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  stock: {
    type: Number
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Item', ItemSchema)