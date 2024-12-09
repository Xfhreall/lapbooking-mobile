"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  CalendarCog,
  TriangleAlertIcon,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { type Field } from "@/lib/types";
import { FieldCard } from "@/components/ui/fieldCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldTypeFilter } from "@/components/ui/fieldType";
import atmin from "@/assets/atmin.svg";
import stadiun from "@/assets/lapangan.svg";
import Link from "next/link";

function useFieldsEffect() {
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //1
    const fetchFields = async () => {
      try {
        //1
        let dataLapangan: Field[] = []; //2
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000)); //3
        if (typeof window !== "undefined" && window.localStorage) {
          //4
          const storedFields = localStorage.getItem("fields"); //5
          if (storedFields) {
            //6
            dataLapangan = JSON.parse(storedFields); //7
          }
        }
        setFields(dataLapangan); //8
        setError(null);
      } catch (err) {
        console.error("Error fetching fields:", err); //9
        setError(
          "Failed to load field data. Please check your internet connection and try again."
        ); //10
        setFields([]); //11
      }
    };

    fetchFields();
  }, []);

  return { fields, error, setFields };
}

export default function Kelola() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("Badminton");
  const { fields, error, setFields } = useFieldsEffect();
  if (error) {
    return (
      <Alert variant="destructive">
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const filteredFields = fields.filter(
    (field) => field.type.toLowerCase() === selectedType.toLowerCase()
  );

  const handleEdit = (id: string) => {
    router.push(`/lapangan/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Anda yakin ingin menghapus lapangan ini?")) {
      //1
      try {
        // Simulate API call to delete from database
        const response = await fetch(`/api/fields/${id}`, { method: "DELETE" }); //2
        if (!response.ok) throw new Error("Failed to delete field"); //3

        const updatedFields = fields.filter((field) => field.id !== id); //4
        localStorage.setItem("fields", JSON.stringify(updatedFields)); //4
        setFields(updatedFields); //5
      } catch (error) {
        console.error("Error deleting field:", error); //6
        alert("Gagal menghapus lapangan. Periksa koneksi internet Anda."); //6
      }
    } else {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={atmin}
              alt="Admin"
              fill
              className="object-cover border-2 rounded-full border-blue"
            />
          </div>
          <div>
            <h1 className="font-semibold">Kelola Lapangan</h1>
            <p className="text-sm text-muted-foreground">Admin Muzan</p>
          </div>
        </div>
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <CalendarCog
            className="h-full w-full p-2 text-blue"
            onClick={() => alert("coming soon")}
          />
        </div>
      </header>
      <div className="relative h-64 w-full">
        <Image
          src={stadiun}
          alt="Stadium"
          fill
          className="object-cover brightness-90"
        />
        <div className="bg-black/20 absolute h-10 w-10 left-4 top-4 rounded-xl border flex items-center justify-center">
          <Link href="/dashboard">
            <ChevronLeft className="h-8 w-8 text-white" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0  text-white bg-gradient-to-t from-[#0E3755]/20 to-[#138C57]/30 mx-auto w-64 rounded-t-3xl h-16 flex justify-center items-center gap-2">
          <div>
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Lapangan TWICE</h2>
            <h2 className="text-xs font-light">Jl. Merdeka No. 12, Malang</h2>
          </div>
        </div>
      </div>
      <div className="p-4">
        <FieldTypeFilter
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        <div className="mt-6 space-y-4">
          {filteredFields.length > 0 ? (
            filteredFields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              Tidak ada lapangan yang terdaftar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
