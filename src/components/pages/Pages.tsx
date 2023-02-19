import { Route, Routes } from '@solidjs/router';

import { Home } from './Home';
import { Projects } from './Projects';
import { Sessions } from './Sessions';

export const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/sessions" element={<Sessions />} />
  </Routes>
);
