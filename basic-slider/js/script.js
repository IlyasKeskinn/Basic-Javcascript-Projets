let models = [
    {
        "name" : "Summer",
        "imgPath" : "./img/img-1.jpeg"
    },
    {
        "name" : "Summer",
        "imgPath" : "./img/img-2.jpeg"
    },
    {
        "name" : "Summer",
        "imgPath" : "./img/img-3.jpeg"
    },
    {
        "name" : "Summer",
        "imgPath" : "./img/img-4.jpeg"
    },
    {
        "name" : "Summer",
        "imgPath" : "./img/img-5.jpeg"
    },
    
]

let slideSettings = {
    "duration" : 1000,
    "autoMode" : true,
    "randomMode" : true,
}

let index = 0;
let toggleButton  = document.querySelector("#toggleIcon");
let interval;  // We define this variable for later use

// Pause auto transition when mouse enters slider controls
document.querySelectorAll('.slider-controls').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
        clearInterval(interval);
    })
})

// Resume auto transition when mouse leaves slider controls
document.querySelectorAll('.slider-controls').forEach(function (item) {
    item.addEventListener('mouseleave', function () {
        init(slideSettings)
    })
})


// Clicking the left arrow to go to the previous slide
document.querySelector(".fa-arrow-left").addEventListener('click',function () {
    index --;
    showSlides(index);
    console.log(index)

})

// Clicking the right arrow to go to the next slide
document.querySelector(".fa-arrow-right").addEventListener('click',function () {
    index ++;
    showSlides(index);
    console.log(index)
})


init(slideSettings)


function showSlides(i) {

    index = i;

    if (i < 0) {
        index = models.length - 1
    }
 
    if (i >= models.length) {
        index = 0;
    }
   

    index = index % models.length;


    document.querySelector('.slide-img').setAttribute('src', models[index].imgPath);


}

function init(settings) {
    
    let prevIndex ;

   interval =  setInterval(function (){
        if (settings.autoMode) {
            if (settings.randomMode) {
                do {
                    index = Math.floor(Math.random() * models.length)
                } while (index == prevIndex){
                    prevIndex = index
                };
            }
            else{
                index++;
            }
            console.log(index)
            showSlides(index);
        }
        else{
            clearInterval(interval);
        }
       
    },settings.duration)


}
// Clicking the start/stop button for auto mode
toggleButton.addEventListener("click", function () {
    startStop(slideSettings)
})

function startStop(settings) {
    
    if (settings.autoMode) {
        toggleButton.classList.remove("fa-stop");
        toggleButton.classList.add("fa-play");
        settings.autoMode = false
    }else{
        toggleButton.classList.remove("fa-play");
        toggleButton.classList.add("fa-stop");
        settings.autoMode = true
    }

}
