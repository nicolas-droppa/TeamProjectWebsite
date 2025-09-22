const csvUrl = './meetings.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;
        const tbody = document.querySelector('#meetingsTable tbody');

        data.forEach(row => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${row.HlavnaTema}</td>
                <td>${row.Datum}</td>
                <td>${row.KratkyPopis}</td>
                <td>${row.Veduci === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.JakubD === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.SamuelD === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.NicolasD === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.VratkoB === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.MiroslavaS === 'TRUE' ? '✔️' : ''}</td>
                <td>${row.PredjednavaneVeci}</td>
                <td>${row.Zaver}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }).catch(err => console.error('Error loading CSV:', err));
