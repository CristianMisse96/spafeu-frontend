import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard-topbar',
  imports: [AvatarModule, TagModule, TooltipModule],
  templateUrl: './dashboard-topbar.html',
  styleUrl: './dashboard-topbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopbarComponent {
  title = input<string>('Dashboard');
  currentDate = input<string>('');
  objective = input<string>('Objetivo: Reducir sedentarismo');
  notificationCount = input<number>(0);
  userInitial = input<string>('U');
  showMenuToggle = input<boolean>(true);

  menuToggle = output<void>();
  logout = output<void>();
}
