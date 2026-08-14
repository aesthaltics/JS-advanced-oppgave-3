// har lyst å kunne filtrere vekk illegal for standard og/eller commander
const randomBtn = document.getElementById("get-random-btn");
const pictureContainer = document.getElementById("random-card-container");
const infoContainer = document.getElementById("card-attributes-container");
//-------------------------------------------------------------------------

let currentCard = {
    imageUrl: "",
    name: "",
    type: "",
    subtypes: [],
    scryfallUrl: "",
    colorIdentity: [],
    keywords: [],
    legalities: {
        standard: "",
        commander: "",
    },
}

let newData

async function getData() {
    const result = await fetch("https://api.scryfall.com/cards/random", {
        headers:{
            "User-Agent": "MyApp",
            "Accept":"application/json"
        }
    });
    const data = await result.json();
    
    console.log("------------------------------------------------------");
    console.log(data);
   
    console.log("---------");
    console.log(currentCard);
    return data;
}
// await getData();

// jakob's code please be kind 

const buildCard = (data) => {
    currentCard.imageUrl = data.image_uris.large;
    currentCard.name = data.name;
    const typesAndSubtypes = data.type_line;
    const onlyTypes = typesAndSubtypes.split('—')[0].trim();
    currentCard.type = onlyTypes;
}

function buildPage() {
    pictureContainer.replaceChildren();
    // image half:
    const image = document.createElement('img');
    image.src = currentCard.imageUrl;

    pictureContainer.append(image);
    console.log(pictureContainer);

    // -------------------------------------------------------------------------
    // info half:
}

randomBtn.addEventListener('click', async () => {
    buildCard(newData)
    newData = await getData();
    buildPage();
})

// buildPage();


document.addEventListener("DOMContentLoaded", async () => {

    await getData();
    buildPage();
    newData = await getData()
})