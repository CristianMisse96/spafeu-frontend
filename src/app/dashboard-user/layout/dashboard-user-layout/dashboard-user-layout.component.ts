import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { DashboardSidebarComponent } from '@shared/components/dashboard-sidebar/dashboard-sidebar';
import { DashboardSidebarNavItem } from '@shared/components/dashboard-sidebar/dashboard-sidebar.model';
import { DashboardTopbarComponent } from '@shared/components/dashboard-topbar/dashboard-topbar';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';

@Component({
  selector: 'app-dashboard-user-layout',
  imports: [RouterOutlet, DashboardSidebarComponent, DashboardTopbarComponent],
  templateUrl: './dashboard-user-layout.component.html',
  styleUrl: './dashboard-user-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUserLayoutComponent {
  authService = inject(Auth);
  user = this.authService.usuario;
  estadoKyc = EstadoKycEnum.COMPLETO;
  router = inject(Router);

  showSidebar = computed(() => this.authService.usuario()?.estadoKyc === this.estadoKyc);

  sidebarOpen = signal(false);
  sidebarExpanded = signal(true);

  readonly navItems: DashboardSidebarNavItem[] = [
    {
      route: '/dashboard-user/home',
      icon: 'pi-home',
      label: 'Dashboard',
      description: 'Resumen general',
      exact: true,
    },
    {
      route: '/dashboard-user/excercises',
      icon: 'pi-bolt',
      label: 'Rutinas',
      description: 'Actividad física',
    },
    {
      route: '/dashboard-user/progress',
      icon: 'pi-chart-line',
      label: 'Progreso',
      description: 'Seguimiento',
    },
    {
      route: '/dashboard-user/educacion',
      icon: 'pi-book',
      label: 'Educación',
      description: 'Hábitos saludables',
    },
    /*{
      route: '/comunidad',
      icon: 'pi-users',
      label: 'Comunidad',
      description: 'Retos grupales',
      badge: 'NUEVO',
    },*/
  ];

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
    const name = this.user()?.nombreCompleto ?? '';
    return name.charAt(0).toUpperCase() || 'U';
  });

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleSidebarExpanded(): void {
    this.sidebarExpanded.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
