import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService, ALL_CATEGORY } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
})
export class ProductGridComponent {
  private readonly productService = inject(ProductService);

  readonly products = this.productService.visibleProducts;
  readonly selectedCategory = this.productService.selectedCategory;
  readonly searchTerm = this.productService.searchTerm;
  readonly allCategory = ALL_CATEGORY;
}
