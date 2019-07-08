let imageWidth = 940;
let transitionSpeed = 100;
const TRANSITION_SPEED = imageWidth / transitionSpeed;

let carouselContainer = document.getElementsByClassName('carousel-container')[0];
let carouselWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];

let imageTagsCol = carouselWrapper.getElementsByTagName('img');
let numOfImages = imageTagsCol.length;

carouselWrapper.style.width = imageWidth * numOfImages + 'px';
carouselWrapper.style.position = 'relative';

let sliderBtnContainer = document.createElement('div'),
    prevBtn = document.createElement('button'),
    nextBtn = document.createElement('button');

prevBtn.setAttribute('id','#prev-btn');
prevBtn.style.position = 'absolute';
prevBtn.style.top = '30%';
prevBtn.style.left = '20%';
prevBtn.style.transform = 'translateX(-50%)';
prevBtn.innerHTML = 'previous';
prevBtn.style.color = 'white';
prevBtn.style.fontSize = '18px';
prevBtn.style.background = 'transparent';
prevBtn.style.border= 'none';

nextBtn.setAttribute('id','#nextBtn');
nextBtn.style.position = 'absolute';
nextBtn.style.top = '30%';
nextBtn.style.right = '20%';
nextBtn.style.transform = 'translateX(50%)';
nextBtn.innerHTML = 'next';
nextBtn.style.color = 'white';
nextBtn.style.fontSize = '18px';
nextBtn.style.background = 'transparent';
nextBtn.style.border= 'none';

sliderBtnContainer.appendChild(prevBtn);
sliderBtnContainer.appendChild(nextBtn);
carouselContainer.appendChild(sliderBtnContainer);


for (var currImgIndex of imageTagsCol) {
  currImgIndex.style.maxWidth = imageWidth + 'px';
  currImgIndex.style.height = 'auto';
  currImgIndex.style.float = 'left';
}

let marginLeft = 0;
let imageIndex = 1;

let animate = () => {
  if (imageIndex == numOfImages) {
    backToStartAnimation();
  } else {
    carouselNextAnimation(imageIndex+1);
  }
}

let backToStartAnimation = () => {
  var animationInfo = setInterval(() => {
    marginLeft += TRANSITION_SPEED * numOfImages;
    carouselWrapper.style.marginLeft = marginLeft + 'px';
    if (marginLeft > 0) {
      stopAnimation(animationInfo);
      imageIndex = 0;
      marginLeft = 0;
      carouselWrapper.style.marginLeft = marginLeft + 'px';
    }
  }, 1)
}

nextBtn.addEventListener('click',(e)=>{
  carouselNextAnimation(imageIndex + 1);
  checkCounter();
})

let carouselNextAnimation = (nextIndex)=>{
  var animationInfo = setInterval(() => {
    marginLeft -= (nextIndex-imageIndex)*imageWidth/transitionSpeed;
    carouselWrapper.style.marginLeft = marginLeft + 'px';
    if (marginLeft + imageIndex * imageWidth < 0) {
      stopAnimation(animationInfo);
      marginLeft -= marginLeft + imageIndex * imageWidth;
      carouselWrapper.style.marginLeft = marginLeft + 'px';
      imageIndex++;
    }
  }, 1);
}


prevBtn.addEventListener('click',(e)=>{
  carouselPrevAnimation(imageIndex - 1);
})

let carouselPrevAnimation = (nextIndex)=>{
  var animationInfo = setInterval(() => {
    marginLeft -= (nextIndex-imageIndex)*imageWidth/transitionSpeed;
    carouselWrapper.style.marginLeft = marginLeft + 'px';
    if (marginLeft + (nextIndex -1) * imageWidth > 0) {
      stopAnimation(animationInfo);
      marginLeft -= marginLeft + (nextIndex -1) * imageWidth;
      carouselWrapper.style.marginLeft = marginLeft + 'px';
      imageIndex--;
      checkCounter();
    }
  }, 1);
}


let checkCounter = () => {
  if (imageIndex == numOfImages -1) {
    backToStartAnimation();
  }
  if (imageIndex < 1) {
    imageIndex = numOfImages-1;
    carouselWrapper.style.marginLeft = `-${imageWidth  * (numOfImages - 1)}px`;
  }
}

let stopAnimation = (animation) => {
  clearInterval(animation);
}


prevBtn.addEventListener('mouseenter',(e)=>{
  clearInterval(animationStart);
})

prevBtn.addEventListener('mouseleave',(e)=>{
  animationStart=setInterval(animate, 3000);
})

nextBtn.addEventListener('mouseenter',(e)=>{
  clearInterval(animationStart);
})

nextBtn.addEventListener('mouseleave',(e)=>{
  animationStart=setInterval(animate, 3000);
})

let animationStart = setInterval(animate, 3000);
