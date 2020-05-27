import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
  mode: ProgressSpinnerMode = 'determinate';
  color: ThemePalette = 'primary';
  value = 0;
  constructor() { }
  ngOnInit(): void {
    this.setValue(this.getValue());
  }
  getValue(): number {
    let counter = 0;
    let interval = setInterval(() => {
      this.value += 20;
      if (this.value == 120) { this.value = 0; counter++; }
      if (counter > 3) { clearInterval(interval); }
    }, 1000)
    return this.value;
  }
  setValue(value): void {
    this.value = value;
  }
}
