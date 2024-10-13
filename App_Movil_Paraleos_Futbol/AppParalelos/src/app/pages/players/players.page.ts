import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  players: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.apiService.getPlayers().subscribe((data) => {
      this.players = data;
    });
  }

  deletePlayer(id: string) {
    this.apiService.deletePlayer(id).subscribe(() => {
      this.loadPlayers(); // Refresca la lista de jugadores después de eliminar uno
    });
  }
}
