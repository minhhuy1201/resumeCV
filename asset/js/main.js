const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// ========= Show MENU ===========
const showMenu = (toggleID, navID) => {
    const toggle = $('#' + toggleID),
        nav = $('#' + navID)

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Add class show-menu when user click
            nav.classList.toggle('show-menu')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

// ========= Remove MENU Mobile ===========
const navLink = $$('.nav__link')

function linkAction() {
    const navMenu = $('#nav-menu')
    navMenu.classList.remove('show-menu')
}
// Remove show-menu class on each nav__link when user click
navLink.forEach(ele => ele.addEventListener('click', linkAction))

// ========= Scroll Sections Active Link ===========
const sections = $$('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(cur => {
        const sectionHeight = cur.offsetHeight
        const sectionTop = cur.offsetTop - 50
        sectionId = cur.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
            $('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        else $('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    })
}
window.addEventListener('scroll', scrollActive)

// ========= Show Scroll Top ===========
function scrollTop() {
    const scrollEle = $('#scrolltop')

    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560)
        scrollEle.classList.add('show-scroll')
    else scrollEle.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

// ========= DARK LIGHT Theme ===========
const themeButton = $('#theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Prev selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the curr theme that interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Validate if user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, ask what the issue was to know if activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// ========= Reduce the size and print on an A4 sheet ===========
function scaleCV() {
    document.body.classList.add('scale-cv')
}

// ========= Remove the size when the CV is downloaded  ===========
function removeScale() {
    document.body.classList.remove('scale-cv')
}

// ========= Generate PDF ===========
// PDF generated area
let areaCV = $('#area-cv')

let resumeBtn = $('#resume-button')

// Html2pdf options
let opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};

// Func to call areaCV & Html2pdf options
function generateResume() {
    html2pdf(areaCV, opt)
}

// When the button is clicked, it executes the three functions
resumeBtn.addEventListener('click', () => {
    // 1/ .scale-cv is added to the body, where it reduces the siz
    scaleCV()

    // 2/ The PDF is generated
    generateResume()

    // 3/ .scale-cv is removed from the body after 5s to return
    setTimeout(removeScale, 5000)
})


