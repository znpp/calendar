$(function () {
    var baseDate = new Date('2000');
    var shifts = ['h1', 'w1', 'w2', 'h2'];
    var header = $('[data-role="header"]');
    var footer = $('[data-role="footer"]');
    var field = $('[data-role="date"]');

    field.val($.datepicker.formatDate(field.data('date-format'), new Date()));

    field.change(function () {
        var selectedDate = $(this).date('getDate');
        var days = Math.round(Math.abs(baseDate - selectedDate) / 8.64e7);
        var shiftNum = days % 4;
        var str = "Days: " + days + "\nShift: " + shifts[shiftNum];

        header.children().text(str);
        console.log(str);
    });

    footer.click(function () {
        header.children().text('tmp');
    });
});
