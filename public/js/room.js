
//CREATE A NEW SOCKET
var socket = io.connect();
//EMIT CREATE SIGNAL
socket.emit('create', window.location.pathname);

socket.on('clientSentMessage', function(message) {
    console.log(message);
    $('.chatroom-box').append('<span>' + message + '</span>');
});

function sendMessage() {
    socket.emit('message', $('#send_text').val());
}

socket.on('newUser', function(userName) {
    console.log(userName);
    $('.chatroom-box').append('<span>' + "User joined: " + userName + '</span>');
});


/*
function setup() {
	createCanvas(400, 400);
	background(0);
	textSize(20);
	textAlign(CENTER, CENTER);
	messagesReceived = 0;

	//CREATING INPUT BOXES AND SUBMIT BUTTONS (LOBBY)
	createRoomInput = createInput("");
	createRoomInput.position(width/2-createRoomInput.width/2, height/3-createRoomInput.height/2);

	joinRoomInput = createInput("");
	joinRoomInput.position(width/2-joinRoomInput.width/2, height/3*2-joinRoomInput.height/2);

	createRoomButton = createButton("Create!");
	createRoomButton.position(width/2+createRoomInput.width/2+20, height/3-createRoomButton.height/2);
	createRoomButton.mousePressed(createRoom);

	joinRoomButton = createButton("Join!");
	joinRoomButton.position(width/2+joinRoomInput.width/2+20, height/3*2-joinRoomButton.height/2);
	joinRoomButton.mousePressed(joinRoom);
	//CREATING INPUT BOXES AND SUBMIT BUTTONS (LOBBY)

	//CREATING INPUT BOXES AND SUBMIT BUTTONS (ROOM)
	sendMessageInput = createInput("");
	sendMessageInput.position(width/2-sendMessageInput.width/2, height/1.1-sendMessageInput.height/2);
	sendMessageInput.hide();

	sendMessageButton = createButton("Submit!");
	sendMessageButton.position(width/2+sendMessageInput.width/2+20, height/1.1-sendMessageButton.height/2);
	sendMessageButton.mousePressed(sendMessage);
	sendMessageButton.hide();

	leaveButton = createButton("Leave");
	leaveButton.position(width/8, height/1.1-leaveButton.height/2);
	leaveButton.mousePressed(leaveRoom);
	leaveButton.hide();
	//CREATING INPUT BOXES AND SUBMIT BUTTONS (ROOM)


}


//MESSAGES FROM THE SERVER
socket.on('clientSentMessage', function(message) {

	fill(0,0,255);
	text("Other: " + message, width/2, (messagesReceived+1)*30+40);
	messagesReceived++;
})

socket.on('roomnotfound', function() {
	console.log("Room not found...");
})

socket.on('roomalreadyexists', function() {
	console.log("This room already exists...");
})

socket.on('createdroom', function(roomID) {
	console.log("Succesfully joined room: " + roomID);
	hideLobby();
	showRoomUI(roomID);
})

socket.on('joinedroom', function(roomID) {
	console.log("Succesfully joined room: " + roomID);
	hideLobby();
	showRoomUI(roomID);
})
//MESSAGES FROM THE SERVER

//MESSAGES FROM CLIENT TO SERVER
function sendMessage() {
	//SEND CURRENT MESSAGE IN INPUTBOX TO SERVER; DISPLAY IT ON THE SCREEN
	socket.emit('message', sendMessageInput.value());
	fill(255);
	text("Me: " + sendMessageInput.value(), width/2, (messagesReceived+1)*30+40);
	//ADD 1 TO MESSAGES RECEIVED AND EMPTY INPUTBOX
	messagesReceived++;
	sendMessageInput.value("");
}

function createRoom() {
	//CREATE ROOM WITH CURRENT INPUTBOX VALUE
	var roomID = createRoomInput.value();
	createRoomInput.value("");
	socket.emit('createroom', roomID);
}

function joinRoom() {
	//JOIN ROOM WITH CURRENT INPUTBOX VALUE
	var requestedID = joinRoomInput.value();
	joinRoomInput.value("");
	socket.emit('joinroom', requestedID);
}

function leaveRoom() {
	//LEAVE CURRENT ROOM AND GO BACK TO LOBBY
	socket.emit('leaveroom');
	//RESET MESSAGES RECEIVED
	messagesReceived = 0;
	hideRoomUI();
	showLobby();
	background(0);
}
//MESSAGES FROM CLIENT TO SERVER


//UI FUNCTIONS
function hideLobby() {
	createRoomButton.hide();
	joinRoomButton.hide();
	createRoomInput.hide();
	joinRoomInput.hide();
}

function showLobby() {
	createRoomButton.show();
	createRoomInput.show();
	joinRoomButton.show();
	joinRoomInput.show();
}

function showRoomUI(roomID) {
	sendMessageInput.show();
	sendMessageButton.show();
	leaveButton.show();
	textSize(30);
	fill(255);
	roomText = text("Room: " + roomID, width/2, 15);
}

function hideRoomUI() {
	sendMessageInput.hide();
	sendMessageButton.hide();
	leaveButton.hide();
}
//UI FUNCTIONS */

