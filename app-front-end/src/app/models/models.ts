//Los signos de interrogación es para que sean opcionales al hacer la llamada

export interface ProductModel {
  codigo?: string;
  descripcion?: string;
  categoria?: string;
  proveedor?: string;
  provDescr?: string;
  precio?: number;
}

export interface CountryModel{
  name?: string;
  capital?: string;
  region?: string;
  population?: string;
  flag?:string;
  currencies?: string;
}

