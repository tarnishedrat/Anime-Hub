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

async function getNewEpisodes(){
        const url = 'https://api.jikan.moe/v4/seasons/now'
        const res  = await fetch(url)
        const data = await res.json()
        console.log(data)
        let card =""
        for(let x = 0 ; x < data.data.length ; x++){
                card += `
                 <div class="fcard">
            <div class="img-box"><img src="${data.data[x].images.jpg.large_image_url}" alt="..." class="fav-anime-img"></div>
            <div class="text-container">
                
                <h2>${data.data[x].title}</h2>
                <p>${data.data[x].synopsis}</p>
                </div>
            </div>`
                
                /* epImg[x].src = data.data[x].images.jpg.large_image_url
                epTitle[x].innerHTML = data.data[x].title
                epNum[x].innerHTML = data.data[x].episodes */
        }
        document.querySelector('.anime-episodes').innerHTML = card
}
getNewEpisodes()
console.log(epTitle)

searchIcon.addEventListener('click' , function(){
        SearchContainer.style.display = 'flex'
        searchBar.focus()
        window.scrollTo({
                top : 300 ,
                behavior : 'smooth'
        })
})
console.log(cards)

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
let hearts = document.querySelectorAll('.img-con i')
let fcard = document.querySelectorAll('.fcard')
let favAnimes;
let on;
console.log(fcard)


let tmp ;
if(localStorage.x != null){
        tmp = JSON.parse(localStorage.x)
}
else{
        tmp = []
}


window.onload = function(){
        if(localStorage.x != null){
                for(let x = 0; x < tmp.length; x++) {
                        hearts[tmp[x]].classList.add('red')
                        
                }
        }
}
for (let x = 0; x < hearts.length; x++) {
        hearts[x].addEventListener('click' , function(){
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
console.log(tmp)

//add to favorite
