let listsFromStorage = {};
let objectGet = undefined;
let tasks = {};

const PAGE_SIZE = 100;
let currentPage = 1;

let currentFilter = "all";

const addList = document.getElementById("addList");
addList.addEventListener("click", function() {
    let titleFUT = prompt("اسم المهمة");
    if(titleFUT)
    {
        let modelTask = {
            title: titleFUT,
            date: new Date().toLocaleString(),
            ID: Date.now(),
            isDone: false,
            isStar: false,
        }
        tasks[modelTask.ID] = modelTask;
        listsFromStorage[objectGet].numTasks++;
        storageLists();
        currentPage = 1;
        renderTasksPage();
    }
})

const container = document.getElementById("container");

function showTasks(ID) {
        let contentTask = document.createElement("div");
        contentTask.className = `${valueOfdoneList(tasks[ID])}`;
        contentTask.id = `${tasks[ID].ID}`;
        contentTask.innerHTML =`
                <div>
                    <h3 class="textHeader">${tasks[ID].title}</h3>
                    <div class="date">
                        <span class="material-symbols-outlined no-lih">
                            calendar_month
                        </span>
                        <span>${tasks[ID].date}</span>
                    </div>
                </div>
                <div class="buttons">
                    <button class="${valueOfdoneColor(tasks[ID])}" onclick="changeIsDone(${tasks[ID].ID})">
                        ${valueOfdoneIcon(tasks[ID])}
                    </button>
                    <button class="${valueOfStarColor(tasks[ID])}" onclick="changeIsStar(${tasks[ID].ID})">
                        <span class="material-symbols-outlined">
                            star_rate
                        </span>
                    </button>
                    <button class="editBTN" onclick="editing(${tasks[ID].ID})">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button class="deleteBTN" onclick="deleting(${tasks[ID].ID})">
                        <span class="material-symbols-outlined">
                            delete_forever
                        </span>
                    </button>
                </div>`
        container.appendChild(contentTask);
}

function editing(ID) {
    let massege = `تغيير اسم قائمة: ${tasks[ID].title}`;
    let titleFUT = prompt(massege, tasks[ID].title);
    if(titleFUT)
    {   
        tasks[ID].title = titleFUT;
        storageLists();
        document.getElementById(ID).getElementsByClassName("textHeader")[0].textContent = titleFUT;
    }
}

function deleting(ID) {
    let deletingTitle = tasks[ID].title;
    let massege = `هل انت متأكد من حذف مهمة: ${deletingTitle}؟`

    let youSure = confirm(massege);
    if(youSure)
    {
        listsFromStorage[objectGet].numTasks--;
        if(tasks[ID].isDone) {listsFromStorage[objectGet].ComTask--}
        delete tasks[ID];
        storageLists();
        renderTasksPage();
    }
}

function changeIsStar(ID) {
    let className = document.getElementById(ID).getElementsByClassName(valueOfStarColor(tasks[ID]))[0];
    tasks[ID].isStar = !tasks[ID].isStar;
    storageLists();
    className.className = valueOfStarColor(tasks[ID]);
}

function changeIsDone(ID) {
    let className = document.getElementById(ID).getElementsByClassName(valueOfdoneColor(tasks[ID]))[0];
    tasks[ID].isDone = !tasks[ID].isDone;
    tasks[ID].isDone ? listsFromStorage[objectGet].ComTask++ : listsFromStorage[objectGet].ComTask--;
    storageLists();
    className.className = valueOfdoneColor(tasks[ID]);
    className.innerHTML = valueOfdoneIcon(tasks[ID]);
    document.getElementById(ID).className = valueOfdoneList(tasks[ID]);
}

function valueOfStarColor(task) {
    let doneClassColor = "notStarBTN";
    let notDoneClassColor = "starBTN";
    let doneClassColorSTR;
    if(task.isStar)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}



function valueOfdoneIcon(task) {
    let doneIcon = `<span class="material-symbols-outlined">
                        check
                    </span>`;
    let notDoneIcon = `<span class="material-symbols-outlined">
                            check_box_outline_blank
                        </span>`;
    let doneIconeSTR;
    if(task.isDone)
    {
        doneIconeSTR = doneIcon;
    }
    else
    {
        doneIconeSTR = notDoneIcon;
    }
    return doneIconeSTR;
}

function valueOfdoneColor(task) {
    let doneClassColor = "notCheckBTN";
    let notDoneClassColor = "checkBTN";
    let doneClassColorSTR;
    if(task.isDone)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}

function valueOfdoneList(task) {
    let doneClassColor = "newListDone";
    let notDoneClassColor = "newList";
    let doneClassColorSTR;
    if(task.isDone)
    {
        doneClassColorSTR = doneClassColor;
    }
    else
    {
        doneClassColorSTR = notDoneClassColor;
    }
    return doneClassColorSTR;
}

function storageLists()
{
    let stringLists = JSON.stringify(listsFromStorage);
    localStorage.setItem("listsInStorage", stringLists);
}

function getOrderedTaskIds() {
    return Object.keys(tasks).reverse();
}

function getFilteredTaskIds() {
    const orderedIds = getOrderedTaskIds();

    if (currentFilter === "all") {
        return orderedIds;
    }

    return orderedIds.filter(id => {
        const task = tasks[id];

        if (currentFilter === "done") {
            return task.isDone;
        }

        if (currentFilter === "notDone") {
            return !task.isDone;
        }

        return true;
    });
}

function renderTasksPage() {
    const filteredIds = getFilteredTaskIds();

    const totalPages = Math.max(
        1,
        Math.ceil(filteredIds.length / PAGE_SIZE)
    );

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageIds = filteredIds.slice(start, start + PAGE_SIZE);

    container.innerHTML = "";

    pageIds.forEach(id => showTasks(id));

    renderPagination(totalPages, filteredIds.length);
}

function renderPagination(totalPages, totalCount) {
    const pagination = document.getElementById("pagination");

    if (totalCount <= PAGE_SIZE) {
        pagination.innerHTML = "";
        return;
    }

    pagination.innerHTML = `
        <button id="nextPage" ${currentPage === totalPages ? "disabled" : ""}>
            <span class="material-symbols-outlined">chevron_right</span>
        </button>
        <span id="pageIndicator">صفحة ${currentPage} من ${totalPages}</span>
        <button id="prevPage" ${currentPage === 1 ? "disabled" : ""}>
            <span class="material-symbols-outlined">chevron_left</span>
        </button>
    `;

    document.getElementById("prevPage").onclick = () => {
        currentPage--;
        renderTasksPage();
    };
    document.getElementById("nextPage").onclick = () => {
        currentPage++;
        renderTasksPage();
    };
}

function showInPage()
{
    
    listsFromStorage = JSON.parse(localStorage.getItem("listsInStorage"));
    objectGet = localStorage.getItem("objectSent");
    tasks =  listsFromStorage[objectGet].tasks;
    
    const beforTasks = document.getElementById("beforTasks")
    beforTasks.innerHTML = `<h2>${listsFromStorage[objectGet].title}</h2>`
    
    container.innerHTML = ""
    renderTasksPage();
}

function setFilter(filter) {
    currentFilter = filter;
    currentPage = 1;

    document.querySelectorAll("#taskFilters button").forEach(button => {
        button.classList.remove("active");
    });

    document
        .querySelector(`#taskFilters button[data-filter="${filter}"]`)
        ?.classList.add("active");

    renderTasksPage();
}

window.addEventListener("load", function(){
    showInPage();
})
