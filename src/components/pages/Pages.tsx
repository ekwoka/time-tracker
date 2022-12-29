import { Route, Routes } from '@solidjs/router';

import { Home } from './Home';
import { Projects } from './Projects';

export const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
  </Routes>
);
