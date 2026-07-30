import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  private readonly cartService = inject(CartService);

  readonly lines = this.cartService.lines;
  readonly subtotal = this.cartService.subtotal;

  remove(productId: string): void {
    this.cartService.remove(productId);
  }

  close(): void {
    this.closed.emit();
  }
}
