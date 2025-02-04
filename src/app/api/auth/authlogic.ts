'use client';

import { JwtPayload as DefaultJwtPayload, jwtDecode } from 'jwt-decode';
import { getSession } from 'next-auth/react';

interface JwtPayload extends DefaultJwtPayload {
  username?: string;
}

class AuthService {

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
    } catch (err) {
      console.error('Token decoding error:', err);
      return false;
    }
    return false;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    console.log(idToken);
    localStorage.setItem('token', idToken);
    // window.location.assign('/wiki');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/wiki');
  }

  async getUsername(): Promise<string> {
    try {
      const session = await getSession();
      if (session && session.user && session.user.name) {
        return session.user.name;
      }
      return '';
    } catch (err) {
      console.error('Error getting username from session:', err);
      return '';
    }
  }
  
  getProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return jwtDecode<JwtPayload>(token);
  }
}

export default new AuthService();