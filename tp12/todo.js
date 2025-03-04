class TodoList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.tasks = [];
    }
  
    connectedCallback() {
      this.render();
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        this.addTask();
      });
    }
  
    addTask() {
      const input = this.shadowRoot.querySelector('input');
      const taskText = input.value.trim();
      if (taskText) {
        this.tasks.push(taskText);
        input.value = '';
        this.updateTaskList();
      }
    }
  
    removeTask(event) {
      const taskIndex = event.target.dataset.index;
      if (taskIndex !== undefined) {
        this.tasks.splice(taskIndex, 1);
        this.updateTaskList();
      }
    }
  
    updateTaskList() {
      const taskList = this.shadowRoot.querySelector('ul');
      taskList.innerHTML = '';
      this.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        li.dataset.index = index;
        li.addEventListener('click', (event) => this.removeTask(event));
        taskList.appendChild(li);
      });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            cursor: pointer;
            padding: 8px;
            border: 1px solid #ccc;
            margin-bottom: 4px;
            border-radius: 4px;
          }
          li:hover {
            background-color: #f0f0f0;
          }
          input, button {
            margin-bottom: 10px;
          }
        </style>
        <input type="text" placeholder="Ajouter une tâche">
        <button>Ajouter</button>
        <ul></ul>
      `;
    }
  }
  
  customElements.define('todo-list', TodoList);