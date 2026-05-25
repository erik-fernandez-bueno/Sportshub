import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puzzle-captcha',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="puzzle-container" (mousemove)="onDrag($event)" (mouseup)="onDragEnd()" (mouseleave)="onDragEnd()" (touchmove)="onDrag($event)" (touchend)="onDragEnd()">
      <div class="canvas-wrapper" style="position: relative; width: 300px; height: 150px; background: #eee; overflow: hidden; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <canvas #mainCanvas width="300" height="150"></canvas>
        <canvas #pieceCanvas width="300" height="150" [style.left.px]="currentX" style="position: absolute; top: 0; pointer-events: none; filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));"></canvas>
      </div>

      <div class="slider-track" style="position: relative; width: 300px; height: 40px; background: #f0f0f0; margin-top: 15px; border-radius: 20px; border: 1px solid #ddd; overflow: hidden;">
        <div class="slider-bar" [style.width.px]="currentX + 20" style="position: absolute; height: 100%; background: #e3f2fd; transition: width 0.05s;"></div>
        <div class="slider-handle"
             [style.left.px]="currentX"
             (mousedown)="onDragStart($event)"
             (touchstart)="onDragStart($event)"
             style="position: absolute; width: 40px; height: 40px; background: #1a5fe0; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          <span style="user-select: none; font-weight: bold;">→</span>
        </div>
        <div style="text-align: center; line-height: 40px; color: #888; font-size: 13px; user-select: none; position: relative; z-index: 1;">Llisca per completar el puzle</div>
      </div>
      <div *ngIf="message" [style.color]="isSuccess ? '#2e7d32' : '#d32f2f'" style="margin-top: 8px; font-size: 14px; font-weight: 500; text-align: center;">{{ message }}</div>
    </div>
  `,
  styles: [`
    .puzzle-container { width: 300px; margin: 10px 0; font-family: sans-serif; }
    .slider-handle:active { background: #0a3880 !important; }
    canvas { display: block; }
  `]
})
export class PuzzleCaptchaComponent implements OnInit {
  @ViewChild('mainCanvas', { static: true }) mainCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieceCanvas', { static: true }) pieceCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() verified = new EventEmitter<boolean>();

  private targetX = 0;
  currentX = 0;
  private isDragging = false;
  private startMouseX = 0;

  message = '';
  isSuccess = false;

  ngOnInit() {
    setTimeout(() => this.initPuzzle(), 100);
  }

  initPuzzle() {
    const mainCtx = this.mainCanvas.nativeElement.getContext('2d')!;
    const pieceCtx = this.pieceCanvas.nativeElement.getContext('2d')!;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://picsum.photos/300/150?random=${Math.random()}`;

    img.onload = () => {
      // Netejar canvas
      mainCtx.clearRect(0, 0, 300, 150);
      pieceCtx.clearRect(0, 0, 300, 150);

      mainCtx.drawImage(img, 0, 0, 300, 150);

      // Definim la posició on ha d'anar la peça (el forat)
      // La posició real de la peça al fons serà realTargetX
      const realTargetX = 150 + Math.floor(Math.random() * 80); // Entre 150 i 230
      const targetY = 30 + Math.floor(Math.random() * 50);   // Entre 30 i 80

      // Dibuixem el forat al canvas principal
      this.drawPuzzleShape(mainCtx, realTargetX, targetY);
      mainCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      mainCtx.fill();
      mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      mainCtx.stroke();

      // Dibuixem la peça al canvas de la peça
      // La peça es dibuixa a la mateixa Y, però la retallem de la imatge original
      pieceCtx.save();
      this.drawPuzzleShape(pieceCtx, realTargetX, targetY);
      pieceCtx.clip();
      pieceCtx.drawImage(img, 0, 0, 300, 150);
      pieceCtx.restore();

      // Afegim un contorn a la peça
      pieceCtx.save();
      this.drawPuzzleShape(pieceCtx, realTargetX, targetY);
      pieceCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      pieceCtx.lineWidth = 2;
      pieceCtx.stroke();
      pieceCtx.restore();

      // Ara, la peça està dibuixada a realTargetX dins del seu canvas.
      // Volem que quan currentX sigui 0, la peça estigui a l'esquerra (per exemple a x=10).
      // Per tant, movem el contingut del canvas de la peça cap a l'esquerra.
      const pieceData = pieceCtx.getImageData(realTargetX - 10, targetY - 10, 60, 60);
      pieceCtx.clearRect(0, 0, 300, 150);
      pieceCtx.putImageData(pieceData, 10, targetY - 10);

      // El targetX que ha de moure l'usuari és la distància entre la posició inicial (10)
      // i la posició final real (realTargetX - 10).
      this.targetX = realTargetX - 20; // Ajustat experimentalment per a la posició inicial 10

      this.currentX = 0;
      this.isSuccess = false;
      this.message = '';
      this.verified.emit(false);
    };
  }

  drawPuzzleShape(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const size = 40;
    const r = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2 - r, y);
    ctx.arc(x + size / 2, y, r, Math.PI, 0);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size / 2 - r);
    ctx.arc(x + size, y + size / 2, r, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y + size / 2 + r);
    ctx.arc(x, y + size / 2, r, 0.5 * Math.PI, 1.5 * Math.PI, true);
    ctx.lineTo(x, y);
    ctx.closePath();
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    if (this.isSuccess) return;
    this.isDragging = true;
    this.startMouseX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.message = '';
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    let delta = clientX - this.startMouseX;
    if (delta < 0) delta = 0;
    if (delta > 250) delta = 250;
    this.currentX = delta;
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Comprovem si la posició és correcta (tolerància de 7 píxels)
    const difference = Math.abs(this.currentX - this.targetX);

    if (difference < 7) {
      this.isSuccess = true;
      this.message = '✓ Verificat correctament!';
      this.verified.emit(true);
    } else {
      this.isSuccess = false;
      this.message = 'Intenta-ho de nou';
      this.verified.emit(false);
      setTimeout(() => {
        if (!this.isSuccess) {
          this.currentX = 0;
          this.message = '';
        }
      }, 800);
    }
  }
}
