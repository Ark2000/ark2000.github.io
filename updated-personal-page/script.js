document.addEventListener('DOMContentLoaded', () => {
    loadMarkdownContent();

    // test mouse click event
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', function (event) {
            // console.log(event);
            // OK, it works.
        });
    }
});

// Load and process the markdown content
async function loadMarkdownContent() {
    try {
        const response = await fetch('portfolio.md');
        if (!response.ok) throw new Error('Failed to load markdown content');
        let text = await response.text();
        // Remove YAML front matter
        text = text.replace(/---[\s\S]*?---/, '');
        // Convert markdown to HTML
        const contentElement = document.querySelector('.content-inner');
        contentElement.innerHTML = marked.parse(text);
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.querySelector('.content-inner').innerHTML = '<p>Error loading content. Please try again later.</p>';
    }
}
