// export const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// export const setCookie = (name, value, days = 30) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// };