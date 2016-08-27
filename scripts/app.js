// the amount of squats done
var touchSquat = 0
//
var buttonClicked
//
var lastClick
//
var hasFinished
//
var startTime

var warningsRemaining = 2

var barPosition = 0
var barCounting

var updateBar = function(value) {
	$('#bar').val(value)

	if (value === 100) {
		clearInterval(barCounting)
	}
}

var updateTime = function() {
	console.log('Updating time');
	console.log('3-', moment().format('x') - startTime);
	var duration = moment(moment().format('x') - startTime, 'x').format('mm[m] sS[s]');
	$('#time').text(duration)
	console.log('duration', duration);
}

var startApplication = function() {
	console.log('App started');

	var clickArea = $('#body');
	var counterArea = $('#counter');

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
			updateTime()
		}, 30)

		buttonClicked = moment().format('x')

		if (!lastClick) {
			lastClick = moment().format('x')
		}

		if (!startTime) {
			startTime = moment().format('x')
			console.log('Setting start time:', startTime);
		}

		console.log('Time since last squat:', buttonClicked - lastClick)
		console.log('Valid:', (buttonClicked - lastClick) < 3000)

		//
		// CHECK FOR FAILURES!
		//
		if ((buttonClicked - lastClick) < 3000) {
			counterArea.text(touchSquat++)
		} else {
			if (warningsRemaining === 0) {
				counterArea.addClass('failed')
				counterArea.removeClass('good')
				hasFinished = true
				clearInterval(barCounting)
			} else {
				$('#messageBox').text('Chances left:' + warningsRemaining)
				warningsRemaining--
			}
		}

		lastClick = buttonClicked
	});

}

console.log('Script Loaded');

$(function() {
	startApplication()
})
