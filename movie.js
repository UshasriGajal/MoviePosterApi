// const fetch = require('node-fetch');

// var divs=document.getElementById('main')
// var movieDiv=document.createElement('div')
// movieDiv.setAttribute('class','movieDiv')
var nav=document.getElementById('filters')
nav.setAttribute('class','nav')
var text=document.getElementById('text')
var searchPlace=document.getElementById('searchPlace')
var name=document.getElementById('name')
var count=0
var favArr=[]
document.getElementById('SearchMovie').addEventListener('click',()=>{

  var movieDiv=document.createElement('div')
  movieDiv.setAttribute('class','movieDiv')
  var mainDiv=document.getElementById('AllMovies')
  mainDiv.setAttribute('class','AllMovies')
  mainDiv.innerText=""
    var movies=document.getElementById('EnterMovie').value
    const url = `https://api.themoviedb.org/3/search/movie?query=${movies}&include_adult=false&language=en-US&page=1`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc1NTI5NDc0MGM1ODJmMThmMzdhMGEyZmY1YTgwMCIsIm5iZiI6MTcyNDMyMDYzNC4wMjcwMTYsInN1YiI6IjY2YzcwOTU2MTlhZmI0YTdkMGVhYjZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QI4vZ5kUEslGhpNAzk6QvSoEULxSpX9_eRgt9dWxphs'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        var data=json
        // console.log(data)
        var arr=data.results
        // mainDiv=document.getElementById('AllMovies')
        
        var MovieSearched=document.createElement('div')
        MovieSearched.setAttribute('class','MovieSearched')
        for(var i of arr){
            count++

            var card=document.createElement('div')
            card.setAttribute('class','movieCard')
            var posterDiv=document.createElement('div')
            posterDiv.setAttribute('class','posterDiv')
            posterDiv.setAttribute('id','posterDiv_'+count)
            console.log(posterDiv.id)
            var poster=document.createElement('img')
            poster.setAttribute('class','poster')
            var button=document.createElement('button')
            button.innerHTML=`
            <img src=${"https://img.icons8.com/?size=52&id=DFU1kReSUccu&format=png"} height=${'20px'} width=${"20px"}></img>
            `
            button.style.border='none'
            button.style.backgroundColor='white'
            button.setAttribute('class','fav_')
            button.setAttribute('id','fav_'+count)

            button.addEventListener('click',favorite)

            // var heart=document.createElement('img')
            // heart.className='fa-duotone fa-solid fa-heart'
            // button.append(heart)
            var h4=document.createElement('h4')
            h4.textContent=`Movie:${i.title}`
            var date=document.createElement('p')
            date.setAttribute('class','release')
            date.innerText+=`Released on: ${i.release_date}`
            var rating=document.createElement('p')
            rating.setAttribute('class','rating')
            rating.textContent=`Rating:${i.vote_average.toFixed(1)}/10`
            var matter=document.createElement('p')
            matter.setAttribute('class','matter')

            matter.textContent=`Overview: ${i.overview}`
            // console.log(i.release_date)
            if(i.poster_path!=null){
                poster.src+=`https://image.tmdb.org/t/p/w500/${i.poster_path}`
            }
            else{
                continue
            }
            

            // poster.append(i.)
            card.setAttribute('class','movieCard')
            card.setAttribute('id','movieCard_'+count)
            posterDiv.append(poster)
            card.append(posterDiv,button,h4,date,rating,matter)
            MovieSearched.append(card)
            
            
        }
        movieDiv.append(MovieSearched)
        mainDiv.append(movieDiv)
        
    })
    .catch(err => console.error('error:' + err));

}
)
function  favorite(){
  // console.log('yes')
  var currentElement=document.activeElement.getAttribute('id')
  var currentId=currentElement.split('_')[1]

  var cards=document.getElementById('movieCard_'+currentId)

var posterDiv = document.querySelector('#posterDiv_'+currentId);
console.log(posterDiv)
var posterImg = posterDiv.querySelector('.poster');

var imgSrc = posterImg.getAttribute('src');
// console.log(imgSrc)
var moviename = cards.querySelector('h4').innerText
var Released = cards.querySelector('.release').innerText
var rating = cards.querySelector('.rating').innerText
var matter = cards.querySelector('.matter').innerText

var obj={
  img:imgSrc,
  movie:moviename,
  release:Released,
  rating:rating,
  matter:matter
}
// posterDiv.innerText=""
favArr.push(obj)
sessionStorage.setItem('favArr',JSON.stringify(favArr))
console.log(favArr)
alert('Added to favorites')

console.log(imgSrc,moviename,Released,rating,matter)

  // console.log(cards.innerHTML.movie)
  

}

var movies=document.getElementById('EnterMovie')


