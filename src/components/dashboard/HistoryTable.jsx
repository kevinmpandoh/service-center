export default function HistoryTable({ data }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-3">
        Riwayat Sparepart yang digunakan
      </h2>
      {data.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <h1>Data belum Ada</h1>
        </div>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Pelanggan</th>
              <th className="border px-3 py-2">Perangkat</th>
              <th className="border px-3 py-2">Kerusakan</th>
              <th className="border px-3 py-2">Estimasi Waktu Perbaikan</th>
              <th className="border px-3 py-2">Biaya</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i}>
                <td className="border px-3 py-2 text-center">{i + 1}</td>
                <td className="border px-3 py-2">
                  <p className="font-medium">{item.customer}</p>
                  <p className="text-xs text-gray-500">{item.phone}</p>
                </td>
                <td className="border px-3 py-2">{item.device}</td>
                <td className="border px-3 py-2">{item?.damage || "-"}</td>
                <td className="border px-3 py-2">{item.time}</td>
                <td className="border px-3 py-2">
                  Rp {item.cost?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
