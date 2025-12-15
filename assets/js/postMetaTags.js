// Organize tags into content-types and regular tags
// Works for both post metadata and sidebar
function organizeTags(container, tagSelector, stripPrefix = false) {
    const allTags = Array.from(container.querySelectorAll(tagSelector));
    if (allTags.length === 0) return { contentTypeTags: [], regularTags: [] };

    const contentTypeTags = [];
    const regularTags = [];

    allTags.forEach(tagLink => {
        const tagName = stripPrefix
            ? tagLink.getAttribute('data-tag-name')
            : tagLink.textContent.trim();

        if (tagName && tagName.startsWith('content-type-')) {
            if (stripPrefix) {
                tagLink.textContent = tagName.replace('content-type-', '');
            }
            contentTypeTags.push(tagLink);
        } else {
            regularTags.push(tagLink);
        }
    });

    return { contentTypeTags, regularTags };
}

// Organize post metadata tags
export default function postMetaTags() {
    const metaTagsContainer = document.querySelector('.gh-post-meta-tags');
    if (!metaTagsContainer) return;

    const { contentTypeTags, regularTags } = organizeTags(metaTagsContainer, '.gh-post-meta-tag', true);

    // Clear the container (removes the initial separator too)
    metaTagsContainer.innerHTML = '';

    // Only add separators and tags if there are tags to show
    if (contentTypeTags.length > 0 || regularTags.length > 0) {
        // Add content-type tags section
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

        // Add regular tags section
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
}
