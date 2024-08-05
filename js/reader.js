document.addEventListener('DOMContentLoaded', () => {
    const leftPage = document.getElementById('left-page');
    const rightPage = document.getElementById('right-page');
    const toggleVideoButton = document.getElementById('toggle-video');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const book = document.getElementById('book');
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
            if (!videoEnabled && currentPage + 1 < pages.length) {
                rightPage.innerHTML = pages[currentPage + 1].join('<p>');
            } else {
                rightPage.innerHTML = '';
                if (videoEnabled) {
                    rightPage.appendChild(videoElement);
                }
            }
        }
    }

    function playRandomVideo() {
        const randomClip = videoClips[Math.floor(Math.random() * videoClips.length)];
        videoElement.src = `../assets/clips/${randomClip}`;
        videoElement.play();
    }

    function adjustBookSize() {
        const aspectRatio = 1.414;
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        let bookWidth = maxWidth;
        let bookHeight = maxWidth / aspectRatio;

        if (bookHeight > maxHeight) {
            bookHeight = maxHeight;
            bookWidth = maxHeight * aspectRatio;
        }

        book.style.width = `${bookWidth}px`;
        book.style.height = `${bookHeight}px`;
    }

    toggleVideoButton.addEventListener('click', () => {
        videoEnabled = !videoEnabled;
        if (videoEnabled) {
            rightPage.innerHTML = '';
            rightPage.appendChild(videoElement);
            renderPage(currentPage);
        } else {
            videoElement.src = '';
            renderPage(currentPage);
        }
        playRandomVideo();
    });

    prevPageButton.addEventListener('click', () => {
        if (videoEnabled && currentPage > 0) {
            renderPage(currentPage - 1);
        } else if (!videoEnabled && currentPage > 1) {
            renderPage(currentPage - 2);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (videoEnabled && currentPage < pages.length - 1) {
            renderPage(currentPage + 1);
        } else if (!videoEnabled && currentPage < pages.length - 2) {
            renderPage(currentPage + 2);
        }
    });

    window.addEventListener('resize', adjustBookSize);
    adjustBookSize();
    playRandomVideo();
});
