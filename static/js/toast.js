let option = {
    animation: true,
    autohide: true,
    delay: 5000,
};

function showToast(title, body) {
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    $(".toast .toast-header strong").html(title);
    $(".toast .toast-body").html(body);
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl, option);
    });
    toastList.forEach((toast) => toast.show());
}