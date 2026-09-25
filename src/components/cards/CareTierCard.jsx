import Badge from '../common/Badge';

function CareTierCard({ title, accommodation, description, features, badge, image, icon }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-cream/60 transition-shadow duration-300 hover:shadow-lg">
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {badge && (
            <Badge className="absolute right-4 top-4 bg-gold text-white shadow-sm">{badge}</Badge>
          )}
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-8">
        {icon && (
          <span className="absolute -top-8 left-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-cream">
            <img src={icon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
          </span>
        )}
        <h3 className={`mb-1.5 font-serif text-2xl text-forest ${icon ? 'mt-7' : ''}`}>{title}</h3>
        {accommodation && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold">
            Accommodation: {accommodation}
          </p>
        )}
        <p className="mb-5 text-sm leading-relaxed text-charcoal/80">{description}</p>
        <ul className="space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-charcoal/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bamboo" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default CareTierCard;
