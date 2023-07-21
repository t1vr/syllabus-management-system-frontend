import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    getUserToken(): string {
        return localStorage.getItem('accessToken') as string;
    }

    setUserToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
}
