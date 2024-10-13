import { Component } from '@angular/core';
import { ImageSearchService } from '../services/image-search.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.page.html',
  styleUrls: ['./image-search.page.scss'],
})
export class ImageSearchPage {
  query: string = '';
  images: any[] = [];
  player = {
    name: '',
    position: '',
    team_id: 0,
  };

  constructor(private apiService: ApiService, private imageSearchService: ImageSearchService) {}

  searchImages() {
    if (this.query.trim()) {
      this.imageSearchService.searchImages(this.query).subscribe((data) => {
        this.images = data.items.map((item: string) => item.link); // Obtener las URLs de las imágenes
      });
    }
  }

  selectImage(imageUrl: string) {
    this.apiService.uploadImage(this.player.name, imageUrl).subscribe(() => {
      console.log('Imagen subida y asociada al jugador');
    });
  }
  
}
