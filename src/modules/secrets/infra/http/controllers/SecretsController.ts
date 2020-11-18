import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import CheckSecretStatusService from '../../../services/CheckSecretStatusService';
import CreateSecretService from '../../../services/CreateSecretService';

class SecretsController {
  public async craete(req: Request, res: Response): Promise<Response> {
    const { imageURL, message } = req.body;

    const createSecretService = container.resolve(CreateSecretService);

    const secret = await createSecretService.execute({
      imageURL,
      message,
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
}

export default SecretsController;
