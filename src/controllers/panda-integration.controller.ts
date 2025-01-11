import Container, { Service } from "typedi";
import { Response } from "express";
import { PandaIntegrationService } from "../services/panda-integration.service";
import { CustomRequest } from "../types/express";
import { RequestError } from "../errors/RequestError";

const pandaIntegrationService = Container.get(PandaIntegrationService);

@Service()
export class PandaIntegrationController {
  async fetchAllVideos(req: CustomRequest, res: Response): Promise<Response> {
    const { root_folder, page = 1, limit = 20, title, status, folder_id } = req.query;
    
    try {
      const filters = {
        root_folder,
        page: Number(page),
        limit: Number(limit),
        title,
        status,
        folder_id,
      };

      const videos = await pandaIntegrationService.fetchAllVideos(filters);

      return res.status(200).json(videos);
    } catch (err: any) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Error fetching videos:', err);
      return res.status(500).json({
        message: 'Failed to fetch videos',
        error: err.message || 'Unknown error',
      });
    }
  }

  async fetchVideoById(req: CustomRequest, res: Response): Promise<Response> {
    const { video_id } = req.params;
    try {
      const video = await pandaIntegrationService.fetchVideoById(video_id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      return res.status(200).json(video);
    } catch (err: any) {
      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      console.error('Error fetching video:', err);
      return res.status(500).json({
        message: 'Failed to fetch video',
        error: err.message || 'Unknown error',
      });
    }
  }
}
