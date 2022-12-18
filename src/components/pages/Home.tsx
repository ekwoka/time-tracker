/* @refresh reload */
import { Pomodoro } from '../organisms/Pomodoro';
import { TaskLists } from '../organisms/TaskLists';

export const Home = () => {
  return (
    <>
      <Pomodoro />
      <TaskLists />
    </>
  );
};
