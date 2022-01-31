class dealWithDraggables {
    agents = document.querySelectorAll('.agents');
    workers = [];


    storeAllFriends() {
        console.log(this.agents)

        for(const agent of this.agents) {
            let id = Math.random();
            let name = agent.firstElementChild.innerHTML;
            let qualification = agent.lastElementChild.innerHTML;
            let worker = [id, name, qualification];
            this.workers.push(worker);
        }
        return this.workers;
    }

    
    connectDrag() {
        let inter1; 
        let inter2;
        this.agents.forEach(el => {
            el.addEventListener('dragstart', event => {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', el.innerText);
                console.log(event);
                });

            el.addEventListener('dragend', event => {
                if(event.dataTransfer.dropEffect === "move") {
                    el.draggable = false;
                }
                console.log(event);
            });
        });
    }

}

class DealWithDroppable {
    dropAreasLeader = document.querySelectorAll('.dataDiv');
    dropAreas = document.querySelectorAll('.team-member');
    
    connectDroppable() {
        console.log(this.dropAreasLeader);
        this.dropAreasLeader.forEach(el => {
            el.addEventListener('dragenter', event => {
                if(event.dataTransfer.types[0] === 'text/plain') {
                    el.classList.add('blink');
                    event.preventDefault();
                }
            });
            el.addEventListener('dragover', event => {
                if(event.dataTransfer.types[0] === 'text/plain') {
                    event.preventDefault();
                }
            });
            el.addEventListener('dragleave', event => {
                if(el.classList.contains('blink')) {
                    el.classList.remove('blink');
                }
            });

            el.addEventListener('drop', event => {
                const data = event.dataTransfer.getData('text/plain');
                const dataToDisplay = document.createElement = `${data}`;
                el.append(dataToDisplay);
            });

        });

        this.dropAreas.forEach(el => {
            el.addEventListener('dragenter', event => {
                if(event.dataTransfer.types[0] === 'text/plain') {
                    el.classList.add('blink');
                    event.preventDefault();
                }
            });
            el.addEventListener('dragover', event => {
                if(event.dataTransfer.types[0] === 'text/plain') {
                    event.preventDefault();
                }
            });
            el.addEventListener('dragleave', event => {
                if(el.classList.contains('blink')) {
                    el.classList.remove('blink');
                }
            });

            el.addEventListener('drop', event => {
                const data = event.dataTransfer.getData('text/plain');
                const dataToDisplay = document.createElement = `${data}`;
                el.append(dataToDisplay);
            });

        });

    }
}

const tr = new dealWithDraggables();
tr.connectDrag();
tr.storeAllFriends();
// console.log(tr.storeAllFriends());
// console.log(tr.dropAreas);
// console.log(tr.dropAreasLeader);
const tr2 = new DealWithDroppable();
tr2.connectDroppable();