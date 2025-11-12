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
let nav = document.querySelector('nav')
let textContainer = document.querySelectorAll('.text-container')
const searchIcon = document.querySelector('#search-icon')
const SearchContainer = document.querySelector('#searchbar-container')
let III = document.createElement('i')
const searchBar = document.getElementById('searchbar')
searchIcon.addEventListener('click' , function(){
        
        SearchContainer.style.display = 'flex'
        searchBar.focus()
        /* nav.style.position ='fixed'
        nav.style.width ="100%" */
        nav.style.zIndex ="10000"
        window.scroll({
                top: 801,
                behavior: 'smooth'
                });
                searchBar.addEventListener('blur' , function(){
                        SearchContainer.style.display ="none"
                })
       
})


console.log(heroSecH1)
console.log(document.body.scrollHeight);


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
                        text.style.color ='var(--text)'
                        t2.textContent = title[x].innerHTML
                        t2.style.whiteSpace ='wrap'
                        t2.style.textOverflow ='normal'
                        
                        let div = document.createElement('div')
                        div.style.width = '360px'
                        
                        
                        div.style.display ='flex'
                        div.style.flexDirection ='column'
                        div.style.alignItems ='center'
                        div.style.justifyContent ='center'
                        div.style.position ='absolute'
                        div.style.bottom = '20px'
                        div.style.opacity = '0'
                        div.style.pointerEvents = 'none'
                        div.style.left = '50%'
                        div.style.padding ='10px'
                        div.style.transform = 'translateX(-50%)'
                        
                       
                        div.appendChild(t2)
                        div.appendChild(text)
                        cards[x].addEventListener('mouseenter' , () =>{
                                div.style.opacity = '1'
                                div.style.pointerEvents = 'auto'
                                div.style.backgroundColor = 'var(--gray)'
                                textContainer[x].style.filter = 'blur(10px)'
                                imgs[x].style.transition = '.4s'
                                imgs[x].style.cursor= 'pointer'
                                imgs[x].style.opacity = '0.7'
                                if(body.classList.contains('light-theme')){
                                      imgs[x].style.opacity ="0.85"
                                }
                                
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
        console.log(data)
        let card =""
        let popcard =""
        for(let x = 0 ; x < data.data.length ; x++){
                const desc = data.data[x].synopsis != null
                const lightTheme = document.body.classList.contains('light-theme')
                const shortEnough = data.data[x].title.length <70
                
                card += `
                 <div class="fcard" >
            <div class="img-box"><img src="${data.data[x].images.jpg.large_image_url}" alt="..." class="fav-anime-img">
            <i class="fa-solid fa-heart HS"></i>
            </div>
            <div class="text-container">
                
                <h2>${data.data[x].title}</h2>
                
                </div>
                
                

               
            </div>`
                popcard += `
                <div class="pop-up" >
                <i class="fa-solid fa-xmark"></i>
                <div class="img-box"><img src="${data.data[x].images.jpg.large_image_url}" alt="..." class="fav-anime-img">
            
            </div>
               <div class="text">
                 ${shortEnough ? `<h2>${data.data[x].title}</h2>` : ''}
                ${desc?`<p class='desc' > ${data.data[x].synopsis}</p>` :`<p style="color: var(--text);">No description</p>`}
                <p id="status">${data.data[x].status}</p>
                <p class='epday'>Episode day: ${data.data[x].broadcast.day}</p>
                
                <p id='genre'>Genres: ${data.data[x].genres[0].name}</p>
                
                </div>
                <button id="watchbtn">Watch Now!</button>
                </div>
                `
               
        }
        document.querySelector('.anime-episodes').innerHTML = card
        document.querySelector('.anime-episodes').innerHTML += popcard
        showDetails()
}
getNewEpisodes().then(() =>{
       /*   */
       
       
        

       /*  let synopsis = document.querySelectorAll('.synopsis')
        let fimgs = document.querySelectorAll('.fav-anime-img')
        
        console.log(synopsis)
        const lightTheme = document.body.classList.contains('light-theme')

        

        const description  = document.querySelectorAll('.pop-up .desc')
        const status = document.querySelectorAll('.pop-up #status')
        const genre = document.querySelectorAll('.pop-up #genre')
        const epday = document.querySelectorAll('.pop-up .epday')
        console.log(status , epday , genre , description)
        
        const text = document.querySelectorAll('.pop-up .text') */
 
  let hearts = document.querySelectorAll('.fcard .img-box i')

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

 

             




}).then(()=>{

       
      /*  let synopsis = document.querySelectorAll('.synopsis')
        let fimgs = document.querySelectorAll('.fav-anime-img')
                        
        console.log(fimgs)
        const lightTheme = document.body.classList.contains('light-theme')

                       

                        const description  = document.querySelectorAll('.pop-up .desc')
                        const status = document.querySelectorAll('.pop-up #status')
                        const genre = document.querySelectorAll('.pop-up #genre')
                        const epday = document.querySelectorAll('.pop-up .epday')
                        const text = document.querySelectorAll('.pop-up .text')
                        const Ftit = document.querySelectorAll('.fcard h2')


       






    let hearts = document.querySelectorAll('.fcard .img-box .HS')



                if(localStorage.x != null){
                        for(let x = 0; x < tmp.length; x++){
                                hearts[tmp[x]].classList.add('red')  
                                console.log(hearts[tmp[x]])
                        }
                }
        /*
        console.log(hearts)
   
   */
    let popup = document.querySelectorAll('.pop-up')
    let xmarks = document.querySelectorAll('.fa-xmark')
       console.log(popup)
       console.log(xmarks)
        xmarks.forEach(mark =>{
                mark.addEventListener('click' , ()=>{
                        popup.forEach(pop =>{
                                pop.classList.remove('show')
                        })
                })
        })
})


/* function search(){
        let synopsis = document.querySelectorAll('.synopsis')
        let fimgs = document.querySelectorAll('.fav-anime-img')
        const description  = document.querySelectorAll('.pop-up .desc')
        const status = document.querySelectorAll('.pop-up #status')
        const genre = document.querySelectorAll('.pop-up #genre')
        const epday = document.querySelectorAll('.pop-up .epday')
        const text = document.querySelectorAll('.pop-up .text')
        const Ftit = document.querySelectorAll('.fcard h2')
          
        let fcard = document.querySelectorAll('.fcard')
        const imgs = [...fimgs].map(im => im.src)
        const tit = Array.from(Ftit).map(t => t.innerHTML)     
           

        let card  =''
        for(let x = 0 ; x < fcard.length; x++){
                
                if(tit[x].toLowerCase().includes(searchBar.value)){
                card += `
                 <div class="fcard" >
            <div class="img-box"><img src="${imgs[x]}" alt="..." class="fav-anime-img">
            <i class="fa-solid fa-heart HS"></i>
            </div>
            <div class="text-container">
                
                <h2>${tit[x]}</h2>
                
                </div>
                
                

               
           
                
                </div>
                `}
               
        }
        document.querySelector('.anime-episodes').innerHTML = card
        document.querySelector('.anime-episodes').innerHTML += popcard 
                
                
                
                
                
        }
        
searchBar.addEventListener('keyup' , search) */
 // 🟢 SEARCH FUNCTION
/* function search() {
  // get all needed elements
  const synopsis = document.querySelectorAll('.synopsis');
  const fimgs = document.querySelectorAll('.fav-anime-img');
  const Ftit = document.querySelectorAll('.fcard h2');
  const popUps = document.querySelectorAll('.pop-up');

  // collect data
  const imgs = [...fimgs].map(im => im.src);
  const tit = Array.from(Ftit).map(t => t.innerHTML);
  

  // rebuild cards based on search input
  let card = '';
  for (let x = 0; x < Ftit.length; x++) {
    if (tit[x].toLowerCase().includes(searchBar.value.toLowerCase())) {
      card += `
        <div class="fcard">
          <div class="img-box">
            <img src="${imgs[x]}" alt="..." class="fav-anime-img">
            <i class="fa-solid fa-heart HS"></i>
          </div>
          <div class="text-container">
            <h2>${tit[x]}</h2>
            
          </div>
        
        </div>`;
    }
  }

  document.querySelector('.anime-episodes').innerHTML = card;
} */

function search() {
        let hearts = document.querySelectorAll('.fcard .img-box i')
        console.log(hearts)
        
        if(localStorage.x != null){
                for (let x = 0; x < tmp.length; x++) {
                        let indexOf = tmp[x]
                        hearts[indexOf].style.color='red'
                        
                }
        }
  const searchValue = searchBar.value.toLowerCase();
  const cards = document.querySelectorAll('.anime-episodes .fcard');
  const titles = document.querySelectorAll('.anime-episodes .fcard h2');

  for (let i = 0; i < cards.length; i++) {
    const titleText = titles[i].innerText.toLowerCase();
    if (titleText.includes(searchValue)) {
      cards[i].style.display = "block"; // show card
    } else {
      cards[i].style.display = "none"; // hide card
    }
  }
}

// trigger search on typing
searchBar.addEventListener('keyup', search); 

      


// fav

let favAnImg = document.querySelector('.popular-anime-img')
let favAnCon = document.querySelector('.fav-animes')
let favAnText = document.querySelector('.text-container')
let favAnTitle = document.querySelector('.text-container h2')
let favAnDesc = document.querySelector('.text-container p')

let favAnimes;
let on;
const text = document.querySelectorAll('.pop-up .text')

var showDetails = () => {
        //call the elements
  const popUps = document.querySelectorAll('.pop-up');
  const carts = document.querySelectorAll('.anime-episodes .fcard');

  popUps.forEach(pop =>pop.style.transition ='all ease 0.2s')
  for (let x = 0; x < carts.length; x++) {
        carts[x].addEventListener('click' , function(e){
                popUps[x].classList.remove('show')


                popUps[x].classList.toggle('show')

                
                e.stopPropagation()
                
        })
        popUps[x].addEventListener('click', e =>e.stopPropagation())
        document.addEventListener('click' , function(){
                popUps.forEach(e => e.classList.remove('show'))
        })

  }

};




//light-mode
const moon = document.querySelector('.nav .light-mode .fa-moon')
const sun = document.querySelector('.nav .light-mode .fa-sun')
const moonCon = document.querySelector('.light-mode .moon-con')
const sunCon = document.querySelector('.light-mode .sun-con')
const lightMode = document.querySelector('.light-mode')
const btns = document.querySelector('button')
console.log(lightMode , sunCon)

let mode;
if(localStorage.mode != null){
        mode = localStorage.mode
}
else{
        mode ="light"
}
window.onload = ()=>{
        if(localStorage.mode != null){
                if(localStorage.mode ==="light"){
                        body.classList.add('light-theme')
                        moonCon.style.opacity= '0'
                        sunCon.style.opacity ='1'
                        sunCon.style.visibility ='visible'
                        moonCon.style.visibility ='hidden'
                        moonCon.style.transform ='translateX(24px)'
                        sunCon.style.transform ='translateX(24px)'
                }
        }
}

let body = document.body

        
        
        lightMode.addEventListener('click' , function(){

               
               if(localStorage.mode === "dark"){ 
                moonCon.style.opacity= '0'
                moonCon.style.transition ='opacity 0.2s'
                
                
        setTimeout(() => {
                sunCon.style.opacity ='1'
                sunCon.style.visibility ='visible'
                moonCon.style.visibility ='hidden'
                moonCon.style.transform ='translateX(24px)'
                sunCon.style.transform ='translateX(24px)'
        }, 200);
                mode = "light" 
                localStorage.mode = mode
                document.body.classList.add('light-theme')
}


                else{
        console.log("yatek zaieze")
        
                sunCon.style.opacity ='0'
                sunCon.style.transition ='opacity 0.2s'
                

        setTimeout(() => {
                sunCon.style.visibility ='hidden'
                //showmoon
                moonCon.style.opacity ='1'
                moonCon.style.visibility ='visible'
                moonCon.style.transform ="translateX(0)"
        }, 200);
                mode ="dark"
                localStorage.mode = mode
        document.body.classList.remove('light-theme')
        
        
}
})

