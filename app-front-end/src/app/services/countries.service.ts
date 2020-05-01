import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryModel } from '../models/models';
import { Observable } from 'rxjs';

const URL_COUNTRIES = 'https://angular-autosjl.firebaseio.com/paises.json';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { 

  }

  getAll() {
    return this.http.get(URL_COUNTRIES);
  }

  getByName(name: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:CountryModel[]) => {
        const filter = data.filter(item => item.name == name || item.name.indexOf(name) >= 0);
        observer.next(filter);
      });
    });
  }

  getByCurrency(currency: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:CountryModel[]) => {
        const filter = data.filter(item => item.currencies == currency || item.currencies.indexOf(currency) >= 0);
        observer.next(filter);
      });
    });
}
}
