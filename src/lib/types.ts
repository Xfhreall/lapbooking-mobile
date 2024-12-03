import { z } from "zod";

export const fieldSchema = z.object({
  name: z.string().min(3, "Nama lapangan minimal 3 karakter"),
  type: z.string().min(1, "Jenis lapangan harus diisi"),
  pricePerHour: z.string().min(1, "Harga sewa harus diisi"),
  operationalHours: z.string().min(1, "Jam operasional harus diisi"),
  image: z.string(),
  phoneNumber: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(13, "Nomor telepon maksimal 13 digit"),
});

export type FieldFormValues = z.infer<typeof fieldSchema>;

export type Field = FieldFormValues & {
  id: string;
  createdAt: string;
};
