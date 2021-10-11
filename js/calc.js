// Keyboard size collapse
var keyboard_size = document.getElementById("keyboard-size");

keyboard_size.onchange = function() {
	var other_fields = document.getElementById("keyboard-other");

	var show_other_fields = new bootstrap.Collapse(other_fields, {
		toggle: false
	});

	if (keyboard_size.value == -1) {
		show_other_fields.show();
	} else {
		show_other_fields.hide();
	}
};

// RGB underglow collapse
var underglow = document.getElementById("rgb-underglow");

underglow.onclick = function() {
	var num_rgbs = document.getElementById("underglow");

	var show_num_rgbs = new bootstrap.Collapse(num_rgbs, {
		toggle: false
	});

	if (underglow.checked == true) {
		show_num_rgbs.show();
	} else {
		show_num_rgbs.hide();
	}
};

// Backlighting/per-key RGB enable/disable
var backlighting = document.getElementById("backlighting");
var perkeyRGB = document.getElementById("perkeyRGB");

var backlighting_label = document.getElementById("backlighting-label");
var perkeyRGB_label = document.getElementById("perkeyRGB-label");

backlighting.onclick = function() {
	perkeyRGB.disabled = backlighting.checked;
	if (backlighting.checked == true) {
		perkeyRGB_label.classList.add("text-decoration-line-through");
	} else {
		perkeyRGB_label.classList.remove("text-decoration-line-through");
	}
};

perkeyRGB.onclick = function() {
	backlighting.disabled = perkeyRGB.checked;
	if (perkeyRGB.checked == true) {
		backlighting_label.classList.add("text-decoration-line-through");
	} else {
		backlighting_label.classList.remove("text-decoration-line-through");
	}
};

// Rotary encoder collapse
var encoder = document.getElementById("rotary-encoder");

encoder.onclick = function() {
	var encoder_card = document.getElementById("encoder");
	var show_encoder_card = new bootstrap.Collapse(encoder_card, {
		toggle: false
	});

	if (encoder.checked == true) {
		show_encoder_card.show();
	} else {
		show_encoder_card.hide();
	}
}

// Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Actual calculation
var form = document.getElementById("calculator");

var calculate = function() {
	// PCB type
	var base = Number(document.querySelector("input[name=pcb-type]:checked").value);

	// Number of keys
	var num_keys = 0;
	if (document.getElementById("keyboard-size").value > 0) {
		num_keys = document.getElementById("keyboard-size").value;
	} else {
		num_keys = document.getElementById("keyboard-num-keys").value;
	};

	// Switch type
	var switch_type_multiplier = document.querySelector("input[name=switch-type]:checked").value;

	// Switch lighting
	var lighting_multiplier = 0;
	try {
		lighting_multiplier = document.querySelector("input[name=key-lighting]:checked").value;
	} catch(e) {
	}

	var total_multiplier = Number(switch_type_multiplier) + Number(lighting_multiplier);

	// RGB
	var rgb_total = 0;
	if (document.getElementById("rgb-underglow").checked == true) {
		rgb_total = 25 + 6 * Number(document.getElementById("rgb-led-count").value);
	}

	// Rotary encoder
	var encoder_total = 0;
	if (document.getElementById("rotary-encoder").checked == true) {
		encoder_total = 7 * Number(document.getElementById("encoder-count").value);
	}

	// OLED
	var oled_total = 0;
	if (document.getElementById("oled").checked == true) {
		oled_total = 50;
	}

	// USB
	var usb = Number(document.querySelector("input[name=usb]:checked").value);

	document.getElementById("total").innerHTML = String(Number((base + num_keys * total_multiplier + rgb_total + encoder_total + usb + oled_total) * 15).toLocaleString());
};

document.getElementById("submit-button").onclick = function() {
	document.forms[0].submit();
	console.log("Form submitted!");
};

form.onchange = calculate;
window.onload = calculate;