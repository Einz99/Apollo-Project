const getArtistData = async () => {
    const res = await fetch('../../../json/artists.json');
    const data = await res.json();
    return data;
};

const displayLogo = async () => {
    const artistPayload = await getArtistData();
    const filter = sessionStorage.getItem('FromArtist') || "";
    const filterArtist = filter ? artistPayload.ArtHomepage.filter(object => object.Artist === filter) : artistPayload.ArtHomepage;
    // Generate HTML for artists
    const logoData = filterArtist.map((object) => {
        const {Logo} = object;
        
        return `
                <img src="${Logo}" class="logo" />`;
    }).join("");

    const logoContainer = document.querySelector(".brand");
    logoContainer.innerHTML = logoData;
};

const displayAlbum = async () => {
    const artistPayload = await getArtistData();
    const filter = sessionStorage.getItem('FromArtist') || "";
    const filterArtist = filter ? artistPayload.ArtHomepage.filter(object => object.Artist === filter) : artistPayload.ArtHomepage;
    const albumData = filterArtist.map(({ Album, Title }) => {
        return `<h1 class="Album">${Album}</h1>
                <h2 class="Title">${Title}</h2>`;
    }).join("");

    const titleContainer = document.querySelector(".title");
    if (titleContainer !== null)
    {
        titleContainer.innerHTML = albumData;
    }
};

const displayLinks = async () => {
    const artistPayload = await getArtistData();
    const filter = sessionStorage.getItem('FromArtist') || "";
    const filterArtist = filter ? artistPayload.ArtHomepage.filter(object => object.Artist === filter) : artistPayload.ArtHomepage;
    const linksData = filterArtist.map(({ Youtube, Insta, X, FB, Spotify }) => {
        return `
                <a href="../../../index.php"><img src="../../../assets/apollo cropped.png" alt=""></a>
                <a href="${Youtube}"><i class="fa-brands fa-youtube"></i></a>
                <a href="${Insta}"><i class="fa-brands fa-instagram"></i></a>
                <a href="${X}"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="${FB}"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="${Spotify}"><i class="fa-brands fa-spotify"></i></a>
                `;
    }).join("");

    // Populate the artists-container
    const iconsContainer = document.querySelector(".icons");
    iconsContainer.innerHTML = linksData;
};

// Call the function to display artists
displayLogo();
displayAlbum();
displayLinks();