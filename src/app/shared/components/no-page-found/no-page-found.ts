import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  imports: [RouterLink],
  templateUrl: './no-page-found.html',
  styleUrl: './no-page-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoPageFound {
  goBack(): void {
    history.back();
  }
}
