// Imports Angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Imports Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { CountriesComponent } from './components/countries/countries.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Inicio', icon: 'fa-home' } },
    { path: 'about', component: AboutComponent, data: { title: 'Acerca de', icon: 'fas fa-building' } },
    {path: 'countries', component: CountriesComponent},
    { 
        path: 'products', 
        component: ProductsComponent,
        children: [
            { path: 'cars', component: CarsComponent },
            { path: 'categories/:category', component: CategoriesComponent, data: { title: 'Productos', icon: '' } }
        ],
        data: {title: 'Productos', icon:'fa-shopping-basket'}
    },
    { path: 'product/:code/:category', component: ProductComponent },
    {path: 'search/:criterio', component: SearchComponent},
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: '**', component: PageNotFoundComponent },
];


//data: { title: 'Productos', icon: '' }

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
