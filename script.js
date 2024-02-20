const api_key = "61390423123c4d3aa9e9d2e873d2dd9f"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', ()=> fetchNews("india"));



function reload(){
    window.location.reload()
}


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${api_key}`)
    const data = await res.json();
    console.log(data)
    bindData(data.articles)
}

function  bindData(articles){
    const cardscontainer = document.getElementById("cards-container")
    const newscardtemplates = document.getElementById("template-news-card")
    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemplates.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone, article){
    const newsImg =  cardclone.querySelector("#news-image")
    const newsTitle =  cardclone.querySelector("#news-title")
    const newsSource =  cardclone.querySelector("#news-source")
    const newsDesc =  cardclone.querySelector("#news-desc")

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} · ${date}`;
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');


searchbutton.addEventListener('click', ()=>{
    const query = searchtext.value ;
    if(!query) return ;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})

