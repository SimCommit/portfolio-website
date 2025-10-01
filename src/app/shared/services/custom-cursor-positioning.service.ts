import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomCursorPositioningService {

  mouseY: number = 0;
  mouseX: number = 0;

  cursorState: "default" | "scroll" = "default";

  constructor() {
    this.mouseMovementListener();
  }

  ngAfterViewInit(): void {
    // this.customCursorRAFMovement();
  }

  setCursorState(state: "default" | "scroll") {
    this.cursorState = state;    
  }

  mouseMovementListener() {
    window.addEventListener("mousemove", (e) => {
      this.mouseY = e.pageY - 12;
      this.mouseX = e.pageX - 12;
    });
  }

  // customCursorRAFMovement() {
  //   this.customCursorRef.nativeElement.style.transform = "translate3d(" + this.mouseX + "px, " + this.mouseY + "px, 0)";
  //   requestAnimationFrame(() => this.customCursorRAFMovement());
  // }
}
