import { getMenus } from "@/services/menuServices";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const menus = await getMenus();
  return <Navbar menus={menus} />;
}
