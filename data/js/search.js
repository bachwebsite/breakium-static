 document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('search');
            const gamesGrid = document.getElementById('gamesGrid');
            const clearSearchBtn = document.getElementById('clearSearch');
            const noResultsDiv = document.getElementById('noResults');
            let searchTimeout;
            function filterDivs() {
                const searchQuery = searchInput.value.toLowerCase();
                const divs = document.getElementsByClassName('bubbly-div');
                let visibleCount = 0;

                Array.from(divs).forEach(div => {
                    const gameLink = div.querySelector('a');
                    if (gameLink) {
                        const gameName = gameLink.innerText.toLowerCase();
                        const isVisible = gameName.includes(searchQuery);
                        
                        div.style.display = isVisible ? 'inline-block' : 'none';
                        if (isVisible) visibleCount++;
                    }
                });

       
                noResultsDiv.style.display = visibleCount === 0 && searchQuery ? 'block' : 'none';
                clearSearchBtn.style.display = searchQuery ? 'inline-block' : 'none';
            }

 
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    filterDivs();
                }, 150);
            });

   
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = '';
                filterDivs();
                searchInput.focus();
            });

    
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.value = '';
                    filterDivs();
                }
            });

     
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                    e.preventDefault();
                    searchInput.focus();
                }
            });

 
            setTimeout(() => {
                filterDivs(); 
            }, 1000);
        });