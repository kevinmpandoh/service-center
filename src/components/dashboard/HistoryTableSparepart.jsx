import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryTableSparepart({ data, isLoading }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-3">
        Riwayat Sparepart yang digunakan Hari ini
      </h2>
      {data.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <h1>Data belum Ada</h1>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Sparepart</TableHead>
              <TableHead>Teknisi</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Jumlah Stok</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.technician}</TableCell>
                  <TableCell>{item.sellingPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rp {item.total.toLocaleString("id-ID")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        // <table className="w-full text-sm border">
        //   <thead className="bg-gray-100">
        //     <tr>
        //       <th className="border px-3 py-2">No</th>
        //       <th className="border px-3 py-2">Nama Sparepart</th>
        //       <th className="border px-3 py-2">Teknisi</th>
        //       <th className="border px-3 py-2">Harga</th>
        //       <th className="border px-3 py-2">Jumlak Stok</th>
        //       <th className="border px-3 py-2">Total</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {data?.map((item, i) => (
        //       <tr key={i}>
        //         <td className="border px-3 py-2 text-center">{i + 1}</td>
        //         <td className="border px-3 py-2">{item.name}</td>
        //         <td className="border px-3 py-2">
        //           <p className="font-medium">{item.technician}</p>
        //           <p className="text-xs text-gray-500">{item.phone || ""}</p>
        //         </td>
        //         <td className="border px-3 py-2">{item.stock}</td>
        //         <td className="border px-3 py-2">
        //           {item?.sellingPrice || "-"}
        //         </td>
        //         <td className="border px-3 py-2">{item.quantity}</td>
        //         <td className="border px-3 py-2">
        //           Rp {item.total?.toLocaleString()}
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      )}
    </div>
  );
}
