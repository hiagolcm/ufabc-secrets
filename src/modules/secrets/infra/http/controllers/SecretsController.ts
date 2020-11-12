import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CheckSecretStatusService from '../../../services/CheckSecretStatusService';
import CreateSecretService from '../../../services/CreateSecretService';
import GetNextSecretToReviewService from '../../../services/GetNextSecretToReviewService';

class SecretsController {
  public async craete(req: Request, res: Response): Promise<Response> {
    const { message } = req.body;

    const createSecretService = container.resolve(CreateSecretService);

    const secret = await createSecretService.execute({
      message,
      imageNames: (req.files as Express.Multer.File[]).map(
        (file) => file.filename,
      ),
    });

    return res.json({ secret });
  }

  public async checkStatus(req: Request, res: Response): Promise<Response> {
    const { id: idStr } = req.params;
    const secretId = parseInt(idStr, 10);

    const secretStatusService = container.resolve(CheckSecretStatusService);

    const secretStatus = await secretStatusService.execute({ secretId });

    return res.json({ status: secretStatus });
  }

  public async getNextToReview(_: Request, res: Response): Promise<Response> {
    const getNextService = container.resolve(GetNextSecretToReviewService);

    const secret = await getNextService.execute();

    return res
      .status(secret ? 200 : 204)
      .json({ ...secret, imageURLs: secret?.getUrls() });
  }
}

export default SecretsController;
