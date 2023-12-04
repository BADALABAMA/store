import { Component } from './Component';
interface IMain {
  tagName: string;
  className: string;
  id: string;
  children: [];
  events?: Event;
  textContent?: string;
}

export class Main extends Component {
  constructor({ tagName, className, id, children }: IMain) {
    super(tagName, className, id, children);
  }
}
