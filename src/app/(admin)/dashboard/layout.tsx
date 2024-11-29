import React from "react";
import Navbar from "@/components/ui/navbar";
import Dashboard from "./page";

const Layout = () => {
  return (
    <main className="w-full relative">
      <Navbar />
      <Dashboard />
    </main>
  );
};

export default Layout;
