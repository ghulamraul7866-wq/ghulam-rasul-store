import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CATEGORIES, PRODUCTS } from '../data/products.data';
import { categoryToSlug } from './category-slug.util';

export const ALL_CATEGORY = 'All';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>(PRODUCTS);
  private readonly _selectedCategory = signal<string>(ALL_CATEGORY);
  private readonly _searchTerm = signal<string>('');

  readonly categories = [ALL_CATEGORY, ...CATEGORIES];
  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly selectedCategorySlug = computed(() => categoryToSlug(this._selectedCategory()));

  /** Products filtered by the active category and the current search term. */
  readonly visibleProducts = computed<Product[]>(() => {
    const category = this._selectedCategory();
    const term = this._searchTerm().trim().toLowerCase();

    return this._products().filter((product) => {
      const matchesCategory = category === ALL_CATEGORY || product.category === category;
      const matchesTerm =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  });

  /** Count of products per category, used for the sidenav badges. */
  readonly countsByCategory = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const category of this.categories) {
      counts[category] =
        category === ALL_CATEGORY
          ? this._products().length
          : this._products().filter((p) => p.category === category).length;
    }
    return counts;
  });

  selectCategory(category: string): void {
    this._selectedCategory.set(category);
  }

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    // A live search term overrides category browsing so results feel global.
    if (term.trim().length > 0) {
      this._selectedCategory.set(ALL_CATEGORY);
    }
  }

  clearSearch(): void {
    this._searchTerm.set('');
  }
}
