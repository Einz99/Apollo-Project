const getJsonData = async () => {
    const res = await fetch('../../../json/Catalog.json');
    const data = await res.json();
    return data;
}
let totalItems = 0;

const displayProducts = async () => {
    const payload = await getJsonData();
    

    // Split products into chunks of 6 items per group
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    // Filter products by Artist
    const artistFilter = sessionStorage.getItem('FromArtist'); // Get the filter value from sessionStorage
    const filteredProducts = payload.Catalogs.filter((product) => product.Artist === artistFilter);
    
    totalItems = payload.Catalogs.filter((product) => product.Artist === artistFilter).length;
    const productChunks = chunkArray(filteredProducts, 6);

    // Generate HTML for each chunk
    let displayData = productChunks.map((chunk) => {
        const items = chunk.map((object) => {
            const { Embbed, Category } = object;

            let categoryName = "";
            if (Category == 1) {
                categoryName = "Albums";
            } else if (Category == 2) {
                categoryName = "EPs";
            } else if (Category == 3) {
                categoryName = "Single";
            }

            return `
                <div class="item">
                    <div class="itemImg">
                        ${Embbed}
                    </div>
                    <div class="itemDesc">${categoryName}</div>
                </div>
            `;
        }).join("");

        return `<div class="items">${items}</div>`;
    }).join("");

    // Populate the items-container
    const itemsContainer = document.querySelector(".items-container");
    itemsContainer.innerHTML = displayData;
};

displayProducts();


const prodItems = document.querySelector('.items-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let prodIndex = 0;

function switchItemList(index)
{   
    offset = 7.5 - (135 * index);
    prodItems.style.transform = `translateX(${offset}vw)`;
}

prev.addEventListener('click', () => {
    if (prodIndex > 0) 
    {
        --prodIndex;
        switchItemList(prodIndex)
    }
});
next.addEventListener('click', () => {
    if (prodIndex !== Math.floor(totalItems/6))
    {
        ++prodIndex;
        switchItemList(prodIndex);
    }
});

switchItemList(prodIndex);
