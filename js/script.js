class ImageSlider {
	#currentPosition = 0;
	#slideNumber = 0;
	#slideWidth = 0;
	#intervalId;
	#autoplayState = true;
	sliderWrapEl;
	sliderListEl;
	nextBtnEl;
	prevBtnEl;
	indicatorWrapEl;
	controlWrapEl;
	constructor() {
		this.assignElement();
		this.initialNumber();
		this.initialWidth();
		this.initSlideListWidth();
		this.addEvent();
		this.createIndicator();
		this.setIndicator();
		this.initAutoplay();
	}
	assignElement() {
		this.sliderWrapEl = document.getElementById("slider-wrap");
		this.sliderListEl = this.sliderWrapEl.querySelector("#slider");
		this.nextBtnEl = this.sliderWrapEl.querySelector("#next");
		this.prevBtnEl = this.sliderWrapEl.querySelector("#previous");
		this.indicatorWrapEl = this.sliderWrapEl.querySelector("#indicator-wrap");
		this.controlWrapEl = this.sliderWrapEl.querySelector("#control-wrap");
	}
	addEvent() {
		this.nextBtnEl.addEventListener("click", this.moveToRight);
		this.prevBtnEl.addEventListener("click", this.moveToLeft);
		this.indicatorWrapEl.addEventListener("click", this.onclickIndicator);
		this.controlWrapEl.addEventListener("click", this.toggleAutoPlay);
	}
	initialNumber() {
		this.#slideNumber = this.sliderListEl.querySelectorAll("li").length;
	}
	initialWidth() {
		this.#slideWidth = this.sliderListEl.clientWidth;
	}
	initSlideListWidth() {
		this.sliderListEl.style.width = `${this.#slideWidth * this.#slideNumber}px`;
	}
	moveToRight = () => {
		this.#currentPosition += 1;
		if (this.#currentPosition === this.#slideNumber) {
			this.#currentPosition = 0;
		}
		this.sliderListEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
		if (this.#autoplayState) {
			clearInterval(this.#intervalId);
			this.initAutoplay();
		}
		this.setIndicator();
	};
	moveToLeft = () => {
		this.#currentPosition -= 1;
		if (this.#currentPosition === -1) {
			this.#currentPosition = this.#slideNumber - 1;
		}
		this.sliderListEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
		if (this.#autoplayState) {
			clearInterval(this.#intervalId);
			this.initAutoplay();
		}
		this.setIndicator();
	};
	createIndicator() {
		const docFragment = document.createDocumentFragment();
		for (let i = 0; i < this.#slideNumber; i++) {
			const li = document.createElement("li");
			li.dataset.index = i;
			docFragment.appendChild(li);
		}
		this.indicatorWrapEl.querySelector("ul").appendChild(docFragment);
	}
	setIndicator() {
		this.indicatorWrapEl.querySelector("li.active")?.classList.remove("active");
		this.indicatorWrapEl.querySelector(`ul li:nth-child(${this.#currentPosition + 1})`).classList.add("active");
	}
	onclickIndicator = e => {
		const indexPosition = parseInt(e.target.dataset.index);
		this.#currentPosition = indexPosition;
		this.sliderListEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
		this.setIndicator();
		console.log(this.#currentPosition, indexPosition);
	};
	initAutoplay() {
		this.#intervalId = setInterval(this.moveToRight, 3000);
	}
	toggleAutoPlay = e => {
		if (e.target.dataset.status === "play") {
			this.#autoplayState = true;
			this.controlWrapEl.classList.add("play");
			this.controlWrapEl.classList.remove("pause");
			this.initAutoplay();
		} else if (e.target.dataset.status === "pause") {
			this.#autoplayState = false;
			this.controlWrapEl.classList.add("pause");
			this.controlWrapEl.classList.remove("play");
			clearInterval(this.#intervalId);
		}
	};
}

new ImageSlider();
