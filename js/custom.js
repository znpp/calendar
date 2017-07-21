$(function () {
    var dateField = $('#date');
    dateField.val($.datepicker.formatDate(dateField.data('date-format'), new Date()));

    $('div[data-role="footer"]').click(function () {
        // document.body.requestFullscreen();
        // window.scrollTo(0, 100);
        window.scrollTo(0, 0);
        // $('div[data-role="header"] h1').text('exec: 7_' + Math.random());
        $('div[data-role="header"] h1').text(window.scrollY);
    });

    $(window).on("load", function () {
        // Set a timeout...
        setTimeout(function () {
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 100);
    });
});