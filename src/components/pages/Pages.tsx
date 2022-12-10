import { Route, Routes } from '@solidjs/router';

import { Home } from './Home';

export const Pages = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);
