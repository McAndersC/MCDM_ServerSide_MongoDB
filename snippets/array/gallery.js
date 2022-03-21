
const orderElement = document.querySelector('.order')
const unorderElement = document.querySelector('.unordered')
const slider = document.querySelector('.slider')
const catalog = document.querySelector('.catalog')

const forwardBtn = document.querySelector('.forward')
const backBtn = document.querySelector('.back')

let testArray = [
    {
        name: 'Burger',
        order: 3
    },
    {
        name: 'Hund',
        order: 1
    },{
        name: 'Kat',
        order: 2
    },
    {
        name: 'Hest',
        order: 2
    },
    {
        name: 'Løve',
        order: 2
    },
]

let sortedArray = JSON.parse(JSON.stringify(testArray));
sortedArray.sort((a, b) => (a.order > b.order) ? 1 : -1)

testArray.map( (obj, index) => unorderElement.innerHTML += `<li>Index: ${index} SortOrder: ${obj.order}</li>` )
sortedArray.map( (obj, index) => orderElement.innerHTML += `<li>Index: ${index} SortOrder: ${obj.order}</li>` )

//Start
let currentIndex = 1;  
slider.innerHTML = testArray[currentIndex].name;


// catalog

testArray.map((obj) => {

    catalog.innerHTML += `<div class="catBtn"><div class="someArt">${obj.name}</div></div>`

})

const open = (index) => {
    console.log('Click', index)
    currentIndex = index;  
    slider.innerHTML = testArray[currentIndex].name;
}

const catBtns = document.querySelectorAll('.catBtn');
catBtns.forEach((btn, index) => {


    btn.addEventListener('click', () => open(index));

})


// Slider

const forward = () => {
    console.log('Forward', currentIndex, testArray.length)

    if(currentIndex === testArray.length - 1){

        currentIndex = 0;

    } else {

        currentIndex++
    }

    slider.innerHTML = testArray[currentIndex].name;
}

const back = () => {

    console.log('Back', currentIndex, testArray.length)

    if(currentIndex === 0){

        currentIndex = testArray.length - 1;

    } else {

        currentIndex--
    }

    slider.innerHTML = testArray[currentIndex].name;
}

forwardBtn.addEventListener('click', forward);
backBtn.addEventListener('click', back);