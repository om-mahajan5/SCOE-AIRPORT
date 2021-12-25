$.get(
    "/api/schedule",
    "",
    function(data, textStatus, jqXHR) {
        console.log(data);
    },
    "json"
);