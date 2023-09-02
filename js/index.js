let button
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  tabDetails(data);
};

const tabDetails = (data) => {
  const tabContainer = document.getElementById("tab-container");
  const videos = data.data;
  
  videos.forEach((category) => {
    const tabDiv = document.createElement("div");

    tabDiv.innerHTML = `
        <a onclick = "cardCategories('${category.category_id}')" class="tab text-black bg-gray-300 hover:bg-red-400 hover:text-white">${category.category}</a> 
        `;
    tabContainer.appendChild(tabDiv);
  });
};

const cardCategories = async (id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const allData = data.data;

  button = allData
  displayCard(allData)
}
  const displayCard = (allData) => {

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""

  const emptyDiv = document.getElementById("nothing-div");
  emptyDiv.innerHTML = "";
  if (allData.length === 0) {
   
    emptyDiv.innerHTML = `
    <div class="my-5 flex flex-col gap-10 justify-center items-center">
    <img class="" src="./images/Icon.png">
    <h2 class="text-3xl text-center font-semibold"><span class = "text-red-500">Oops!! Sorry,</span> There is no content here.</h2>
    </div>
    `;
  }

  allData?.forEach((video) => {
    console.log(video);
  
  
      let seconds = video?.others?.posted_date;
      let time;
      if (seconds !== '') {
          let hours = Math.floor(seconds / 3600);
          let minutes = Math.floor((seconds % 3600) / 60);
          let newTime = hours + ' hr : ' + minutes + ' min ago';
          time = newTime;
      }
    
    

    const div = document.createElement("div");
    div.innerHTML = `
        
        <div class="card h-[400px] bg-base-100 shadow-xl">
        <figure>
          <img class = "w-full h-[200px]"
            src=${video.thumbnail}
          />
        
          <div class="flex justify-end items-end">
          <p class="text-end absolute mb-[-98px] ml-auto rounded-sm px-1 bg-gray-500 text-white w-max font-medium">${time || ''}</p>
          </div>

        </figure>
      
        <div class="card-body">
         
          <div class="card-footer flex justify-between mt-8">
            <div class="flex gap-2">
              <div>
                <div class="avatar  gap-2">
                  <div class="w-14 rounded-full">
                    <img
                      src=${video.authors?.[0].profile_picture}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6 class="text-[#171717] text-xl font-medium">${
                  video.title
                }</h6>

                <div class="flex gap-2">
                  <div>
                   <h2 class="text-gray-500 font-normal">${
                     video?.authors?.[0].profile_name
                   }</h2>
               </div>
                 <div> 
                
                 <img src="${
                   video.authors?.[0].verified ? "./images/fi_10629607.svg" : ""
                 }" >
               </div>
                </div>
                <small class="text-gray-500 font-normal">${
                  video.others.views
                } views</small>
               
              </div>
            </div>   
            </div>  
          </div>
        </div>
     
        `;
    cardContainer.appendChild(div);
  });
};

cardCategories("1000");
loadCategories();

document.getElementById("blog-btn").addEventListener("click", function () {
  window.location.href = "blog.html";
});

const  viewBtn  = () => {
  const  viewHighest = button?.sort((a, b) => parseFloat(b?.others?.views) - parseFloat(a?.others?.views));
  displayCard(viewHighest)
  
}
 
