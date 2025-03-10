document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2025-02-10&sortBy=publishedAt&apiKey=451352e5a6d547cea728fa6778657d3c';
    const newsContainer = document.getElementById('news-container');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles) {
                data.articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card bg-base-100 shadow-xl';

                    const image = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-full h-48 object-cover">` : '';

                    card.innerHTML = `
                        <figure>${image}</figure>
                        <div class="card-body">
                            <h2 class="card-title">${article.title}</h2>
                            <div class="card-actions justify-end">
                                <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;

                    newsContainer.appendChild(card);
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