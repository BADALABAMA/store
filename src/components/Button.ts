interface IButtonEvent {
  type: string;
  listener: (event: Event) => void;
}
interface IButton {
  textContent: string;
  events?: IButtonEvent[];
  className: string;
}

export class Button {
  textContent: string;
  events?: IButtonEvent[];
  className: string;
  constructor({ textContent, events, className }: IButton) {
    this.textContent = textContent;
    this.className = className;
    this.events = events;
  }

  toHTML() {
    const button = document.createElement('button');
    button.textContent = this.textContent;
    button.className = this.className;
    this.events?.forEach((event) => {
      button.addEventListener(event.type, event.listener);
    });
    return button;
  }
}
