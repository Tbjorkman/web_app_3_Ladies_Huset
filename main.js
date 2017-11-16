
function getAllEvents()
{
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/events?_embed")
    .then(res=>res.json())
    .then(showEvents);
}

function getCategories() {
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/categories?_embed")
        .then(res=>res.json())
        .then(showCategories);
}

function getEventsByCategory(id) {
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/events?_embed&categories=" + id)
        .then(res=>res.json())
        .then(showEvents);
}

function getSingleEventById(myId)
{
    //console.log(myId);
    fetch("https://tabithabjorkman.com/wordpress/wp-json/wp/v2/events/" + myId + "/?_embed")
        .then(res=>res.json())
        .then(showSingleEvent);
}

function showCategories(categories) {
    //console.log(categories);
    let catList = document.querySelector('#catList').content;

    categories.forEach(function(cat){
        if(cat.count > 0)
        {
            if(cat.id === 13 || cat.id ===  10 || cat.id === 7)
            {
                let clone = catList.cloneNode(true);
                let parent = document.querySelector('#categoryMenu');
                clone.querySelector('a').textContent = cat.name;
                clone.querySelector('a').setAttribute('href', 'index.html?cat_id=' + cat.id);
                parent.appendChild(clone);
            }

        }

    });

}


function showSingleEvent(json) {
    //console.log(document.querySelector('.date'));

    document.querySelector("#single img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    document.querySelector('#single h1').textContent = json.title.rendered;
    document.querySelector('#single h6').textContent = json.acf.custom_category + ' - ' + json.acf.performing_arts;
    document.querySelector('#single .date span').textContent = json.acf.event_date;
    document.querySelector('#single .time span').textContent = json.acf.time;
    document.querySelector('#single .content').innerHTML = json.content.rendered;
    document.querySelector('#single .venue span').textContent = json.acf.venue;
    document.querySelector('#single .price span').textContent = json.acf.price;
}

function showEvents(e_data){
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content;

    e_data.forEach(function(theEvent){
        //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

        let clone = template.cloneNode(true);
        let title = clone.querySelector("h2");
        let date = clone.querySelector("#date");
        let time = clone.querySelector("#time");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.readMore");

        img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        title.textContent = theEvent.title.rendered;
        date.textContent = theEvent.acf.event_date;
        time.textContent = theEvent.acf.time;
        excerpt.innerHTML = theEvent.excerpt.rendered;
        price.textContent = theEvent.acf.price;
        link.setAttribute("href", "event_page.html?id="+theEvent.id);

            //console.log(clone);

        list.appendChild(clone);
    });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let catId = searchParams.get('cat_id');
//console.log(id);


getCategories();



getEventsByCategory(13);
getEventsByCategory(10);
getEventsByCategory(7);

if(id)
{
    getSingleEventById(id);
}
/*
else if(catId)
{
    getEventsByCategory(catId);
}
else
{
    //getAllEvents();

}
*/

let menu = document.querySelector('#off_canvas_menu');
let caret = document.querySelector('#arrow_nav_header');
let line1 = document.querySelector('#line_1');
let line2 = document.querySelector('#line_2');
let line3 = document.querySelector('#line_3');
let subMenu = document.querySelector('#categoryMenu');
let subCaret = document.querySelector('#subCategoryMenu');

//myLink.addEventListener('click', openMenu);
//USE WHEN READY TO TEST
//myLink.addEventListener('touchend', rotateCarrot);

//document.onload(menuSlide());

 /*
 function menuSlide() {

    caret.classList.add('slide');
}
*/


function toggleMenu() {
    menu.classList.toggle('displayBlock');
    caret.classList.toggle('hidden');
    caret.classList.toggle('arrow_carrot');
    line1.classList.toggle('hidden');
    line2.classList.toggle('hidden');
    line3.classList.toggle('hidden');
}


function toggleSubMenu() {
    subMenu.classList.toggle('displayBlock');
    subCaret.classList.toggle('arrow_carrot');
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
