import PawMark from "./paw-mark";

export default function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      wufú
      <span className="brand-logo-mark" aria-hidden="true">
        <PawMark small />
      </span>
    </span>
  );
}
