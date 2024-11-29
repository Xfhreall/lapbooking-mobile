import Navbar from "@/components/ui/navbar";
import React from "react";

const layoutAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layoutAdmin;
