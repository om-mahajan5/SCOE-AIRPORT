// $.post("/api/book", { tripId: 122, price: 12528, uid: "doldroyd@aol.com" });
ticketDetails = {};

$(document).ready(function() {
    $.post(
        "/api/get/ticketdetails", { tripId: "110" },
        function(data, textStatus, jqXHR) {
            console.log(data);
            ticketDetails = data;
            setValues();
        },
        "json"
    );
});

function setValues() {
    $("#destination-airport>.value").html(ticketDetails.airport_name);
    $("#destination-airport>.value").html(ticketDetails.destination_airport);
    $("#destination-city>.value").html(ticketDetails.city);
    $("#departure-time>.value").html(
        new Date(ticketDetails.timestamp).toLocaleString()
    );
    $("#airline>.value").html(ticketDetails.airline_name);
    $("#ticket-price>.value").html(ticketDetails.rate);
    calculateDiscount();
    $("#discount>.value").html(ticketDetails.discount);
    $("#total>.value").html(ticketDetails.total);
}

function calculateDiscount() {
    ticketDetails.discount = 0;
    now = new Date();
    timestamp = new Date(ticketDetails.timestamp);
    var Difference_In_Time = now.getTime() - timestamp.getTime();
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    if (Difference_In_Days <= 30) {
        ticketDetails.discount =
            ticketDetails.rate -
            (ticketDetails.rate * (Difference_In_Days * 2)) / 100;
    }
    ticketDetails.total = ticketDetails.rate - ticketDetails.discount;
    console.log(discount);
}

$("#book-btn").click(function(params) {
    $("#book-btn").html(
        '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'
    );
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var user = user;
            ticketDetails.uid = user.email;
            console.log(user.uid);
            bookTicket();
        } else {
            console.log("No user login");
            alert("please Login First");
            $("#book-btn").html("BOOK");
        }
    });
});

function bookTicket() {
    $.post(
        "/api/book", {
            tripId: ticketDetails.tripId,
            price: ticketDetails.total,
            uid: ticketDetails.uid,
        },
        function(data) {
            console.log(data);
        }
    );
}