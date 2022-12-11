import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs';

export const getAppData = async (filename: string, initialData = '') => {
  if (!(await exists(filename, { dir: BaseDirectory.AppData })))
    await writeTextFile(filename, initialData, { dir: BaseDirectory.AppData });
  const data = await readTextFile(filename, { dir: BaseDirectory.AppData });
  return data;
};

export const setAppData = (filename: string, data: string) =>
  writeTextFile(filename, data, { dir: BaseDirectory.AppData });
