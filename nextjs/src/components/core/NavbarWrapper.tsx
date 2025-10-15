import { getMenus } from "@/services/menuServices";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const menus = await getMenus();
  console.log(menus);
  return <Navbar menus={menus} />;
}
