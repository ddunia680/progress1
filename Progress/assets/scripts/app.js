class Procurations {
    accessmodal = document.getElementById('add-modal');
    newProcurationButton = document.getElementById('newPorc');
    backdrop = document.getElementById('backdrop');
    cancelButtonOnModal = document.getElementById('cancelBtn');


    toggleBackgroundOpacity(){
        this.backdrop.classList.toggle('visible');
    }

    clearInputsInModal() {
        const proc = new NewProcuration();
        proc.vaccineType.value = 'select';
    for(const el of proc.vaccineDetails) {
        el.value = '';
    }
    }

    makeModalAppear() {
        this.accessmodal.classList.add('visible');
        this.toggleBackgroundOpacity();
    }
    
    closeModal() {
        this.clearInputsInModal();
        this.toggleBackgroundOpacity();
        this.accessmodal.classList.remove('visible');
    }

    callEvents() {
        this.newProcurationButton.addEventListener('click',this.makeModalAppear.bind(this));
        this.backdrop.addEventListener('click', this.closeModal.bind(this));
        this.cancelButtonOnModal.addEventListener('click', this.closeModal.bind(this));
        // this.connectDroppable();
    }
}

class NewProcuration {
    newVacData = document.createElement('li');
    vaccineType = document.querySelector('select');
    vaccineDetails = document.querySelectorAll('input');
    listOfVaccines = document.getElementById('movie-list');
    addButtonOnModal = document.getElementById('button-addVaccine');
    vaccine = [];

    VaccinationData(id, type, coreDetail, age, theId) {
        this.id = theId;
        this.newVacData.className = 'movie-element';
        this.newVacData.draggable = 'true';
        this.newVacData.id = id;
        // this.newVacData.id = 'injection-info';
        this.newVacData.innerHTML = `
            <div class = "movie-element__image">
               <h1>${type}</h1>
            </div>
            <div class = "movie-element-info">
               <h2>${coreDetail}</2>
               <p>${age} years old</p>
            </div>
            `;

        this.listOfVaccines.append(this.newVacData);            
    }

    flashOnFooter() {
        const footer = document.querySelector('footer');
        footer.style.display = 'block';

        setTimeout(() => {
            footer.style.display = 'none';
        }, 3000);
    }

    connectDrag() {
        const elementToDrag = document.getElementById(this.id);
        elementToDrag.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', this.id);
            event.dataTransfer.effectAllowed = 'move';
            console.log(this.id);
        });
        
        elementToDrag.addEventListener('dragstart', event => {
            const dropArea = document.getElementById('dropToDelete')
            const popupMessage = document.createElement('p');
            popupMessage.innerHTML = "drop here to delete the element";
            dropArea.append(popupMessage);

            setInterval(() => {
                popupMessage.classList.toggle('blink');
            }, 500);
        })

        elementToDrag.addEventListener('dragend', event => {
            document.getElementById('dropToDelete').style.display = 'none';
            console.log(event);
        });
    }
    connectDroppable() {
        // const idTouse = id;
        const dropArea = document.getElementById('dropToDelete');

        dropArea.addEventListener('dragenter', event => {
            dropArea.classList.add('droppable');
            // event.preventDefault();

        });

        dropArea.addEventListener('dragleave', event => {
            dropArea.classList.remove('droppable');
        });

        dropArea.addEventListener('drop', event => {
            this.removeVaccine(this.id);
            event.preventDefault();
        });
    
    }


    AddVacData() {
        this.vaccineType.value;
        const coreDetail = this.vaccineDetails[0].value;
        const age = this.vaccineDetails[1].value;

        const vacData = {
            id: Math.random().toString(),
            type: this.vaccineType.value,
            coreDetail: coreDetail,
            age: age,
        };
        const idToUse = vacData.id;
        this.VaccinationData(
            vacData.id,
            vacData.type,
            vacData.coreDetail,
            vacData.age,
            idToUse
            );
        this.flashOnFooter();
        this.vaccine.push(vacData);
        console.log(this.vaccine);
        const prodAv = new ProductsAvailability
        prodAv.injection(this.vaccineType.value);
        const iu = new IUManager();
        // iu.dealWithMargin();
        const procu = new Procurations();
        procu.closeModal();
        procu.clearInputsInModal();
        iu.updateUinterface(this.vaccine);
        prodAv.checkForAvailability();
        const dealWithEvents = new Procurations();
        this.connectDrag();
        this.connectDroppable();

    }

    removeVaccine(vacId) {
        let vacIndex = 0;
        for(const vac of this.vaccine){
            if(this.vaccine.id === vacId){
                break;
            }
            vacIndex++;
        }
        this.vaccine.splice(vacIndex, 1);
        const list = document.getElementById('movie-list');
        list.children[vacIndex].remove();
    }


    callEvents() {
        this.addButtonOnModal.removeEventListener('click', this.AddVacData.bind(this));
        this.addButtonOnModal.replaceWith(this.addButtonOnModal.cloneNode(true));

        let addButtonOnModal = document.getElementById('button-addVaccine');
        addButtonOnModal.addEventListener('click', this.AddVacData.bind(this));
        // const dealWithEvents = new Procurations();
        // dealWithEvents.connectDroppable(this.vacData);

    }
    
}

