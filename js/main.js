$(document).ready(function() {
	var dateToday = new Date();
	// Datepicker
	var dates = $('.et-datepicker').datepicker({
		defaultDate: '+1w',
		dateFormat: 'dd/mm/yy',
		minDate: dateToday,
		onSelect: function(selectedDate) {
			var option = $(this).data('date') === 'day-out' ? 'minDate' : 'maxDate',
					instance = $(this).data('datepicker'),
					date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker('option', option, date);
		}
	});

	// Citypicker
	$('.et-city-picker').click(function(e) {
		$('#et-citypicker-dialog').dialog({
			position: {
				my: 'left top',
				at: 'left bottom',
				of: this
			},
			minWidth: 600,
			draggable: false,
			closeOnEscape: true,
			hide: { effect: "fade", duration: 300 },
			show: { effect: "fade", duration: 300 }
		});
	});

	// Toggle form search
	$('.btn-change-search').click(function(e) {
		e.preventDefault();
		var target = $(this).data('target');
		$('[data-ref="' + target + '"]').slideToggle();
	});

	// Format money
	if (accounting) {
		var numberElms = $('.et-format-money');
		$(numberElms).each(function(index, numberElm) {
			var money = accounting.formatMoney($(numberElm).text(), {
				symbol: '₫',
				format: '%v %s',
				precision: 0
			});
			if (money) {
				$(numberElm).text(money);
			}
		});
		
	}
});