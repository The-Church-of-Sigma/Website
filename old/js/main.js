// Helper function
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// Link stylesheets, fonts & head stuff
var icon = document.createElement('link');
icon.setAttribute('rel', 'favicon');
icon.setAttribute('href', '/assets/sigma.png');
document.head.appendChild(icon);

var mainCSS = document.createElement('link');
mainCSS.setAttribute('rel', 'stylesheet');
mainCSS.setAttribute('href', '/css/main.css');
document.head.appendChild(mainCSS);

var preconnectLinkAPI = document.createElement('link');
preconnectLinkAPI.setAttribute('rel', 'preconnect');
preconnectLinkAPI.setAttribute('href', 'https://fonts.googleapis.com');
document.head.appendChild(preconnectLinkAPI);

var preconnectLink = document.createElement('link');
preconnectLink.setAttribute('rel', 'preconnect');
preconnectLink.setAttribute('href', 'https://fonts.gstatic.com');
preconnectLink.crossOrigin = 'anonymous';
document.head.appendChild(preconnectLink);

var fontsLink = document.createElement('link');
fontsLink.setAttribute('rel', 'stylesheet');
fontsLink.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Righteous&display=swap');
document.head.appendChild(fontsLink);
