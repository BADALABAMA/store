import { Modal, Main, Header, App, Button } from './components';
import './style.css';

const header = new Header({
  tagName: 'header',
  className: 'header',
  id: 'header',
  children: [],
}).toHTML() as HTMLElement;

const main = new Main({
  tagName: 'main',
  className: 'main',
  id: 'main',
  children: [],
}).toHTML() as HTMLElement;

const app = new App({
  tagName: 'div',
  className: 'app',
  id: 'app',
  children: [],
}).toHTML() as HTMLElement;
document.body.append(app);
console.log(main);
