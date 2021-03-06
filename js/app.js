const navUl = document.querySelector("#navUl");
let listItems = navUl.childNodes
const mainBody = document.querySelector("#main-body");
let mybutton = document.getElementById("myBtn");
const navLinks = document.querySelectorAll("#navUl li a");

smoothScroling();
const searchPhotos = () => {

    const input = document.querySelector("#search");
    let searchTerm = input.value;
    //Creating new Section based on used input in the search box
    let newSection = `<section id="${searchTerm}" class="image-container" tabindex="0">
                        <h3 class="section-heading">${searchTerm}</h3>
                        <div class="card-container"></div>
                     `;
    mainBody.innerHTML += newSection;
    // Grabbing the newly created section for later appending of child element into it
    let createdSection = document.querySelector(
        `#${searchTerm} > .card-container`
    );
    // Credentials for unsplash api
    let clientId = "88i7qHkpW1-r-T3rR0tk7OEwVE4KGDCJD04P_ZLyGYs";
    let url = `http://api.unsplash.com/search/photos/?client_id=${clientId}&query=${searchTerm}`;

    fetch(url)
        .then((response) => response.json())
        .then((datas) => {
            let imageArray = datas.results;
            for (let i = 0; i < 4; i++) {
                // From the fetched Array creating Div with image and image title in the form of h3
                let imageDiv = `<div class="card">
                                    <img
                                        class = 'responsive'
                                        src=${imageArray[i].urls.regular}
                                        alt='${imageArray[i].alt_description}'
                                        />
                                        <h3 class="card-text">${imageArray[i].alt_description}</h3>
                                    </div>
                                `;

                createdSection.innerHTML += imageDiv;
            }
        });
    // After appneding the Divs now adding corresponding section link in the navigation menu
    addNavigation(searchTerm);
    // Short display of Success Message
    showMessage(searchTerm);
};

window.onscroll = function() {
    // running back to top button handler function
    scrollFunction();
    // grabbing all the imagecontainer section
    let Sections = document.querySelectorAll(".image-container");
    // looping through each section to check if they are in viewport
    Sections.forEach((section) => {
        let sectionId = section.getAttribute("id");
        let currentLink = document.querySelector(`.${sectionId}`);
        if (isInViewport(section)) {

            // When a section is in viewport checking whether a corresponding li exist in the nav menu
            // if it doesnt exist then add the li in the ul.
            let checkLi = document.querySelector(`.${sectionId}`)
            if (!checkLi) {
                addNavigation(sectionId)
            }

            //if a section is in viewport adding active class to them
            section.classList.add("active-section");
            // Add current class to the navmenu link as well
            addActive(sectionId)
        } else {
            section.classList.remove("active-section");

            // if the section is not in view then grabbing the corresponding li (if it exist )and removing the
            // active class from that li
            let checkLi = document.querySelector(`.${sectionId}`)
            if (checkLi) {
                removeActive(sectionId)
            }
        }
    });
};

// Function to check if an element is in viewport
function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    // returning true or false
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
}

//Function that handles the displaying of success message

function showMessage(term) {
    let message = document.querySelector("#notification");
    message.innerHTML = `Images of ${term} has been added!!`;
    setTimeout(function() {
        message.innerHTML = "";
    }, 2000);
}

//function to add new link in the menu
function addNavigation(term) {
    let newLi = `<li><a class="${term}" href="#${term}">${term}</a></li>`;
    navUl.innerHTML += newLi;
    smoothScroling();
}

// Function for handingling the back to top button's display
function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}


function smoothScroling() {
    let navLi = document.querySelectorAll("#navUl > li");
    navLi.forEach((li) => {
        addScrolling(li);
    });
}
// Function for the smooth scrolling behaviour on click
function addScrolling(li) {
    li.addEventListener("click", function(e) {
        //Preventing default clicking behaviour
        e.preventDefault();
        // console.log(typeof(li))

        // Selecting the appropriate list item
        let liSelector = document.querySelector(`#${li.textContent}`);

        // Smooth scrolling to the appropriate section
        liSelector.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "center",
        });
    });
}

// Adding active class (current) the lis

function addActive(term) {
    let currentLink = document.querySelector(`.${term}`);
    currentLink.classList.add("current");
}

// Remove active class (current) the lis

function removeActive(term) {
    let Link = document.querySelector(`.${term}`);
    Link.classList.remove("current");
}