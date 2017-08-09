$(function () {
    var baseDate = new Date('2000');
    var shifts = ['h1', 'w1', 'w2', 'h2'];
    var header = $('[data-role="header"]');
    var footer = $('[data-role="footer"]');
    var field = $('[data-role="date"]');

    $('body').on('touchmove', function (e) {
        if (!$(e.target).parents('.days').length) {
            e.preventDefault();
        }
    });

    field.val($.datepicker.formatDate(field.data('date-format'), new Date()));

    field.change(function () {
        var curDate = $(this).date('getDate');
        var dayOfMonth = curDate.getDate();
        var daysInMonth = $.datepicker._getDaysInMonth(curDate.getFullYear(), curDate.getMonth());
        var days = Math.round(Math.abs(baseDate - curDate) / 8.64e7);
        var shiftNum = days % 4;
        var str = "" +
            "Days: " + days + " <br>\n" +
            "Shift: " + shifts[shiftNum] + " <br>\n" +
            "curDay: " + dayOfMonth + " <br>\n" +
            "daysInM: " + daysInMonth;

        $('.console').html(str);
        console.log(str);
    });

    footer.click(function () {
        var str = 'tmp';
        $('.console').html(str);
        console.log(str);
    });
});
