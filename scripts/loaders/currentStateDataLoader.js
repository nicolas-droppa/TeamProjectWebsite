const csvUrl = './currentState.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;
        const container = document.querySelector('#meetings');

        data.forEach((row, index) => {
        const nazvy = row.Nazvy ? row.Nazvy.split('|') : [];
        const texty = row.Texty ? row.Texty.split('|') : [];
        const obrazky = row.Obrazky ? row.Obrazky.split('|') : [];

        let obsahHtml = nazvy.map((nazov, i) => `
            <div class="section">
            <h4>${nazov}</h4>
            <p>${texty[i] || ''}</p>
            </div>
        `).join('');

        let obrazkyHtml = obrazky.map(src => `
            <img src="${src.trim()}" alt="Obrázok" class="card-image"/>
        `).join('');

        const card = document.createElement('div');
        card.classList.add('meeting-card');
        card.innerHTML = `
            <div class="meeting-card-body">
            <div class="title">
                <div class="number">${index + 1}</div>
                <div class="text">${row.HlavnaTema}</div>
            </div>
            <div class="description">
                <strong>Dátum:</strong> ${row.Datum}<br/>
                <strong>Verzia:</strong> ${row.Verzia}
            </div>
            <div class="content-sections">${obsahHtml}</div>
            <div class="images">${obrazkyHtml}</div>
            </div>
        `;

        container.appendChild(card);
        });
    })
    .catch(err => console.error('Error loading CSV:', err));
