import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage {
  player = {
    name: '',
    position: '',
    team_id: 0,
  };
  playerImage: string | undefined;

  constructor(private apiService: ApiService, private router: Router, private camera:Camera) {}

  /*addPlayer() {
    this.apiService.addPlayer(this.player).subscribe(() => {
      this.router.navigate(['/players']); // Navega de vuelta a la lista de jugadores después de agregar
    });
  }*/
    addPlayer() {
      this.player.team_id = Number(this.player.team_id);
      this.apiService.addPlayer(this.player).subscribe({
        next: () => {
          this.router.navigate(['/players']);
        },
        error: (err) => {
          console.error('Error al agregar jugador:', err);
          // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
        }
      });
    }
    takePicture() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
    
      this.camera.getPicture(options).then((imageData) => {
        this.playerImage = 'data:image/jpeg;base64,' + imageData;
        this.apiService.uploadImage(this.player.name, this.playerImage).subscribe();
      }, (err) => {
        console.error('Camera error: ', err);
      });
    }   
}
