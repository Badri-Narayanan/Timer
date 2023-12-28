const getElement = selector => document.querySelector(selector);


const playBtn = getElement("#play");
const pauseBtn = getElement("#pause");
const resetBtn = getElement("#reset");

const counter = getElement(".counter input");

const timer = new Timer(counter, playBtn, pauseBtn, resetBtn);
timer.init();