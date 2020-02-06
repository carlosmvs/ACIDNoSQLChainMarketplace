import { Router } from 'express'

const routesEntity = new Router()

import MongoChainEntityController from './MongoChainEntityController'

routesEntity.post('/senders', MongoChainEntityController.storeSender)
routesEntity.post('/recipients', MongoChainEntityController.storeRecipient)

routesEntity.put('/transferences/:id', MongoChainEntityController.updateTransference)
routesEntity.get('/transferences/:senderId', MongoChainEntityController.showTransferenceBySenderId)
routesEntity.get('/transferences/:recipientId', MongoChainEntityController.showTransferenceByRecipientId)

routesEntity.post('/customers', MongoChainEntityController.storeCustomer)

routesEntity.post('/stores', MongoChainEntityController.storeStore)

routesEntity.post('/items', MongoChainEntityController.storeItem)

routesEntity.put('/orders/:id', MongoChainEntityController.updateOrder)

export default routesEntity