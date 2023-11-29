import { Component } from './Component';
import { IComponent } from './Component';

export class Modal extends Component {
  constructor({
    tagName,
    className,
    id,
    children,
    events,
    textContent,
  }: IComponent) {
    super(tagName, className, id, children, events, textContent);
    this.setTagName('div');
    this.setClassName('modal');
  }
}
