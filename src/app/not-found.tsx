import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "#edf4ef" }}
      >
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path
            d="M20 36 C20 36 6 27 7 14 C12 9 28 9 33 14 C34 27 20 36 20 36Z"
            fill="#4a7c5f"
            opacity="0.4"
          />
          <line x1="20" y1="36" x2="20" y2="16" stroke="#4a7c5f" strokeWidth="1.5" opacity="0.5" />
          <line x1="20" y1="28" x2="15" y2="23" stroke="#4a7c5f" strokeWidth="1.2" opacity="0.5" />
          <line x1="20" y1="23" x2="25" y2="18" stroke="#4a7c5f" strokeWidth="1.2" opacity="0.5" />
        </svg>
      </div>

      <h1 className="font-serif text-2xl text-forage-green-dark mb-2">
        Page Not Found
      </h1>
      <p className="font-sans text-sm text-forage-muted mb-8 max-w-xs leading-relaxed">
        Looks like this trail goes cold. The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="px-6 py-2.5 bg-forage-green text-white rounded-lg font-serif text-sm hover:bg-forage-green-dark transition-colors"
      >
        Back to Map
      </Link>
    </div>
  );
}
