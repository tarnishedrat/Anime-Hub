let tmp = JSON.parse(localStorage.x)
console.log(tmp)
const favAnime = document.querySelector('.fav-animes')
const fcard = document.querySelectorAll('.fcard') 
const imgBox = document.querySelectorAll('.img-box') 
const imgs = document.querySelectorAll('.img-box img') 
const textCon = document.querySelectorAll('.text-container') 
const aniTile = document.querySelectorAll('.text-container h2') 
const aniDesc = document.querySelectorAll('.text-container p') 


async function getNewEpisodes(){
        const url = 'https://api.jikan.moe/v4/seasons/now'
        const res  = await fetch(url)
        const data = await res.json()
        console.log(data)
        let card =''
        for(let x = 0 ; x < tmp.length ; x++){
                /* imgs[x].src = data.data[tmp[x]].images.jpg.large_image_url
                aniTile[x].innerHTML = data.data[tmp[x]].title
                aniDesc[x].innerHTML = data.data[tmp[x]].synopsis  */
             const desc = data.data[x].synopsis != null
                        
                const shortEnough = data.data[x].title.length <70
                card += `
                 <div class="fcard">
            <div class="img-box"><img src="${data.data[tmp[x]].images.jpg.large_image_url}" alt="..." class="fav-anime-img">
            <i class="fa-solid fa-heart"></i>
            </div>
            <div class="text-container">
                
                <h2>${data.data[tmp[x]].title}</h2>
                <p>${data.data[tmp[x]].synopsis}</p>
                </div>
                 <div class="pop-up">
               <div id="text">
                 ${shortEnough ? `<p>${data.data[tmp[x]].title}</p>` : ''}
                ${desc? `<p>${data.data[tmp[x]].synopsis}</p>` :'No description'}
                <p>${data.data[tmp[x]].status}</p>
                <p>Episode day: ${data.data[tmp[x]].broadcast.day}</p>
                
                <p>Genres: ${data.data[tmp[x]].genres[0].name}</p>
                </div>
                <button id="watchbtn">Watch Now!</button>
                </div>
                

            </div>`

        }
        favAnime.innerHTML = card
        showDetails()
}
getNewEpisodes().then(() =>{
        let hearts = document.querySelectorAll('.fcard .img-box i')
        console.log(hearts)

        /* if(localStorage.x != null){
           
                for(let x = 0; x < tmp.length; x++) {
                        hearts[tmp[x]].classList.toggle('red')  
                        console.log(hearts[tmp[x]])
                }
        } */
       for (let x = 0; x < hearts.length; x++) {
            hearts[x].classList.add('red')
        
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

