$(function () {
    var dateField = $('#date');
    dateField.val($.datepicker.formatDate(dateField.data('date-format'), new Date()));

    window.on("load", function () {
        // Set a timeout...
        setTimeout(function () {
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 100);
    });
});