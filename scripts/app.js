$(function() {
	var clickArea = $('#body');
	var counterArea = $('#counter');

	// the amount of squats done
	var touchSquat = 0
	//
	var buttonClicked
	//
	var lastClick
	//
	var hasFinished
	//
	var timerId

	var warningsRemaining = 2

	var barPosition = 0
	var barCounting

	var updateBar = function(value) {
		$('#bar').val(value)

		if (value === 100) {
			checkFinish()
		}
	}

	var checkFinish = function(decrement) {
		console.error('Squat too slow! Chances left:', warningsRemaining)

		if (warningsRemaining === 0) {
			counterArea.addClass('failed')
			counterArea.removeClass('good')
			doFinish()
			// clearInterval(barCounting)
		} else {
			$('#messageBox').text('Chances: ' + warningsRemaining)

			if (decrement) {
				warningsRemaining--
			}
		}
	}

	var doFinish = function() {
		$('#messageBox').text('YOU ARE FINISHED')
		window.clearInterval(barCounting)
		window.clearInterval(timerId);
		hasFinished = true
	}

	// var updateTime = function() {
	// 	console.log('Updating time');
	// 	console.log('3-', moment().format('x') - startTime);
	// 	var duration = moment(moment().format('x') - startTime, 'x').format('mm[m] sS[s]');
	// 	$('#time').text(duration)
	// 	console.log('duration', duration);
	// }

	var startApplication = function() {
		console.log('App started');

		clickArea.click(function() {
			// console.log('Clicked');

			if (hasFinished) {
				return
			}

			counterArea.addClass('good')
			clearInterval(barCounting)
			barPosition = 0
			updateBar(0)

			barCounting = setInterval(function() {
				updateBar(barPosition++)
			}, 30)

			buttonClicked = moment().format('x')

			if (!lastClick) {
				lastClick = moment().format('x')
			}

			if (!timerId) {
				timerId =
					countdown(
						new Date(),
						function(ts) {
							$('#time').text(ts);
						},
						countdown.HOURS|countdown.MINUTES|countdown.SECONDS
					);
			}

			console.log('Time since last squat:', buttonClicked - lastClick)
			console.log('Valid:', (buttonClicked - lastClick) < 3000)

			//
			// CHECK FOR FAILURES!
			//
			if ((buttonClicked - lastClick) < 3000) {
				counterArea.text(touchSquat++)
			} else {
				checkFinish(true)
			}

			lastClick = buttonClicked
		});

	}

	console.log('Script Loaded');

	startApplication()
})
