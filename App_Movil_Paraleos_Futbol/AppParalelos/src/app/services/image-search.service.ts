import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {
  private apiKey = 'AIzaSyA5YbyPZsUS1fRwaACV7eR9-piofSzwEXI';
  private cx = 'f4bdb84b6b12c4ebd';
  private apiUrl = `https://www.googleapis.com/customsearch/v1`;

  constructor(private http: HttpClient) {}

  searchImages(query: string): Observable<any> {
    const params = {
      q: query,
      searchType: 'image',
      cx: this.cx,
      key: this.apiKey
    };
    return this.http.get(this.apiUrl, { params });
  }
}
