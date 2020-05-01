import { Component, OnInit } from '@angular/core';
import { CountryModel } from 'src/app/models/models';
import { CountryService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styles: []
})
export class CountriesComponent implements OnInit {

  muestraPaises: CountryModel[]=[];
  muestraMoneda: CountryModel[]=[];

  constructor(private countriesSrv: CountryService) { 
    this.countriesSrv.getByName('').subscribe((data: CountryModel[])=> {
      this.muestraPaises = data;

    this.countriesSrv.getByCurrency('').subscribe((data: CountryModel[])=>{
      this.muestraMoneda=data;
    })
    });
  }

  ngOnInit() {
  }

}
