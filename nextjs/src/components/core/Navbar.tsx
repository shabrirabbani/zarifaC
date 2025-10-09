"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SubmenuItem = {
  title: string;
  href: string;
};

type MenuItem = {
  title: string;
  href: string;
  submenu?: SubmenuItem[];
};

export default function Navbar() {
  const menus: MenuItem[] = [
    { title: "HOME", href: "/" },
    {
      title: "COLLECTION",
      href: "/collections",
      submenu: [
        { title: "Bags", href: "/collections/bags" },
        { title: "Kids Collection", href: "/collections/kids" },
        { title: "Accessories", href: "/collections/accessories" },
      ],
    },
    { title: "GALLERY", href: "/gallery" },
    { title: "ABOUT", href: "/about" },
    {
      title: "CONTACT",
      href: "/contact",
    },
  ];

  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* ===== TOP BAR ===== */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6 relative">
        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Spacer untuk seimbang */}
        <div className="hidden md:block w-6" />

        {/* Centered logo */}
        <div>
          <Link href="/">
            <span className="font-semibold text-2xl md:text-4xl tracking-wide ">
              Zarifa
            </span>
          </Link>
        </div>

        {/* User Icon */}
        <div className="flex items-center text-gray-700">
          <Search className="w-6 h-6 cursor-pointer hover:text-black" />
        </div>
      </div>

      {/* ===== DESKTOP MENU ===== */}
      <nav className="hidden md:flex justify-center items-center space-x-7 text-xs tracking-wide uppercase font-medium text-gray-800 py-2">
        {menus.map((menu) => (
          <div
            key={menu.title}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(menu.title)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link href={menu.href} className="flex items-center gap-1 relative">
              <span className="hover:text-black transition-colors flex items-center gap-1 py-2">
                {menu.title}
                {menu.submenu && <ChevronDown className="w-3 h-3 mt-[1px]" />}
              </span>
              {/* animasi border bawah */}
              <span className="absolute left-0 -bottom-[2px] h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Dropdown submenu */}
            <AnimatePresence>
              {menu.submenu && hoveredMenu === menu.title && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 bg-white shadow-sm rounded-none py-2 min-w-[150px] z-50"
                >
                  {menu.submenu.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#4B1E32] transition-colors"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <div className="flex flex-col px-6 py-3 space-y-2 text-sm">
              {menus.map((menu) => (
                <div key={menu.title}>
                  <div
                    className="flex justify-between items-center py-2 font-medium text-gray-800 border-b border-gray-100 cursor-pointer"
                    onClick={() =>
                      setOpenSubmenu(
                        openSubmenu === menu.title ? null : menu.title
                      )
                    }
                  >
                    <Link href={menu.href}>{menu.title}</Link>
                    {menu.submenu && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === menu.title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {menu.submenu && openSubmenu === menu.title && (
                      <motion.div
                        key={menu.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-4 mt-1 flex flex-col border-l border-gray-100 overflow-hidden"
                      >
                        {menu.submenu.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="py-1 pl-2 text-gray-600 hover:text-[#4B1E32] transition-colors"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
