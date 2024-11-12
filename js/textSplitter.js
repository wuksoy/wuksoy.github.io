import { debounce } from './utils.js';

export class TextSplitter {
  constructor(textElement, options = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    const { resizeCallback, splitTypeTypes } = options;
    const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
    
    this.textElement = textElement;
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null;
    this.splitText = new SplitType(this.textElement, splitOptions);

    if (this.onResize) {
      this.initResizeObserver();
    }
  }

  initResizeObserver() {
    this.previousContainerWidth = null;

    let resizeObserver = new ResizeObserver(
      debounce((entries) => this.handleResize(entries), 100)
    );
    resizeObserver.observe(this.textElement);
  }


  handleResize(entries) {
    const [{ contentRect }] = entries;
    const width = Math.floor(contentRect.width);
    if ( this.previousContainerWidth && this.previousContainerWidth !== width ) {
      this.splitText.split();
      this.onResize();
    }
    this.previousContainerWidth = width;
  }

  revert() {
    return this.splitText.revert();
  }

  getLines() {
    return this.splitText.lines;
  }

  getWords() {
    return this.splitText.words;
  }

  getChars() {
    return this.splitText.chars;
  }
}
