import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard-user-layout',
  imports: [RouterOutlet, AvatarModule, ButtonModule, TagModule, TooltipModule],
  templateUrl: './dashboard-user-layout.component.html',
  styleUrl: './dashboard-user-layout.component.css',
})
export class DashboardUserLayoutComponent {
  private authService = inject(Auth);
  user = this.authService.usuario();

  sidebarOpen = signal(false);

  currentDate = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  userInitial = computed(() => {
    const name = this.user?.nombreCompleto ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  });

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
