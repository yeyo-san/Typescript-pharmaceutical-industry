import express from 'express';
import medicineRouter from '../router/medicineRouter';
import patientsRouter from '../router/patientsRouter';
import prescriptionsRouter from '../router/prescriptionsRouter';
import prescriptionsQueryRouter from '../router/prescriptionsQueryRouter';
const routes = express.Router();
routes.use('/medicines', medicineRouter);
routes.use('/patients', patientsRouter);
routes.use('/prescriptions', prescriptionsRouter);
//Data analysis
routes.use('/querys', prescriptionsQueryRouter);
export default routes;
