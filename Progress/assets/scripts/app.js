const accessmodal = document.getElementById('add-modal');
const newProcurationButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const vaccineType = document.querySelector('select');
const vaccineDetails = document.querySelectorAll('input');
const cancelButtonOnModal = accessmodal.querySelector('.btn--passive');
const addButtonOnModal = cancelButtonOnModal.nextElementSibling;
const confirmCancelModal = document.getElementById('delete-modal');
const textEntrySection = document.getElementById('entry-text');
const listOfVaccines = document.getElementById('movie-list');
const addVaccine = document.getElementById('button-addVaccine');
const astraBar = document.getElementById('astra');
const pfizerBar = document.getElementById('pfiz');
const johnsonBar = document.getElementById('john');
const sectionUI = document.getElementById('quantity-levels');
const injectionValue = 2;




let startingBarLevels = 0;
let currentAstraBarLevel = startingBarLevels;
let currentPfizerBarLevel = startingBarLevels;
let currentJohnsonBarLevel = startingBarLevels;
let marginStartingValue = -80;


adjustBars = (minLife) => {
    astraBar.min = minLife;
    astraBar.value = minLife;
    astraBar.max = 100;

    pfizerBar.min = minLife;
    pfizerBar.value = minLife;

    johnsonBar.min = minLife;
    johnsonBar.value = minLife;
  };


adjustBars(startingBarLevels);


const vaccine = [];


const toggleBackgroundOpacity = () => {
    backdrop.classList.toggle('visible');
}

const makeModalAppear = () => {
    accessmodal.classList.add('visible');
    toggleBackgroundOpacity();
}

const clearInputsInModal = () => {
    vaccineType.value = 'select';
    for(el of vaccineDetails) {
        el.value = '';
    }
}

const closeModal = () => {
    clearInputsInModal();
    toggleBackgroundOpacity();
    accessmodal.classList.remove('visible');

}

const closeDelectionModal = () => {
    toggleBackgroundOpacity();
    confirmCancelModal.classList.remove('visible');
};

const launchDeletionModal = (vacId) => {

    toggleBackgroundOpacity();
    confirmCancelModal.classList.add('visible');

    let confirmDeletionBtn = confirmCancelModal.querySelector('.btn--danger');
    const cancelOperationBtn = confirmCancelModal.querySelector('.btn--passive');

    cancelOperationBtn.removeEventListener('click', closeDelectionModal);
    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

    confirmDeletionBtn = confirmCancelModal.querySelector('.btn--danger');

    cancelOperationBtn.addEventListener('click', closeDelectionModal);
    confirmDeletionBtn.addEventListener('click', deleteVaccination.bind(null, vacId));
    

}

const updateUinterface = () => {
    if(vaccine.length === 0) {
        textEntrySection.style.display = 'block';
    }else{
        textEntrySection.style.display = 'none';
    }
};

const deleteVaccination = (vacId) => {
    let vaccineIndex = 0;
    for(vac of vaccine) {
        if(vac.id === vacId){
            break;
        }
        vaccineIndex++;
    }
    vaccine.splice(vaccineIndex, 1);
    listOfVaccines.children[vaccineIndex].remove();
    closeModal();
    closeDelectionModal();
    toggleBackgroundOpacity();
    updateUinterface();
};

const addVaccinationData = () => {
    vaccineType.value;
    const coreDetail = vaccineDetails[0].value;
    const age = vaccineDetails[1].value;

    const vacData = {
        id: Math.random().toString(),
        type: vaccineType.value,
        coreDetail: coreDetail,
        age: age,
    };
    vaccine.push(vacData);
    console.log(vaccine);
    injection(vaccineType.value);
    dealWithMargin();
    closeModal();
    clearInputsInModal();
    VaccinationData(vacData.id, vacData.type, vacData.coreDetail, vacData.age);
    updateUinterface();
    checkForAvailability();

}

const VaccinationData = (id, type, coreDetail, age) => {
    const newVacData = document.createElement('li');
    newVacData.className = 'movie-element';
    newVacData.innerHTML = `
    <div class = "movie-element__image">
       <h1>${type}</h1>
    </div>
    <div class = "movie-element-info">
       <h2>${coreDetail}</2>
       <p>${age} years old</p>
    </div>
    `;
    newVacData.addEventListener('click', launchDeletionModal.bind(null, id));
    listOfVaccines.append(newVacData);
};

const dealWithMargin = () => {

    marginStartingValue = marginStartingValue -25;
    let toBeAppended = marginStartingValue.toString() + 'px';
    sectionUI.style.marginTop = toBeAppended;

}

const AstraZenecaInjection = (consumedQuantity) => {
    const quantity = consumedQuantity;
    astraBar.value = +astraBar.value + quantity;
    return quantity;
}

const pfizerInjection = (consumedQuantity) => {
    const quantity = consumedQuantity;
    pfizerBar.value = +pfizerBar.value + quantity;
    return quantity;
}

const johnsonInjection = (consumedQuantity) => {
    const quantity = consumedQuantity;
    johnsonBar.value = +johnsonBar.value + quantity;
    return quantity;
}


const injection = (injectionType) => {
    if(injectionType === 'AstraZeneca') {
        AstraZenecaInjection(injectionValue);
        // sectionUI.style.marginTop = ((marginStartingValue + 30) + 'px').toString();
    } else if(injectionType === 'Pfizer'){
        pfizerInjection(injectionValue);
    }else if(injectionType === 'Johnson&Johnson'){
        johnsonInjection(injectionValue);
    }
}

const checkForAvailability = () => {
if(astraBar.value === 100){
    alert('The AstraZeneca is now out of stock');
    const selectUI = document.getElementById('title');
    selectUI.childNodes[3].style.display = 'none';
}

if(pfizerBar.value === 100){
    alert('The Pfizer is now out of stock');
    const selectUI = document.getElementById('title');
    selectUI.childNodes[5].style.display = 'none';
}

if(johnsonBar.value === 100){
    alert('The Johnson&Johnson is now out of stock');
    const selectUI = document.getElementById('title');
    selectUI.childNodes[7].style.display = 'none';
}
};

newProcurationButton.addEventListener('click', makeModalAppear);
cancelButtonOnModal.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
addVaccine.addEventListener('click', addVaccinationData);

