interface MonogramProps {
  size?: number;
  className?: string;
}

const Monogram = ({ size = 44, className = "" }: MonogramProps) => {
  return (
    <span
      className={`luxury-monogram ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-label="Validate monogram"
    >
      V
    </span>
  );
};

export default Monogram;
