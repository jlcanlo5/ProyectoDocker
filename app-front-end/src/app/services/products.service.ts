import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/models';
import { Observable } from 'rxjs';

const URL_PRODUCTS = 'api.midominio.com';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 

  }

  getAll() {
    return this.http.get(URL_PRODUCTS);
  }

  getByCategory(category: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:ProductModel[]) => {
        const filter = data.filter(item => item.categoria == category || item.categoria.indexOf(category) >= 0);
        observer.next(filter);
      });
    });
  }

  getByCode(code: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:ProductModel[]) => {
        const filter = data.filter(item => item.codigo == code);
        observer.next(filter[0]);
      });
    });
  }

  getBySearch(searching: string){
    return new Observable(observer => {
      this.getAll().subscribe((data:ProductModel[]) => {
        const filter = data.filter(item => item.descripcion.toLowerCase() == searching.toLowerCase() || item.descripcion.toLowerCase().includes(searching));
        observer.next(filter);
      });
    });
  }
}

