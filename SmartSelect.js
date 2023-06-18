/**
 * Version: #
 * Web: #
 * Github: https://github.com/FE-jw/SmartSelect
 * Released: ####-##-##
*/

class SmartSelect{
	constructor(options){
		this.select = document.querySelector(options);
		this.btn = this.select.querySelector('button');
		this.list = this.select.querySelector('ul');
		this.init();
	}

	on = {
		'chageAfter': function(){
			console.log('ok');
		}
	}

	selected(e){
		const value = {
			text: null,
			options: null,
			index: null
		};
		value.text = e.innerHTML;
		value.options = e.dataset.option;
		value.index = e.dataset.index;

		this.btn.innerHTML = value.text;

		this.toggle();
		this.on.chageAfter();
	}

	toggle(){
		if(!this.select.classList.contains('expanded')){
			this.select.classList.add('expanded');
			this.btn.ariaExpanded = true;
		}else{
			this.select.classList.remove('expanded');
			this.btn.ariaExpanded = false;
		}
	}

	init(){
		const controls = this.select.className + '-list';

		// Button
		this.btn.ariaExpanded = false;
		this.btn.setAttribute('aria-haspopup', 'listbox');
		this.btn.setAttribute('aria-controls', controls);
		this.btn.addEventListener('click', () => {
			this.toggle();
		});

		// List
		this.list.id = controls;
		this.list.role = 'listbox';

		const lists = this.list.querySelectorAll('li');
		lists.forEach((li, index) => {
			li.dataset.index = index;

			li.addEventListener('click', (e) => {
				this.selected(e.target);
			});
		});
	}
}