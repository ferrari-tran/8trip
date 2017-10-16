
$(document).ready(function() {
	var dateToday = new Date();
	// Datepicker
	if (typeof $.datepicker !== undefined) {
		$('.et-datepicker-only').datepicker({
			dateFormat: 'dd/mm/yy'
		});
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
	};

	// Citypicker
	$('.et-city-picker').click(function() {
		var self = this;
		$('#et-citypicker-dialog').dialog({
			position: {
				my: 'left top',
				at: 'left bottom',
				of: self
			},
			minWidth: 600,
			draggable: false,
			closeOnEscape: true,
			hide: { effect: "fade", duration: 300 },
			show: { effect: "fade", duration: 300 },
			open: function(event, ui) {
				var dialog = event.target;
				var item = $(dialog).find('.et-list-item');
				var itemSelect = $(dialog).find('.et-search-select');

				$(item).click(function() {
					var city = $(this).text(),
							areaCode = $(this).data('area-code') ? $(this).data('area-code' ) : '';
					var textInput = city + ' ' + '(' + areaCode + ')';

					if (textInput) {
						$(self).val(textInput);
						$(dialog).dialog('close');
						self = undefined;
					}
					return false;
				});

				$(itemSelect).on('change', function(e) {
					var value = $(this).val();
					if (value) {
						$(self).val(value);
						setTimeout(function() {
							$(itemSelect).val('').trigger('change');
							self = undefined;
							$(dialog).dialog('close');
						}, 300);
					}
				});
			}
		});
	});

	// Select seach country
	$('.et-search-select').select2({
		placeholder: 'Lựa chọn thành phố',
		width: 'resolve'
	});

	// Button reverse place choosen
	$('.btn-reverse-control').click(function(e) {
		e.preventDefault();
		var target1 = $(e.target).data('target-1'),
				target2 = $(e.target).data('target-2');
		
		var value1 = $('[data-ref="' + target1 + '"]').val(),
				value2 = $('[data-ref="' + target2 + '"]').val();

		if (value1 && value2) {
			value2 = [value1, value1 = value2][0];
			setTimeout(function() {
				$('[data-ref="' + target1 + '"]').val(value1);
				$('[data-ref="' + target2 + '"]').val(value2);
			}, 10);
		}
	});

	// Toggle something by event click
	$('.btn-toggle').click(function(e) {
		e.preventDefault();
		var target = $(this).data('target');
		$('[data-ref="' + target + '"]').slideToggle();

		var label = e.target;
		if ($(label).length > 0) {
			$(label).prev().toggleClass('checked');
		}
	});

	// Toggle choose way
	$('.et-form-result .et-result-item:not(.booked, .fluid)').click(function() {
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

/**
 * [toggleActiveChooseTicket description]
 * @param  {[type]} formCurrentActive [.et-result-item] col1
 * @param  {[type]} formTargetActive  [.et-result-item] col2
 */
function toggleActiveChooseTicket(formCurrentActive, formTargetActive) {
	if ( !$(formCurrentActive).hasClass('booked, fluid') && !$(formTargetActive).hasClass('booked, fluid')) {
		$(formCurrentActive).toggleClass('active');
		$(formTargetActive).toggleClass('active');
	} else {
		throw '1 trong 2 form chứa class booked hoặc fluid'
	}
}

$(document).ready(function() {
	// Format money
	if (typeof accounting !== undefined) {
		var numberElms = $('.et-format-money');
		$(numberElms).each(function(index, numberElm) {
			var money = accounting.formatMoney($(numberElm).text(), {
				symbol: ' ₫',
				format: '%v %s',
				precision: 0,
				decimal: ',',
				thousand: '.'
			});
			if (money) {
				$(numberElm).text(money);
			}
		});
	}
});

// Carousel 
$(document).ready(function() {
	var owl = $('.et-filter-slider > div');
		$(owl).owlCarousel({
			autoWidth: true,
			items: 1,
			margin: 0,
			dots: false,
			nav: true,
			navText: ['<img src="images/ic_arrow_prev.svg" height="20" class="et-arrow et-arrow-prev"/>',
								'<img src="images/ic_arrow_next.svg" height="20" class="et-arrow et-arrow-next"/>'],
			onInitialized: callback
		});

		var owlItem = $(owl).find('.owl-item');
		$(owlItem).click(function() {
			$(owlItem).find('.et-block').removeClass('active');
			var self = this;
			setTimeout(function() {
				$(self).find('.et-block').addClass('active');
				// Other event will be here
			}, 10);
		});

		function callback(event) {
			var currItem 	= $(event.target).find('.owl-item')[event.item.index];
			$(currItem).find('.et-block').addClass('active');
		}
});
