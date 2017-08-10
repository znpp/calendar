$(function () {
    var baseDate = new Date('2000');
    var $field = $('[data-role="date"]');
    var $daysContainer = $('.days');
    var $days = $daysContainer.find('.day');
    var $daysToHide = $days.filter('.hide');

    $('body').on('touchmove', function (e) {
        if (!$(e.target).parents('.days').length) {
            e.preventDefault();
        }
    });

    $field.val($.datepicker.formatDate($field.data('date-format'), new Date()));

    $field.change(function () {
        var curDate = $(this).date('getDate');
        var curDay = curDate.getDate() - 1;
        var daysInMonth = $.datepicker._getDaysInMonth(curDate.getFullYear(), curDate.getMonth());
        var shiftNum = (Math.round(Math.abs(baseDate - curDate) / 8.64e7) - curDay) % 4;
        var $realDays = $days.slice(shiftNum, shiftNum + daysInMonth);
        var $day = $realDays.eq(curDay);

        //clear previous values
        $daysToHide.hide();
        $days.removeClass('selected');

        //set new values
        $realDays.show();
        $day.addClass('selected');
        $daysContainer.animate({
            scrollLeft: $day.offset().left - $daysContainer.offset().left + $daysContainer.scrollLeft()
        }, 1000);

        $('.console').html("" +
            "Shift: " + shiftNum + " <br>\n" +
            "curDay: " + curDay + " <br>\n" +
            "daysInM: " + daysInMonth);
    });

    $field.trigger('change');
});
