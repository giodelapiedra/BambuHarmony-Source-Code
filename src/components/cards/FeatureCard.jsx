function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-forest">
          <Icon size={20} />
        </div>
      )}
      <h3 className="mb-2 font-serif text-lg text-forest">{title}</h3>
      <p className="text-sm leading-relaxed text-charcoal/80">{description}</p>
    </div>
  );
}

export default FeatureCard;
