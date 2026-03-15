export default function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label className="block font-sans text-[10px] uppercase tracking-widest text-forage-muted mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-sans text-[10px] text-forage-red mt-0.5">{error}</p>
      )}
    </div>
  );
}
