export default {
  async index(ctx) {
    const query = ctx.query.q;

    if (!query) {
      return ctx.badRequest("Query parameter `q` is required");
    }

    // Contoh: cari di 3 model (product, category, article)
    const [products, categories, articles] = await Promise.all([
      strapi.db.query("api::product.product").findMany({
        where: {
          title: { $containsi: query },
        },
        limit: 5,
      }),
      strapi.db.query("api::category.category").findMany({
        where: {
          title: { $containsi: query },
        },
        limit: 5,
      }),
      strapi.db.query("api::collection.collection").findMany({
        where: {
          title: { $containsi: query },
        },
        limit: 5,
      }),
    ]);

    const unique = (arr: any[]) =>
      Object.values(
        arr.reduce(
          (acc, item) => {
            acc[item.documentId || item.id] = item;
            return acc;
          },
          {} as Record<string, any>
        )
      );

    return {
      products: unique(products),
      categories: unique(categories),
      articles: unique(articles),
    };
  },
};
