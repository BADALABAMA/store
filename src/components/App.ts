import { Component } from './Component';
interface IApp {
  tagName: string;
  className: string;
  id: string;
  children: [];
}
export class App extends Component {
  constructor({ tagName, className, id, children }: IApp) {
    super(tagName, className, id, children);
    this.setTagName('div');
    this.setClassName('app');
  }
}
