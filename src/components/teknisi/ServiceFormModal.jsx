import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "@/services/masterData.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const jasaSchema = yup.object({
  serviceItem: yup.string().nullable(),
  customServiceName: yup.string().nullable(),
  customPrice: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .when(
      ["customServiceName", "tabValue"],
      ([customServiceName, tabValue], schema) => {
        if (
          tabValue === "manual" &&
          customServiceName &&
          customServiceName.length > 0
        ) {
          return schema.required(
            "Harga wajib diisi jika nama jasa manual diisi"
          );
        }
        return schema;
      }
    ),
  tabValue: yup.string().oneOf(["serviceItem", "manual"]).required(),
});

export default function JasaFormModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const [tabValue, setTabValue] = useState("serviceItem");
  const { data: serviceItems = [], isLoading } = useQuery({
    queryKey: ["service-items"],
    queryFn: masterDataService.getServiceItems,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jasaSchema),
    defaultValues: defaultValues || {
      serviceItem: "",
      customServiceName: "",
      customPrice: "",
      tabValue: "serviceItem", // penting!
    },
  });
  const serviceItem = watch("serviceItem");

  useEffect(() => {
    if (defaultValues) {
      reset({
        serviceItem: "",
        customServiceName: "",
        customPrice: "",
        tabValue: "serviceItem",
        ...defaultValues,
      });
      setTabValue(defaultValues.customServiceName ? "manual" : "serviceItem");
    }
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    const payload = {
      type: "jasa",
      serviceItem: tabValue === "serviceItem" ? data.serviceItem : undefined,
      customServiceName:
        tabValue === "manual" ? data.customServiceName : undefined,
      customPrice: tabValue === "manual" ? Number(data.customPrice) : undefined,
      id: defaultValues?.id,
    };
    onSubmit(payload);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Edit Jasa" : "Tambah Jasa"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex border rounded-lg overflow-hidden mb-4">
          <button
            type="button"
            onClick={() => setTabValue("serviceItem")}
            className={cn(
              "flex-1 py-2 text-sm font-medium",
              tabValue === "serviceItem"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            Pilih Service Item
          </button>
          <button
            type="button"
            onClick={() => setTabValue("manual")}
            className={cn(
              "flex-1 py-2 text-sm font-medium",
              tabValue === "manual"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            Isi Manual
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Pilih service item */}
          {tabValue === "serviceItem" && (
            <div>
              <Select
                onValueChange={(val) => setValue("serviceItem", val)}
                value={serviceItem || ""} // ✅ reactive
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Pilih service item" />
                </SelectTrigger>
                <SelectContent>
                  {serviceItems.map((item, index) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name} - Rp {item.price.toLocaleString("id-ID")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceItem && (
                <p className="text-red-500 text-sm">
                  {errors.serviceItem.message}
                </p>
              )}
            </div>
          )}

          {tabValue === "manual" && (
            <div className="space-y-2">
              <Input
                {...register("customServiceName")}
                placeholder="Nama jasa manual"
              />
              {errors.customServiceName && (
                <p className="text-red-500 text-sm">
                  {errors.customServiceName.message}
                </p>
              )}

              <Input
                {...register("customPrice")}
                type="number"
                placeholder="Harga manual"
              />
              {errors.customPrice && (
                <p className="text-red-500 text-sm">
                  {errors.customPrice.message}
                </p>
              )}
            </div>
          )}

          <Button type="submit">
            {defaultValues?.id ? "Update" : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
