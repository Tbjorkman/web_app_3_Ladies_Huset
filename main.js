function getAllEvents()
{
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/events?_embed")
    .then(res=>res.json())
    .then(showEvents);
}

function getSingleEventById(myId)
{
    console.log(myId);
    //fetch("http://tabithabjorkman.com/wordpress/wp-json/wp/v2/" + myId + "/?_embed")
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/events/" + myId + "/?_embed")
        .then(res=>res.json())
        .then(showSingleEvent);
}

function showSingleEvent(json) {
    //console.log(document.querySelector('.date'));

    document.querySelector("#single img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector('#single h1').textContent = json.title.rendered;
    document.querySelector('#single h6').textContent = json.acf.custom_category + ' - ' + json.acf.performing_arts;
    document.querySelector('.date span').textContent = json.acf.event_date;
    document.querySelector('.time span').textContent = json.acf.time;
    document.querySelector('.content').innerHTML = json.content.rendered;
    document.querySelector('.venue span').textContent = json.acf.venue;
    document.querySelector('#single .price span').textContent = json.acf.price;
}

function showEvents(e_data){
    //console.log(e_data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;

    e_data.forEach(function(theEvent){
    console.log(theEvent);

    let clone = template.cloneNode(true);
    let title = clone.querySelector("h2");
    let excerpt = clone.querySelector(".excerpt");
    let price = clone.querySelector(".price span");
    let img = clone.querySelector("img");
    let link = clone.querySelector("a.readMore");

    //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes);
    img.setAttribute("src", theEvent._embedded["wp:featuredmedia"]
        [0].media_details.sizes.medium.source_url);
    title.textContent = theEvent.title.rendered;
    excerpt.innerHTML = theEvent.excerpt.rendered;
    price.textContent = theEvent.acf.price;

    link.setAttribute("href", "event_page.html?id="+theEvent.id);

    list.appendChild(clone);
    });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
//console.log(id);

if(id)
{
 getSingleEventById(id);
}
else
{
    getAllEvents();
}


let menu = document.querySelector('#off_canvas_menu');
let caret = document.querySelector('#arrow_nav_header');
//let myLink = document.querySelector('#arrow_nav_header');

//myLink.addEventListener('click', openMenu);
//USE WHEN READY TO TEST
//myLink.addEventListener('touchend', rotateCarrot);

function toggleMenu() {
    menu.classList.toggle('displayBlock');
    caret.classList.toggle('arrow_carrot');
}


/*
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body
function openNav() {
    document.getElementById("off_canvas_menu").style.width = "100%";
    document.getElementById("aside").style.marginRight = "100%";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white
function closeNav() {
    document.getElementById("off_canvas_menu").style.width = "0";
    document.getElementById("aside").style.marginRight = "0";
    //document.body.style.backgroundColor = "white";
}

let menu = document.getElementById('off_canvas_menu');
let caret = document.querySelector('#arrow_nav_header');
let myLink = document.querySelector('#arrow_nav_header');

myLink.addEventListener('click', rotateCarrot);
//USE WHEN READY TO TEST
//myLink.addEventListener('touchend', rotateCarrot);

function rotateCarrot() {
    menu.classList.toggle('displayBlock');
    caret.classList.toggle('rotated');
}
 */
