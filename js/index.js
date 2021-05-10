
var Slider = function(className, transition, delay){
    this.className = className;
    this.transition = transition;
    this.delay = delay

    var index;
    index = 0

    var slider = document.getElementsByClassName(className)[0]
    console.log(slider)
    var imageWrapper = slider.getElementsByClassName('carousel-image-wrapper')[0]
    var imageCount = imageWrapper.children.length

    slider.className += ' slider'
    // slider.setAttribute('class', 'slider') 

    // setting width of image wrapper according to image number
    var imageWrapperWidth = 640*imageCount
    imageWrapper.style.width = imageWrapperWidth + 'px'

    // appending side arrows
    var leftArrow = document.createElement('div');
    leftArrow.setAttribute('class', 'left-arrow')
    var rightArrow = document.createElement('div');
    rightArrow.setAttribute('class', 'right-arrow')

    slider.appendChild(leftArrow)
    slider.appendChild(rightArrow)


    var dot_container = document.createElement('div')
    dot_container.setAttribute('class', 'dot_container')
    slider.appendChild(dot_container)
    
    dotArr = []
    for (var i = 0; i < imageCount; i++){
        var dot = document.createElement('div')
        dot.setAttribute('class', 'dot')
        dot_container.appendChild(dot)
        dotArr.push(dot)
    }



    var reverse = false
    autoSlider()

    var delayInterval


    function autoSlider(){
        setActiveDot()
        if (index == imageCount-1){
            reverse = true
        }
        else if (index == 0){
            reverse = false
        }

        delayInterval = setTimeout(function(){
            if(reverse){
                reverseAnimate()
            } else{
                animate()
            }
        },
        delay)
    }

    var transitionInternval

    function animate(){
        console.log('animate ', index)
        var currentLeftPosition = -(index * 640)
        var setLeftPosition = currentLeftPosition

        transitionInternval = setInterval(() => {
            setLeftPosition--
            imageWrapper.style.left = setLeftPosition + 'px'

            if(setLeftPosition < currentLeftPosition - 640){
                clearInterval(transitionInternval)
                clearTimeout(delayInterval)
                index = index + 1
                autoSlider()
            }
        }, transition);
    }

    function reverseAnimate(){
        var currentLeftPosition = -(index * 640)
        var setLeftPosition = currentLeftPosition

        transitionInternval = setInterval(() => {
            setLeftPosition++
            imageWrapper.style.left = setLeftPosition + 'px'

            if(setLeftPosition > currentLeftPosition + 640){
                clearInterval(transitionInternval)     
                clearTimeout(delayInterval)       
                index = index - 1
                autoSlider()
            }
        }, transition);
    }

    var dotReverse = false

    for (var i = 0, len = dotArr.length; i < len; i++)
    {
        (function(newIndex){
            dotArr[i].onclick = function(){
                
            console.log(newIndex)
                if(newIndex>index){
                    dotReverse = false
                }
                else if (newIndex<index){
                    dotReverse = true
                }
                index = newIndex
                clearInterval(transitionInternval)
                clearTimeout(delayInterval)
                // animate(); 
                dotReverse ? dotReverseTransition() : dotTransition()
            }    
        })(i);
    }

    var dotTransitionInterval
    function dotTransition(){
        console.log(imageWrapper.style.left)
        
        var currentPosition = parseFloat(imageWrapper.style.left);
        if(!currentPosition){
            currentPosition = 0
        }
        var targetPosition = -(index * 640)

        console.log('from dot', currentPosition, targetPosition )
        dotTransitionInterval = setInterval(() => {
            currentPosition--
            imageWrapper.style.left = currentPosition + 'px'
            if(currentPosition==targetPosition){
                console.log('reached')
                clearInterval(dotTransitionInterval)
                clearTimeout(delayInterval)
                autoSlider()
            }
        }, transition)
    }

    var dotReverseTransitionInterval
    function dotReverseTransition(){

        var newPosition = parseFloat(imageWrapper.style.left);
        var targetPosition = -(index * 640)

        console.log('from dot', newPosition, targetPosition )
        dotReverseTransitionInterval = setInterval(() => {
            newPosition++
            imageWrapper.style.left = newPosition + 'px'
            if(newPosition==targetPosition){
                console.log('reached')
                clearInterval(dotReverseTransitionInterval)
                clearTimeout(delayInterval)
                autoSlider()
            }
        }, transition)
    }

    rightArrow.addEventListener('click', function(){
        if(index<imageCount-1){
            clearTimeout(delayInterval)
            animate();
        }
    })
    leftArrow.addEventListener('click', function(){
        if(index>0){
            clearTimeout(delayInterval)
            reverseAnimate();
        }
    })

 
    function setActiveDot(){
        for (var i=0; i<imageCount; i++){
            if (i==index){
                dot_container.children[i].className += ' active'
            } else{
                dot_container.children[i].className = 'dot'
            }
        }
    }



//     autoSlider(imageWrapper, 0, imageCount, transition, delay, false)

//     //side arrows
//     // rightArrow.addEventListener('click', handleRightArrow)




//     function autoSlider(imageWrapper, index, imageCount, transition, delay, reverse){
//         console.log('index', index)
//         if (index == imageCount-1){
//             reverse = true
//         }
//         else if (index == 0){
//             reverse = false
//         }
//         console.log(reverse)

//         delayInterval = setTimeout(function(){
//             if(reverse){
//                 reverseAnimate(index, imageWrapper, imageCount, transition, delay, true)
//             } else{
//                 animate(index, imageWrapper, imageCount, transition, delay, false)
//             }
//         },
//         delay)
// }

// function animate(index, imageWrapper, imageCount, transition, delay, reverse){

//     var currentLeftPosition = -(index * 640)
//     var setLeftPosition = currentLeftPosition

//     var transitionInternval = setInterval(() => {
//         setLeftPosition--
//         imageWrapper.style.left = setLeftPosition + 'px'

//         if(setLeftPosition < currentLeftPosition - 640){
//             clearInterval(transitionInternval)
            
//             index = index + 1
//             autoSlider(imageWrapper, index, imageCount, transition, delay, reverse)
//         }
//     }, transition);
// }

// function reverseAnimate(index, imageWrapper, imageCount, transition, delay, reverse){
//     var currentLeftPosition = -(index * 640)
//     var setLeftPosition = currentLeftPosition

//     var transitionInternval = setInterval(() => {
//         setLeftPosition++
//         imageWrapper.style.left = setLeftPosition + 'px'

//         if(setLeftPosition > currentLeftPosition + 640){
//             clearInterval(transitionInternval)            
//             index = index - 1
//             autoSlider(imageWrapper, index, imageCount, transition, delay, reverse)
//         }
//     }, transition);
// }

//     console.log('last index', index)
}

// const carousel1 = new Slider('slider-1', 1, 5000)

// const carousel2 = new Slider('slider-2', 2,  1000)
































