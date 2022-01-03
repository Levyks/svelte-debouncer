export default class Debouncer{

  timer: number = null;
  is_first_debounce: boolean = true;

  constructor(
    public callback: (...args: any[]) => any,
    public delay: number = 1000,
    public debounce_first: boolean = false
  ) {}

  debounce(...args:  any[]) {

    if(this.is_first_debounce && !this.debounce_first) {
      this.is_first_debounce = false;
      return;
    }

    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.callback(...args);
    }, this.delay);
  }
}