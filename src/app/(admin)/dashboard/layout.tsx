import React from "react";
import Cek from "../cek/page";
import Kelola from "../kelola/page";
import Tambah from "../tambah/page";
import Navbar from "@/components/ui/navbar";

const Layout = () => {
  return (
    <main className="w-full relative">
      <Navbar />
      <Cek />
      <Kelola />
      <Tambah />
    </main>
  );
};

export default Layout;
