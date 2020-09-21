import mongoose from 'mongoose'
import MongoChainSenderModel from './MongoChainSenderModel'
import MongoChainRecipientModel from './MongoChainRecipientModel'
import MongoChainTransferenceModel from './MongoChainTransferenceModel'
import MongoChainCustomerModel from '../mongochainmarketplace/MongoChainMarketPlaceCustomerModel'
import MongoChainStoreModel from '../mongochainmarketplace/MongoChainMarketPlaceStoreModel'
import MongoChainOrderModel from '../mongochainmarketplace/MongoChainMarketPlaceOrderModel'
import MongoChainItemModel from '../mongochainmarketplace/MongoChainMarketPlaceItemModel'

class MongoChainEntityController {

  async storeSender(req, res) {
    try {
      const sender = await MongoChainSenderModel.create(req.body)
      res.json(sender)
    } catch (err) {
      throw err
    }
  }

  async storeRecipient(req, res) {
    try {
      let recipient = await MongoChainRecipientModel.create(req.body)
      res.json(recipient)
    } catch (err) {
      throw err
    }
  }

  async updateTransference(req, res) {
    const sessionTransference = await mongoose.startSession()
    sessionTransference.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    })
    try {
      let sender = await MongoChainSenderModel.findById(req.body.senderId)
      let recipient = await MongoChainRecipientModel.findById(req.body.recipientId)
      let transference = await MongoChainTransferenceModel.findById(req.params.id)
      sender.amount -= (req.body.amount - 0.25)
      recipient.amount += req.body.amount
      transference.status = 'Concluído'
      await MongoChainSenderModel.findByIdAndUpdate(req.body.senderId, sender).session(sessionTransference)
      await MongoChainRecipientModel.findByIdAndUpdate(req.body.recipientId, recipient).session(sessionTransference)
      await MongoChainTransferenceModel.findByIdAndUpdate(req.params.id, transference).session(sessionTransference)
      await sessionTransference.commitTransaction()
      res.json({ message: "OK" })
    } catch (err) {
      await sessionTransference.abortTransaction()
    } finally {
      sessionTransference.endSession()
    }
  }

  async showTransferenceBySenderId(req, res) {
    try {
      const transferences = await MongoChainTransferenceModel.find()
      let senders = transferences.filter(sender => {
        return sender.senderId = req.params.senderId
      })
      res.json(senders)
    } catch (err) {
      throw err
    }
  }

  async showTransferenceByRecipientId(req, res) {
    try {
      const transferences = await MongoChainTransferenceModel.find()
      let recipients = transferences.filter(recipient => {
        return recipient.recipientId == req.params.recipientId
      })
      res.json(recipients)
    } catch (err) {
      throw err
    }
  }

  async storeCustomer(req, res) {
    try {
      const customer = await MongoChainCustomerModel.create(req.body)
      res.json(customer)
    } catch (err) {
      throw err
    }
  }

  async storeStore(req, res) {
    try {
      const store = await MongoChainStoreModel.create(req.body)
      res.json(store)
    } catch (err) {
      throw err
    }
  }

  async storeItem(req, res) {
    try {
      const item = await MongoChainItemModel.create(req.body)
      res.json(item)
    } catch (err) {
      throw err
    }
  }

  async updateOrder(req, res) {
    const sessionOrder = await mongoose.startSession({ readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' } })
    sessionOrder.startTransaction()
    try {
      let total = 0
      let customer = await MongoChainCustomerModel.findById(req.body.customerId)
      let store = await MongoChainStoreModel.findById(req.body.storeId)
      let order = await MongoChainOrderModel.findById(req.params.id)
      let items = order.items
      items.forEach(async i => {
        total += (i.price * i.quantity)
        let item = await MongoChainItemModel.findById(i.itemId)
        item.stock -= i.quantity
        await MongoChainItemModel.findByIdAndUpdate(item._id, item).session(sessionOrder)
      })
      customer.wallet.amount -= total
      store.wallet.amount += total
      order.total = total
      await MongoChainCustomerModel.findByIdAndUpdate(customer._id, customer).session(sessionOrder)
      await MongoChainStoreModel.findByIdAndUpdate(store._id, store).session(sessionOrder)
      await MongoChainOrderModel.findByIdAndUpdate(order._id, order).session(sessionOrder)
      await sessionOrder.commitTransaction()
      res.json(order)
    } catch (err) {
      await sessionOrder.abortTransaction()
    }
    finally {
      sessionOrder.endSession()
    }
  }
}

export default new MongoChainEntityController()
