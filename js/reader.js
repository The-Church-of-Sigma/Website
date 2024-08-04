document.addEventListener('DOMContentLoaded', () => {
    const leftPage = document.getElementById('left-page');
    const rightPage = document.getElementById('right-page');
    const toggleVideoButton = document.getElementById('toggle-video');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const videoClips = ['clip1.mp4'];
    let currentPage = 0;
    let pages = [];
    let videoEnabled = true;
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.addEventListener('ended', playRandomVideo);
    rightPage.appendChild(videoElement);

    fetch('../assets/text.json')
        .then(response => response.json())
        .then(data => {
            pages = paginateText(data.text);
            renderPage(currentPage);
        });

    function paginateText(text) {
        const tempElement = document.createElement('div');
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.style.width = leftPage.clientWidth + 'px';
        document.body.appendChild(tempElement);

        const paragraphs = text.split(/<\/?p>/).filter(p => p.trim());
        let pageIndex = 0;
        let currentHeight = 0;
        const pages = [[]];
        
        paragraphs.forEach(paragraph => {
            tempElement.innerHTML = paragraph;
            const paragraphHeight = tempElement.clientHeight;
            if (currentHeight + paragraphHeight > leftPage.clientHeight) {
                pageIndex++;
                pages[pageIndex] = [];
                currentHeight = 0;
            }
            pages[pageIndex].push(paragraph);
            currentHeight += paragraphHeight;
        });

        document.body.removeChild(tempElement);
        return pages;
    }

    function renderPage(index) {
        if (index >= 0 && index < pages.length) {
            currentPage = index;
            leftPage.innerHTML = pages[currentPage].join('<p>');
        }
    }

    function playRandomVideo() {
        const randomClip = videoClips[Math.floor(Math.random() * videoClips.length)];
        videoElement.src = `../assets/clips/${randomClip}`;
        videoElement.play();
    }

    toggleVideoButton.addEventListener('click', () => {
        videoEnabled = !videoEnabled;
        if (videoEnabled) {
            playRandomVideo();
        } else {
            videoElement.src = '';
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 0) {
            renderPage(currentPage - 1);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            renderPage(currentPage + 1);
        }
    });

    playRandomVideo();
});
