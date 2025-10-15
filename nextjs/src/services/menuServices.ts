import { getStrapiData } from "@/lib/strapi";
import { Menu, Submenu } from "@/type";
import qs from "qs";

export async function getMenus(): Promise<Menu[]> {
  // 1️⃣ Ambil data menus dari Strapi
  const query = qs.stringify(
    {
      populate: {
        submenus: true,
      },
      sort: ["order:asc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await getStrapiData<{ data: Menu[] }>(`/menus?${query}`);
  if (!res?.data || !Array.isArray(res.data)) return [];

  let menus = res.data;

  const [collectionsRes, categoriesRes] = await Promise.all([
    getStrapiData<{ data: any[] }>("/collections"),
    getStrapiData<{ data: any[] }>("/categories"),
  ]);

  const collections = collectionsRes?.data ?? [];
  const categories = categoriesRes?.data ?? [];

  const formattedMenus: Menu[] = menus.map((menu) => {
    let submenus: Submenu[] = [];

    if (menu.title.toLowerCase() === "collections") {
      submenus = collections.map((item) => ({
        id: item.id,
        title: item.title || item.name,
        href: `/collections/${item.slug || item.id}`,
      }));
    } else if (menu.title.toLowerCase() === "categories") {
      submenus = categories.map((item) => ({
        id: item.id,
        title: item.title || item.name,
        href: `/categories/${item.slug || item.id}`,
      }));
    } else if (menu.submenus?.length) {
      submenus = menu.submenus.map((sub: any) => ({
        id: sub.id,
        title: sub.title,
        href: sub.href.startsWith("/") ? sub.href : `/${sub.href}`,
      }));
    }

    return {
      id: menu.id,
      title: menu.title,
      href: menu.href,
      order: menu.order,
      submenus,
    };
  });

  return formattedMenus;
}
