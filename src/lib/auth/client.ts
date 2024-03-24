'use client';

import { fetchDetailEmployee } from '@/networks/employee';

import type { Employee } from '@/types/employee';
import type { APIResponse } from '@/types/response';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== 'sofia@devias.io' || password !== 'Secret1') {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: Employee | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');
    const userId = localStorage.getItem('user-id');

    if (!token || !userId) {
      return { data: null };
      // return {
      //   data: {
      //     id: 5,
      //     name: 'John Doe',
      //     email: 'johndoe@mail.com',
      //     emp_photo: 'https://ik.imagekit.io/learncdn/IMG-1711213060464_zoDwfUhAn.jpeg',
      //     position: 'undefined',
      //     phone: 'undefined',
      //     password: 'undefined',
      //     created_at: '2024-03-23T16:57:43.002Z',
      //     updated_at: '2024-03-23T16:57:43.002Z',
      //   },
      // };
    }

    const promise: APIResponse<Employee> = await fetchDetailEmployee({ data: parseInt(userId, 10), token });

    if (promise.code !== 200) {
      return { data: null };
    }

    return { data: promise.data };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('user-id');

    return {};
  }
}

export const authClient = new AuthClient();
