// Fade element on relative to scroll
// modified from code by Phil Renaud: https://coderwall.com/p/rxfefg/fade-an-element-relative-to-scroll-in-one-line
window.addEventListener('scroll', (i) => {
	const openSearchSpan = document.getElementsByClassName('open-search-text')[0];
	if (openSearchSpan) openSearchSpan.style.opacity = (100-window.scrollY*2)/100;
});