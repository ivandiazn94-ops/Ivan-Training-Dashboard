function showPage(id){

    document
        .querySelectorAll('.page')
        .forEach(p => p.classList.remove('active'));

    document
        .getElementById(id)
        .classList.add('active');

}

function formatTime(seconds){

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if(h > 0){
        return `${h}h ${m}m`;
    }

    return `${m}m ${s}s`;
}

async function loadData(){

    const athlete =
        await fetch('./data/athlete.json')
        .then(r=>r.json());

    const summary =
        await fetch('./data/summary.json')
        .then(r=>r.json());

    const week = summary[0];

    const cycling =
        athlete.sportSettings.find(
            s => s.types.includes('Ride')
        );

    document.getElementById('week-km').innerText =
        (week.distance/1000).toFixed(1) + ' km';

    document.getElementById('week-elevation').innerText =
        Math.round(week.total_elevation_gain) + ' m+';

    document.getElementById('week-time').innerText =
        formatTime(week.time);

    document.getElementById('week-activities').innerText =
        week.count;

    document.getElementById('week-load').innerText =
        week.training_load;

    document.getElementById('fitness').innerText =
        week.fitness.toFixed(1);

    document.getElementById('fatigue').innerText =
        week.fatigue.toFixed(1);

    document.getElementById('form').innerText =
        week.form.toFixed(1);

    const statusEl =
        document.getElementById('training-status');

    if(week.form > 5){
        statusEl.innerHTML =
            '<span class="status-good">✅ Fresco</span>';
    }
    else if(week.form < -5){
        statusEl.innerHTML =
            '<span class="status-bad">🔴 Sobrecargado</span>';
    }
    else{
        statusEl.innerHTML =
            '<span class="status-neutral">🟡 Neutro</span>';
    }

    document.getElementById('ftp').innerText =
        cycling.ftp + ' W';

    document.getElementById('cp').innerText =
        cycling.mmp_model.criticalPower + ' W';

    document.getElementById('wprime').innerText =
        Math.round(cycling.mmp_model.wPrime / 1000) + ' kJ';

    document.getElementById('lthr').innerText =
        cycling.lthr;

    document.getElementById('maxhr').innerText =
        cycling.max_hr;

    const zonesDiv =
        document.getElementById('zones');

    const total =
        week.timeInZones.reduce((a,b)=>a+b,0);

    let html = '';

    week.timeInZones.forEach((z,index)=>{

        const pct =
            total > 0
                ? (z/total)*100
                : 0;

        html += `
            <div class="zone">
                <div class="zone-name">
                    Z${index+1} - ${formatTime(z)}
                </div>
                <div class="bar">
                    <div class="fill" style="width:${pct}%">
                        ${pct.toFixed(1)}%
                    </div>
                </div>
            </div>
        `;

    });

    zonesDiv.innerHTML = html;

}

loadData();
