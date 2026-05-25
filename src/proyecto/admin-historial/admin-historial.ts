import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { HistorialService } from '../services/historial.service';
import {NgForOf, CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-admin-historial',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './admin-historial.html',
  styleUrl: './admin-historial.css',
})
export class AdminHistorial implements OnInit {

  historial: any[] = [];
  totalVendes: string = '0.00';
  totalProductesVenuts: number = 0;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;

  constructor(
    private historialService: HistorialService,
    private cgf: ChangeDetectorRef,
    private router: Router
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      xaxis: {
        categories: [],
        labels: { style: { colors: '#6c757d' } }
      },
      title: {
        text: 'Volum de Vendes per Data',
        align: 'left',
        style: { color: '#00205b', fontSize: '18px' }
      },
      dataLabels: { enabled: false }
    };
  }

  ngOnInit() {
    const userString = localStorage.getItem('usuariLoguejat');
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.admin !== true) {
      this.router.navigate(['/botiga']);
      return;
    }

    this.historialService.getHistorial(user.email).subscribe({
      next: (data) => {
        this.historial = data;
        this.calcularEstadistiques(data);
        this.prepararDadesGrafic(data);
        this.cgf.detectChanges();
      },
      error: (err) => {
        console.error("Error carregant l'historial:", err);
        if (err.status === 403) this.router.navigate(['/botiga']);
      }
    });
  }

  calcularEstadistiques(data: any[]) {
    let total = 0;
    let productes = 0;

    data.forEach(factura => {
      factura.detallfactures.forEach((detall: any) => {
        total += detall.quantity * detall.producte.price;
        productes += detall.quantity;
      });
    });

    this.totalVendes = total.toFixed(2);
    this.totalProductesVenuts = productes;
  }

  prepararDadesGrafic(data: any[]) {
    const dadesAgrupades = data.reduce((acc, curr) => {
      const dataStr = curr.data;
      const totalProductes = curr.detallfactures.reduce((sum: any, d: any) => sum + d.quantity, 0);
      acc[dataStr] = (acc[dataStr] || 0) + totalProductes;
      return acc;
    }, {});

    const datesOrdenades = Object.keys(dadesAgrupades).sort();
    const valorsOrdenats = datesOrdenades.map(date => dadesAgrupades[date]);

    this.chartOptions.series = [{
      name: 'Unitats venudes',
      data: valorsOrdenats
    }];
    this.chartOptions.xaxis = {
      categories: datesOrdenades
    };
  }
}
