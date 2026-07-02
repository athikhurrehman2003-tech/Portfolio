// =======================================
// PORTFOLIO SCRIPT
// Athikhur Rahman Portfolio
// =======================================

// -----------------------------
// SELECT ELEMENTS
// -----------------------------

const navbar = document.getElementById("navbar");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const progressBar = document.getElementById("progressBar");

const backToTop = document.getElementById("backToTop");

const themeToggle = document.getElementById("themeToggle");


// =======================================
// MOBILE MENU
// =======================================

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if(navLinks.classList.contains("active")){

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-times");

    }

    else{

        icon.classList.remove("fa-times");

        icon.classList.add("fa-bars");

    }

});


// =======================================
// CLOSE MENU AFTER CLICK
// =======================================

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuBtn.querySelector("i").classList.remove("fa-times");

        menuBtn.querySelector("i").classList.add("fa-bars");

    });

});


// =======================================
// SMOOTH SCROLL
// =======================================

navItems.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});


// =======================================
// STICKY NAVBAR
// =======================================

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.classList.add("sticky");

    }

    else{

        navbar.classList.remove("sticky");

    }

});


// =======================================
// SCROLL PROGRESS BAR
// =======================================

window.addEventListener("scroll",()=>{

    const scrollTop=document.documentElement.scrollTop;

    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    const progress=(scrollTop/height)*100;

    progressBar.style.width=progress+"%";

});


// =======================================
// BACK TO TOP BUTTON
// =======================================

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.style.display="block";

    }

    else{

        backToTop.style.display="none";

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// =======================================
// ACTIVE NAVIGATION LINK
// =======================================

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


// =======================================
// DARK MODE
// =======================================

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    const icon=themeToggle.querySelector("i");

    if(document.body.classList.contains("light-theme")){

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    }

    else{

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

});
/* ==========================================
   TYPING EFFECT
========================================== */

const typing = document.getElementById("typing");

const words = [

"Embedded Software Engineer",

"Firmware Developer",

"STM32 Developer",

"Embedded C Programmer",

"IoT Enthusiast"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect(){

const currentWord = words[wordIndex];

if(!deleting){

typing.textContent = currentWord.substring(0,charIndex++);

if(charIndex > currentWord.length){

deleting = true;

setTimeout(typeEffect,1800);

return;

}

}

else{

typing.textContent = currentWord.substring(0,charIndex--);

if(charIndex < 0){

deleting = false;

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

}

}

setTimeout(typeEffect,deleting?40:80);

}

typeEffect();



/* ==========================================
COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let value = 0;

const update = ()=>{

const increment = Math.ceil(target/70);

value += increment;

if(value < target){

counter.innerText = value;

requestAnimationFrame(update);

}

else{

counter.innerText = target;

}

}

update();

observer.unobserve(counter);

}

});

});

counters.forEach(counter=>observer.observe(counter));



/* ==========================================
SKILL BAR ANIMATION
========================================== */

const progressBars = document.querySelectorAll(".progress span");

const skillObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const bar = entry.target;

const width = bar.style.width;

bar.style.width = "0";

setTimeout(()=>{

bar.style.width = width;

bar.style.transition = "2s";

},200);

skillObserver.unobserve(bar);

}

});

});

progressBars.forEach(bar=>{

skillObserver.observe(bar);

});



/* ==========================================
SECTION FADE EFFECT
========================================== */

const revealElements = document.querySelectorAll(

".card,.project-card,.education-card,.certificate-card,.timeline-content"

);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

revealElements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition=".8s";

revealObserver.observe(el);

});
// =======================================
// CONTACT FORM (Web3Forms)
// =======================================

const form = document.getElementById("contactForm");
const submitBtn = form.querySelector("button[type='submit']");
const result = document.getElementById("formResult");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    result.innerHTML = "";

    try{

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method:"POST",
                body:formData
            }
        );

        const data = await response.json();

        if(response.ok){

            result.innerHTML =
            "<span style='color:#22c55e;'>✔ Message sent successfully!</span>";

            form.reset();

        }
        else{

            result.innerHTML =
            "<span style='color:#ef4444;'>❌ " +
            data.message +
            "</span>";

        }

    }
    catch(error){

        result.innerHTML =
        "<span style='color:#ef4444;'>❌ Something went wrong. Please try again.</span>";

    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

});
// =======================================
// PROJECT MODAL
// =======================================

const modal = document.getElementById("projectModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");

const closeModal = document.querySelector(".close-modal");

const detailsButtons = document.querySelectorAll(".details-btn");

const projects = {

    pis:{

        title:"Passenger Information System Firmware",

        image:"images/pis.png",

        description:
        "Developed firmware for STM32-based Passenger Information System. Implemented UART, RS485, USB communication, SD card support, bootloader integration and real-time display management.",

        tech:[
            "STM32",
            "Embedded C",
            "UART",
            "USB",
            "RS485",
            "FATFS"
        ],

        github:"https://github.com/athikhurrehman2003-tech"
    },

    flash:{

        title:"USB Flash Programmer",

        image:"images/flash.png",

        description:
        "Designed a USB flash programming utility capable of writing firmware to embedded devices with verification and error handling.",

        tech:[
            "STM32",
            "USB",
            "Bootloader",
            "Embedded C"
        ],

        github:"https://github.com/athikhurrehman2003-tech"
    },

    lcd:{

        title:"128×64 LCD Menu System",

        image:"images/lcd.png",

        description:
        "Created a graphical menu system using Arduino Uno with four-button navigation, hierarchical menus and configurable settings.",

        tech:[
            "Arduino",
            "LCD",
            "C++",
            "UI Design"
        ],

        github:"https://github.com/athikhurrehman2003-tech"
    },

    surveillance:{

        title:"IoT Surveillance Robot",

        image:"images/surveillance.png",

        description:
        "Developed a Wi-Fi controlled surveillance robot capable of remote monitoring using ESP32 and IoT technologies.",

        tech:[
            "ESP32",
            "IoT",
            "WiFi",
            "Embedded C"
        ],

        github:"https://github.com/athikhurrehman2003-tech"
    },

    multiplier:{

        title:"Radix-4 & Radix-8 Multiplier",

        image:"images/multiplier.png",

        description:
        "Implemented and compared Radix-4 and Radix-8 multiplier architectures using VHDL and Xilinx tools for DSP applications.",

        tech:[
            "VHDL",
            "Xilinx",
            "FPGA",
            "DSP"
        ],

        github:"https://github.com/athikhurrehman2003-tech"
    }

};

detailsButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const project = projects[button.dataset.project];

        modalImage.src = project.image;

        modalTitle.textContent = project.title;

        modalDescription.textContent = project.description;

        modalGithub.href = project.github;

        modalTech.innerHTML = "";

        project.tech.forEach(item=>{

            modalTech.innerHTML += `<span>${item}</span>`;

        });

        modal.style.display="flex";

    });

});

closeModal.onclick = ()=>{

    modal.style.display="none";

};

window.onclick = (e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};
// =======================================
// LOADER
// =======================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        const loader=document.getElementById("loader");

        loader.style.opacity="0";

        loader.style.visibility="hidden";

    },1800);

});

