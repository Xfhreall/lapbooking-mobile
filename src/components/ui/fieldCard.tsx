import Image from "next/image";
import { Calendar, Edit, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { type Field } from "@/lib/types";

interface FieldCardProps {
  field: Field;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FieldCard({ field, onEdit, onDelete }: FieldCardProps) {
  return (
    <Card className="flex overflow-hidden items-center px-1 bg-neutral-100">
      <div className="relative h-24 w-24 flex-shrink-0">
        {field.image ? (
          <Image
            src={field.image}
            alt={field.name}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>
      <div className="flex flex-1 items-start justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-semibold">{field.name}</h3>
          <div className="flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{new Date(field.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-xs">Booking Slot: 0/8</p>
        </div>
        <div className="flex">
          <button
            onClick={() => onEdit(field.id)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>
    </Card>
  );
}
