import { Header } from '@/atoms';

import { NavBar } from '../molecules';
import { Pages } from '../pages/Pages';

export const App = () => (
  <div class="min-h-full">
    <NavBar />
    <div class="bg-gray-800 pb-32">
      <Header />
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-neutral-800 shadow overflow-hidden min-h-[12rem]">
          <Pages />
        </div>
      </div>
    </main>
  </div>
);
