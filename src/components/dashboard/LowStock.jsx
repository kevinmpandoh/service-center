import Image from "next/image";
import { Button } from "../ui/button";
import { FileDown, Plus } from "lucide-react";

export default function LowStock({ spareparts }) {
  console.log(spareparts, "SPAREPARTNYA");
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="font-semibold mb-3 text-xl">Kelola Perbaikan Anda</h2>

      {spareparts?.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          Belum ada perbaikan yang dikerjakan.
        </p>
      )}

      <div className="space-y-3">
        {spareparts?.map((sparepart, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded"
          >
            <Image src={"/hp.png"} width={50} height={50} alt="Photo Device" />
            <div className="flex-1">
              <p className="font-semibold">{sparepart.name}</p>
              <p
                className={`text-sm  ${
                  sparepart.stock === 0 ? "text-error-600" : "text-warning-600"
                }`}
              >
                {sparepart.stock === 0
                  ? "Stok sudah habis"
                  : `Stok sisa ${sparepart.stock} unit`}
              </p>
            </div>
            {/* <div className="flex flex-col items-end gap-2">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                  sparepart.stock <= 3
                    ? "bg-orange-100 text-orange-700"
                    : sparepart.stock === 0
                    ? "bg-yellow-100 text-yellow-700"
                    : ""
                }`}
              >
                {sparepart.stock}
              </span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
