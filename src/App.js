/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [pash, setPash] = useState(true);

  useEffect(() => {
    const saveStep = JSON.parse(localStorage.getItem('step'));
    const saveClick = JSON.parse(localStorage.getItem('click'));
    const saveName = JSON.parse(localStorage.getItem('name'));
    const savePash = JSON.parse(localStorage.getItem('pash'));

    if (saveStep) setStep(saveStep);
    if (saveClick) setCounter(saveClick);
    if (saveName) setName(saveName);
    if (savePash === false) setPash(false);
  }, []);

  const clickCounter = () => {
    setCounter((counter) => counter + step);
    localStorage.setItem('click', JSON.stringify(counter + step));
    checkPash();
  };

  const buyFirstMouse = () => {
    if (!(counter > 100)) return;
    setCounter((counter) => counter - 100);
    setStep((step) => step + 4);
    localStorage.setItem('step', JSON.stringify(step));
  };

  const buySecondMouse = () => {
    if (!(counter > 3000)) return;
    setCounter((counter) => counter - 3000);
    setStep((step) => step * 2);
    localStorage.setItem('step', JSON.stringify(step));
  };

  const buyThirdMouse = () => {
    if (!(counter > 10000)) return;
    setCounter((counter) => counter - 10000);
    setInterval(
      () =>
        setCounter((counter) => {
          localStorage.setItem('click', JSON.stringify(counter + 10));
          checkPash();
          return counter + 10;
        }),
      1000
    );
    localStorage.setItem('step', JSON.stringify(step));
  };

  const saveName = () => {
    const newName = prompt("What's your name ?");

    if (newName.trim() === '') return alert("I don't like fall");

    setName(newName);
    localStorage.setItem('name', JSON.stringify(newName));
  };

  const checkPash = () => {
    if (counter > 50000 && pash) {
      alert(`Fuu#k, you could! Could! You're my star now 🤩`);
      setPash(false);
      localStorage.setItem('pash', JSON.stringify(false));
    }
  };

  return (
    <main>
      <header>
        <div className="header">
          <h1>Hello, it's VB Clicker!</h1>
          <h4>Just clicks</h4>
        </div>
        {name !== '' ? (
          <h2>{`Hey, ${name}!`}</h2>
        ) : (
          <button className="header__btnName" type="submit" onClick={saveName}>
            Give name
          </button>
        )}
      </header>
      <section>
        <div className="game">
          <h3>{`${counter} click(s)`}</h3>
          <button className="game__button" type="button" onClick={clickCounter}>
            Click me!
          </button>
          <ul>
            <li>
              <p>Mouse from Ternopil - 100</p>
              <p>+4 clicks</p>
              <button type="button" onClick={buyFirstMouse}>
                Buy!
              </button>
            </li>
            <li>
              <p>Mouse with love - 3000</p>
              <p>x2 clicks</p>
              <button type="button" onClick={buySecondMouse}>
                Buy!
              </button>
            </li>
            <li>
              <p>Vlad magic mouse - 10000</p>
              <p>Autoclick (+10 every second)</p>
              <button type="button" onClick={buyThirdMouse}>
                Buy!
              </button>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
