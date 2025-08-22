/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
/* ===== CONTACT FORM: Formspree AJAX Integration ===== */
(function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');

  if (!form) return; // agar form exist nahi karta to script ruk jaayega

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    status.style.display = 'none';
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        status.style.display = 'block';
        status.style.color = '#0b7a3f';
        status.textContent = '✅ Message sent successfully! I will reply soon.';
      } else {
        const resJson = await response.json().catch(()=>null);
        const err = (resJson && resJson.errors) ? resJson.errors.map(e => e.message).join(', ') : 'Failed to send';
        status.style.display = 'block';
        status.style.color = '#b00020';
        status.textContent = '❌ Error: ' + err;
      }
    } catch (error) {
      status.style.display = 'block';
      status.style.color = '#b00020';
      status.textContent = '⚠️ Network error. Please try again.';
      console.error('Formspree error:', error);
    }
  });
})();
