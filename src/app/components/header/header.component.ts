import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  @Output() cartToggle = new EventEmitter<void>();

  readonly itemCount = this.cartService.itemCount;
  searchTerm = '';

  onSearchInput(): void {
    this.productService.setSearchTerm(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.productService.clearSearch();
  }
}
