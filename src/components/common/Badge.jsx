function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-cream px-3 py-1 text-xs font-medium text-forest ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
