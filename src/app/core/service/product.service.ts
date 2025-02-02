import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  getMealsByName(name: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}search.php?s=${name}`);
  }

  getMealById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}lookup.php?i=${id}`);
  }

  getRandomMeal(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}random.php`);
  }

  getMealsByCategory(category: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}filter.php?c=${category}`);
  }
  getAllMealsByArea(): Observable<any> {
    const countries = ['Japanese', 'Croatian', 'Turkish', 'Turkish', 'Egyptian', 'Filipino', 'Chinese', 'Tunisian',
      'American', 'Italian', 'Canadian', 'Italian', 'Egyptian', 'Canadian', 'American', 'Dutch', 'Greek', 'Egyptian', 'British', 'Dutch', 'French', 'British', 'Italian', 'Malaysian','British'];
    const requests = countries.map(country =>
      this._HttpClient.get(`${this.apiUrl}filter.php?a=${country}`).pipe(
        map((res: any) => (res.meals?.length ? { country, meal: res.meals[0] } : null))
      )
    );
    return forkJoin(requests);
  }

}


