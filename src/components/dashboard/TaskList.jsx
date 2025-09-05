import Image from "next/image";
import { Button } from "../ui/button";
import { FileDown, Plus } from "lucide-react";

export default function TaskList({ tasks }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="font-semibold mb-3 text-xl">Kelola Perbaikan Anda</h2>

      {tasks?.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          Belum ada perbaikan yang dikerjakan.
        </p>
      )}

      <div className="space-y-3">
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded"
          >
            <Image src={"/hp.png"} width={50} height={50} alt="Photo Device" />
            <div className="flex-1">
              <p className="font-semibold">
                {task.customer} - {task.device}
              </p>
              <p className="text-sm text-gray-500">{task.damage}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                  task.status === "diterima"
                    ? "bg-blue-100 text-blue-700"
                    : task.status === "diperbaiki"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "menunggu pembayaran"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
