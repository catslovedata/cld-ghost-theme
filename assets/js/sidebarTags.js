// Fix sidebar tag filtering using JavaScript
export default function sidebarTags() {
    const topicsSection = document.querySelector('.gh-sidebar-section:has(.gh-sidebar-section-title)');
    const tagsSection = document.querySelectorAll('.gh-sidebar-section')[1];

    if (!topicsSection || !tagsSection) return;

    // Get all topic links
    const topicLinks = Array.from(topicsSection.querySelectorAll('.gh-sidebar-list-item a'));
    const tagLinks = Array.from(tagsSection.querySelectorAll('.gh-sidebar-list-item a'));

    // Filter and reorganize
    const contentTypeItems = [];
    const regularTagItems = [];

    [...topicLinks, ...tagLinks].forEach(link => {
        const listItem = link.closest('.gh-sidebar-list-item');
        const tagName = link.textContent.trim();

        if (tagName.startsWith('content-type-')) {
            // Strip prefix for display
            link.textContent = tagName.replace('content-type-', '');
            contentTypeItems.push(listItem);
        } else {
            regularTagItems.push(listItem);
        }
    });

    // Clear both lists
    const topicsList = topicsSection.querySelector('.gh-sidebar-list');
    const tagsList = tagsSection.querySelector('.gh-sidebar-list');

    if (topicsList) topicsList.innerHTML = '';
    if (tagsList) tagsList.innerHTML = '';

    // Repopulate with filtered items
    contentTypeItems.forEach(item => {
        if (topicsList) topicsList.appendChild(item);
    });

    regularTagItems.forEach(item => {
        if (tagsList) tagsList.appendChild(item);
    });
}
