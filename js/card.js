const loadData = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const datum = await res.json();
  const data = datum.data.tools;
  displayData(data);
};

const displayData = (data) => {
  //   // 1. get card container named cards
  const cards = document.getElementById("cards");
  data.forEach((element) => {
    // 2. create a card element
    //const card = document.createElement("div");
    // card.classList = ``;

    // 3. set innerHTML
      const cardHTML = `
        <div class="card w-96 bg-base-100 shadow-xl border border-solid border-[rgba(17,17,17,0.1)] rounded-2xl">
          <!-- card figure -->
          <figure class="p-5">
            <img
                class="rounded-2xl"
                src="${element.image}"
            />
          </figure>

          <!-- card body -->
          <div class="card-body pt-1 gap-0">
            <!-- card title -->
            <h2 class="card-title">Features</h2>

            <ul id="list" class="list-inside list-decimal mt-4">
              ${element.features
                .map((feature) => `<li>${feature}</li>`)
                .join("")}
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
              <button onclick="arrowModal.showModal()" class="btn w-[50px] h-[50px] bg-[rgb(254,247,247)] flex justify-center items-center rounded-full hover:bg-[rgb(235,87,87,0.4)]">
                  <i class="fa-solid fa-arrow-right text-[rgb(235,87,87)]"></i>
              </button>
            </div>

          </div>
        </div>
      `;
      cards.innerHTML += cardHTML;
    
    // console.log(element);
  });
};

loadData();
