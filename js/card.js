// load all Data
const loadData = async (isSeeMore) => {
  toggleLoadingSpinner(true);
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const datum = await res.json();
  const data = datum.data.tools;
  displayData(data, isSeeMore);
};

// display all data
const displayData = (data, isSeeMore) => {
  // get see more button
  const seeMoreButton = document.getElementById("seeMoreButton");
  if (data.length > 6 && isSeeMore === false) {
    seeMoreButton.classList.remove("hidden");
  } else {
    seeMoreButton.classList.add("hidden");
  }

  if (isSeeMore === false) {
    data = data.slice(0, 6);
  }

  //   // 1. get card container named cards
  const cards = document.getElementById("cards");
  cards.textContent = "";
  data.forEach((element) => {
    // 2. create a card element
    const card = document.createElement("div");
    card.classList = `card w-96 bg-base-100 shadow-xl border border-solid border-[rgba(17,17,17,0.1)] rounded-2xl`;

    // 3. set innerHTML
    card.innerHTML = `
    <!-- card figure -->
    <figure class="p-5 flex justify-center items-center">
    <img
    class="rounded-2xl w-[340px] h-[200px] border border-[rgba(17,17,17,0.2)]"
    src="${element.image}" alt="Card Image"
    />
    </figure>
    
    <!-- card body -->
    <div class="card-body pt-1 gap-0">
    <!-- card title -->
    <h2 class="card-title">Features</h2>
    
    <ul id="list" class="list-inside list-decimal mt-4">
    ${element.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
      
      <!-- horizontal line -->
      <div class="w-[320px] h-0 border border-solid border-[rgba(17,17,17,0.2)] my-6"></div>
      
      <!-- figure Details Container -->
      <div id="figureDetailsContainer" class="flex flex-row justify-between items-center">
      <!-- figureDetails -->
      <div id="figureDetails" class="flex flex-col gap-4">
      <!-- figure name -->
      <h4 id="figureName" class="text-2xl font-semibold">
      ${element.name}
      </h4>
      <!-- figure date -->
      <div id="figureDateContainer" class="flex flex-row justify-center items-center gap-1">
      <i class="fa-solid    fa-calendar-days"></i>
      <p>${element.published_in}</p>
      </div>
      </div>
      <button onclick="loadSingleDataDetails('${
        element.id
      }')" class="btn w-[50px] h-[50px] bg-[rgb(254,247,247)] flex justify-center items-center rounded-full hover:bg-[rgb(235,87,87,0.4)]">
      <i class="fa-solid fa-arrow-right text-[rgb(235,87,87)]"></i>
      </button>
      </div>
      
      </div>
      `;
    // console.log(typeof element.id);
    cards.appendChild(card);
  });

  toggleLoadingSpinner(false);
};

// load and show single data details
const loadSingleDataDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const singleData = await res.json();
  const singleDataOfData = singleData.data;
  showSingleDataDetails(singleDataOfData);
};

const showSingleDataDetails = (singleDataOfData) => {
  // get description element
  const descriptionElement = document.getElementById("description");

  // set innerText of description element
  descriptionElement.innerText = singleDataOfData.description;

  // get list container of features
  const listContainerFeatures = document.getElementById(
    "listContainerFeatures"
  );

  listContainerFeatures.textContent = "";
  const keys = Object.keys(singleDataOfData.features);
  const feature = singleDataOfData.features;

  // list for features
  const listContainerFeaturesInnerHTML = `
    ${keys
      .map(
        (key) =>
          `<li class="pl-5"><a class="tooltip" data-tip="${feature[key].description}" href="">${feature[key].feature_name}</a></li>`
      )
      .join("")}
        `;
  listContainerFeatures.innerHTML += listContainerFeaturesInnerHTML;

  // get list container of integration
  // console.log(keys);
  const listContainerIntegrations = document.getElementById(
    "listContainerIntegrations"
  );

  // clear previous data of listContainerIntegrations
  listContainerIntegrations.textContent = "";

  const integrations = singleDataOfData.integrations;

  // console.log(listContainerIntegrations);
  // const li = document.createElement("li");
  // li.classList = `pl-5`;

  const listContainerIntegrationsInnerHTML = `${integrations
    .map((integration) => `<li><a>${integration}</a></li>`)
    .join("")}`;

  listContainerIntegrations.innerHTML += listContainerFeaturesInnerHTML;
  arrowModal.showModal();
};

const seeMore = () => {
  loadData(true);
};

const toggleLoadingSpinner = (isLoading) => {
  // get loading spinner
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadData(false);
