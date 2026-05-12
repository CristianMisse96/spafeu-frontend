import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,FormsModule, ImageModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
