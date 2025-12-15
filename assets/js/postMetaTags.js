// Organize post metadata tags into content-types and regular tags
export default function postMetaTags() {
    const metaTagsContainer = document.querySelector('.gh-post-meta-tags');
    if (!metaTagsContainer) return;

    const allTags = Array.from(metaTagsContainer.querySelectorAll('.gh-post-meta-tag'));
    if (allTags.length === 0) return;

    // Separate tags into content-type and regular tags
    const contentTypeTags = [];
    const regularTags = [];

    allTags.forEach(tagLink => {
        const tagName = tagLink.getAttribute('data-tag-name');
        if (tagName && tagName.startsWith('content-type-')) {
            // Strip the "content-type-" prefix for display
            tagLink.textContent = tagName.replace('content-type-', '');
            contentTypeTags.push(tagLink);
        } else {
            regularTags.push(tagLink);
        }
    });

    // Clear the container
    metaTagsContainer.innerHTML = '';

    // Add content-type tags section with separator
    if (contentTypeTags.length > 0) {
        const separator1 = document.createElement('span');
        separator1.className = 'gh-post-meta-separator';
        separator1.textContent = ' | ';
        metaTagsContainer.appendChild(separator1);

        const contentTypeSpan = document.createElement('span');
        contentTypeSpan.className = 'gh-post-meta-tags-group gh-post-meta-content-types';
        contentTypeTags.forEach(tag => contentTypeSpan.appendChild(tag));
        metaTagsContainer.appendChild(contentTypeSpan);
    }

    // Add regular tags section with separator
    if (regularTags.length > 0) {
        const separator2 = document.createElement('span');
        separator2.className = 'gh-post-meta-separator';
        separator2.textContent = ' | ';
        metaTagsContainer.appendChild(separator2);

        const regularTagsSpan = document.createElement('span');
        regularTagsSpan.className = 'gh-post-meta-tags-group gh-post-meta-regular-tags';
        regularTags.forEach(tag => regularTagsSpan.appendChild(tag));
        metaTagsContainer.appendChild(regularTagsSpan);
    }
}
