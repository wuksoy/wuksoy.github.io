// Import the TextSplitter class for handling text splitting.
import { TextSplitter } from './textSplitter.js';

const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];

export class TextAnimator {
  constructor(textElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }

    this.textElement = textElement;
    this.splitText();
  }

  splitText() {
    this.splitter = new TextSplitter(this.textElement, {
      splitTypeTypes: 'words, chars'
    });

    this.originalChars = this.splitter.getChars().map(char => char.innerHTML);
  }

  animate() {
    this.reset();
    const chars = this.splitter.getChars();

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      let repeatCount = 0;
      
      gsap.fromTo(char, {
        opacity: 0
      },
      {
        duration: 0.03,
        onStart: () => {
          gsap.set(char, { '--opa': 1 });
        },
        onComplete: () => {
          gsap.set(char, {innerHTML: initialHTML, delay: 0.03})
        },
        repeat: 3,
        onRepeat: () => {
          repeatCount++;
          if (repeatCount === 1) {
            gsap.set(char, { '--opa': 0 });
          }
        },
        repeatRefresh: true,
        repeatDelay: 0.04,
        delay: (position+1)*0.07,
        innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
        opacity: 1
      });
    });
  }

  updateHeadingText(newText) {
    document.querySelector('.content h2').style.setProperty('--heading', `'${newText}'`);
  }

  test_animate() {
    this.reset();
    const chars = this.splitter.getChars();
    const currentText = chars.map(c => c.innerHTML);

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      
      gsap.fromTo(
        char,
        {opacity: 0}, {
          repeat: 5.00,
          opacity: 1.00,
          duration: 0.03,
          repeatDelay: 0.07,
          repeatRefresh: true,
          innerHTML: () => {
            let randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
            currentText[position] = randomChar;
            this.updateHeadingText(currentText.join(''));
            return randomChar;
          },
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML, delay: 0.07 });
            currentText[position] = initialHTML;
            this.updateHeadingText(currentText.join(''));
          }
        });
    });
  }

  shuffle_animate() {
    this.reset();
    const chars = this.splitter.getChars();
    const currentText = chars.map(c => c.innerHTML);

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      
      gsap.fromTo(
        char,
        {opacity: 0}, {
          repeat: 2.00,
          opacity: 1.00,
          duration: 0.03,
          repeatDelay: 0.03,
          repeatRefresh: true,
          innerHTML: () => {
            let randomChar = lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
            currentText[position] = randomChar;
            return randomChar;
          },
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML, delay: 0.04 });
            currentText[position] = initialHTML;
          }
        });
    });
  }

  reset() {
    const chars = this.splitter.getChars();
    chars.forEach((char, index) => {
      gsap.killTweensOf(char);
      char.innerHTML = this.originalChars[index];
    });
  }
}
