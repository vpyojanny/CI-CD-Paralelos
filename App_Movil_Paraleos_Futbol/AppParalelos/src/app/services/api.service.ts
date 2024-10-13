import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';  // Cambia esto por la URL de tu servidor si no está local

  constructor(private http: HttpClient) {}

  // Obtener todos los jugadores
  getPlayers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/players`).pipe(
      catchError((error) => {
        console.error('Error fetching players:', error);
        return throwError(error);
      })
    );
  }

  // Agregar un jugador
  addPlayer(player: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/players`, player);
  }

  // Actualizar un jugador
  updatePlayer(id: string, player: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/players/${id}`, player);
  }

  uploadImage(name: string, imageData: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageData);
  
    return this.http.post(`${this.apiUrl}/${name}/upload-image`, formData);
  }

  // Eliminar un jugador
  deletePlayer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/players/${id}`);
  }
  
  // Obtener todos los equipos
  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams`);
  }

  // Agregar un equipo
  addTeam(team: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teams`, team);
  }
}
