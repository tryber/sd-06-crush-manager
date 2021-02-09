const CreateSessionService = require('../services/CreateSessionService.js');
const AppError = require('../errors/AppError.js');

class SessionController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(request, response) {
    this.num += 1;
    const { email, password } = request.body;

    if (!email || !password) {
      const message = `
        O campo "${email ? 'password' : 'email'}" é obrigatório
      `;

      throw new AppError(message);
    }

    const listAllCrushesService = new CreateSessionService();

    const token = listAllCrushesService.execute();

    return response.status(201).json({ token });
  }
}

module.exports = SessionController;
