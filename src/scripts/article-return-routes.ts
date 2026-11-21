// Named JSON imports keep source/manifest paths out of the browser bundle.
// Fictional descriptors live outside this glob; /design/ stays preview-only.
export const articleReturnRoutes = Object.values(import.meta.glob('/checks/article-pages/**/*.json', {
  eager: true,
  import: 'route',
})) as string[];
