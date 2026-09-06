const container = document.getElementById("container");
let bigObject = {}

function showInPage()
{
    container.innerHTML = "";
    for(let task in bigObject)
    {
        console.log(bigObject[task])
        if(bigObject[task] !== bigObject.title)
        {
            showTasks(bigObject[task]);        
        }
    }
}


function showTasks(task) {
    let contentTask = document.createElement("div");
    contentTask.className = `${valueOfdoneList(task)}`;
    contentTask.innerHTML =`
            <div>
                <h3 class="textHeader">${task.title}</h3>
                <div class="date">
                    <span class="material-symbols-outlined no-lih">
                        calendar_month
                    </span>
                    <span>${task.date}</span>
                </div>
            </div>
            <div class="buttons">
                <button class="${valueOfdoneColor(task)}">
                    ${valueOfdoneIcon(task)}
                </button>
                <button class="${valueOfStarColor(task)}">
                    <span class="material-symbols-outlined">
                        star_rate
                    </span>
                </button>
            </div>
            <div class="goToList" onclick="tasksPage(${task.IDList})">
            <h5>${task.titleList}</h5>
                <span class="material-symbols-outlined no-lih">
                    arrow_back
                </span>
            </div>`
    container.insertBefore(contentTask, container.firstChild);
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

function tasksPage(ID) {
    localStorage.setItem("objectSent", ID)
    location.href = "./secondpage.html";
}

const beforTasks = document.getElementById("beforTasks");

let allLists = {};

function buildSearchResults(query) {
    let obj = {};
    let num = 0;
    const q = query.trim().toLowerCase();

    if (q) {
        for (const listId in allLists) {
            const list = allLists[listId];
            for (const taskId in list.tasks) {
                const task = list.tasks[taskId];
                if (String(task.title).toLowerCase().includes(q)) {
                    num++;
                    obj[task.ID] = {
                        title: task.title,
                        date: task.date,
                        isDone: task.isDone,
                        isStar: task.isStar,
                        titleList: list.title,
                        IDList: list.ID,
                    };
                }
            }
        }
    }

    obj.title = num > 0
        ? `<h2>(<span style="color:#4F8FEF;">${num}</span>) نتائج مطابقة للبحث</h2>`
        : `<div>لا توجد نتائج</div>`;

    return obj;
}

function onSearchInput(e) {
    bigObject = buildSearchResults(e.target.value);
    document.getElementById("searchTitle").innerHTML = bigObject.title;
    showInPage();
}

window.addEventListener("load", function(){
    const mode = localStorage.getItem("thirdPageMode");

    if (mode === "search") {
        allLists = JSON.parse(localStorage.getItem("listsInStorage")) ?? {};
        bigObject = {};

        beforTasks.innerHTML = `
            <div class="new-search">
                <div class="contSSB">
                    <input id="searchOut" type="text" placeholder="بحث عن مهمة..." oninput="onSearchInput(event)">
                    <div id="searchIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </div>
                </div>
                <div id="searchTitle">.أبدا البحث</div>
            </div>
        `;

        document.getElementById("searchOut").focus();
        showInPage();
    }
    else {
        bigObject = JSON.parse(localStorage.getItem("objectForThirdPage"));

        let header = document.getElementById("header");
        switch(bigObject.title) {
            case `<h2>المهام المنجزة</h2>` : header.className += " headerDone"; break;
            case `<h2>المهام المميزة</h2>` : header.className += " headerStar"; break;
            default :
        }

        beforTasks.innerHTML = bigObject.title;
        showInPage();
    }
})