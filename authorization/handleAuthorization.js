function handleAuthorization(token) {
  if (!token) {
    return {
      valid: false,
      message: 'Token não encontrado',
    };
  } if (token.length !== 16) {
    return {
      valid: false,
      message: 'Token inválido',
    };
  }
  return {
    valid: true,
  };
}

module.exports = handleAuthorization;
