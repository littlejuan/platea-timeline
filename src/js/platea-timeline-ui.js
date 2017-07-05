var width, height;
var PlateaTimeline = window.PlateaTimeline;
var interactions, currentLength;
var isDraggable, currentSelection;
var divContainer;
var lastPos = 0;
var lastY = 0;

function setup() {
    setCanvas();
    setContainer();
}

function draw() {
    drawPanels();
    drawInteractions(buttonFactory);
}

function drawPanels() {
    background('#212121');
    noStroke();
    fill('#424242');
    rect(0, 0, width * .18, height);
    rect(width * .18, 0, width * .82, height * .20);
    fill('#616161');
    rect(0, 0, width * .18, height * .20);
    fill(255);
    strokeWeight(0);
    textSize(17);
    textAlign(CENTER);
    text("Timeline", width * .08, height * .12);

}

function buttonFactory(interaction) {
    var button = createButton(interaction.name);
    button.id(interaction.id);
    button.class('interactionButton');
    button.style('background', interaction.color);
    button.style('height', height * .15 + 'px');
    button.style('width', 200 + 'px');
    button.style('color', 'white');
    button.mousePressed(actionButton);
    divContainer.child(button);
    button.position(width * .18, lastY);
    drawInteractions(interactionFactory);
    currentLength++;
    lastY += height * .15;
}

function interactionFactory(interaction) {
    var placeDiv = createDiv('');
    placeDiv.id('div' + interaction.id);
    placeDiv.style('background', interaction.color);
    placeDiv.style('width', width * .005 + 'px');
    placeDiv.style('height', height * .15 + 'px');
    divContainer.child(placeDiv);
    placeDiv.position(0, lastY);

    var btn = createButton(interaction.name);
    btn.class('placebutton');
    btn.id('place' + interaction.id);
    btn.style('width', width * 0.15 + 'px');
    btn.style('height', height * .15 + 'px');
    btn.style('background', 'transparent');
    divContainer.child(btn);
    btn.position(width * .005, lastY);

    var deleteBtn = createButton('delete');
    deleteBtn.class('material-icons');
    deleteBtn.id('remove' + interaction.id);
    deleteBtn.style('width', width * 0.025 + 'px');
    deleteBtn.style('height', height * .15 + 'px');
    divContainer.child(deleteBtn);
    deleteBtn.position(width * .155, lastY);
    deleteBtn.mousePressed(deleteInteraction);

}

function drawInteractions(fn) {
    interactions = PlateaTimeline.getInteractions();
    var length = interactions.length;
    if (length !== 0 && length !== currentLength) {
        fn(interactions[length - 1]);
    }
}

function actionButton(event) {
    currentSelection = event.srcElement.id;
    isDraggable = true;
}

function mouseDragged() {
    try {
        if (currentSelection !== null) {
            var button = select('#' + currentSelection);
            button.position(lastPos);
            if (isDraggable) {
                lastPos = mouseX - 100;
                if (lastPos < width * .18) {
                    lastPos = width * .18;
                } else if (lastPos > width - button.width) {
                    lastPos = width - button.width;
                }
            }
        }

    }
    catch (err) { }

    return false;
}

function deleteInteraction(event) {
    var id = event.srcElement.id;
    PlateaTimeline.removeInteraction(id);
    currentLength--;
    var delBtn = select('#' + id);
    id = id.split('remove')[1];
    var div = select('#div' + id);
    var btn = select('#place' + id);
    var intBtn = select('#' + id);
    lastY -= height * .15;
    btn.remove();
    div.remove();
    delBtn.remove();
    intBtn.remove();
}

function mouseReleased() {
    currentSelection = '';
    isDraggable = false;
}

function setContainer() {
    divContainer = createDiv('');
    divContainer.position(0);
    divContainer.id('container');
    divContainer.class('scroll');
    divContainer.style('bottom', '0');
    divContainer.style('width', width + 'px');
    divContainer.style('height', height * .80 + 'px');
}

function setCanvas() {
    width = windowWidth;
    height = windowHeight;
    currentLength = 0;
    createCanvas(width, height * .35);
    isDraggable = false;
    textFont("Roboto");
}