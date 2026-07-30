import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer.component';
import { ProductService } from '../../services/product.service';
import { slugToCategory } from '../../services/category-slug.util';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, ProductGridComponent, CartDrawerComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  readonly cartOpen = signal(false);

  constructor() {
    // Keep the active category in sync with the URL, e.g. /products/all
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('categorySlug');
      const category = slugToCategory(slug, this.productService.categories);
      this.productService.selectCategory(category);
    });
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }
}
