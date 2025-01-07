import './styles.scss';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1 class="text-4xl font-bold">Hello Vite!</h1>
  </div>
`;

setupCounter(document.querySelector('#counter'));
