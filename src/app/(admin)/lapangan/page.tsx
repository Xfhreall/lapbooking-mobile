"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { type Field } from "@/lib/types";
import { FieldCard } from "@/components/ui/fieldCard";
import { FieldTypeFilter } from "@/components/ui/fieldType";

export default function FieldsPage() {
  const router = useRouter();
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedType, setSelectedType] = useState("Badminton");

  useEffect(() => {
    const storedFields = JSON.parse(
      localStorage.getItem("fields") || "[]"
    ) as Field[];
    setFields(storedFields);
  }, []);

  const filteredFields = fields.filter(
    (field) => field.type.toLowerCase() === selectedType.toLowerCase()
  );

  const handleEdit = (id: string) => {
    router.push(`/fields/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this field?")) {
      const updatedFields = fields.filter((field) => field.id !== id);
      localStorage.setItem("fields", JSON.stringify(updatedFields));
      setFields(updatedFields);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/placeholder.svg"
              alt="Admin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold">Kelola Lapangan</h1>
            <p className="text-sm text-muted-foreground">Admin Muzan</p>
          </div>
        </div>
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <User className="h-full w-full p-2" />
        </div>
      </header>
      <div className="relative h-48 w-full">
        <Image
          src="/placeholder.svg"
          alt="Stadium"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <h2 className="text-xl font-bold">Lapangan TWICE</h2>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Jl. Merdeka No. 12, Malang</span>
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