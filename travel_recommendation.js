document.addEventListener('DOMContentLoaded', function() {
    window.resetSearchResults = function() {
        console.log("%c resetting search results", "background: magenta");
        // Clear the search input
        document.querySelector('.search-input').value = '';
        // Clear the search results
        const searchResults = document.getElementById('search-results');
        while (searchResults.lastChild && searchResults.lastChild.id !== 'back-home') {
            searchResults.removeChild(searchResults.lastChild);
        }
    }

    // Function to hide all content sections
    function hideAllSections() {
        document.querySelectorAll('.content > div').forEach(div => {
            div.style.display = 'none';
        });
    }


    // Function to show a specific section
    window.showSection = function(id) {
        hideAllSections();
        if (id !== 'search-results') {
            resetSearchResults();
        }
        document.getElementById(id).style.display = 'block';
        if (id === 'home') {
            document.getElementById('search-form-nav').style.display = 'block';
        } else {
            document.getElementById('search-form-nav').style.display = 'none';
        }
    }

    // Fetch recommendations data
    let recommendations;
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            recommendations = data;
            console.log(recommendations);
        });

    // Define a constant for the keys in the recommendations dictionary
    const RECOMMENDATION_KEYS = ['countries', 'temples', 'beaches'];

    // New function to handle search
    window.handleSearch = function() {
        const searchInput = document.querySelector('.search-input').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        // Clear previous results by removing children except for the back-home button
        while (searchResults.firstChild && searchResults.firstChild.id !== 'back-home') {
            searchResults.removeChild(searchResults.firstChild);
        }

        if (searchInput) {
            console.log("%c"+searchInput, "background: cyan");
            // Use the constant to iterate through keys
            RECOMMENDATION_KEYS.forEach(key => {
                const categoryResults = recommendations[key].filter(item => 
                    item.name.toLowerCase().includes(searchInput) || 
                    (item.cities && item.cities.some(city => city.name.toLowerCase().includes(searchInput))) ||
                    (item.description && item.description.toLowerCase().includes(searchInput))
                );
                if (categoryResults.length > 0) {
                    // Append the search input and results as children here
                    const categoryHeading = document.createElement('h2');
                    categoryHeading.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                    categoryHeading.className = 'page-content';
                    searchResults.appendChild(categoryHeading);

                    const categoryContainer = document.createElement('div');
                    categoryContainer.className = 'page-content';
                    categoryResults.forEach(item => {
                        const resultParagraph = document.createElement('p');
                        resultParagraph.textContent = item.name;
                        resultParagraph.className = 'page-content';
                        categoryContainer.appendChild(resultParagraph);
                    });
                    searchResults.appendChild(categoryContainer);
                }
            });

            if (searchResults.innerHTML === '') {
                searchResults.innerHTML = '<p class="page-content">No results found.</p>';
            }

            // Show search results section
            showSection('search-results');
        }
    }

    // Attach event listener to the search button
    document.querySelector('.search-button[type="submit"]').addEventListener('click', function(e) {
        e.preventDefault();
        handleSearch();
    });

    // Attach event listener to the reset button
    document.querySelector('.search-button[type="reset"]').addEventListener('click', function(e) {
        e.preventDefault();
        resetSearchResults();
    });

});