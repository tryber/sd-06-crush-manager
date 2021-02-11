const handleAuth = (authorization) => {
  if (!authorization) return ({ message: 'Token não encontrado' });
  if (authorization) {
    if (authorization.length < 16) return ({ message: 'Token inválido' });
  }
};

const handleCrushInfo = (crushToAdd) => {
  const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (crushToAdd) {
    const { name, age, date } = crushToAdd;
    if (!name) return ({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) return ({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    if (!age) return ({ message: 'O campo "age" é obrigatório' });
    if (parseInt(age, 10) < 18) return ({ message: 'O crush deve ser maior de idade' });

    if (!date) return ({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (date) {
      if (date.rate === '' || date.rate === 0) return ({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      if (!date.datedAt || !date.rate) return ({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
      if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) return ({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      const dateInput = date.datedAt;
      if (!dateFormat.test(dateInput)) return ({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  }
};

module.exports = {
  handleAuth,
  handleCrushInfo,
};
