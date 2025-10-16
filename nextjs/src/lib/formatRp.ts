export function formatRupiah(value: number | string): string {
  if (value === null || value === undefined || value === "") return "Rp 0";

  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "Rp 0";

  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}
