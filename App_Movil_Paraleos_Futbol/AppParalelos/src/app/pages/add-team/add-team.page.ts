import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage {
  team = {
    name: '',
    city: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  addTeam() {
    this.apiService.addTeam(this.team).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }
}
