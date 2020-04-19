import { Router } from 'express';
import multer from 'multer';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import TransporterController from './app/controllers/TransporterController';
import TransporterSessionController from './app/controllers/TransporterSessionController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import OrderController from './app/controllers/OrderController';
import NotificationController from './app/controllers/NotificationController';
import FunctionalityTransporterController from './app/controllers/FunctionalityTransporterController';
import OrderedTransporterController from './app/controllers/OrderedTransporterController';
import OrderProblemsController from './app/controllers/OrderProblemsController';
import multerAvatarConfig from './config/multerAvatar';
import multerSignatureConfig from './config/multerSignature';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploadAvatar = multer(multerAvatarConfig);
const uploadSignature = multer(multerSignatureConfig);

// Sessions
routes.post('/auth', SessionController.store);
routes.post('/auth/transporter', TransporterSessionController.store);

// Orders with Problems for Transporters
routes.get('/order/:order_id/problems', OrderProblemsController.show);

// Orders for Transporters
routes.get('/transporter/:id/orders', FunctionalityTransporterController.index); // list all orders openned for a transporter
routes.get('/transporter/:id/ordered', OrderedTransporterController.index); // list ended orders for a transporter
routes.put(
  // update start_date
  '/transporter/:transporter_id/order/:order_id',
  FunctionalityTransporterController.update,
);
routes.put(
  // update end_date
  '/transporter/:transporter_id/ordered/:order_id',
  OrderedTransporterController.update,
);
routes.post('/orders/:order_id/problems', OrderProblemsController.store);

// Insert Files (signature)
routes.post(
  '/signatures',
  uploadSignature.single('file'),
  SignatureController.store,
);

// Middleware to check authentication
routes.use(authMiddleware);

// Recipients
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipients', RecipientController.index);
routes.delete('/recipients/:id', RecipientController.delete);

// Transporters
routes.post('/transporters', TransporterController.store);
routes.get('/transporters', TransporterController.index);
routes.put('/transporters/:id', TransporterController.update);
routes.get('/transporters/:id', TransporterController.show);
routes.delete('/transporters/:id', TransporterController.delete);

// Insert Files (avatar)
routes.post('/files', uploadAvatar.single('file'), FileController.store);

// Orders
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.get('/orders/:id', OrderController.show);
routes.delete('/orders/:id', OrderController.delete);

// Notification
routes.put('/notifications/:id', NotificationController.update);

// Problems
routes.get('/problems', OrderProblemsController.index);
routes.put('/problem/:id/cancel-order', OrderProblemsController.update);

export default routes;
