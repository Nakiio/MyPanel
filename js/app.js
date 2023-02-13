
//--------Elements detection--------
const ratio = .1;
var options = {root: null,rootMargin: '0px',threshold: .1}

const handleIntersect = function (entries, observer) {
	entries.forEach(function (entry){
		if(entry.intersectionRatio > ratio){
			observer.unobserve(entry.target);
			if(entry.target.id == "musique"){
				entry.target.classList.add('reveal-musique');
				console.log("musique");
			}else if(entry.target.id == "setting"){
				console.log("setting");
				entry.target.classList.add('reveal-setting');
			}else if(entry.target.id == "footer"){
				console.log("footer-reveal");
				entry.target.classList.add('reveal-footer');
			}else{
				entry.target.classList.add('reveal-visible');
			}
			
		}
	})
}
const observer = new IntersectionObserver(handleIntersect,options);
document.querySelectorAll('.reveal').forEach(function (element) {
	observer.observe(element);
})

