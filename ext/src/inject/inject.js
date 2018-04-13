function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

/* https://stackoverflow.com/a/15226442 */
function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function modal_init(options) {
	var elem = document.querySelector('.modal');
	var instance = M.Modal.init(elem, options);
	return instance;
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		var body = document.getElementsByTagName('body')[0];

		/* Append floating btn */
		var floating_btn = document.createElement('a');
		floating_btn.setAttribute('id', 'activate-btn');
		// floating_btn.setAttribute('data-target', 'modal');
		floating_btn.className = 'btn-floating btn-large waves-effect waves-light btn-fixed grey';
		floating_btn.innerHTML = '<i class="material-icons">send</i>';
		body.appendChild(floating_btn);

		/* Floating btn event listener */
		floating_btn.addEventListener("click", (e) => {
			var node = e.path[1];
			node.classList.toggle("grey");
			node.classList.toggle("red");
		});

		/* Append modal */
		var modal = document.createElement('div');
		modal.setAttribute('id', 'modal');
		modal.classList = 'modal';
		modal.innerHTML =
		'<div class="modal-content">'+
			'<h4>다음 표현을 신고하시겠습니까?</h4>'+
			'<p class="expr"></p>'+
		'</div>'+
		'<div class="modal-footer">'+
			'<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>'+
		'</div>';
		body.appendChild(modal);
		var inst = modal_init({});

		/* Add drag event listener */
		body.addEventListener("mouseup", (e) => {
			var _floating_btn = document.getElementById('activate-btn');
			if (hasClass(_floating_btn, 'red')) {
				var selected_text = getSelectionText();
				if (selected_text == '') {
					return 0;
				}
				window.getSelection().empty();
				
				var exprs = modal.getElementsByClassName('expr');
				for (var i = 0; i < exprs.length; i++) {
					var expr = exprs[i];
					expr.innerHTML = `"${selected_text}"`
					console.log(expr);
				}

				inst.open();
				
			}		
		});
		



	}
	}, 10);
});