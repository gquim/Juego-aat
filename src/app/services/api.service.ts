import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://dog.ceo/api/breed/beagle/images/random/message'
  constructor(private http: HttpClient) { }
   
  getImages(numPairs: number): Observable<string[]> {
    const requests = [];
    for (let i = 0; i < numPairs; i++) {
      requests.push(this.http.get<any>(this.url));
    }
    return forkJoin(requests).pipe(
      map(responses => responses.map(response => response.message))
    );
  }
}