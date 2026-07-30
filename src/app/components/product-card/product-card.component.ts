import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private readonly cartService = inject(CartService);

  addToCart(): void {
    this.cartService.add(this.product);
  }
}
