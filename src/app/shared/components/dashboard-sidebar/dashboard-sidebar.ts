import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardSidebarNavItem } from './dashboard-sidebar.model';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSidebarComponent {
  expanded = input<boolean>(true);
  mobileOpen = input<boolean>(false);
  items = input.required<DashboardSidebarNavItem[]>();
  logoText = input<string>('FIT APP');
  logoSubtext = input<string>('Bienestar universitario');

  toggleExpand = output<void>();
  closeMobile = output<void>();

  effectiveExpanded = computed(() => this.expanded() || this.mobileOpen());
}