class IUManager {
    
    // dealWithMargin() {
    //     const sectionUI = document.getElementById('quantity-levels');
    //     let marginStartingValue = -80;
    //     marginStartingValue = marginStartingValue -25;
    //     let toBeAppended = marginStartingValue.toString() + 'px';
    //     sectionUI.style.marginTop = toBeAppended;
    // }

    updateUinterface(vaccine) {
        this.vaccine = vaccine;
        const textEntrySection = document.getElementById('entry-text');
        if(vaccine.length === 0) {
            textEntrySection.style.display = 'block';
        }else{
            textEntrySection.style.display = 'none';
        }
    }
}

class ProductsAvailability {
    astraBar = document.getElementById('astra');
    pfizerBar = document.getElementById('pfiz');
    johnsonBar = document.getElementById('john');
    injectionValue = 30;

    startingBarLevels = 0;
    currentAstraBarLevel = this.startingBarLevels;
    currentPfizerBarLevel = this.startingBarLevels;
    currentJohnsonBarLevel = this.startingBarLevels;
    marginStartingValue = -80;
    
    constructor() {}

    adjustBars(minLife) {
        this.astraBar.min = minLife;
        this.astraBar.value = minLife;
        this.astraBar.max = 100;
        
        this.pfizerBar.min = minLife;
        this.pfizerBar.value = minLife;
        
        this.johnsonBar.min = minLife;
        this.johnsonBar.value = minLife;
    }

    // setBars(){
    //     this.adjustBars(this.startingBarLevels);
    // }


    AstraZenecaInjection(consumedQuantity) {
            const quantity = consumedQuantity;
            this.astraBar.value = +this.astraBar.value + quantity;
            return quantity;
        }
        
    pfizerInjection(consumedQuantity) {
            const quantity = consumedQuantity;
            this.pfizerBar.value = +this.pfizerBar.value + quantity;
            return quantity;
        }
        
    johnsonInjection(consumedQuantity) {
            const quantity = consumedQuantity;
            this.johnsonBar.value = +this.johnsonBar.value + quantity;
            return quantity;
        }
        
        
    injection(injectionType) {
            if(injectionType === 'AstraZeneca') {
                this.AstraZenecaInjection(this.injectionValue);
                // sectionUI.style.marginTop = ((marginStartingValue + 30) + 'px').toString();
            } else if(injectionType === 'Pfizer'){
                this.pfizerInjection(this.injectionValue);
            }else if(injectionType === 'Johnson&Johnson'){
                this.johnsonInjection(this.injectionValue);
            }
        }
        
    checkForAvailability() {
        if(this.astraBar.value === 100){
            alert('The AstraZeneca is now out of stock');
            const selectUI = document.getElementById('title');
            selectUI.childNodes[3].style.display = 'none';
        }
        
        if(this.pfizerBar.value === 100){
            alert('The Pfizer is now out of stock');
            const selectUI = document.getElementById('title');
            selectUI.childNodes[5].style.display = 'none';
        }
        
        if(this.johnsonBar.value === 100){
            alert('The Johnson&Johnson is now out of stock');
            const selectUI = document.getElementById('title');
            selectUI.childNodes[7].style.display = 'none';
        }
    }
    
}

class App {
    static init() {
        const proc = new Procurations();
        proc.callEvents();
        const newProc = new NewProcuration();  
        newProc.callEvents();
        new ProductsAvailability();     
    }
}


App.init();




