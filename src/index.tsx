/* @refresh reload */
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';

import { App } from '@/layout';

import './style.css';

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
);
