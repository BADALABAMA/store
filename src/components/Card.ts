import { Component } from './Component';

interface ICard {
  tagName: string;
  className: string;
  id: string;
  children: [];
  textContent?: string;
  attrs?: string[];
  events?: EventListener;
}

export class Card extends Component {
  constructor({
    tagName,
    className,
    id,
    children,
    events,
    textContent,
  }: ICard) {
    super(tagName, className, id, children, events, textContent);
  }
}
