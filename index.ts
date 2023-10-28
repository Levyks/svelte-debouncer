export default class Debouncer<A extends any[]> {
  timer: number | null = null;
  is_first_debounce: boolean = true;

  constructor(
    public callback: (...args: A) => void,
    public delay: number = 1000,
    public debounce_first: boolean = false
  ) {}

  debounce(...args: A) {
    if (this.is_first_debounce && !this.debounce_first) {
      this.is_first_debounce = false;
      return;
    }

    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = window.setTimeout(() => {
      this.callback(...args);
    }, this.delay);
  }
}
