import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  product: ProductModel[] = [];
  searching: string='';

  constructor(private router: ActivatedRoute, private productSvc: ProductsService,
    private route2: Router) { 
    this.router.params.subscribe(params => {
      this.searching = params['criterio'];
      this.productSvc.getBySearch(this.searching).subscribe((data: ProductModel[])=> {
        this.product = data;
      })
    })
  }

  ngOnInit() {
  }

  metodoSearch(event: number){
    console.log(event);
    this.route2.navigate(['/about'])
  }

}
