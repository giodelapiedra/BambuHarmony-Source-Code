function Section({ children, id, className = '', as: Component = 'section' }) {
  return (
    <Component id={id} className={`py-16 md:py-24 ${className}`}>
      {children}
    </Component>
  );
}

export default Section;
