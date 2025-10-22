"use client";

import { Menu } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu as MenuIcon, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ menus }: { menus: Menu[] }) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedMenus = [...menus].sort((a, b) => a.order - b.order);

  // Toggle search bar dan mobile menu agar tidak terbuka bersamaan
  const handleToggleSearch = () => {
    if (mobileOpen) setMobileOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const handleToggleMobile = () => {
    if (searchOpen) setSearchOpen(false);
    setMobileOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* ===== TOP BAR ===== */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6 relative">
        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={handleToggleMobile}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>

        {/* Spacer untuk seimbang */}
        <div className="hidden md:block w-6" />

        {/* Logo */}
        <div className="w-48 md:w-auto">
          <Link href="/">
            <Image
              src="/zarifa_name.png"
              alt="Logo"
              width={500}
              height={500}
              className="w-full h-auto md:h-5"
            />
          </Link>
        </div>

        {/* Search Icon */}
        <div className="flex items-center text-gray-700">
          <button onClick={handleToggleSearch}>
            {searchOpen ? (
              <X className="w-5 h-5 cursor-pointer hover:text-black" />
            ) : (
              <Search className="w-5 h-5 cursor-pointer hover:text-black" />
            )}
          </button>
        </div>
      </div>

      {/* ===== DESKTOP MENU ===== */}
      <nav className="hidden md:flex justify-center items-center space-x-7 text-xs tracking-wider uppercase font-medium text-gray-800 py-2">
        {sortedMenus.map((menu) => {
          const hasSubmenu =
            Array.isArray(menu.submenus) && menu.submenus.length > 0;

          return (
            <div
              key={menu.id}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(menu.title)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                href={menu.href || "#"}
                className="flex items-center gap-1 relative"
              >
                <span className="hover:text-black transition-colors flex items-center gap-1 py-2">
                  {menu.title}
                  {hasSubmenu && <ChevronDown className="w-3 h-3 mt-[1px]" />}
                </span>
                <span className="absolute left-0 -bottom-[2px] h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Dropdown Submenu */}
              <AnimatePresence>
                {hasSubmenu && hoveredMenu === menu.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 bg-white border shadow-sm py-2 min-w-[160px] z-50"
                  >
                    {menu.submenus.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#4B1E32] transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
      {/* ===== SEARCH BAR ===== */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-50 border-t border-gray-200 px-6 py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-800" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-800"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="flex flex-col px-6 py-3 space-y-2 text-sm tracking-wider h-screen">
              {sortedMenus.map((menu) => {
                const hasSubmenu =
                  Array.isArray(menu.submenus) && menu.submenus.length > 0;

                return (
                  <div key={menu.id}>
                    <div
                      className="flex justify-between items-center py-2 font-medium text-gray-800 border-b border-gray-100 cursor-pointer"
                      onClick={() =>
                        setOpenSubmenu(
                          openSubmenu === menu.title ? null : menu.title
                        )
                      }
                    >
                      <Link
                        href={menu.href || "#"}
                        onClick={() => setMobileOpen(false)}
                      >
                        {menu.title}
                      </Link>
                      {hasSubmenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openSubmenu === menu.title ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    <AnimatePresence>
                      {hasSubmenu && openSubmenu === menu.title && (
                        <motion.div
                          key={menu.title}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="ml-4 mt-1 flex flex-col overflow-hidden"
                        >
                          {menu.submenus.map((sub) => (
                            <Link
                              key={sub.id}
                              href={sub.href}
                              className="py-2 pl-2 font-medium text-gray-800 hover:text-[#4B1E32] transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
