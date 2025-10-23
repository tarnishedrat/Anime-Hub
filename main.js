let cards = document.querySelectorAll('.card')
let imgBox = document.getElementById('img-box')
let img = document.querySelectorAll('.img-box #show')
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
console.log(SearchContainer)


async function getAnimeDATA(){
        const response = await fetch()
}


let i = 1
function plus(){
        if(i === 4){
                i = 1
                img[0].src = `imgs/img${i}.jpg`
                console.log(i)
        } 
        else{
                 i++
                img[0].src = `imgs/img${i}.jpg`
                console.log(i)
        }
}
function moin(){
        if(i === 1 ){
                i = 4
                img[0].src = `imgs/img${i}.jpg`
                console.log('if' +i)
        }
        else{
                i--
                img[0].src = `imgs/img${i}.jpg`
                console.log('else' +i)
        }
}
let count = 0
setInterval(() =>{
        if(count === 4){
                count = 1
                img[0].src = `imgs/img${count}.jpg`
        }
        else{
                count++
                img[0].src = `imgs/img${count}.jpg`
        }
}, 3000)

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
        console.log(data)
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
                        tmp.splice(x,1)
                        localStorage.setItem('x' , JSON.stringify(tmp)) 
                }
        })  
}
})
console.log(epTitle)

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
