interface xEventProps {
  event: { [key: string]: Function[] };
  on(event: string, cb: Function): void;
  emit(event: string): void;
}

export const xEvent: xEventProps = {
  event: {},

  on(event: string, cb: Function) {
    xEvent.event[event] = [];
    xEvent.event[event].push(cb);
  },

  emit(event: string) {
    if (event in xEvent.event === false) {
      return;
    }

    xEvent.event[event].forEach((f: Function) => {
      f();
    });
  },
};
