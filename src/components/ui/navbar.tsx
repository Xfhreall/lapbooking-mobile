"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Kelola Lapangan",
      icon: "fluent:home-32-regular",
      href: "/lapangan/kelola",
    },
    { name: "", icon: "charm:plus", href: "/lapangan/tambah" },
    { name: "Cek Laporan", icon: "iconoir:calendar", href: "/cek" },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full h-20 bg-white rounded-t-3xl px-14 flex justify-center items-center shadow-[0_-6px_6px_-1px_rgba(0,0,0,0.1)]">
      <ul className="flex justify-center gap-12 w-full text-xs">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/parkeer");
          return (
            <li
              key={item.name}
              className={`${
                item.icon === "charm:plus" ? "relative" : ""
              } h-max`}
            >
              <Link href={item.href}>
                <div
                  className={`grid items-center justify-center gap-1 ${
                    isActive ? "text-blue" : "text-neutral-300"
                  }`}
                >
                  {item.icon === "charm:plus" ? (
                    <div className="relative rounded-full bg-white -mt-10 p-4 shadow-[0_-6px_6px_-1px_rgba(0,0,0,0.1)]">
                      <div className="bg-blue rounded-full p-4">
                        <Icon
                          icon={item.icon}
                          width={26}
                          height={26}
                          className="relative z-10 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <Icon
                      icon={item.icon}
                      width={26}
                      height={26}
                      className="mx-auto"
                    />
                  )}
                  <p className="text-center">{item.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
