import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomCursorPositioningService {

  mouseY: number = 0;
  mouseX: number = 0;

  cursorScroll = signal(false);

  constructor() {
    this.mouseMovementListener();
  }

  mouseMovementListener() {
    window.addEventListener("mousemove", (e) => {
      this.mouseY = e.pageY - 12;
      this.mouseX = e.pageX - 12;
    });
  }
}
