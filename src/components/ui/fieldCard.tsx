import Image from "next/image";
import { Calendar, Edit, Trash } from "lucide-react";

import { Card } from "@/components/ui/card";
import { type Field } from "@/lib/types";

interface FieldCardProps {
  field: Field;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FieldCard({ field, onEdit, onDelete }: FieldCardProps) {
  return (
    <Card className="flex overflow-hidden">
      <div className="relative h-24 w-24 flex-shrink-0">
        {field.image ? (
          <Image
            src={field.image}
            alt={field.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>
      <div className="flex flex-1 items-start justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-semibold">{field.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{new Date(field.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-muted-foreground">Booking Slot: 0/8</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(field.id)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}