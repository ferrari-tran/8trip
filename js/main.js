$(document).ready(function() {
	var dateToday = new Date();
	// Datepicker
	if (typeof $.datepicker !== undefined) {
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
	}

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

	// Toggle something by event click
	$('.btn-toggle').click(function(e) {
		e.preventDefault();
		var target = $(this).data('target');
		$('[data-ref="' + target + '"]').slideToggle();
	});

	// Toggle choose way
	$('.et-form-result .et-result-item').click(function() {
		var parent = $(this).closest('.et-form-result');
		var self = this;
		if (!$(self).hasClass('active')) {
			$(parent).find('.et-result-item').removeClass('active');
			setTimeout(function() {
				$(self).addClass('active');
			}, 10);
		}
	});
});

$(document).ready(function() {
	// Format money
	if (typeof accounting !== undefined) {
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