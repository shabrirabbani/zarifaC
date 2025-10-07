// lib/getMenus.ts
export async function getMenus() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/menus?populate=parent`
  );
  const { data } = await res.json();

  // pisahkan parent dan child
  const parents = data.filter((m: any) => m.attributes.parent?.data === null);
  const children = data.filter((m: any) => m.attributes.parent?.data !== null);

  // kelompokkan child berdasarkan parent
  const menuTree = parents.map((parent: any) => ({
    id: parent.id,
    title: parent.attributes.title,
    slug: parent.attributes.slug,
    children: children
      .filter((child: any) => child.attributes.parent?.data?.id === parent.id)
      .map((child: any) => ({
        id: child.id,
        title: child.attributes.title,
        slug: child.attributes.slug,
      })),
  }));

  return menuTree;
}
