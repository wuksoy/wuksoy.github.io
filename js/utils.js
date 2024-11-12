const getMousePos = e => {
    return {
        x : e.clientX,
        y : e.clientY
    };
};

const getWinSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
          func.apply(this, args);
      }, delay);
    };
  };

const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

export {
    getMousePos,
    getWinSize,
    isFirefox,
    debounce,
};