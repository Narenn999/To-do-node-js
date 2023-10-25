const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todoFile = 'todo.txt';

function showTasks() {
  const tasks = fs.readFileSync(todoFile, 'utf8').split('\n').filter(task => task.trim() !== '');
  console.log('\nTasks:\n');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

function addTask(task) {
  fs.appendFileSync(todoFile, `${task}\n`);
  console.log('Task added successfully!');
  showTasks();
  rl.close();
}

function askForTask() {
  rl.question('Enter a new task: ', (task) => {
    addTask(task);
  });
}

function main() {
  if (!fs.existsSync(todoFile)) {
    fs.writeFileSync(todoFile, ''); // Create the file if it doesn't exist
  }

  showTasks();
  askForTask();
}

main();
