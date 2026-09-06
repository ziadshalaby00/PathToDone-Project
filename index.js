const sideBar = document.getElementById("sideBar");
const closeSideB = document.getElementById("closeSideB");
const sideBarContainer = document.getElementById("sideBarContainer");
sideBar.onclick = () => {
    sideBarContainer.style.transform = "translateX(0)";
}

closeSideB.onclick = () => {
    sideBarContainer.style.transform = "translateX(-105%)";
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
let lists = {};
let objTasksForThirdPage = {}
const container = document.getElementById("container");

const addList = document.getElementById("addList");
addList.addEventListener("click", function() {
    let titleFUL = prompt("اسم القائمة");
    if(titleFUL)
    {   
        let modelList = {
            title: titleFUL,
            date: new Date().toLocaleString(),
            ID: Date.now(),
            numTasks: 0,
            ComTask: 0,
            tasks: {},
        }
        lists[modelList.ID] = modelList;
        storageLists();
        showList(modelList.ID);
    }
})

function showList(ID) {
    let contentList = document.createElement("div");
    contentList.className = "newList";
    contentList.id = `${lists[ID].ID}`;
    contentList.innerHTML =`
            <div class="pathToTasks" onclick="tasksPage(${lists[ID].ID})">
                <div class="innerInfo">
                    <h3><span class="numCOM">${lists[ID].ComTask}</span>/${lists[ID].numTasks}</h3>
                    <h3 class="textHeader">${lists[ID].title}</h3>
                </div>
                <div class="date">
                    <span class="material-symbols-outlined no-lih">
                        calendar_month
                    </span>
                    <span>${lists[ID].date}</span>
                </div>
            </div>
            <div class="buttons">
                <button class="editButtons" onclick="editing(${lists[ID].ID})">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="deleteButtons" onclick="deleting(${lists[ID].ID})">
                    <span class="material-symbols-outlined">
                        delete_forever
                    </span>
                </button>
            </div>`
    container.insertBefore(contentList, container.firstChild);
}

function editing(ID) {
    let massege = `تغيير اسم قائمة: ${lists[ID].title}`;
    let titleFUL = prompt(massege, lists[ID].title);
    if(titleFUL)
    {   
        lists[ID].title = titleFUL;
        storageLists();
        document.getElementById(ID).getElementsByClassName("textHeader")[0].textContent = titleFUL;
    }
}

function deleting(ID) {
    let deletingTitle = lists[ID].title;
    let massege = ` سوف يتم مسح القائمة بالكامل وما فيها من مهام. هل انت متأكد من حذف قائمة: ${deletingTitle}؟`
    let youSure = confirm(massege);
    if(youSure)
    {
        delete lists[ID];
        storageLists();
        document.getElementById(ID).remove();
    }
}

function tasksPage(ID) {
    localStorage.setItem("objectSent", ID)
    location.href = "./secondpage.html";
}

function storageLists()
{
    let stringLists = JSON.stringify(lists);
    localStorage.setItem("listsInStorage", stringLists);
}

function showInPage()
{
    let getLists = JSON.parse(localStorage.getItem("listsInStorage"))
    lists = getLists ?? {}
    container.innerHTML = ""
    for(let list in lists)
    {
        showList(lists[list].ID);
    }
}

let massageAtTheStart = `مرحبًا،

نود أن نعرّفكم على موقعنا المخصص لإدارة المهام. يتيح لك هذا الموقع إنشاء قوائم متنوعة وإضافة مهام داخل هذه القوائم، بالإضافة إلى إمكانية تسجيل المهام كمنجزة وتمييزها. يمكنك أيضًا تعديل أو حذف أي مهمة أو قائمة حسب الحاجة.

كما يوفر الموقع إمكانية الوصول إلى جميع المهام المميزة أو المنجزة، فضلاً عن إمكانية البحث عن أي مهمة من خلال الشريط الجانبي.

نتمنى أن تجدوا الموقع مفيدًا في تنظيم مهامكم!`;

function restartMassege() {
    localStorage.removeItem("close");
    showMassege();
}

function showMassege()
{
    if(!localStorage.getItem("close"))
    {
        let agree = confirm(massageAtTheStart);
        agree ? localStorage.setItem("close", true) : localStorage.removeItem("close");
    }
}

window.addEventListener("load", function(){
    showMassege();
    showInPage();
})

searchInput.addEventListener("keypress", function(event){
    if(event.key === "Enter")
    {
        selectorAllSearch();
    }
})

function buildFilteredTasks(filterKey) {
    let obj = {};
    for (const listId in lists) {
        const list = lists[listId];
        for (const taskId in list.tasks) {
            const task = list.tasks[taskId];
            if (task[filterKey]) {
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
    return obj;
}

function doneTasks() {
    localStorage.setItem("thirdPageMode", "display");
    let obj = buildFilteredTasks("isDone");
    obj.title = `<h2>المهام المنجزة</h2>`;
    localStorage.setItem("objectForThirdPage", JSON.stringify(obj));
    location.href = "./thirdpage.html";
}

function starTasks() {
    localStorage.setItem("thirdPageMode", "display");
    let obj = buildFilteredTasks("isStar");
    obj.title = `<h2>المهام المميزة</h2>`;
    localStorage.setItem("objectForThirdPage", JSON.stringify(obj));
    location.href = "./thirdpage.html";
}

function goToSearchPage() {
    localStorage.setItem("thirdPageMode", "search");
    location.href = "./thirdpage.html";
}