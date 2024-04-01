function Events() {
  this.events = {};

  this.on = (eventName: string, event: Function) => {
    if (!this.events[eventName]) {
      this.events[eventName] = [event];
    } else if (!this.events[eventName].includes(event)) {
      this.events[eventName].push(event);
    }
  }

  this.emit = (eventName: string, ...params: any[]) => {
    if (this.events[eventName]) {
      for (const event of this.events[eventName]) {
        event(...params);
      }
    }
  }

  this.off = (eventName: string, event?: Function) => {
    if (!event) {
      this.events[eventName] = null;
    } else {
      const eventIndex = this.events[eventName].findIndex(_ev => event === _ev);
      if (eventIndex !== -1) {
        this.events[eventName].splice(eventIndex, 1);
      }
    }
  }
}

export default new Events();