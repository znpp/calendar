$(function () {
    var baseDate = new Date('2000');
    var $field = $('[data-role="date"]');
    var $daysContainer = $('.days');
    var $days = $daysContainer.find('.day');

    $('body').on('touchmove', function (e) {
        if (!$(e.target).parents('.days').length) {
            e.preventDefault();
        }
    });

    $field.val($.datepicker.formatDate($field.data('date-format'), new Date()));

    $field.change(function () {
        var curDate = $(this).date('getDate');
        var dayOfMonth = curDate.getDate() - 1;
        var daysInMonth = $.datepicker._getDaysInMonth(curDate.getFullYear(), curDate.getMonth());
        var days = Math.round(Math.abs(baseDate - curDate) / 8.64e7) - dayOfMonth;
        var shiftNum = days % 4;
        var $day = $days.slice(shiftNum).eq(dayOfMonth);

        //clear previous values
        $days.show();
        $days.removeClass('selected');

        //set new values
        $days.not($days.slice(shiftNum, shiftNum + daysInMonth)).hide();
        $day.addClass('selected');
        $daysContainer.animate({
            scrollLeft: $day.offset().left - $daysContainer.offset().left + $daysContainer.scrollLeft()
        }, 1000);

        $('.console').html("" +
            "Days: " + days + " <br>\n" +
            "Shift: " + shiftNum + " <br>\n" +
            "curDay: " + dayOfMonth + " <br>\n" +
            "daysInM: " + daysInMonth);
    });

    $field.trigger('change');
});
