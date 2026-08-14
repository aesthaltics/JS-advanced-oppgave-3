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
let bufferSize = 5;
let buffer = new Array(bufferSize).fill(0)

let nextImg

async function getData() {
    const result = await fetch("https://api.scryfall.com/cards/random", {
        headers:{
            "User-Agent": "MyApp",
            "Accept":"application/json"
        }
    });
    const data = await result.json();
    
    // console.log("------------------------------------------------------");
    // console.log(data);
   
    // console.log("---------");
    // console.log(currentCard);
    return data;
}
// await getData();

// jakob's code please be kind 

const buildCard = () => {
    let data = buffer.pop();
    // console.log(data)
    currentCard.imageUrl = data.image_uris.large;
    currentCard.name = data.name;
    const typesAndSubtypes = data.type_line;
    const onlyTypes = typesAndSubtypes.split('—')[0].trim();
    currentCard.type = onlyTypes;
    const image = pictureContainer.hasChildNodes() ? pictureContainer.lastChild : (() => {
        const image = document.createElement('img');
        pictureContainer.append(image);
        return pictureContainer.lastChild
    })()
    image.src = currentCard.imageUrl;

}

function buildPage() {
    // image half:
    buildCard();
    // console.log(pictureContainer);

    // -------------------------------------------------------------------------
    // info half:
}

randomBtn.addEventListener('click', async () => {
    buildPage();
    await buffer.push(getData());
})

// buildPage();




window.addEventListener("load", async () => {
    console.log("load")
    const promise_arrap = buffer.map((i) => {
        return getData();
    });
    console.log("promise array")
    console.log(promise_arrap)
    buffer = await Promise.allSettled(promise_arrap)
    buffer = buffer.filter(res => {
        return res.status === "fulfilled"
    }).map(res => res.value)
    // await getData();
    buildPage();
    newData = await getData()
})