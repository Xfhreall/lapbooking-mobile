"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fieldSchema, type FieldFormValues, type Field } from "@/lib/types";

export default function EditFieldPage() {
  const router = useRouter();
  const { id } = useParams();

  const form = useForm<FieldFormValues>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      type: "",
      pricePerHour: "",
      operationalHours: "",
      image: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const fields = JSON.parse(
      localStorage.getItem("fields") || "[]"
    ) as Field[];
    const field = fields.find((f) => f.id === id);

    if (field) {
      form.reset({
        name: field.name,
        type: field.type,
        pricePerHour: field.pricePerHour,
        operationalHours: field.operationalHours,
        image: field.image,
        phoneNumber: field.phoneNumber,
      });
    } else {
      router.push("/fields");
    }
  }, [id, form, router]);

  function onSubmit(values: FieldFormValues) {
    try {
      const fields = JSON.parse(
        localStorage.getItem("fields") || "[]"
      ) as Field[];
      const updatedFields = fields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            ...values,
            updatedAt: new Date().toISOString(),
          };
        }
        return field;
      });
      localStorage.setItem("fields", JSON.stringify(updatedFields));
      router.push("/fields");
    } catch (error) {
      console.error("Error updating field:", error);
    }
  }

  return (
    <div className="container max-w-lg px-4 py-6">
      <div className="mb-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Edit Lapangan</h1>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Isi form berikut untuk mengedit lapangan
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lapangan</FormLabel>
                <FormControl>
                  <Input placeholder="lapbooking" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Lapangan</FormLabel>
                <FormControl>
                  <Input placeholder="Badminton" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga sewa/jam</FormLabel>
                <FormControl>
                  <Input placeholder="Rp. 30.000,00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operationalHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jam operasional</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Senin 13.00 - 23.00&#10;Selasa 08.00 - 23.00&#10;Rabu 08.00 - 23.00&#10;dst..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar lapangan</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          field.onChange(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon Penanggung jawab</FormLabel>
                <FormControl>
                  <Input placeholder="08xxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
