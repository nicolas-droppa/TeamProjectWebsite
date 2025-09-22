const csvUrl = './meetings.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;
        const container = document.querySelector('#meetings');

        data.forEach((row, index) => {
            // attendance mapping
            const attendance = [
                { key: 'Veduci', class: 'blue-circle', name: 'Veduci' },
                { key: 'JakubD', class: 'red-circle', name: 'Jakub D' },
                { key: 'SamuelD', class: 'green-circle', name: 'Samuel D' },
                { key: 'NicolasD', class: 'orange-circle', name: 'Nicolas D' },
                { key: 'VratkoB', class: 'yellow-circle', name: 'Vratko B' },
                { key: 'MiroslavaS', class: 'pink-circle', name: 'Miroslava Š' }
            ];

            const circles = attendance.map(person => {
                if (row[person.key] === 'TRUE') {
                    return `<div class="${person.class}" title="${person.name}"></div>`;
                }
                return '';
            }).join('');

            // card element
            const card = document.createElement('div');
            card.classList.add('meeting-card');
            card.innerHTML = `
                <div class="meetingcard-body">
                    <div class="title">
                        <div class="number">${index + 1}</div>
                        <div class="text">${row.HlavnaTema}</div>
                    </div>
                    <div class="description">${row.KratkyPopis}</div>
                    <div class="footer">
                        <div class="time-date">
                            <div class="time">${row.Cas}</div>
                            <div class="date">${row.Datum}</div>
                        </div>
                        <div class="attendance">${circles}</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                showMeetingModal(row, index + 1);
            });

            container.appendChild(card);

        });
    })
    .catch(err => console.error('Error loading CSV:', err));

function showMeetingModal(row, number) {
    const modal = document.getElementById('meetingModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementById('closeModal');

    modalBody.innerHTML = `
        <h3>Stretnutie ${number}: ${row.HlavnaTema}</h3>
        <p><strong>Dátum:</strong> ${row.Datum}</p>
        <p><strong>Čas:</strong> ${row.Cas}</p>
        <p><strong>Popis:</strong> ${row.KratkyPopis}</p>
        <p><strong>Prejednávané veci:</strong> ${row.PrejednavaneVeci}</p>
        <p><strong>Záver:</strong> ${row.Zaver}</p>
    `;

    modal.style.display = 'block';

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

