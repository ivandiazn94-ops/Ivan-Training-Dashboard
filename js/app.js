function showPage(id){

    document
        .querySelectorAll('.page')
        .forEach(page => page.classList.remove('active'));

    document
        .getElementById(id)
        .classList.add('active');

}

async function loadData(){

    const athlete =
        await fetch('./data/athlete.json')
        .then(r => r.json());

    const summary =
        await fetch('./data/summary.json')
        .then(r => r.json());

    const cycling =
        athlete.sportSettings.find(
            s => s.types.includes('Ride')
        );

    const running =
        athlete.sportSettings.find(
            s => s.types.includes('Run')
        );

    const week = summary[0];

    document.getElementById('dashboard-ftp').innerText =
        cycling.ftp + ' W';

    document.getElementById('dashboard-weight').innerText =
        athlete.icu_weight + ' kg';

    document.getElementById('dashboard-wkg').innerText =
        (cycling.ftp / athlete.icu_weight).toFixed(2);

    document.getElementById('dashboard-fitness').innerText =
        week.fitness.toFixed(1);

    document.getElementById('dashboard-fatigue').innerText =
        week.fatigue.toFixed(1);

    document.getElementById('dashboard-form').innerText =
        week.form.toFixed(1);

    document.getElementById('dashboard-distance').innerText =
        (week.distance / 1000).toFixed(1) + ' km';

    document.getElementById('dashboard-load').innerText =
        week.training_load;

    document.getElementById('dashboard-count').innerText =
        week.count;

    document.getElementById('power-ftp').innerText =
        cycling.ftp + ' W';

    document.getElementById('power-indoor').innerText =
        cycling.indoor_ftp + ' W';

    document.getElementById('power-cp').innerText =
        cycling.mmp_model.criticalPower + ' W';

    document.getElementById('power-wprime').innerText =
        cycling.mmp_model.wPrime;

    document.getElementById('hr-lthr').innerText =
        cycling.lthr;

    document.getElementById('hr-max').innerText =
        cycling.max_hr;

    document.getElementById('config-name').innerText =
        athlete.name;

    document.getElementById('config-location').innerText =
        athlete.city + ', ' + athlete.country;

    document.getElementById('config-weight').innerText =
        athlete.icu_weight + ' kg';

    const bikes =
        athlete.bikes
            .map(b => b.name)
            .join('<br>');

    document.getElementById('config-bikes').innerHTML =
        bikes;

}

loadData();
