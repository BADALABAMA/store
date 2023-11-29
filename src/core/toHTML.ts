import { Component } from '../components/Component';
import { IComponent } from '../components/Component';
export const toHTML = (instance: IComponent) => {
  if (instance instanceof Component) {
    const { tagName, className, id, children, events, textContent } = instance;
    const element = document.createElement(tagName);
    element.className = className;
    if (textContent) {
      element.textContent = textContent;
    }

    element.id = id;
    element.events = events;

    if (!children) {
      return element;
    }

    if (events) {
      for (let key in events) {
        element.addEventListener(key, events[key]);
      }
    }
    for (const child of children) {
      if (
        child instanceof Component &&
        !child.toString().includes('HTMLElement')
      ) {
        element.append(child.toHTML());
      } else {
        element.append(child);
      }
    }
    return element;
  }
};
