var stompClient = null;
var rIsConnected = false;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#messages").html("");
    $("#ch").html(getUrlVars().ch);
}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function connect() {
    console.log(getUrlVars().name);
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/msgs', function (message) {
            showMessage(JSON.parse(message.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
    
    window.location.href = "http://localhost:29565/mychatwww/unJoinChatRoom/" + getUrlVars().name;
}

function sendName() {

if(rIsConnected==false) {
        console.log(getUrlVars().name);
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        console.log(stompClient);
        
        stompClient.subscribe('/topic/msgs', function (message) {
            showMessage(JSON.parse(message.body).content);
        });
    });
    
    rIsConnected=true;
}


    
    
 setTimeout(
  function() 
  {
    stompClient.send("/app/start", {}, JSON.stringify({'name': getUrlVars().name + ': ' + $("#name").val()}));
  }, 1000);

 
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

