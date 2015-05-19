/**
 * Currency (http://www.reality-xp.com) A jQuery plugin for converting
 * currencies
 * 
 * Version 1.0 August 27th, 2008
 * 
 * Copyright (c) 2008 Reality XP Dual licensed under the MIT and GPL licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-license.php
 * 
 */

// on page load call convert
$(document).ready(function() {
			$('.currency').each(function(i, domEle) {
						$(domEle).convertCurrency(false);
						return true;
					})
		});

;
(function() {

	var $$;

	$$ = jQuery.fn.convertCurrency = function(currencycode) {
		var $this = $(this)
		if ($this.attr('rel')) {
			var prms = $this.attr('rel').split(':'); /* "USD:EUR:€" */
			var fAmnt = parseFloat($this.text());
			var cCode = currencycode ? ' ' + prms[1] : '';
			// check if the exchange rate has been retrieved today
			var cookieVal = $.cookie('currencyrate' + prms[0] + prms[1]);
			if (cookieVal != null) {
				frmtCurrency($this, prms[2], fAmnt * parseFloat(cookieVal),
						cCode, prms[1]);
			} else {
				try {
					reqAjax = $.ajax({
								type : "POST",
								url : '/currency-ajax.php',
								dataType : "json",
								data : "action=rate" + "&currfrom=" + prms[0]
										+ "&currto=" + prms[1],
								success : function(json) {
									switch (json.errcode) {
										case 'ERR-100' :
											$.cookie('currencyrate' + prms[0]
															+ prms[1],
													json.result, {
														expires : 6,
														path : '/'
													});
											frmtCurrency(
													$this,
													prms[2],
													fAmnt
															* parseFloat(json.result),
													cCode, prms[1]);
											break;
										case 'ERR-200' :
											break;
										default :
											break
									}
								},
								error : function(xhr, msg, ex) {
									reqAjax = null
								}
							})
				} catch (e) {
				}
			}
		}
		return this;

		function frmtCurrency(ele, symb, val, code, cls) {
			// round the currency to the nearest .05
			val *= 2.0;
			val = val.toFixed(1) / 2.0;
			val = val.toFixed(2);
			// build the text in the form: '$' '12.35' 'USD'
			ele.text(symb + val + code);
			// add the currency code to the element class.
			ele.addClass(cls);
		};

	};

})();