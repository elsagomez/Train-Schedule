 var config = {
        apiKey: "AIzaSyBlY5JkOdOeEqsRsLI41I_yOX-sCoOcWCs",
        authDomain: "train-scheduler-baa58.firebaseapp.com",
        databaseURL: "https://train-scheduler-baa58.firebaseio.com",
        storageBucket: "train-scheduler-baa58.appspot.com",
        messagingSenderId: "617150375587"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#submit").click(function(event) {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var time = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            name: trainName,
            dest: destination,
            Ttime: time,
            freq: frequency

        }

        database.ref().push(newTrain);
        console.log(newTrain.name);
        // var row = $("<tr>");
        // var td = $("<td>" + name + "</td>");
        // row.append(td);
        // $("tbody").prepend(row);   
    });
    database.ref().on("child_added", function(childSnapshot) {
                var row = $("<tr>");
                var td = $("<td>" + childSnapshot.val().name + "</td>");
                row.append(td);
                td = $("<td>" + childSnapshot.val().dest + "</td>");
                row.append(td);
                td = $("<td>" + childSnapshot.val().freq + "</td>");
                row.append(td);               
               

                var timetoConvert = childSnapshot.val().Ttime;
                console.log("First Train time: " + timetoConvert);
                var timeConvert = moment(timetoConvert, "HH:mm").subtract(1, "years");
                console.log("time train: " + timeConvert);
                var now = moment();
                console.log("now time: " + now);
                var diff = moment().diff(moment(timeConvert), "minutes");
                console.log("difference in time: " + diff);
                var freqTrain = childSnapshot.val().freq;
                var timeRemainder = diff % freqTrain;
                console.log("timeRemainder: " + timeRemainder);
                // now.diff().moment(date).diff()
          
                var minAway = freqTrain - timeRemainder;
                console.log("minutes away: " + minAway);

                var nextTrain = moment().add(minAway,"minutes").format("HH:mm");

                td = $("<td>" + nextTrain + "</td>");
                row.append(td);
                td = $("<td>" + minAway + "</td>");
                row.append(td);
                 $("tbody").prepend(row);
            });