document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2025-02-11&sortBy=publishedAt&apiKey=451352e5a6d547cea728fa6778657d3c';
    const newsContainer = document.getElementById('news-container');

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

    // Fetch news data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles) {
                data.articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card bg-base-100 shadow-xl flex flex-col';

                    const image = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-full h-48 object-cover">` : '';

                    card.innerHTML = `
                        <figure>${image}</figure>
                        <div class="card-body flex flex-col flex-grow">
                            <h2 class="card-title">${article.title}</h2>
                            <p class="text-gray-600">${article.description || 'No description available.'}</p>
                            <div class="card-actions justify-end mt-auto">
                                <button class="btn btn-primary read-more" data-image="${article.urlToImage}" data-title="${article.title}" data-description="${article.description || 'No description available.'}">Read More</button>
                            </div>
                        </div>
                    `;

                    newsContainer.appendChild(card);
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
                                console.log('Close button clicked');
                                modal.classList.add('hidden');
                            });
                        }


                        // Show the modal
                        modal.classList.remove('hidden');
                    });
                });
            } else {
                newsContainer.innerHTML = '<p>No articles found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the news data:', error);
            newsContainer.innerHTML = '<p>Error loading news.</p>';
        });

    // Close modal when the close button is clicked
    const closeModalButton = document.getElementById('close-modal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function () {
            console.log('Close button clicked');
            modal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            console.log('Clicked outside modal');
            modal.classList.add('hidden');
        }
    });
});