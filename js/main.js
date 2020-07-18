$(function () {
    var todayDate = new Date();
    var baseDate = new Date(2000, 0);
    var $field = $('[data-role="date"]');
    var $copyright = $('[data-role="footer"] .copyright');
    var data = [
        {
            $daysContainer: $('.type1 > .days')
        },
        {
            $daysContainer: $('.type2 > .days')
        }
    ];

    data.forEach(function (item) {
        item.$dayHeaders = item.$daysContainer.find('.headers .cell');
        item.$days = item.$daysContainer.find('.day');
        item.$cellsToHide = item.$daysContainer.find('.hide');
    });

    $('body').on('touchmove', function (e) {
        if (!$(e.target).parents('.days').length) {
            e.preventDefault();
        }
    });

    $field.change(function () {
        var curDate = $(this).date('getDate');
        var dateOfFirst = new Date(curDate.getFullYear(), curDate.getMonth());
        var dtw = (7 - dateOfFirst.getDay()) % 7; //days till weekend
        var daysInMonth = $.datepicker._getDaysInMonth(curDate.getFullYear(), curDate.getMonth());

        mainFunc(0, curDate, dateOfFirst, dtw, daysInMonth);
        mainFunc(1, curDate, dateOfFirst, dtw, daysInMonth);
    });

    $field.val($.datepicker.formatDate($field.data('date-format'), todayDate));
    $field.trigger('change');
    $copyright.text($copyright.text() + todayDate.getFullYear());

    function mainFunc(index, curDate, dateOfFirst, dtw, daysInMonth) {
        var item = data[index];
        var divider = index ? 4 : 15;
        var shiftNum = (Math.round((dateOfFirst - baseDate) / 8.64e7) % divider + divider) % divider; //'+divider' for years < baseDate offset
        var $realDays = item.$days.slice(shiftNum, shiftNum + daysInMonth);
        var $day = $realDays.eq(curDate.getDate() - 1);

        //clear previous values
        item.$cellsToHide.hide();
        item.$days.removeClass('selected');
        item.$dayHeaders.removeClass('weekend');

        //set new values
        item.$dayHeaders.slice(0, daysInMonth).show();
        item.$dayHeaders.filter(':nth-child(7n+' + dtw + '), :nth-child(7n+' + (dtw + 1) + ')').addClass('weekend');
        $realDays.show();
        $day.addClass('selected');
        item.$daysContainer.animate({
            scrollLeft: $day.offset().left - item.$daysContainer.offset().left + item.$daysContainer.scrollLeft()
        }, 1000);
    }
});
