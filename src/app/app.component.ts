import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: number = 0.5;
  rotate: number = 0;
  title = 'app';

  setValue(value: any) {
    this.value = parseFloat(value.target.value);
  }

  setRotate(value: any) {
    this.rotate = parseFloat(value.target.value);
  }

}
