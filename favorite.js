const tmp = JSON.parse(localStorage.x)
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

                card +=`
                <div class="fcard">
            <div class="img-box"><img src="${data.data[tmp[x]].images.jpg.large_image_url}" alt="..." class="fav-anime-img"></div>
            <div class="text-container">
                
                <h2>${data.data[tmp[x]].title}</h2>
                <p>${data.data[tmp[x]].synopsis}</p>
                </div>
            </div>`

        }
        favAnime.innerHTML = card
}
getNewEpisodes()

