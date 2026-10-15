export default function PawMark({
  light = false,
  small = false,
}: {
  light?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className={`paw ${small ? "small" : ""} ${light ? "light" : ""}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <b />
    </span>
  );
}
