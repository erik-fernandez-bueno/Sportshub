import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true,
})
export class MenuComponent implements OnInit {
  usuariLoguejat: any = null;
  esAdmin: boolean = false;
  tickerEvents: any[] = [];
  tickerDuration: string = '40s';
  private refreshInterval: any;
  private usuariSubscription: any;

  constructor(private router: Router, private authService: AuthService,private http: HttpClient) {}

  ngOnInit() {
    this.comprovarSessio();
    this.carregarTickerEvents();
    // Refresh every 5 minutes
    this.refreshInterval = setInterval(() => this.carregarTickerEvents(), 5 * 60 * 1000);
    this.usuariSubscription = this.authService.usuari$.subscribe(usuari => {
      this.usuariLoguejat = usuari;
      this.esAdmin = usuari?.admin === true;
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.usuariSubscription) {
      this.usuariSubscription.unsubscribe();
    }
  }

  comprovarSessio() {
    const dades = localStorage.getItem('usuariLoguejat');
    if (dades) {
      this.usuariLoguejat = JSON.parse(dades);
      this.esAdmin = this.usuariLoguejat?.admin === true;
    }
  }

  carregarTickerEvents() {
    const leagueIds = [4328, 4335, 4331, 4346, 4480];
    const requests = leagueIds.map(id =>
      this.http.get<any>(`https://www.thesportlosdb.com/api/v1/json/123/eventspastleague.php?id=${id}&e=15`)
    );

    this.fetchLeagues(leagueIds);
  }

  private fetchLeagues(ids: number[]) {
    const allEvents: any[] = [];
    let completed = 0;

    ids.forEach(id => {
      fetch(`https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=${id}&e=15`)
        .then(r => r.json())
        .then(data => {
          if (data?.events) {
            allEvents.push(...data.events.slice(-3));
          }
        })
        .catch(() => {})
        .finally(() => {
          completed++;
          if (completed === ids.length) {
            this.tickerEvents = allEvents
              .sort((a, b) => new Date(b.dateEvent).getTime() - new Date(a.dateEvent).getTime())
              .slice(0, 20);
            this.tickerDuration = `${Math.max(20, this.tickerEvents.length * 4)}s`;
          }
        });
    });
  }
}
