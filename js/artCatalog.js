const swiperEl = document.querySelectorAll('swiper-container');

const swiperParams = {
    slidesPerView: 5,
    breakpoints: {
        400: {
            slidesPerView: 2,
        },
        640: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
    on: {
        init() {
            // ...
        },
    },
  };

  swiperEl.forEach(element => {
    Object.assign(element, swiperParams);
});

const Album = document.querySelector('#Album');
const EPs = document.querySelector('#EPs');
const Singles = document.querySelector('#Singles');
const Banner = document.querySelector('#banner');

const getJsonData = async () => {
    const res = await fetch('../../../json/catalog.json');
    const data = await res.json();
    return data;
}


const displayAlbum = async () => {
    const Artist = sessionStorage.getItem('FromArtist')
    const payload = await getJsonData();
    console.log(payload.Catalogs)
    console.log(Artist)
    let displayData = payload.Catalogs
    .filter((eventData) => {
    if (eventData.Artist === Artist && eventData.Category === 1) {
        return eventData
    }
    }).map((object) => {
    const { Embbed } = object;

    return `
        <swiper-slide class="card">
            ${Embbed}
        </swiper-slide>
    `
    }).join("");

    Album.innerHTML = displayData;
}

const displayEPs = async () => {
    const Artist = sessionStorage.getItem('FromArtist')
    const payload = await getJsonData();
    console.log(payload.Catalogs)
    console.log(Artist)
    let displayData = payload.Catalogs
    .filter((eventData) => {
    if (eventData.Artist === Artist && eventData.Category === 2) {
        return eventData
    }
    }).map((object) => {
        const { Embbed } = object;

        return `
            <swiper-slide class="card">
                ${Embbed}
            </swiper-slide>
        `

    }).join("");

    EPs.innerHTML = displayData;
}

const displaySingles = async () => {
    const Artist = sessionStorage.getItem('FromArtist')
    const payload = await getJsonData();
    console.log(payload.Catalogs)
    console.log(Artist)
    let displayData = payload.Catalogs
    .filter((eventData) => {
    if (eventData.Artist === Artist && eventData.Category === 3) {
        return eventData
    }
    }).map((object) => {
        const { Embbed } = object;

        return `
            <swiper-slide class="card">
                ${Embbed}
            </swiper-slide>
        `
    }).join("");

    Singles.innerHTML = displayData;
}

const displayBanner = async () => {
    const Artist = sessionStorage.getItem('FromArtist')
    const payload = await getJsonData();
    console.log(payload.Catalogs)
    console.log(Artist)
    let displayData = payload.Banner
    .filter((eventData) => {
    if (eventData.Artist === Artist) {
        return eventData
    }
    }).map((object) => {
    const { Artist, BannerImg, Spotify } = object;

    return `
        <div class="img">
            <img src="${BannerImg}" alt="">
        </div>
        <div class="title">
            <p>${Artist}</p> <a href="${Spotify}"><i class="fa-brands fa-spotify"></i></a>
        </div>
    `
    }).join("");

    Banner.innerHTML = displayData;
}

displayBanner()
displaySingles()
displayEPs()
displayAlbum()

const back = document.querySelector('.backbtn')
    back.addEventListener('click', () => {
        history.back()
    })
