import { Router } from 'express';
import { Container } from 'typedi';
import { asyncHandler } from '../middlewares/asyncHandler';
import { PandaIntegrationController } from '../controllers/panda-integration.controller';

const pandaIntegrationController = Container.get(PandaIntegrationController);
const router = Router();

router.get('/', asyncHandler(pandaIntegrationController.fetchAllVideos));
router.get('/:video_id', asyncHandler(pandaIntegrationController.fetchVideoById));

export default router;
