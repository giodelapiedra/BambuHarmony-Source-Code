function PartnershipCard({ title, description, icon }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-cream bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {icon && (
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cream/60 ring-1 ring-gold/20">
          <img src={icon} alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
        </span>
      )}
      <h3 className="mb-3 font-serif text-xl text-forest">{title}</h3>
      <p className="text-sm leading-relaxed text-charcoal/80">{description}</p>
    </article>
  );
}

export default PartnershipCard;
