import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return response.json({ user: classToClass(user), token });
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}

export default SessionsController;
