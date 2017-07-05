var width, height;
var PlateaTimeline = window.PlateaTimeline;
var interactions, currentLength;
var isDraggable, currentSelection;
var divContainer;
var buttons = [];
var nodes = [];
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
    buttons.push(button);
    interactionFactory(interaction);
    lastY += height * .15;
}

function interactionFactory(interaction) {
    var node = createDiv('');
    node.id('node' + interaction.id);
    node.style('width', width * .18 + 'px');
    node.style('height', height * .15 + 'px');
    placeholder(node, interaction);
    description(node, interaction);
    actions(node, interaction);
    node.position(0, lastY);
    nodes.push(node);
    divContainer.child(node);
}

function drawInteractions(fn) {
    interactions = PlateaTimeline.getInteractions();
    var len = interactions.length;
    if (len > buttons.length) {
        buttonFactory(interactions[len - 1]);
    }
}

function actionButton(event) {
    currentSelection = event.srcElement.id;
    isDraggable = true;
}

function mouseDragged() {
    try {
        if (currentSelection !== null) {
            var id = '#' + currentSelection;
            var button = select(id);
            button.position(lastPos);
            modifyP5Element(buttons, currentSelection, lastPos);
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
    id = id.split('remove')[1];
    PlateaTimeline.removeInteraction(id);
    deleteP5Element(buttons, id);
    deleteP5Element(nodes, 'node' + id);

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

function placeholder(node, interaction) {
    var placeDiv = createDiv('');
    placeDiv.id('div' + interaction.id);
    placeDiv.style('background', interaction.color);
    placeDiv.style('width', width * .005 + 'px');
    placeDiv.style('height', height * .15 + 'px');
    node.child(placeDiv);
    placeDiv.position(0, 0);
}

function description(node, interaction) {
    var btn = createButton(interaction.name);
    btn.class('placebutton');
    btn.id('place' + interaction.id);
    btn.style('width', width * 0.15 + 'px');
    btn.style('height', height * .15 + 'px');
    btn.style('background', 'transparent');
    node.child(btn);
    btn.position(width * .005, 0);
}

function actions(node, interaction) {
    var deleteBtn = createButton('delete');
    deleteBtn.class('material-icons');
    deleteBtn.id('remove' + interaction.id);
    deleteBtn.style('width', width * 0.025 + 'px');
    deleteBtn.style('height', height * .15 + 'px');
    node.child(deleteBtn);
    deleteBtn.position(width * .155, 0);
    deleteBtn.mousePressed(deleteInteraction);
}

function deleteP5Element(source, id) {
    var element = selectP5Element(source, id);
    var currentX = element.x;
    element.remove();
    source.splice(source.indexOf(element), 1);
    lastY = 0;
    for (var i = 0; i < source.length; i++) {
        var p5Element = source[i];
        p5Element.position(p5Element.x, lastY);
        lastY += height * .15;
    }
}

function modifyP5Element(source, id, newElement) {
    var element = selectP5Element(source, id);
    var index = source.indexOf(element);
    source[index].x = newElement;
}

function selectP5Element(source, id) {
    return source.filter(x => x.elt.id === id)[0];
}