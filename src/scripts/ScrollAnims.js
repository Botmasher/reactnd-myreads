window.addEventListener('scroll', (i) => {
	const openSearchSpan = document.getElementsByClassName('open-search-text')[0];
	if (openSearchSpan) openSearchSpan.style.opacity = (100-window.scrollY*2)/100;
});