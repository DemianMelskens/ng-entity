import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ECS';
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  constructor() {
  }

  ngAfterViewInit(): void {

  }
}
