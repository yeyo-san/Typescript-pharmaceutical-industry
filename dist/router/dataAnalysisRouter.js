import { Router } from "express";
const dataAnalysisRouter = Router();
dataAnalysisRouter.get('/:id');
dataAnalysisRouter.get('/:frecuency');
dataAnalysisRouter.get('/duration');
export default dataAnalysisRouter;
