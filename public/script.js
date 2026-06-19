async function loadTasks(){

    const res = await fetch("/tasks");
    const tasks = await res.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    document.getElementById("counter").innerText =
    `Total Tasks: ${tasks.length}`;

    tasks.forEach((task,index)=>{

        list.innerHTML += `
        <li class="${task.completed ? "completed" : ""}">
            ${task.name}

            <div class="actions">
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        </li>
        `;
    });
}

async function addTask(){

    const name = document.getElementById("taskInput").value;

    if(!name) return;

    await fetch("/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            completed:false
        })
    });

    document.getElementById("taskInput").value="";

    loadTasks();
}

async function editTask(index){

    const res = await fetch("/tasks");
    const tasks = await res.json();

    const newName = prompt(
        "Edit Task",
        tasks[index].name
    );

    if(!newName) return;

    await fetch(`/tasks/${index}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:newName,
            completed:tasks[index].completed
        })
    });

    loadTasks();
}

async function toggleTask(index){

    const res = await fetch("/tasks");
    const tasks = await res.json();

    await fetch(`/tasks/${index}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:tasks[index].name,
            completed:!tasks[index].completed
        })
    });

    loadTasks();
}

async function deleteTask(index){

    await fetch(`/tasks/${index}`,{
        method:"DELETE"
    });

    loadTasks();
}

loadTasks();