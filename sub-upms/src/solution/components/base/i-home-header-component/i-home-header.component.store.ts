export function useHomeHeaderStore() {
  function logout() {
    console.log('logout');
  }

  function changePwd() {
    console.log('changePwd');
  }

  return { logout, changePwd };
}
