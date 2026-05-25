import { Component, signal,computed,ChangeDetectionStrategy } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-dashboard-user-home',
  imports: [Avatar, Tag, Button, ProgressBar],
  templateUrl: './dashboard-user-home.html',
  styleUrl: './dashboard-user-home.css',
})
export class DashboardUserHome {
  // 1. Declarar la Signal para controlar el estado del Sidebar (Modo Mobile)
  public sidebarOpen = signal<boolean>(false);

  // 2. Signal opcional para la fecha dinámica del Topbar
  public currentDate = signal<string>(
    new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  );

  /**
   * Cierra la sesión del usuario universitario o fisioterapeuta
   */
   logout(): void {
    console.log('Cerrando sesión en la plataforma deportiva...');
    // Aquí agregas tu lógica de redirección o limpieza de tokens (AuthService, etc.)
  }
  

  // 3. Métodos para mutar el estado de la Signal de forma limpia
  public toggleSidebar(): void {
    this.sidebarOpen.update(state => !state);
  }

  public closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleNotifications(): void {
    console.log('Abriendo o cerrando el panel de notificaciones');
    // Aquí puedes meter la lógica para mostrar un menú desplegable de notificaciones
  }
  


}
