const jsonUrl = './data/currentState.json';
let updatesData = [];
let activeTags = new Set();

function renderUpdates(data) {
    const container = document.querySelector('#updates');
    const versionList = document.querySelector('#versionList');
    container.innerHTML = '';
    versionList.innerHTML = '';

    data.forEach((row, index) => {
        const sections = Array.isArray(row.sections) ? row.sections : [];
        const images = Array.isArray(row.obrazky) ? row.obrazky : [];

        const tagDefs = [
            { key: "new", label: "New" },
            { key: "improvement", label: "Improvement" },
            { key: "bugfix", label: "Bugfix" }
        ];

        const tagsHtml = tagDefs
            .filter(tag => String(row[tag.key]).toLowerCase() === "true")
            .map(tag => `<span class=\"tag ${tag.key}\">${tag.label}</span>`)
            .join('');

        let sectionsHtml = sections.map(section => `
            <div class="section">
                <h4>${section.nadpis || ''}</h4>
                <p>${section.text || ''}</p>
            </div>
        `).join('');

        let imagesHtml = images.map(src => `
            <img src="${src.trim() || ''}" alt="Image" class="card-image"/>
        `).join('');

        const titleHtml = `
            <div class="version">${row.verzia || ''}</div>
            <div class="text">
                ${row.hlavnatema || ''} <div class="label">${index === 0 ? '[ latest ]' : ''}</div>
            </div>
            <div class="date">${row.datum || ''}</div>
        `;

        const updateSection = document.createElement('div');
        updateSection.classList.add('updateSection');
        updateSection.id = `update-${index}`;

        updateSection.innerHTML = `
            <div class="update-body">
                <div class="title">${titleHtml}</div>
                <div class="tags">${tagsHtml}</div>
                <div class="content-sections">${sectionsHtml}</div>
                <div class="images">${imagesHtml}</div>
            </div>
        `;

        container.appendChild(updateSection);

        const li = document.createElement('li');
        li.textContent = row.verzia || `Update ${index + 1}`;
        li.classList.add('version-link');
        li.addEventListener('click', () => {
            document.getElementById(`update-${index}`).scrollIntoView({ behavior: 'smooth' });
        });
        versionList.appendChild(li);
    });
}

function applyFilters() {
    const searchValue = document.querySelector('#searchInput').value.toLowerCase();

    let filtered = updatesData.filter(row => {
        const sectionText = (Array.isArray(row.sections) ? row.sections.map(s => `${s.nadpis} ${s.text}`) : []).join(' ');
        const combinedText = [
            row.hlavnatema, row.verzia, row.datum,
            sectionText
        ].join(' ').toLowerCase();

        const matchesText = combinedText.includes(searchValue);

        const matchesTags = activeTags.size === 0 || [...activeTags].every(tag =>
            String(row[tag.toLowerCase()]).toLowerCase() === "true"
        );

        return matchesText && matchesTags;
    });

    renderUpdates(filtered);
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('filter-btn')) {
        const tag = e.target.dataset.tag.charAt(0).toUpperCase() + e.target.dataset.tag.slice(1);
        if (activeTags.has(tag)) {
            activeTags.delete(tag);
            e.target.classList.remove('active');
        } else {
            activeTags.add(tag);
            e.target.classList.add('active');
        }
        applyFilters();
    }
});

document.addEventListener('input', e => {
    if (e.target.id === 'searchInput') {
        applyFilters();
    }
});

fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // If needed, filter out empty rows (shouldn't be necessary with JSON)
        data = data.filter(row => row && Object.values(row).some(val => val !== undefined && val !== null && val !== ''));
        data.reverse();
        updatesData = data;
        renderUpdates(updatesData);
    })
    .catch(err => console.error('Error loading JSON:', err));
