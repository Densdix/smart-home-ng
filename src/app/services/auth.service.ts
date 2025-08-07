import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { TokenService } from './token.service';
import {
  LoginRequest,
  LoginResponse,
  UserProfile,
  DashboardInfo,
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public userProfile$ = this.userProfileSubject.asObservable();

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    if (this.tokenService.hasToken()) {
      this.loadProfile().subscribe({
        next: (profile) => {
          this.setAuthenticatedState(true, profile);
        },
        error: () => {
          this.logout();
        },
      });
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', credentials).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
        this.loadProfile().subscribe((profile) => {
          this.setAuthenticatedState(true, profile);
          this.router.navigate(['/dashboard']);
        });
      })
    );
  }

  loadProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/user/profile');
  }

  logout(): void {
    this.tokenService.clearToken();
    this.setAuthenticatedState(false, null);
    this.router.navigate(['/login']);
  }

  getDashboards(): Observable<DashboardInfo[]> {
    return this.http.get<DashboardInfo[]>('/api/dashboards');
  }

  private setAuthenticatedState(
    isAuthenticated: boolean,
    profile: UserProfile | null
  ): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.userProfileSubject.next(profile);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUserProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }
}
