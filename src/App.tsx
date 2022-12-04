import { Icon } from 'solid-heroicons';
import { clock, inboxStack } from 'solid-heroicons/solid-mini';

import {
  BaseDirectory,
  createDir,
  exists,
  readDir,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs';

import { createBeacon } from '@/hooks';

import { classNames } from '@/utils';

function App() {
  const timer = createBeacon(0);
  const files = createBeacon('');

  const startTimer = () => {
    const start = Date.now();
    const updateTimer = () => {
      timer(Date.now() - start);
      requestAnimationFrame(updateTimer);
    };
    requestAnimationFrame(updateTimer);
  };

  const readFiles = async () => {
    const doesExist = await exists('files', { dir: BaseDirectory.AppData });
    if (!doesExist)
      await createDir('files', { dir: BaseDirectory.AppData, recursive: true });
    const items = await readDir('files', {
      dir: BaseDirectory.AppData,
      recursive: true,
    });

    if (!items.length) return files('No files found. :(');

    files(
      (await Promise.all(items.map(({ path }) => readTextFile(path)))).join(
        ' | '
      )
    );
  };

  const saveFile = async () => {
    const doesExist = await exists('files', { dir: BaseDirectory.AppData });
    if (!doesExist)
      await createDir('files', { dir: BaseDirectory.AppData, recursive: true });
    await writeTextFile('files/test.txt', '## Hello World!', {
      dir: BaseDirectory.AppData,
    });
    readFiles();
  };

  return (
    <div class="flex flex-col gap-2 justify-center h-full w-full items-center text-gray-100">
      <h1 class="text-3xl">Track Time</h1>
      <div
        class={classNames(
          Number([...timer().toString()].at(-3)) > 4
            ? 'text-red-500'
            : 'text-blue-500',
          'font-mono'
        )}>
        {(timer() / 1000) | 0}
      </div>
      <button
        onClick={startTimer}
        class="bg-blue-700 flex gap-2 items-center py-2 px-4">
        Start Timer <Icon path={clock} class="w-6 h-6" />
      </button>
      <button
        onClick={readFiles}
        class="bg-blue-700 flex gap-2 items-center py-2 px-4">
        Read Files <Icon path={inboxStack} class="w-6 h-6" />{' '}
      </button>
      <div>{files()}</div>
      <button onClick={saveFile} class="bg-blue-700 py-2 px-4">
        Create File
      </button>
    </div>
  );
}

export default App;
