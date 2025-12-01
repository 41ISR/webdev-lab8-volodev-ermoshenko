export const getErrorMessage = (error) => {
  if (!error.response) {
    return error.request 
      ? 'Не удалось подключиться к серверу'
      : error.message || 'Произошла ошибка';
  }

  const { status, data } = error.response;
  
  if (status === 401) return 'Неверное имя пользователя или пароль';
  if (status === 409) return 'Пользователь с таким именем уже существует';
  if (status === 400) return data?.message || 'Неверные данные';
  if (status === 403) return 'Доступ запрещен';
  if (status === 404) return 'Ресурс не найден';
  
  return data?.message || `Ошибка сервера (${status})`;
};

