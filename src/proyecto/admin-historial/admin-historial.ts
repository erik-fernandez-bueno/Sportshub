import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { HistorialService } from '../services/historial.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-admin-historial',
  imports: [
    NgForOf,
    NgApexchartsModule
  ],
  templateUrl: './admin-historial.html',
  styleUrl: './admin-historial.css',
})
export class AdminHistorial implements OnInit {

  historial: any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;

  constructor(
    private historialService: HistorialService,
    private cgf: ChangeDetectorRef,
    private router: Router
  ) {
    this.chartOptions = {
      series: [],
      chart: { type: 'bar', height: 350 },
      xaxis: { categories: [] },
      title: { text: 'Vendes per dia' }
    };
  }

  ngOnInit() {
    const userString = localStorage.getItem('usuariLoguejat');
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.admin !== true) {
      console.log("Accés denegat: usuari no autoritzat o no loguejat.");
      this.router.navigate(['/botiga']);
      return;
    }

    this.historialService.getHistorial(user.email).subscribe({
      next: (data) => {
        this.historial = data;
        this.prepararDadesGrafic(data);
        this.cgf.detectChanges();
      },
      error: (err) => {
        console.error("Error carregant l'historial:", err);
        if (err.status === 403) this.router.navigate(['/botiga']);
      }
    });
  }

  prepararDadesGrafic(data: any[]) {
    const dadesAgrupades = data.reduce((acc, curr) => {
      const dataStr = curr.data;
      const totalProductes = curr.detallfactures.reduce((sum: any, d: any) => sum + d.quantity, 0);
      acc[dataStr] = (acc[dataStr] || 0) + totalProductes;
      return acc;
    }, {});

    this.chartOptions.series = [{ name: 'Unitats venudes', data: Object.values(dadesAgrupades) }];
    this.chartOptions.xaxis = { categories: Object.keys(dadesAgrupades) };
  }
}
