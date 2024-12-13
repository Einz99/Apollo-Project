const getArtistDatas = async () => {
    const res = await fetch('../../../json/artists.json');
    const data = await res.json();
    return data;
};

const displayArtistProfile = async () => {
    const artistPayload = await getArtistDatas();

    // Get the artist from sessionStorage
    const fromArtist = sessionStorage.getItem('FromArtist');

    // Find the artist profile matching sessionStorage or default to the first profile
    const artistData = artistPayload.ArtistProfile.find(profile => profile.Artist === fromArtist) || artistPayload.ArtistProfile[0];

    // Prepare the list of artists (excluding the first element)
    const filteredArtists = artistData.Artists.slice(1); // Skip the first element

    // Populate names
    const namesContainer = document.querySelector('.names');
    namesContainer.innerHTML = filteredArtists.map((artist, index) => 
        `<p data-index="${index + 1}">${artist}</p>`
    ).join('');

    // Initial profile update (shows the first artist by default)
    updateArtistProfile(artistData, 0);

    // Add click event listeners to names
    namesContainer.querySelectorAll('p').forEach(name => {
        name.addEventListener('click', () => {
            // Remove active class from all names
            namesContainer.querySelectorAll('p').forEach(el => el.classList.remove('active'));

            // Add active class to clicked name
            name.classList.add('active');

            const index = parseInt(name.dataset.index);
            updateArtistProfile(artistData, index);
        });
    });

    // Add click event listener to subtitles
    const descriptionContainer = document.querySelector('.Descriptions .descrip');
    descriptionContainer.addEventListener('click', (event) => {
        // Check if the clicked element is the h3
        if (event.target.tagName === 'H3') {
            // If it's the second subtitle, go back to element 0
            if (event.target.textContent === artistData.Subtitle[1]) {
                // Remove active class from all names
                namesContainer.querySelectorAll('p').forEach(el => el.classList.remove('active'));

                updateArtistProfile(artistData, 0);
            }
        }
    });
};

const updateArtistProfile = (artistData, index) => {
    // Update artist image
    const imageContainer = document.querySelector('.artImages .img img');
    imageContainer.src = artistData.ArtistsPic[index];
    imageContainer.alt = artistData.Artists[index];

    // Update description
    const descriptionContainer = document.querySelector('.Descriptions .descrip');
    descriptionContainer.innerHTML = `
        <h1>${artistData.ArtistTitle[index]}</h1>
        <h3>${index === 0 ? artistData.Subtitle[0] : artistData.Subtitle[1]}</h3>
        <p>${artistData.phase[index]}</p>
    `;
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayArtistProfile);
