const container = document.querySelector('.container');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const seats = document.querySelectorAll('.rows .seat:not(occupied)');
const movieSelect = document.querySelector('#movie');

let moviePrice = +movieSelect.value;
localData();

movieSelect.addEventListener('change',e=>{
    moviePrice = e.target.value;
    movieData(e.target.selectedIndex,moviePrice);
    updateUi();
})
function movieData(movieIndex,moviePrice){
    localStorage.setItem('movieIndex',movieIndex);
    localStorage.moviePrice = moviePrice;
}


// dat from local storage
function localData(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedIndex'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
               seat.classList.add('selected'); 
            }
        })
    }
    if(localStorage.movieIndex !== null){
        moviePrice = localStorage.moviePrice;
        movieSelect.selectedIndex = localStorage.movieIndex;

    }
}
function updateUi(){
    const selectedSeats = document.querySelectorAll('.rows .seat.selected');
    count.innerText = selectedSeats.length;
    total.innerText = moviePrice * selectedSeats.length;

    const selectedIndex = [...selectedSeats].map(seat=>{
        return [...seats].indexOf(seat);
    });
    console.log(selectedIndex);
    localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex))
}
container.addEventListener('click',e=>{
    if(e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateUi();
    }
})

updateUi();