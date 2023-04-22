function formSubmitHandler() {
    const form = document.getElementById('wf-form-ucapan-doa');
    const button = document.getElementById('btn-send');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        sendData();
    });

    button.addEventListener('click', function(event) {
        event.preventDefault();

        sendData();
    })
}

async function sendData() {
    const configs = {
        'overlayOpacity': 0.75,
        'spinnerIcon': 'ball-circus',
        'lockScroll': false,
        'containerID': 'wishes-box',
    };
    
    JsLoadingOverlay.show(configs);

    const name = document.getElementById('form-name').value;
    const ucapan = document.getElementById('form-ucapan').value;

    const response = await axios({
        method: 'post',
        url: 'https://us-central1-abzr-playground.cloudfunctions.net/wishesForm',
        data: {
            'nama': name,
            'ucapan': ucapan,
            'linkSource': window.location.href
        }
    });

    const responseData = response.data.data;

    addWishes(responseData.name, responseData.ucapan, responseData['created-on']);

    document.getElementById('form-name').value = null;
    document.getElementById('form-ucapan').value = null;

    JsLoadingOverlay.hide();
}

function addWishes(nama, ucapan, date) {
    const parsedDate = new Date(date);
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);

    const listitem = document.createElement('div');
    listitem.classList.add('wishes-item', 'w-dyn-item');
    listitem.role = "listitem";

    const wishesFrom = document.createElement('div');
    wishesFrom.classList.add('wishes-from');
    wishesFrom.innerHTML = nama;

    const wishesText = document.createElement('p');
    wishesText.classList.add('wishes-text');
    wishesText.innerHTML = ucapan;

    const wishesDate = document.createElement('div');
    wishesDate.classList.add('wishes-date');
    wishesDate.innerHTML = formattedDate;

    listitem.appendChild(wishesFrom);
    listitem.appendChild(wishesText);
    listitem.appendChild(wishesDate);

    const wishesListItem = document.getElementById('wishes-list-items');
    wishesListItem.prepend(listitem);

    return listitem;
}

formSubmitHandler();
