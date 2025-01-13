import { Router } from 'express';
import { Container } from 'typedi';
import { asyncHandler } from '../middlewares/asyncHandler';
import { PandaIntegrationController } from '../controllers/panda-integration.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const pandaIntegrationController = Container.get(PandaIntegrationController);
const router = Router();

router.get('/', authMiddleware, asyncHandler(pandaIntegrationController.fetchAllVideos));
router.get('/:video_id', authMiddleware, asyncHandler(pandaIntegrationController.fetchVideoById));

export default router;
