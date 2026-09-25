function LocationCard({ title, description, image }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-cream/60 transition-shadow duration-300 hover:shadow-lg">
      {image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-8">
        <h3 className="mb-3 font-serif text-xl text-forest">{title}</h3>
        <p className="text-sm leading-relaxed text-charcoal/80">{description}</p>
      </div>
    </article>
  );
}

export default LocationCard;
