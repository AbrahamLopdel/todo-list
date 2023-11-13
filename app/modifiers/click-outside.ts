const HAS_WINDOWS = typeof window !== 'undefined';
const HAS_NAVIGATOR = typeof navigator !== 'undefined';
const IS_TOUCH =
  HAS_WINDOWS &&
  ('ontouchstart' in window || (HAS_NAVIGATOR && navigator.maxTouchPoints > 0));
const EVENTS = IS_TOUCH ? ['touchstart'] : ['click'];

import { onClickOutside } from 'todo-list/utils/event-handler';
import { modifier } from 'ember-modifier';

interface HashParams {
  event?: string;
  events?: Array<string>;
}

function getEventNames({ event, events }: HashParams) {
  if (events) {
    return events;
  }
  if (event) {
    return [event];
  }
  return EVENTS;
}

export default modifier(function clickOutside(
  element: HTMLElement,
  [callback, useCapture]: [(event: Event) => void, boolean],
  hashParams: HashParams = {}
) {
  const refEvent = new Event('clickReference');
  const events = getEventNames(hashParams);
  const isFunction = typeof callback === 'function';
  if (!isFunction) {
    throw new Error('{{click-outside}}: The callback must be a function.');
  }
  const handlers: Array<[string, (event: Event) => void]> = [];
  events.forEach((eventName: string) => {
    const handler = (event: Event) => {
      if (refEvent.timeStamp > event.timeStamp) {
        return;
      }
      onClickOutside(event, () => callback(event), element, useCapture);
    };
    handlers.push([eventName, handler]);
    document.documentElement.addEventListener(eventName, handler, useCapture);
  });
  return () => {
    handlers.forEach(([eventName, handler]) => {
      document.documentElement.removeEventListener(
        eventName,
        handler,
        useCapture
      );
    });
  };
});
