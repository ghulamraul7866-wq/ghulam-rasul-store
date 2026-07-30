import { Injectable, signal, computed } from '@angular/core';
import { CartLine, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _lines = signal<CartLine[]>([]);

  readonly lines = this._lines.asReadonly();

  readonly itemCount = computed(() =>
    this._lines().reduce((sum, line) => sum + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this._lines().reduce((sum, line) => sum + line.quantity * line.product.price, 0),
  );

  add(product: Product): void {
    if (!product.inStock) {
      return;
    }
    this._lines.update((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);
      if (existing) {
        return lines.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...lines, { product, quantity: 1 }];
    });
  }

  remove(productId: string): void {
    this._lines.update((lines) => lines.filter((line) => line.product.id !== productId));
  }

  clear(): void {
    this._lines.set([]);
  }
}
