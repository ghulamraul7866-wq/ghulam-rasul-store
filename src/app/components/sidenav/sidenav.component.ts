import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { categoryToSlug } from '../../services/category-slug.util';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly categories = this.productService.categories;
  readonly selectedCategory = this.productService.selectedCategory;
  readonly countsByCategory = this.productService.countsByCategory;

  select(category: string): void {
    this.router.navigate(['/products', categoryToSlug(category)]);
  }
}
