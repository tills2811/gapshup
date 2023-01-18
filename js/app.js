// FAQ section starts here
var acc = document.getElementsByClassName("qa");
var panel = document.getElementsByClassName('questions');

for (var i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    var setClasses = !this.classList.contains('active');
    setClass(acc, 'active', 'remove');
    setClass(panel, 'show', 'remove');

    if (setClasses) {
      this.classList.toggle("active");
      this.nextElementSibling.classList.toggle("show");
    }
  }
}

function setClass(els, className, fnName) {
  for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
  }
}


// FAQ section ends here



// Scroll to top button Starts here
const scrbtn = document.querySelector('.scrbtn')
const showhide = document.getElementById('top')
const scrollFunc = () => {
  const scroll = window.scrollY;


  if (scroll > 300) {
    showhide.className = "scrbtn show";
  } else {
    showhide.className = "scrbtn hide";
  }
};
window.addEventListener("scroll", scrollFunc);

scrbtn.addEventListener('click', () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
// Scroll to top button Ends here
