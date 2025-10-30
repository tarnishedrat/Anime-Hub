let cards = document.querySelectorAll('.card')
const heroSec = document.querySelector('.hero-section')
let heroSecH1 = document.querySelector('.hero-section .input h1')
let imgBox = document.querySelector('.hero-section .img-box')
let img = document.querySelectorAll('.hero-section .img-box img')
let title = document.querySelectorAll('.card h2')
let cardP = document.querySelectorAll('.card p')
let right = document.querySelector('.img-box #right')
let left = document.querySelector('.img-box #left')
let imgs = document.querySelectorAll('.popular-anime-img')
let textContainer = document.querySelectorAll('.text-container')
const searchIcon = document.querySelector('#search-icon')
const SearchContainer = document.querySelector('#searchbar-container')
let III = document.createElement('i')
const searchBar = document.getElementById('searchbar')

console.log(heroSecH1)


async function getOnePieceBanners(displayImage) {
  const query = `
    query {
      Page(perPage: 10) {
        media(search: "One Piece", type: ANIME) {
          title { romaji }
          bannerImage
          coverImage { large }
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  console.log(data);

  const banners = data.data.Page.media
    .map(m => m.bannerImage)
    .filter(Boolean); // remove nulls

  console.log("Banners:", banners);
  banners.splice(1 , 1)
  displayImage(banners)
}

getOnePieceBanners(displayImage);

function displayImage(banners){
        for(let x = 1  ; x <5 ; x++){
                
              img[x].src = banners[x-1]
        }
}
//setinterval
let x = 0
const flipImages = setInterval(() =>{
        if(x === 4){
                img[4].style.display ='none';
                x = 0
                img[x].style.display ='block';
        }
        else{
                img[x].style.display ='none';
                x++;
                img[x].style.display ='block';   
        }
        if(x === 2 ){
                right.style.color ='#000000';
                left.style.color ='#000000';
                heroSecH1.style.color ='black'
        }
        else{
                right.style.color ='#fff';
                left.style.color ='#fff'; 
                heroSecH1.style.color ='#fff'
        }
}, 3000)




right.addEventListener('click' , function(){
        clearInterval(flipImages)
        if(x === 4){
                img[4].style.display ='none';
                x = 0
                img[x].style.display ='block';
        }
        else{
                img[x].style.display ='none';
                x++;
                img[x].style.display ='block';   
        }
        if(x === 2 ){
                right.style.color ='black';
                left.style.color ='black';
                heroSecH1.style.color ='black'
        }
        else{
                right.style.color ='#fff';
                left.style.color ='#fff'; 
                heroSecH1.style.color ='#fff'
        }
        console.log(x)
})
left.addEventListener('click' , function(){
        if(x === 0){
                img[0].style.display ='none';
                x = 4
                img[x].style.display ='block';
        }
        else{
             img[x].style.display ='none';
                 x--;
                img[x].style.display ='block';   
        }
        if(x === 2 ){
                right.style.color ='black';
                left.style.color ='black';
                heroSecH1.style.color ='black'
        }
        else{   
                right.style.color ='#fff';
                left.style.color ='#fff'; 
                heroSecH1.style.color ='#fff'
        }

})


async function getPopularAnime(){
        const res = await fetch("https://api.jikan.moe/v4/seasons/now?limit=5")
        const data = await res.json()
        for(let x = 0; x < imgs.length ; x++){
                
                        imgs[x].src = data.data[x].images.jpg.image_url
                        title[x].innerHTML = data.data[x].title
                        cardP[x].innerHTML = data.data[x].synopsis
                        let text = document.createElement('span')

                        let t2 = document.createElement('h2')
                        
                        text.textContent = cardP[x].innerHTML
                        t2.textContent = title[x].innerHTML
                        t2.style.whiteSpace = 'wrap'
                        
                        let div = document.createElement('div')
                        div.style.width = '360px'
                        div.style.height = 'fit-content'
                        div.style.position ='absolute'
                        div.style.bottom = '20px'
                        div.style.opacity = '0'
                        div.style.pointerEvents = 'none'
                        div.style.left = '50%'
                        div.style.transform = 'translateX(-50%)'
                        div.style.zIndex ='9999'
                        div.style.padding= '10px'
                        div.appendChild(t2)
                        div.appendChild(text)
                        cards[x].addEventListener('mouseenter' , () =>{
                                div.style.opacity = '1'
                                div.style.pointerEvents = 'auto'
                                div.style.backgroundColor = '#333'
                                textContainer[x].style.filter = 'blur(10px)'
                                imgs[x].style.transition = '.4s'
                                imgs[x].style.cursor= 'pointer'
                                imgs[x].style.opacity = '0.7'
                                
                        })
                        cards[x].addEventListener('mouseleave' , () =>{
                                div.style.opacity = '0'
                                div.style.pointerEvents = 'none'
                                textContainer[x].style.filter = 'none'
                                imgs[x].style.opacity = '1'
                        })

                        cards[x].appendChild(div)
                          
                
               
        }
         console.log(data.data[1].images.jpg.image_url)
      
        
}
getPopularAnime()


//


let animeCard = document.querySelectorAll('.anime-card')
let epImg = document.querySelectorAll('.img-con img')
let epNum = document.querySelectorAll('.img-con h3')
let epTitle = document.querySelectorAll('.text-con h3')


let tmp ;
if(localStorage.x != null){
        tmp = JSON.parse(localStorage.x)
}
else{
        tmp = []
}

async function getNewEpisodes(){
        const url = 'https://api.jikan.moe/v4/seasons/now'
        const res  = await fetch(url)
        const data = await res.json()
        let card =""
        for(let x = 0 ; x < data.data.length ; x++){
                const desc = data.data[x].synopsis != null
                        
                const shortEnough = data.data[x].title.length <70
                
                card += `
                 <div class="fcard">
            <div class="img-box"><img src="${data.data[x].images.jpg.large_image_url}" alt="..." class="fav-anime-img">
            <i class="fa-solid fa-heart"></i>
            </div>
            <div class="text-container">
                
                <h2>${data.data[x].title}</h2>
                ${desc? `<p>${data.data[x].synopsis}</p>` :'No description'}
                </div>
                <div class="pop-up">
               <div id="text">
                 ${shortEnough ? `<p>${data.data[x].title}</p>` : ''}
                ${desc? `<p>${data.data[x].synopsis}</p>` :'No description'}
                <p>${data.data[x].status}</p>
                <p>Episode day: ${data.data[x].broadcast.day}</p>
                
                <p>Genres: ${data.data[x].genres[0].name}</p>
                </div>
                <button id="watchbtn">Watch Now!</button>
                </div>
                

               
            </div>`
                
               
        }
        document.querySelector('.anime-episodes').innerHTML = card
        showDetails()
}
getNewEpisodes().then(() =>{
        let hearts = document.querySelectorAll('.fcard .img-box i')
        console.log(hearts)

        if(localStorage.x != null){
      
                for(let x = 0; x < tmp.length; x++) {
                        hearts[tmp[x]].classList.add('red')  
                        console.log(hearts[tmp[x]])
                }
        }

for (let x = 0; x < hearts.length; x++) {
        hearts[x].addEventListener('click' , function(e){
                e.stopPropagation()
                hearts[x].classList.toggle('red')

                if(hearts[x].classList.contains('red')){
                        tmp.push(x)
                        localStorage.setItem('x' , JSON.stringify(tmp)) 
                }else{
                        const INDEXOF = tmp.indexOf(x) 
                        tmp.splice(INDEXOF , 1)
                        localStorage.setItem('x' , JSON.stringify(tmp)) 
                        
                }
                console.log(tmp)
        })  
}
})
/* localStorage.removeItem('x') */
console.log(tmp.length)
searchIcon.addEventListener('click' , function(){
        SearchContainer.style.display = 'flex'
        searchBar.focus()
        window.scrollTo({
                top : 300 ,
                behavior : 'smooth'
        })
})


/* const search = () =>{
 
        let cards = ''
        for(x = 0 ; x < epTitle.length; x++){
                if(epTitle[x].innerHTML.toLowerCase().includes(searchBar.value)){
                        cards += ` 
            <div class="anime-card">
                <div class="img-con">
                    <img src="${epImg[x].src}" alt="...">
                    <h3>${epNum[x].innerHTML}</h3>
                </div>
                <div class="text-con">
                    <h3>${epTitle[x].innerHTML}</h3>
                </div>
            </div>
            ` 
                }
        }
        document.querySelector('.anime-episodes').innerHTML =cards
} */


        const search =()=>{
                let card =''
                for (let x = 0; x < epTitle.length; x++) {
                        if(epTitle[x].innerHTML.toLowerCase().includes(searchBar.value)){
                        const eptit = epTitle[x].innerHTML
                        const epim = epImg[x].src
                        const epnumber = epNum[x].innerHTML

                        card += ` <div class="anime-card">
                <div class="img-con">
                    <img src="${epim}" alt="...">
                    <h3>${epnumber}</h3>
                </div>
                <div class="text-con">
                    <h3>${eptit}</h3>
                </div>
            </div>`
                      }  
                }
                document.querySelector('.anime-episodes').innerHTML = card
        }
searchBar.addEventListener('keyup' ,search )


// fav

let favAnImg = document.querySelector('.popular-anime-img')
let favAnCon = document.querySelector('.fav-animes')
let favAnText = document.querySelector('.text-container')
let favAnTitle = document.querySelector('.text-container h2')
let favAnDesc = document.querySelector('.text-container p')

let favAnimes;
let on;




                                                                                                //problem eli el hearts is not defined








var showDetails = () =>{
        const popUps = document.querySelectorAll('.pop-up')
        const carts = document.querySelectorAll('.anime-episodes .fcard')
        console.log(popUps)
        for(let x = 0; x < carts.length; x++) {
                carts[x].addEventListener('click' , function(){
                        popUps[x].classList.toggle('show')
                })
}
}


//add to favorite
