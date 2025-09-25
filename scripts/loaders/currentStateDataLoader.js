const csvUrl = './currentState.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        let data = Papa.parse(csvText, { header: true }).data;

        data = data.filter(row => row && Object.values(row).some(val => val !== undefined && val !== null && val !== ''));

        const container = document.querySelector('#updates');
        const versionList = document.querySelector('#versionList');

        data.reverse().forEach((row, index) => {
            const titles = row.Nazvy ? String(row.Nazvy).split('|') : [];
            const texts = row.Texty ? String(row.Texty).split('|') : [];
            const images = row.Obrazky ? String(row.Obrazky).split('|') : [];

            const tagDefs = [
                { key: "New", label: "New" },
                { key: "Improvement", label: "Improvement" },
                { key: "Bugfix", label: "Bugfix" }
            ];

            const tagsHtml = tagDefs
                .filter(tag => String(row[tag.key]).toLowerCase() === "true")
                .map(tag => `<span class="tag ${tag.key.toLowerCase()}">${tag.label}</span>`)
                .join('');

            let sectionsHtml = titles.map((title, i) => `
                <div class="section">
                    <h4>${title || ''}</h4>
                    <p>${texts[i] || ''}</p>
                </div>
            `).join('');

            let imagesHtml = images.map(src => `
                <img src="${src.trim() || ''}" alt="Image" class="card-image"/>
            `).join('');

            const titleHtml = `
                <div class="version">${row.Verzia || ''}</div>
                <div class="text">
                    ${row.HlavnaTema || ''} <div class="label">${index === 0 ? '[ latest ]' : ''}</div>
                </div>
                <div class="date">${row.Datum || ''}</div>
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
            li.textContent = row.Verzia || `Update ${index+1}`;
            li.addEventListener('click', () => {
                document.getElementById(`update-${index}`).scrollIntoView({ behavior: 'smooth' });
            });
            versionList.appendChild(li);
        });
    })
    .catch(err => console.error('Error loading CSV:', err));
