var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3333;

//app.get("/", function(req, res) {
//  res.sendFile(__dirname + "/index.html");
//});

io.on("connection", function(socket) {
  console.log("client connected");
  socket.on("chat message", function(msg) {
    console.log("message reccived:", msg);
    io.emit("yo", msg);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(port, function() {
  console.log("listening on :" + port);
});
