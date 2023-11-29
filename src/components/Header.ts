import { Component } from './Component';

interface IHeader {
  tagName: string;
  className: string;
  id: string;
  children: [];
  events?: Event;
  textContent?: string;
}

export class Header extends Component {
  constructor({
    tagName,
    className,
    id,
    children,
    events,
    textContent,
  }: IHeader) {
    super(tagName, className, id, children, events, textContent);
  }
}
