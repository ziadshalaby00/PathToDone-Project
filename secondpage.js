let listsFromStorage = {};
let objectGet = undefined;
let tasks = {};

let objForDoneTasks = {
    title: `<h2>المهام المنجزة</h2>`
}

let objForStarTasks = {
    title: `<h2>المهام المميزة</h2>`
};

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
        showTasks(modelTask.ID);
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
        container.insertBefore(contentTask, container.firstChild);
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
        if(tasks[ID].isDone) {delete objForDoneTasks[ID]}
        if(tasks[ID].isStar) {delete objForStarTasks[ID]}
        saver();
        delete tasks[ID];
        storageLists();
        document.getElementById(ID).remove();
    }
}

function changeIsStar(ID) {
    let className = document.getElementById(ID).getElementsByClassName(valueOfStarColor(tasks[ID]))[0];
    tasks[ID].isStar = !tasks[ID].isStar;
    storageLists();
    className.className = valueOfStarColor(tasks[ID]);

    if(tasks[ID].isStar)
    {
        let model = {
            title: tasks[ID].title,
            date: tasks[ID].date,
            isDone: tasks[ID].isDone,
            isStar: tasks[ID].isStar,
            titleList: listsFromStorage[objectGet].title,
            IDList: listsFromStorage[objectGet].ID,
        }
        objForStarTasks[ID] = model;
        if(objForDoneTasks[ID]) {objForDoneTasks[ID].isStar = tasks[ID].isStar;}
        saver()
    }
    else
    {
        delete objForStarTasks[ID];
        if(objForDoneTasks[ID]) {objForDoneTasks[ID].isStar = tasks[ID].isStar;}
        saver()
    }
}

function changeIsDone(ID) {
    let className = document.getElementById(ID).getElementsByClassName(valueOfdoneColor(tasks[ID]))[0];
    tasks[ID].isDone = !tasks[ID].isDone;
    tasks[ID].isDone ? listsFromStorage[objectGet].ComTask++ : listsFromStorage[objectGet].ComTask--;
    storageLists();
    className.className = valueOfdoneColor(tasks[ID]);
    className.innerHTML = valueOfdoneIcon(tasks[ID]);
    document.getElementById(ID).className = valueOfdoneList(tasks[ID]);

    if(tasks[ID].isDone)
    {
        let model = {
            title: tasks[ID].title,
            date: tasks[ID].date,
            isDone: tasks[ID].isDone,
            isStar: tasks[ID].isStar,
            titleList: listsFromStorage[objectGet].title,
            IDList: listsFromStorage[objectGet].ID,
        }
        objForDoneTasks[ID] = model;
        if(objForStarTasks[ID]) {objForStarTasks[ID].isDone = tasks[ID].isDone;}
        saver()
    }
    else
    {
        delete objForDoneTasks[ID];
        if(objForStarTasks[ID]) {objForStarTasks[ID].isDone = tasks[ID].isDone;}
        saver()
    }
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

function showInPage()
{
    
    listsFromStorage = JSON.parse(localStorage.getItem("listsInStorage"));
    objectGet = localStorage.getItem("objectSent");
    tasks =  listsFromStorage[objectGet].tasks;
    
    const beforTasks = document.getElementById("beforTasks")
    beforTasks.innerHTML = `<h2>${listsFromStorage[objectGet].title}</h2>`
    
    container.innerHTML = ""
    for(let task in tasks)
    {
        showTasks(tasks[task].ID);
    }

    if(JSON.parse(localStorage.getItem("objForStarTasks")))
    {
        objForStarTasks = JSON.parse(localStorage.getItem("objForStarTasks"));
    }
    if(JSON.parse(localStorage.getItem("objForDoneTasks")))
    {
        objForDoneTasks = JSON.parse(localStorage.getItem("objForDoneTasks"));
    }
}

function saver() {
    localStorage.setItem("objForStarTasks", JSON.stringify(objForStarTasks));
    localStorage.setItem("objForDoneTasks", JSON.stringify(objForDoneTasks));
}

window.addEventListener("load", function(){
    showInPage();
})
