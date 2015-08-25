$('#preferences').click(function() {

	console.log("message");

	$('#savePreferences').off('click');
	$('#cancelPreferences').off('click');
	$('#preferencesModal').modal('show');

	$('#widthInput').val($("body").width() + 20);
	$('#heightInput').val($("body").height() + 20);
	$('#widthInput').tooltip({
		'trigger': 'focus',
		'title': 'Minimum 300 maximum 800'
	});
	$('#heightInput').tooltip({
		'trigger': 'focus',
		'title': 'Minimum 480 maximum 600'
	});

	if (!preferences.askbeforremove) {
		document.getElementById("askBeforeRemoveSel").selectedIndex = 1;
	} else {
		document.getElementById("askBeforeRemoveSel").selectedIndex = 0;
	}

	$('#widthInput').keyup(function(e) {
		if (e.keyCode == 13) {
			$('#savePreferences').trigger("click");
		}
	});

	$('#heightInput').keyup(function(e) {
		if (e.keyCode == 13) {
			$('#savePreferences').trigger("click");
		}
	});

	$('#savePreferences').click(function() {
		var width = parseInt($('#widthInput').val());
		if (Number.isInteger(width) && width >= 300 && width <= 800) {
			preferences.width = width;
		} else {
			$('#widthInput').val(options.width);
		}

		var height = parseInt($('#heightInput').val());
		if (Number.isInteger(height) && height >= 480 && height <= 600) {
			preferences.height = height;
		} else {
			$('#heightInput').val(options.height);
		}

		if ($('#askBeforeRemoveSel').find("option:selected").text() === "Yes") {
			preferences.askbeforremove = true;
		} else if ($('#askBeforeRemoveSel').find("option:selected").text() === "No") {
			preferences.askbeforremove = false;
		}

		savePreferences();
		setPreferences();
		$('#preferencesModal').modal('hide');
	});

	$('#cancelPreferences').click(function() {
		$('#preferencesModal').modal('hide');
	});
});

function setPreferences() {
	if (preferences.width === undefined || preferences.width === 0) {
		preferences.width = 300;
	}
	if (preferences.height === undefined || preferences.height === 0) {
		preferences.height = 500;
	}
	if (preferences.askbeforremove === undefined) {
		preferences.askbeforremove = true;
	}
	$("body").height(preferences.height - 20);
	$("body").width(preferences.width - 20);
}

function savePreferences() {
	chrome.storage.sync.set({
		'preferences': preferences
	}, function() {
		console.log("Preferences are saved.");
	});
}

function loadPreferences() {
	chrome.storage.sync.get('preferences', function(result) {
		if (result.preferences === undefined) {
			savePreferences();
		} else {
			preferences = result.preferences;
		}
		setPreferences();
	});
}

loadPreferences();