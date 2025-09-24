const csvUrl = './meetings.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;
        const container = document.querySelector('#meetings');

        data.forEach((row, index) => {
            const attendance = [
                { key: 'Veduci', class: 'blue-circle', name: 'Veduci' },
                { key: 'JakubD', class: 'red-circle', name: 'Jakub Daniš' },
                { key: 'SamuelD', class: 'green-circle', name: 'Samuel Dutka' },
                { key: 'NicolasD', class: 'orange-circle', name: 'Nicolas Droppa' },
                { key: 'VratkoB', class: 'yellow-circle', name: 'Vratko Bakša' },
                { key: 'MiroslavaS', class: 'pink-circle', name: 'Miroslava Štefinová' }
            ];

            const circles = attendance.map(person => {
                if (row[person.key] === 'TRUE') {
                    return `<div class="${person.class}" title="${person.name}"></div>`;
                } else {
                    return `<div class="${person.class} absent" title="${person.name}"></div>`;
                }
            }).join('');


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
        <div class="modal-body-scroll">
            <div class="modal-title">
                <div class="number">${number}</div>
                <div class="text">${row.HlavnaTema}</div>
            </div>

            <p><strong>Dátum:</strong> ${row.Datum}</p>
            <p><strong>Čas:</strong> ${row.Cas}</p>
            <div class="section-divider"></div>

            <p><strong>Popis:</strong></p>
            <p>${row.KratkyPopis}</p>
            <div class="section-divider"></div>

            <p><strong>Prejednávané veci:</strong></p>
            <p>${row.PrejednavaneVeci}</p>
            <div class="section-divider"></div>

            <p><strong>Záver:</strong></p>
            <p>${row.Zaver}</p>
            <div class="section-divider"></div>

            <p><strong>Prítomní:</strong></p>
            <div class="attendance-modal">
                ${generateAttendanceCircles(row)}
            </div>
        </div>
    `;

    modal.style.display = 'flex';

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function generateAttendanceCircles(row) {
    const attendance = [
        { key: 'Veduci', class: 'blue-circlea', name: 'Veduci' },
        { key: 'JakubD', class: 'red-circle', name: 'Jakub D' },
        { key: 'SamuelD', class: 'green-circle', name: 'Samuel D' },
        { key: 'NicolasD', class: 'orange-circle', name: 'Nicolas D' },
        { key: 'VratkoB', class: 'yellow-circle', name: 'Vratko B' },
        { key: 'MiroslavaS', class: 'pink-circle', name: 'Miroslava Š' }
    ];

    return attendance.map(person => {
        if (row[person.key] === 'TRUE') {
            return `<div class="person" title="${person.name}" style="margin-right:0.5rem;">${person.name}</div>`;
        }
        return '';
    }).join('');
}