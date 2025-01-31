'use client';

import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    }
      catch (err) {
        return false;
    }
  }

  getToken(): string | null {  // Return null if no token
    if (typeof window !== 'undefined') { // Check if it's client-side
      const loggedUser = localStorage.getItem('token');
      return loggedUser || null; // Return null if no token
    }
    return null; // Return null on the server
  }

  login(idToken: string) {
    if (typeof window !== 'undefined') { // Client-side check
      localStorage.setItem('token', idToken);
    }
  }

  logout() {
    if (typeof window !== 'undefined') { // Client-side check
      localStorage.removeItem('token');
    }
  }
}

export default new AuthService();