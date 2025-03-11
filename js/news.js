document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2025-02-11&sortBy=publishedAt&apiKey=451352e5a6d547cea728fa6778657d3c';
    const newsContainer = document.getElementById('news-container');

    // button click moddel open
  

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles) {
                data.articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card bg-base-100 shadow-xl flex flex-col'; // Added flex and flex-col

                    const image = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-full h-48 object-cover">` : '';

                    card.innerHTML = `
                        <figure>${image}</figure>
                        <div class="card-body flex flex-col flex-grow"> <!-- Added flex, flex-col, and flex-grow -->
                            <h2 class="card-title">${article.title}</h2>
                            <div class="card-actions justify-end mt-auto"> <!-- Added mt-auto -->
                               <!-- <a href="${article.url}" target="_blank" class="btn btn-primary read-more">Read More</a> -->

                                <button class="btn btn-primary read-more" data-image="${article.urlToImage}" data-title="${article.title}"
                                 data-description="${article.description || 'No description available.'}">Read More</button>
                               
                            </div>
                        </div>
                    `;

                    newsContainer.appendChild(card);
                });

                   // Add event listeners to all "Read More" buttons
                   const readMoreButtons = document.querySelectorAll('.read-more');
                   readMoreButtons.forEach(button => {
                       button.addEventListener('click', function(event) {
                           // Log or track the click event
                           //console.log('Read More clicked for:', event.target.href);
                           // You can add additional functionality here, like sending analytics data
                       

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

});