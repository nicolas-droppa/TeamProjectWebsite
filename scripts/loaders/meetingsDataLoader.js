const jsonUrl = './data/meetings.json';


fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('#meetings');
        setTimeout(() => {
            container.classList.add('slide-in');
            setTimeout(() => {
                data.forEach((row, index) => {
                const attendance = [
                    { key: 'veduci', class: 'blue-circle', name: '[Veduci] Marek Drnzik' },
                    { key: 'jakubd', class: 'red-circle', name: 'Jakub Daniš' },
                    { key: 'samueld', class: 'green-circle', name: 'Samuel Dutka' },
                    { key: 'nicolasd', class: 'orange-circle', name: 'Nicolas Droppa' },
                    { key: 'vratkob', class: 'yellow-circle', name: 'Vratko Bakša' },
                    { key: 'miroslavas', class: 'pink-circle', name: 'Miroslava Štefinová' }
                ];

                const circles = attendance.map(person => {
                    if (row[person.key] === true) {
                        return `<div class="${person.class}" title="${person.name}"></div>`;
                    } else {
                        return `<div class="${person.class} absent" title="${person.name}"></div>`;
                    }
                }).join('');

                const meetingTypeHtml = row['inperson'] === true ? 'In-Person' : 'Online';

                const card = document.createElement('div');
                card.classList.add('meeting-card');
                card.innerHTML = `
                    <div class="meetingcard-body">
                        <div class="title">
                            <div class="number">${index + 1}</div>
                            <div class="text">${row.hlavnatema}</div>
                        </div>
                        <div class="description">${row.kratkypopis}</div>
                        <div class="footer">
                            <div class="time-date">
                                <div class="time">${row.cas}</div>
                                <div class="date">${row.datum}</div>
                            </div>
                            <div class="attendance">${circles}</div>
                            <div class="meeting-type">${meetingTypeHtml}</div>
                        </div>
                    </div>
                `;

                card.addEventListener('click', () => {
                    showMeetingModal(row, index + 1);
                });

                container.appendChild(card);

                setTimeout(() => {
                    card.classList.add('slide-in');
                }, 120 + index * 80);
            });
            }, 250);
        })
    })
    .catch(err => console.error('Error loading JSON:', err));

function showMeetingModal(row, number) {
    const modal = document.getElementById('meetingModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.getElementById('closeModal');

    modalBody.innerHTML = `
        <div class="modal-body-scroll">
            <div class="modal-title">
                <div class="number">${number}</div>
                <div class="text">${row.hlavnatema}</div>
            </div>

            <p><strong>Dátum:</strong> ${row.datum}</p>
            <p><strong>Čas:</strong> ${row.cas}</p>
            <div class="section-divider"></div>

            <p><strong>Popis:</strong></p>
            <p>${row.kratkypopis}</p>
            <div class="section-divider"></div>

            <p><strong>Prejednávané veci:</strong></p>
            <p>${row.prejednavaneveci}</p>
            <div class="section-divider"></div>

            <p><strong>Záver:</strong></p>
            <p>${row.zaver}</p>
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
        { key: 'veduci', class: 'blue-circlea', name: '[Veduci] Marek Drnzik' },
        { key: 'jakubd', class: 'red-circle', name: 'Jakub Daniš' },
        { key: 'samueld', class: 'green-circle', name: 'Samuel Dutka' },
        { key: 'nicolasd', class: 'orange-circle', name: 'Nicolas Droppa' },
        { key: 'vratkob', class: 'yellow-circle', name: 'Vratko Bakša' },
        { key: 'miroslavas', class: 'pink-circle', name: 'Miroslava Štefinová' }
    ];

    return attendance.map(person => {
        if (row[person.key] === true) {
            return `<div class="person" title="${person.name}" style="margin-right:0.5rem;">${person.name}</div>`;
        }
        return '';
    }).join('');
}