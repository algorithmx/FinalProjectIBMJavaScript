document.addEventListener('DOMContentLoaded', function() {
    // Function to hide all content sections
    function hideAllSections() {
        document.querySelectorAll('.content > div').forEach(div => {
            div.style.display = 'none';
        });
    }

    // Function to show a specific section
    window.showSection = function(id) {
        hideAllSections();
        document.getElementById(id).style.display = 'block';
        if (id === 'home') {
            document.getElementById('search-form-nav').style.display = 'block';
        } else {
            document.getElementById('search-form-nav').style.display = 'none';
        }
    }
});
