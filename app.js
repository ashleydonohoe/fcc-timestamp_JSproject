var express = require("express");
var app = express();
var moment = require("moment");

// Root directory
app.get("/", function(req, res) {
    res.send("Enter a date string or Unix timestamp in the URL.");
});

// Date check path
app.get("/:date", function(req, res) {
    var date = moment(req.params.date);
    var validCheck = date.isValid();
    
    var dateObject = {};
    
    // If date is valid, send both natural language and Unix timestamp versions
    if(validCheck) {
        dateObject.unix = moment(date).format("X");
        dateObject.natural = moment(date).format("MMMM Do, YYYY");
    } else {
       dateObject.unix = null;
       dateObject.natural = null;
    }
    
    res.send(dateObject);
});

// Catch-all error message
app.get("*", function(req, res) {
   res.send("Sorry, page not found."); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started");
});
