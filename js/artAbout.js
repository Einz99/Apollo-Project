const container = document.querySelector('#containers');

const getJsonData = async () => {
    const res = await fetch('../../../json/artists.json');
    const data = await res.json();
    return data;
}


const displayDatas = async () => {
    const Artist = sessionStorage.getItem('FromArtist')
    const payload = await getJsonData();
    console.log(payload.Artists)
    console.log(Artist)
    let displayData = payload.Artists
    .filter((eventData) => {
    if (eventData.Artist === Artist) {
        return eventData
    }
    }).map((object) => {
    const { Artist, Description, ArtImg } = object;

    return `
    <div class="artImage">
        <img src="${ArtImg}" alt="">
    </div>
    <div class="container">
        <div class="artNameCont">
            <div class="artName">
                <p>${Artist}</p>
            </div>
            <div class="icons">
                <a href="https://www.facebook.com/ribnan.sangalang.1?mibextid=ZbWKwL"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/san.rayyy?igsh=MWpwamw0OTNocmViZQ=="><i class="fab fa-instagram"></i></a>
                <a href="https://x.com/positiviSTAY?t=OBzg7zTppq4kQvGMYVfbtQ&s=09"><i class="fa-brands fa-x-twitter"></i></a>
            </div>
        </div>
        <div class="artAbout">
            <p>${Description}</p>
        </div>
        <div class="buttoncontainer">
            <div class="MAP">
                <p>Monthly Artist Planner</p>
            </div>
            <div class="catalog">
                <p>Artist Catalog</p>
            </div>
        </div>
    </div>
    <div class="backbtn">
        <i class="fa-solid fa-arrow-left"></i>
    </div>
    `
    }).join("");

    containers.innerHTML = displayData;

    const MAP = document.querySelector('.MAP')
    const Catalog = document.querySelector('.catalog')
    const back = document.querySelector('.backbtn')

    MAP.addEventListener('click', () => {
        window.location.href="artMap.html"
    })

    Catalog.addEventListener('click', () => {
        window.location.href="artCatalog.html"
    })
    
    back.addEventListener('click', () => {
        history.back()
    })
}

displayDatas()



