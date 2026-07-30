import { Routes } from '@angular/router';
import { StoreComponent } from './pages/store/store.component';

export const routes: Routes = [
  { path: 'products/:categorySlug', component: StoreComponent },
  { path: '', redirectTo: 'products/all', pathMatch: 'full' },
  { path: '**', redirectTo: 'products/all' },
];
