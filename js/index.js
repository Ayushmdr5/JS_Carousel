var Slider = function (className, transition, delay) {
  this.className = className;
  this.transition = transition;
  this.delay = delay;

  var index = 0;
  var transitionInternval;
  var dotTransitionInterval;
  var dotReverseTransitionInterval;
  var delayInterval;
  var reverse = false;
  var dotReverse = false;

  var slider = document.getElementsByClassName(className)[0];
  var imageWrapper = slider.getElementsByClassName("carousel-image-wrapper")[0];
  var imageCount = imageWrapper.children.length;

  slider.className += " slider";

  // setting width of image wrapper according to image count
  var imageWrapperWidth = 640 * imageCount;
  imageWrapper.style.width = imageWrapperWidth + "px";

  // appending side arrows
  var leftArrow = document.createElement("div");
  var rightArrow = document.createElement("div");
  leftArrow.setAttribute("class", "left-arrow");
  rightArrow.setAttribute("class", "right-arrow");
  slider.appendChild(leftArrow);
  slider.appendChild(rightArrow);

  // appending indicator dots
  var dot_container = document.createElement("div");
  dot_container.setAttribute("class", "dot_container");
  slider.appendChild(dot_container);

  dotArr = [];
  for (var i = 0; i < imageCount; i++) {
    var dot = document.createElement("div");
    dot.setAttribute("class", "dot");
    dot_container.appendChild(dot);
    dotArr.push(dot);
  }

  autoSlider();

  function autoSlider() {
    setActiveDot();
    if (index == imageCount - 1) {
      reverse = true;
    } else if (index == 0) {
      reverse = false;
    }
    delayInterval = setTimeout(function () {
      if (reverse) {
        reverseAnimate();
      } else {
        animate();
      }
    }, delay);
  }

  // Forward animation
  function animate() {
    console.log("animate ", index);
    var currentLeftPosition = -(index * 640);
    var setLeftPosition = currentLeftPosition;

    transitionInternval = setInterval(() => {
      setLeftPosition = setLeftPosition - 2;
      imageWrapper.style.left = setLeftPosition + "px";

      if (setLeftPosition <= currentLeftPosition - 640) {
        clearInterval(transitionInternval);
        clearTimeout(delayInterval);
        index = index + 1;
        autoSlider();
      }
    }, transition);
  }

  // Reverse animation
  function reverseAnimate() {
    var currentLeftPosition = -(index * 640);
    var setLeftPosition = currentLeftPosition;

    transitionInternval = setInterval(() => {
      setLeftPosition = setLeftPosition + 2;
      imageWrapper.style.left = setLeftPosition + "px";

      if (setLeftPosition >= currentLeftPosition + 640) {
        clearInterval(transitionInternval);
        clearTimeout(delayInterval);
        index = index - 1;
        autoSlider();
      }
    }, transition);
  }

  for (var i = 0, len = dotArr.length; i < len; i++) {
    (function (newIndex) {
      dotArr[i].onclick = function () {
        clearTimeout(delayInterval);
        clearInterval(dotTransitionInterval);
        clearInterval(dotReverseTransitionInterval);
        console.log(newIndex);
        if (newIndex > index) {
          dotReverse = false;
        } else if (newIndex < index) {
          dotReverse = true;
        }
        index = newIndex;
        clearInterval(transitionInternval);
        clearTimeout(delayInterval);
        dotReverse ? dotReverseTransition() : dotTransition();
      };
    })(i);
  }

  // Forward dot animation
  function dotTransition() {
    var currentPosition = parseFloat(imageWrapper.style.left);
    var targetPosition = -(index * 640);
    if (!currentPosition) {
      currentPosition = 0;
    }
    dotTransitionInterval = setInterval(() => {
      currentPosition = currentPosition - 2;
      imageWrapper.style.left = currentPosition + "px";
      if (currentPosition == targetPosition) {
        clearInterval(dotTransitionInterval);
        clearTimeout(delayInterval);
        autoSlider();
      }
    }, transition);
  }

  // Backward dot animation
  function dotReverseTransition() {
    var newPosition = parseFloat(imageWrapper.style.left);
    var targetPosition = -(index * 640);

    dotReverseTransitionInterval = setInterval(() => {
      newPosition = newPosition + 2;
      imageWrapper.style.left = newPosition + "px";
      if (newPosition == targetPosition) {
        clearInterval(dotReverseTransitionInterval);
        clearTimeout(delayInterval);
        autoSlider();
      }
    }, transition);
  }

  // Right arrow handler
  rightArrow.addEventListener("click", function () {
    if (index < imageCount - 1) {
      clearTimeout(delayInterval);
      clearInterval(dotTransitionInterval);
      clearInterval(dotReverseTransitionInterval);
      clearInterval(transitionInternval);
      animate();
    }
  });

  // Left arrow handler
  leftArrow.addEventListener("click", function () {
    if (index > 0) {
      clearTimeout(delayInterval);
      clearInterval(dotTransitionInterval);
      clearInterval(dotReverseTransitionInterval);
      clearInterval(transitionInternval);
      reverseAnimate();
    }
  });

  // Setting current active dot indicator
  function setActiveDot() {
    for (var i = 0; i < imageCount; i++) {
      if (i == index) {
        dot_container.children[i].className += " active";
      } else {
        dot_container.children[i].className = "dot";
      }
    }
  }
};
