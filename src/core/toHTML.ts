import { Component } from '../components/Component';
import { IComponent } from '../components/Component';

export const toHTML = (instance: IComponent) => {
  if (instance instanceof Component) {
    const { tagName, className, id, children, events, textContent, attrs } =
      instance;
    const element: any = document.createElement(tagName);

    element.className = className || '';
    element.id = id || '';
    element.textContent = textContent;

    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (key.toLowerCase() === 'src' && tagName.toLowerCase() === 'img') {
          (element as HTMLImageElement).src = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
    if (events) {
      for (let key in events) {
        if (typeof events[key] === 'function') {
          element.addEventListener(key, events[key] as EventListener);
        }
      }
    }

    if (children) {
      for (const child of children) {
        if (child instanceof Component) {
          element.append(child.toHTML());
        } else {
          element.append(child);
        }
      }
    }

    return element;
  } else {
    throw new Error('Invalid instance. It must be an instance of Component.');
  }
};
