

// UI Class

class UI {

    static dropdownMenu() {
        const dropMenu = document.getElementById('dropdown');

        if (dropMenu.style.display == 'block'){
            dropMenu.style.display = 'none';
        }else {
            dropMenu.style.display = 'block';
        }
    }

    static selectImportance(e) {
        const importance = document.getElementById('selected-importance');
        let targetedImportance = e.target.innerText;
        importance.innerText = targetedImportance;
    }

}


// Variables

const dropdown = document.getElementById('task-importance');
const dropedMenu = document.getElementById('dropdown');

// Events

dropdown.addEventListener('click', UI.dropdownMenu);
dropedMenu.addEventListener('click', UI.selectImportance);