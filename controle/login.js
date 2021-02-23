const { gerandoToken, validandoEmail, validandoPassword } = require('../servicos');

const login = (_req, res) => {
  const {email, password} = _req.body;

  if(!email) return res.status(400).json({ message: 'O campo email é obrigatorio' });
  if(!validandoEmail) return res.status(400).json({ message: 'O email deve ter o formato "email@email.com"' });
};
