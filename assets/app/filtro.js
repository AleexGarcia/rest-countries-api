inputFilter = document.querySelector('#filter-input');
filterBox = document.querySelector("#filter-box");
dropBox = document.querySelector('#dropDown-box');

filterBox.addEventListener('click', (e)=>{
    
    dropBox.classList.forEach(element => {
        if(element == 'open'){
            dropBox.classList.remove('open');
        }else{
            dropBox.classList.add('open');
        }
    });
});

listDropDown = document.querySelector('#listDropDown');

listDropDown.addEventListener('click',(e)=>{
    if(e.target.dataset.region != null){
        inputFilter.value = e.target.dataset.region;
    }
    filtraRegião(inputFilter.value);
    dropBox.classList.forEach(element => {
        if(element == 'open'){
            dropBox.classList.remove('open');
        }else{
            dropBox.classList.add('open');
        }
    });
})

function filtraRegião(region){
    cardsHTML.forEach(element => {
       if(region != element.dataset.region){
        element.classList.add('oculto');
       }else{
        element.classList.remove('oculto');
       }
       if(region === ""){
        element.classList.remove('oculto');
       }
    });
}


