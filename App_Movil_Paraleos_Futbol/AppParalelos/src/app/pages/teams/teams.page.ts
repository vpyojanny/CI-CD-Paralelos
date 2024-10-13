import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  teams: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.apiService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }
}
