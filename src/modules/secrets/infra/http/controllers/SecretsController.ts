import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSecretService from '../../../services/CreateSecretService';

class SecretsController {
  public async craete(req: Request, res: Response): Promise<Response> {
    const { imageURL, message } = req.body;

    const createSecretService = container.resolve(CreateSecretService);

    const secret = await createSecretService.execute({
      imageURL,
      message,
    });

    return res.json(secret);
  }
}

export default SecretsController;
