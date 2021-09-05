//Express
const express = require('express');
const port = 3000;
const app = express();
const server = app.listen(port, "0.0.0.0");
app.use(express.static('public'));

//Bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Socket.io
const socket = require('socket.io');
const io = socket(server);

var rooms = [];

app.get('/', function(req, response) {
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/jq_get_rooms', function(req, response) {
    if (!req.xhr) {
        return response.redirect('/');
    }
    if (!req.query.room) {
        return response.send(rooms);
    }
    let matchingRooms = [];
    for (let room of rooms) {
        if (room.name.toLowerCase().indexOf(req.query.room) >= 0) {
            matchingRooms.push(room);
        }
    }
    console.log(rooms);
    return response.send(matchingRooms);
});

app.get('/room/:roomname', function(req, response) {
    console.log(req.params.roomname);
    if (rooms.some(e => e.name === req.params.roomname)) {
        return response.sendFile(__dirname + '/public/room.html');
    }
    return response.redirect('/');
});

app.post('/jq_post_room', function(req, response) {
    rooms.push({"name":req.body.name});
    return response.send("Room created!");
})

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection:" + socket.id);
    let srvSockets = io.sockets.sockets;
    console.log("Current number of clients: " + Object.keys(srvSockets).length);

    socket.on('create', function(room_url) {
        //WHEN SOCKET IS CREATED USERS JOIN LOBBY
        let room = room_url.split('/').pop();
        console.log(room);
        socket.room = room;
        socket.join(room);
        socket.to(room).emit('newUser', "Test");
    })

    socket.on('message', function(clientMessage) {
        //SEND MESSAGE TO OTHER CLIENTS IN ROOM (NOT THE SENDER)
        socket.to(socket.room).emit('clientSentMessage', clientMessage);
        console.log(clientMessage);
    })
}
/*
function newConnection(socket) {
	console.log("New connection:" + socket.id);
    var srvSockets = io.sockets.sockets;
    console.log("Current number of clients: " + Object.keys(srvSockets).length);
    //EMISSIONS WHICH SOCKET IS ABLE TO SEND FROM CLIENT TO SERVER SIDE
	socket.on('create', function() {
        //WHEN SOCKET IS CREATED USERS JOIN LOBBY
		socket.room = lobby;
		socket.join(lobby);
	})

    //MESSAGES WHICH SERVER CAN RECEIVE

	socket.on('disconnect', function() {
        //IF ROOM IS EMPTY AFTER USERS LEAVES: DELETE IT FROM CURRENT AVAILABE ROOMS
        if (io.sockets.adapter.rooms[socket.room]) {
            //console.log(socket.room + " exists");
        } else {
            rooms.splice(socket.room, 1);
        }
        console.log("Client has disconnected");
        //
        var srvSockets = io.sockets.sockets;
        console.log("Current number of clients: " + Object.keys(srvSockets).length);
    
    });
    socket.on('changeroom', function(newRoom) {
        //LEAVE CURRENT ROOM AND JOIN NEW ROOM
    	socket.leave(socket.room);
    	socket.room = newRoom;
    	socket.join(newRoom);
    })
    socket.on('message', function(clientMessage) {	
        //SEND MESSAGE TO OTHER CLIENTS IN ROOM (NOT THE SENDER)
    	socket.to(socket.room).emit('clientSentMessage', clientMessage);
    	//io.in(socket.room).emit('clientSentMessage', clientMessage); --> EVERYONE IN ROOM INCLUDING SENDER
    
        //socket.broadcast.emit('clientSentMessage', clientMessage); --> SEND TO EVERYONE EXCEPT SENDER
        //io.sockets.emit('clientMessage', clientMessage); --> SEND TO EVERYONE

    })

    socket.on('createroom', function(roomID) {
        //IF ROOM ALREADY EXISTS, RETURN ERROR; OTHERWISE LEAVE LOBBY AND JOIN ROOM; --> SEND MESSAGE TO CLIENT THAT HE JOINED THE ROOM
        if (rooms.includes(roomID)) {
            socket.emit('roomalreadyexists');
        } else {
            rooms.push(roomID);
            //console.log(roomID)
            socket.leave(socket.room);
            socket.room = roomID;
            socket.join(roomID);
            console.log(rooms);
            socket.emit('createdroom', roomID);
        }
      
    })

    socket.on('joinroom', function(roomID) {
        //IF THE ROOM EXISTS, LEAVE THE LOBBY AND JOIN THE ROOM; --> SEND MESSAGE TO CLIENT THAT HE JOINED THE ROOM
        if (rooms.includes(roomID)) {
            socket.leave(socket.room);
            socket.room = roomID;
            socket.join(roomID);
            console.log(io.sockets.adapter.rooms[socket.room].length);
            socket.emit('joinedroom', roomID);
        } else {
            //IF ROOM DOES NOT EXIST, RETURN ERROR
            socket.emit('roomnotfound');
        }
    })

    socket.on('leaveroom', function() {
        //IF AT LEAST 1 MORE USER IS IN THE ROOM, LET THE ROOM CONTINUE TO EXIST; OTHERWISE DELETE THE ROOM (BECAUSE IT IS EMPTY AFTER CLIENT LEAVES)
        if (io.sockets.adapter.rooms[socket.room].length > 1) {
            console.log(socket.room + " continues to exist");
        } else {
            rooms.splice(socket.room, 1);
        }
        //LEAVE CURRENT ROOM AND JOIN THE LOBBY AGAIN
        socket.leave(socket.room);
        socket.room = lobby;
        socket.join(lobby);
    })
}*/
/*
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Kahoot = require("kahoot.js-updated");
const client = new Kahoot();
console.log("Joining kahoot...");
client.join(6040950 , "kahoot.js");
client.on("Joined", () => {
  console.log("I joined the Kahoot!");
});
client.on("QuizStart", () => {
  console.log("The quiz has started!");
});
client.on("QuestionStart", question => {
  console.log("A new question has started, answering the first answer.");
  question.answer(0);
});
client.on("QuizEnd", () => {
  console.log("The quiz has ended.");
});*/


