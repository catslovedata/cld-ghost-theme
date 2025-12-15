// Fix sidebar tag filtering using JavaScript
export default function sidebarTags() {
    const topicsList = document.querySelector('.gh-sidebar-topics-list');
    const tagsList = document.querySelector('.gh-sidebar-tags-list');

    if (!topicsList || !tagsList) return;

    // Get all tag links from the tags list
    const allTagItems = Array.from(tagsList.querySelectorAll('.gh-sidebar-list-item'));

    // Filter and reorganize
    const contentTypeItems = [];
    const regularTagItems = [];

    allTagItems.forEach(item => {
        const link = item.querySelector('a');
        const tagName = link.getAttribute('data-tag-name');

        if (tagName && tagName.startsWith('content-type-')) {
            // Strip prefix for display
            link.textContent = tagName.replace('content-type-', '');
            contentTypeItems.push(item);
        } else {
            regularTagItems.push(item);
        }
    });

    // Clear both lists
    topicsList.innerHTML = '';
    tagsList.innerHTML = '';

    // Repopulate with filtered items
    contentTypeItems.forEach(item => topicsList.appendChild(item));
    regularTagItems.forEach(item => tagsList.appendChild(item));
}
