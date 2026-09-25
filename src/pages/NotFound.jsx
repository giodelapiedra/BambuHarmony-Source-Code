import Container from '../components/common/Container';
import Button from '../components/common/Button';

function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-bamboo">404</p>
        <h1 className="mb-4 font-serif text-4xl text-forest">Page Not Found</h1>
        <p className="mb-8 text-charcoal/80">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button to="/">Return Home</Button>
      </Container>
    </section>
  );
}

export default NotFound;
