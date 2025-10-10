import { getStrapiData } from "@/lib/strapi";
import { Menu } from "@/type";

export async function getMenus() {
  const res = await getStrapiData<Menu>("/menus?populate=submenus");

  if (!res?.data) return [];
  return Array.isArray(res.data) ? res.data : [res.data];
}
