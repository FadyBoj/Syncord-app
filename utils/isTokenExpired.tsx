import {jwtDecode} from 'jwt-decode';
const isTokenExpired = (token: string): boolean => {
  try {
    const currentTime = Date.now() / 1000;
    const decoded = jwtDecode(token);

    if (decoded.exp) {
      return decoded.exp < currentTime;
    }
    return true;
  } catch (error) {
    return true;
  }
};

export default isTokenExpired;
