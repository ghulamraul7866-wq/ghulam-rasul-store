/** Turns "Home & Kitchen" into "home-and-kitchen" for use in the route path. */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Resolves a route slug back to the matching category name, defaulting to "All". */
export function slugToCategory(slug: string | null, categories: string[]): string {
  if (!slug) {
    return categories[0];
  }
  const match = categories.find((category) => categoryToSlug(category) === slug.toLowerCase());
  return match ?? categories[0];
}
