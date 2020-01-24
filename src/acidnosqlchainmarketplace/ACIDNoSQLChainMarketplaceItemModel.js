import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  item: {
    type: String
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