document.getElementById('fav').addEventListener('click',()=>{
  
  var length=sessionStorage.getItem('favArr').length
  var mainDiv=document.getElementById('AllMovies')
  mainDiv.innerText=""
  if(favArr==0){
    var h2=document.createElement('h2')
    h2.textContent='Oops!! nothing in Favorite List🤷‍♀️🤔'
    h2.style.color='white'
    var Noimg=document.createElement('img')
    Noimg.src+='https://www.shutterstock.com/image-vector/confused-young-woman-scratching-her-600nw-2102142328.jpg'
    mainDiv.append(h2 )
  }
  var movieDiv=document.createElement('div')
  movieDiv.setAttribute('class','movieDiv')

  var MovieSearched=document.createElement('div')
        MovieSearched.setAttribute('class','MovieSearched')

  console.log(favArr.length)
  for(var i=0;i<favArr.length;i++){
    var card=document.createElement('div')
    card.setAttribute('class','movieCard')
    card.innerHTML=`
      <div class="posterDiv">
      <img src='${favArr[i].img}' class="poster"></div>
      </div>
      
      <h4>${favArr[i].movie}</h4>
      <p class='release'>${favArr[i].release}</p>
      <p> ${favArr[i].rating}</p>
      <p>${favArr[i].matter}</p>
    `
      MovieSearched.append(card)
            
            
        }
        movieDiv.append(MovieSearched)
        mainDiv.append(movieDiv)
  
  // mainDiv.append(card)
  // mainDiv.setAttribute('class','AllMovies')
  
})
var count=0
document.addEventListener('DOMContentLoaded',()=>{
    var Now=document.getElementById('nowContent')
    var popular=document.getElementById('popularContent')
    var Rated=document.getElementById('RatedContent')
    var UpcomingMovies=document.getElementById('upcomingContent')

const url1 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options1 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc1NTI5NDc0MGM1ODJmMThmMzdhMGEyZmY1YTgwMCIsIm5iZiI6MTcyNDQxMDM1Ni4wNzk1NjIsInN1YiI6IjY2YzcwOTU2MTlhZmI0YTdkMGVhYjZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hgz5oRKLe_5JGvTwEgAQ1Wcw_lcdDP21BB6ujrPySS4'
  }
};

fetch(url1, options1)
  .then(res => res.json())
  .then(json => {
    var data=json
    // console.log(data)
    var arr=data.results
    
    
        for(var i of arr){
            var imagesDivs=document.createElement('div')
            imagesDivs.setAttribute('class','imagesDivs')
            var PosterImages=document.createElement('img')
            PosterImages.setAttribute('class','PosterImages')
            // if(i.poster_path!=null){
                PosterImages.src+=`https://image.tmdb.org/t/p/w500/${i.poster_path}`
                // console.log(`https://image.tmdb.org/t/p/w500/${i.poster_path}`)
            // }
            // else{
                // continue
            // }
            imagesDivs.append(PosterImages)
            Now.append(imagesDivs)
        }
        
        // document.body.append(imagesDivs)

})
  .catch(err => console.error('error:' + err));




  const url3 = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options3 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc1NTI5NDc0MGM1ODJmMThmMzdhMGEyZmY1YTgwMCIsIm5iZiI6MTcyNDQxMDM1Ni4wNzk1NjIsInN1YiI6IjY2YzcwOTU2MTlhZmI0YTdkMGVhYjZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hgz5oRKLe_5JGvTwEgAQ1Wcw_lcdDP21BB6ujrPySS4'
    }
  };
  
  fetch(url3, options3)
    .then(res => res.json())
    .then(json => {
        var data=json
        // console.log(data)
        var arr=data.results
            for(var i of arr){
              var imagesDivs=document.createElement('div')
              imagesDivs.setAttribute('class','imagesDivs')
              var PosterImages=document.createElement('img')
              PosterImages.setAttribute('class','PosterImages')
              // if(i.poster_path!=null){
                  PosterImages.src+=`https://image.tmdb.org/t/p/w500/${i.poster_path}`
                  // console.log(`https://image.tmdb.org/t/p/w500/${i.poster_path}`)
              // }
              // else{
                  // continue
              // }
              imagesDivs.append(PosterImages)
              Rated.append(imagesDivs)
            }
    })
    .catch(err => console.error('error:' + err));


    // const fetch = require('node-fetch');

    const url4 = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options4 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc1NTI5NDc0MGM1ODJmMThmMzdhMGEyZmY1YTgwMCIsIm5iZiI6MTcyNDQxMDM1Ni4wNzk1NjIsInN1YiI6IjY2YzcwOTU2MTlhZmI0YTdkMGVhYjZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hgz5oRKLe_5JGvTwEgAQ1Wcw_lcdDP21BB6ujrPySS4'
      }
    };
    
    fetch(url4, options4)
      .then(res => res.json())
      .then(json => {
        var data=json
        // console.log(data)
        var arr=data.results
            for(var i of arr){
              var imagesDivs=document.createElement('div')
              imagesDivs.setAttribute('class','imagesDivs')
              var PosterImages=document.createElement('img')
              PosterImages.setAttribute('class','PosterImages')
              // if(i.poster_path!=null){
                  PosterImages.src+=`https://image.tmdb.org/t/p/w500/${i.poster_path}`
                  // console.log(`https://image.tmdb.org/t/p/w500/${i.poster_path}`)
              // }
              // else{
                  // continue
              // }
              imagesDivs.append(PosterImages)
              UpcomingMovies.append(imagesDivs)
            }
    })
      .catch(err => console.error('error:' + err));


})


