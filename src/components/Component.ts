import { toHTML } from '../core/toHTML';

export interface IComponent {
  tagName: string;
  className: string;
  id: string;
  children: [];
  events?: EventListener;
  textContent?: string;
  attrs?: any;
  src?: string;
}

export class Component implements IComponent {
  tagName: string;
  className: string;
  id: string;
  children: [];
  events?: any;
  textContent?: string;
  attrs?: string[];
  src?: string;

  constructor(
    tagName: string,
    className: string,
    id: string,
    children: [],
    events?: EventListener,
    textContent?: string,
    attrs?: string[],
    src?: string
  ) {
    this.tagName = tagName;
    this.className = className;
    this.id = id;
    this.children = children;
    this.events = events;
    this.textContent = textContent;
    this.attrs = attrs;
    this.src = src;
  }

  setAttributes(attributes: string[]): void {
    this.attrs = { ...this.attrs, ...attributes };
  }

  getTagName(): string {
    return this.tagName;
  }
  getClassName(): string {
    return this.className;
  }
  getId(): string {
    return this.id;
  }
  getChildren(): [] {
    return this.children;
  }
  getEvents(): any | undefined {
    return this.events;
  }
  getTextContent(): string | undefined {
    return this.textContent;
  }
  setClassName(className: string) {
    this.className = className;
  }

  addChildren(children: []) {
    for (const child of children) {
      this.children.push(child);
    }
  }
  setSrc(src: string) {
    this.src = src;
  }
  setId(id: string) {
    this.id = id;
  }
  setTagName(tagName: string) {
    this.tagName = tagName;
  }

  setChildren(children: []) {
    this.children = children;
  }

  setEvents(events: EventListener) {
    this.events = events;
  }

  setText(textContent: string) {
    this.textContent = textContent;
  }

  toHTML() {
    return toHTML(this);
  }
}
