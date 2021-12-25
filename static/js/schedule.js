var schedule = "";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

$(document).ready(
    function() {
        document.getElementById('start-date').valueAsDate = new Date()
        document.getElementById('end-date').valueAsDate = new Date().addDays(10)
    }
)


$("#schedule-search").on("click", function() {
    $("table>tbody").html("")
    $("table>tbody").html('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');

    getData($("#start-date").val(), $("#end-date").val());
});
getData();

function getData(startDate, endDate) {
    let url = "/api/get/schedule";
    if (startDate && endDate) {
        url = url + "?startdate=" + startDate + "&enddate=" + endDate;
    }
    $.get(
        url,
        "",
        function(data) {
            schedule = data;
            $.post("/api/get/destinations", schedule[3], function(data2) {
                console.log(data2)
                if ($.isEmptyObject(data2)) {
                    $("table>tbody").html("");
                    console.log("HERE")
                    window.alert("NO FLIGHTS AVAILABLE FOR THE GIVEN PERIOD");
                    return
                }
                schedule["5"] = data2;
                $("table>tbody").html("");
                for (let row = 0; row < Object.keys(schedule["0"]).length; row++) {
                    $("table").append(
                        $("<tr>")
                        .append($("<td>").text(schedule["0"][row]))
                        .append($("<td>").text(schedule["1"][row]))
                        .append($("<td>").text(schedule["2"][row]))
                        .append($("<td>").text(schedule["5"][schedule["3"][row]]["city"]))
                        .append(
                            $("<td>").text(new Date(schedule["4"][row]).toLocaleString())
                        )
                        .append(
                            $("<td>").html(
                                $("<button>")
                                .addClass("btn btn-primary book-btn")
                                .text("BOOK")
                                .attr("trip_id", schedule["0"][row])
                            )
                        )
                    );
                }
                $(".book-btn").click(function(e) {
                    console.log($(this).attr("trip_id"), e);
                });
            });
        },
        "json"
    );
}