//Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
	//Dom Load Event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tsks event
	filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) {
		const li = document.createElement('li');

		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {

	if(taskInput.value === '') {
		alert('Add a task');
	} else {

	// Create li element
	const li = document.createElement('li');

	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	//Store inLS
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	}

	e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {      //we set the target as "x"
		
		if(confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();					// we want to delete the Parent of the Parent, meaning "li"
	
			//Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTasks(e) {
	//taskList.innerHTML = '';   //sol 1

	//sol 2, faster
	while(taskList.firstChild) {    //while there is still a first child, meaning the list is not empty
		taskList.removeChild(taskList.firstChild);
	}

	//Clear from LS
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

function filterTasks(e) {
	const text = e.target.value.toLowerCase();    //will give us whatever is typed in (will transform all the letters to lower case)
	console.log(text);

	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';     //it shows
		} else {
			task.style.display = 'none';      //it is hiding
		}
	});

}