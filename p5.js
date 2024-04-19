let input;
let todos = []; 
let canvasWidth = 350;
let canvasHeight = 700;
let buttonOffset = 20; 

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    input = createInput();
    input.position(150, 350);
    input.changed(addTodo);

    
    let storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

function draw() {
    background(255); 
    fill(0); 
    textSize(35);
    textAlign(CENTER);
    text('To Do', width / 2, 50);

    
    fill(0); 
    textSize(20);
    textAlign(LEFT);
    for (let i = 0; i < todos.length; i++) {
        let yPos = 100 + i * 30; 
        let todo = todos[i];
        
        
        if (!todo.done) {
            text(todo.text, 50, yPos);
        } else {
           
            stroke(0);
            line(50, yPos + 10, 50 + textWidth(todo.text), yPos + 10);
            noStroke();
        }
        
       
        let doneButtonX = 300;
        let doneButtonY = yPos - 20;
        let buttonWidth = 50;
        let buttonHeight = 20;
        fill(200); 
        rect(doneButtonX, doneButtonY, buttonWidth, buttonHeight);
        fill(0); 
        textSize(15);
        textAlign(CENTER);
        text("Done", doneButtonX + buttonWidth / 2, doneButtonY + buttonHeight / 2 + 5);
        
        
        let deleteButtonX = 200;
        fill(200); 
        rect(deleteButtonX, doneButtonY, buttonWidth, buttonHeight);
        fill(0); 
        textAlign(CENTER);
        text("Delete", deleteButtonX + buttonWidth / 2, doneButtonY + buttonHeight / 2 + 5);
    }
}

function addTodo() {
    let todoText = input.value();
    if (todoText !== '') {
        todos.push({ text: todoText, done: false }); // Add the todo to the array with done status as false
        input.value(''); // Clear the input box after adding the todo
        // Save todos to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function mouseClicked() {
    // Check if the mouse is over any of the buttons
    for (let i = 0; i < todos.length; i++) {
        let yPos = 100 + i * 30;
        let doneButtonX = 300;
        let doneButtonY = yPos - 20;
        let deleteButtonX = 200;
        let buttonWidth = 50;
        let buttonHeight = 20;
        // If the mouse is over the "Done" button and the button is clicked
        if (mouseX > doneButtonX && mouseX < doneButtonX + buttonWidth && mouseY > doneButtonY && mouseY < doneButtonY + buttonHeight) {
            // Mark the corresponding todo item as done
            todos[i].done = true;
            // Save todos to local storage
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        // If the mouse is over the "Delete" button and the button is clicked
        if (mouseX > deleteButtonX && mouseX < deleteButtonX + buttonWidth && mouseY > doneButtonY && mouseY < doneButtonY + buttonHeight) {
            // Delete the corresponding todo item
            todos.splice(i, 1);
            // Save todos to local storage
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
}
