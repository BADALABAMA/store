interface IInput {
  type: string;
  placeholder: string;
  className: string;
  id: string;
}

export class Input implements IInput {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  constructor({ type, placeholder, className, id }: IInput) {
    this.type = type;
    this.placeholder = placeholder;
    this.className = className;
    this.id = id;
  }

  toHTML() {
    const input = document.createElement('input');
    input.type = this.type;
    input.placeholder = this.placeholder;
    input.className = this.className;
    input.id = this.id;

    return input;
  }
}
