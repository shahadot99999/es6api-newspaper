//console.log("java script added");


//const airtile=
// {
//     "source": {
//         "id": null,
//         "name": "El Financiero"
//     },
//     "author": "Dylan Sloan/ Bloomberg",
//     "title": "¿Para eso lo apoyaron? Elon Musk y otros millonarios pierden más de 209 mil mdd tras regreso de Trump",
//     "description": "Los empresarios más ricos del mundo como Elon Musk, Jeff Bezos y Mark Zuckerberg han tenido pérdidas millonarias tras el regreso de Donald Trump a la Casa Blanca.",
//     "url": "https://www.elfinanciero.com.mx/bloomberg/2025/03/10/para-eso-lo-apoyaron-elon-musk-y-otros-multimillonarios-registran-perdidas-con-el-regreso-de-trump/",
//     "urlToImage": "https://www.elfinanciero.com.mx/resizer/v2/DGAOODSCYJCWZEP2ZMSIPFWPGM.jpg?smart=true&auth=aa568923ee9814be73262cdb078605c7e47cce9a3f2da9d68593c41a0674c692&width=1200&height=630",
//     "publishedAt": "2025-03-11T02:25:58Z",
//     "content": "El 20 de enero, cuando Donald Trump juró como presidente de Estados Unidos, estuvo rodeado de algunas de las personas más ricas del mundo. Los multimillonarios presentes ese día, entre ellos Elon Mus… [+5711 chars]"
// }


//create loadData
const loadNewsData = () =>{
    //console.log("data is loaded");
    fetch("https://newsapi.org/v2/everything?q=tesla&from=2025-02-11&sortBy=publishedAt&apiKey=451352e5a6d547cea728fa6778657d3c")
    //.then ((res)=>console.log(res))
    .then((res)=>res.json())
    //.then((data)=>console.log(data.articles))
    .then((data)=>displayDatas(data.articles))
    .catch((error)=>console.log(error));
};

//loadNewsDetails
// const loadNewsDetails =(articles) =>{
//    // console.log(articles)
// }

 // Create a modal dynamically
 const modal = document.createElement('div');
 modal.id = 'news-modal';
 modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
 modal.innerHTML = `
     <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
        
         <img id="modal-image" src="" alt="" class="w-full h-48 object-cover mb-4">
         <h2 id="modal-title" class="text-xl font-bold mb-2"></h2>
         <p id="modal-description" class="text-gray-600"></p>
          <button id="close-modal" class="float-right btn btn-primary">Close</button>
     </div>
 `;
 document.body.appendChild(modal);


//displayData
const displayDatas=(articles)=>{
    //add data
    //console.log(articles);
    const newsContainer = document.getElementById("news-container");
    articles.forEach((article) =>{
      //console.log(article);
      const card = document.createElement("div");
      card.classList = "card bg-base-100 shadow-sm "
      card.innerHTML = 
      `
    <figure class= " h-[300px]">
        <img
       src=${article.urlToImage}
       class = "h-full w-full object-cover"
        alt="Shoes" />
    </figure>
    <div class="card-body">
       <h2 class="card-title">${article.title}</h2>     
        <div class="card-actions flex justify-between items-center px-0 py-2 gap-1  ">
            <div class="">
              <div class="flex gap-2">
               <img class="w-10" src=" https://img.icons8.com/?size=40&id=21441&format=png " />
               <p class = "font-bold">${article.author}</p>
              </div>
             <p>${article.publishedAt}</p>
            </div>
           <button class="btn btn-primary read-more" data-image="${article.urlToImage}" data-title="${article.title}" data-description="${article.description || 'No description available.'}">Read More</button>
        </div>
    </div>

      `;
      newsContainer.append(card);
    });


    // Add event listeners to all "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get data attributes from the button
            const image = button.getAttribute('data-image');
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');

            // Update modal content
            const modalImage = document.getElementById('modal-image');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');

            modalImage.src = image || 'https://via.placeholder.com/400x200'; // Fallback image if no image is available
          ///  modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Close modal when the close button is clicked
            const closeModalButton = document.getElementById('close-modal');
            if (closeModalButton) {
                closeModalButton.addEventListener('click', function () {
                    //console.log('Close button clicked');
                    modal.classList.add('hidden');
                });
            }


            // Show the modal
            modal.classList.remove('hidden');
        });
    });
}


loadNewsData();