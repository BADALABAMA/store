import { toHTML } from '../core/toHTML';

export interface IComponent {
  tagName: string;
  className: string;
  id: string;
  children: [];
  events?: any;
  textContent?: string;
}

export class Component {
  private _tagName: string;
  private _className: string;
  private _id: string;
  private _children: [];
  private _events: any;
  private _textContent?: string;

  constructor(
    tagName: string,
    className: string,
    id: string,
    children: [],
    events?: any,
    textContent?: string
  ) {
    this._tagName = tagName;
    this._className = className;
    this._id = id;
    this._children = children;
    this._events = events;
    this._textContent = textContent;
  }
  getTagName(): string {
    return this._tagName;
  }
  getClassName(): string {
    return this._className;
  }
  getId(): string {
    return this._id;
  }
  getChildren(): [] {
    return this._children;
  }
  getEvents(): any | undefined {
    return this._events;
  }
  getTextContent(): string | undefined {
    return this._textContent;
  }
  setClassName(className: string) {
    this._className = className;
  }

  addChildren(children: []) {
    for (const child of children) {
      this._children.push(child);
    }
  }
  setId(id: string) {
    this._id = id;
  }
  setTagName(tagName: string) {
    this._tagName = tagName;
  }

  setChildren(children: []) {
    this._children = children;
  }

  setEvents(events: Event) {
    this._events = events;
  }

  setText(textContent: string) {
    this._textContent = textContent;
  }

  toHTML() {
    return toHTML(this);
  }
}
