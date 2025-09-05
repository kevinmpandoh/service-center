export default function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg px-4 py-6 shadow flex flex-col gap-3">
      <h3 className="text-gray-600 text-base">{title}</h3>
      <div className="flex gap-3 items-center">
        <div className="bg-slate-200 p-2 rounded-full">
          {Icon && <Icon className="w-6 h-6 text-slate-600" />}
        </div>
        <div>
          <p className="text-3xl font-semibold">{value || 0}</p>
        </div>
      </div>
    </div>
  );
}
