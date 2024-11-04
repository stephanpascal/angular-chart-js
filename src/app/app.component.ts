import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoughnutChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poc-chartjs-ng';
}
