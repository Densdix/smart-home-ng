import {
  Component,
  HostListener,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { DashboardInfo, UserProfile } from '../../models/dashboard.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private readonly MOBILE_BREAKPOINT = 768;

  isMobileMenuOpen = false;
  isAuthenticated = false;
  userProfile: UserProfile | null = null;
  dashboards: DashboardInfo[] = [];
  isUserMenuOpen = false;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.isAuthenticated$.subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.loadDashboards();
        } else {
          this.dashboards = [];
        }
      })
    );

    this.subscriptions.add(
      this.authService.userProfile$.subscribe((profile) => {
        this.userProfile = profile;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadDashboards(): void {
    this.authService.getDashboards().subscribe({
      next: (dashboards) => {
        this.dashboards = dashboards;
      },
      error: (error) => {
        console.error('Failed to load dashboards:', error);
        this.dashboards = [];
      },
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > this.MOBILE_BREAKPOINT) {
      this.isMobileMenuOpen = false;
      this.isUserMenuOpen = false;
    }
  }
}
