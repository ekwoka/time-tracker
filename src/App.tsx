import './App.css';
import { createBeacon } from './hooks';

function App() {
  const timer = createBeacon(0);

  const startTimer = () => {
    const start = Date.now();
    const updateTimer = () => {
      timer(Date.now() - start);
      requestAnimationFrame(updateTimer);
    };
    requestAnimationFrame(updateTimer);
  };

  return (
    <div class='container'>
      <h1>Track Time</h1>
      <div>{timer()}</div>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}

export default App;
