import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-forest text-white hover:bg-bamboo hover:shadow-lg hover:shadow-forest/20',
  secondary: 'bg-transparent border border-forest text-forest hover:bg-forest hover:text-white',
  gold: 'bg-gold text-white hover:bg-[#b8954f] hover:shadow-lg hover:shadow-gold/30',
  // Outlined button for use on dark backgrounds (e.g. the forest CTA section)
  outlineLight:
    'bg-transparent border border-white/60 text-white hover:border-white hover:bg-white/15 hover:shadow-lg hover:shadow-black/10',
};

function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
