import { MotionConfig } from 'framer-motion';
import AppRouter from './router/AppRouter';

function App() {
  // reducedMotion="never" keeps the site's tasteful animations playing even when
  // the OS "reduce motion" setting is enabled. Set to "user" to respect that preference.
  return (
    <MotionConfig reducedMotion="never">
      <AppRouter />
    </MotionConfig>
  );
}

export default App;
