import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-failure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-failure.component.html',
  styleUrl: './alert-failure.component.css'
})
export class AlertFailureComponent {
  @Input() message: string = '';
  @Input() alertOpen: boolean = false;
}
