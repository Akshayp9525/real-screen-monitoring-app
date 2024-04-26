export const isLogin = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    return true;
  }

  return false;
};

