/**
 * Version: #
 * Web: #
 * Github: https://github.com/FE-jw/SmartSelect
 * Released: ####-##-##
*/

class SmartSelect{
	constructor(options){
		this.controls = options.replace('#', '').replace('.', '');
		this.select = document.querySelector(options);
		this.btn = this.select.querySelector('button');
		this.lists = this.select.querySelector('ul');
		this.changeCallback = null;

		this.init();
	}

	updateSelected(target){
		const result = {
			currentValue: target.dataset.value,
			index: target.dataset.index,
			text: target.textContent
		};

		this.btn.textContent = result.text;
		this.expandToggle();
		this.changeCallback?.(result);
	}

	afterChange(callback){
		if(typeof callback === 'function') this.changeCallback = callback;
	}

	expandToggle(){
		this.select.classList.toggle('expanded');
  		this.btn.ariaExpanded = !this.btn.ariaExpanded;
	}

	init(){
		const controlConnect = this.controls + '-list';

		this.btn.ariaExpanded = false;
		this.btn.setAttribute('aria-haspopup', 'listbox');
		this.btn.setAttribute('aria-controls', controlConnect);
		this.btn.addEventListener('click', () => this.expandToggle());

		this.lists.id = controlConnect;
		this.lists.role = 'listbox';
		this.lists.querySelectorAll('li').forEach((list, index) => {
			list.dataset.index = index;
			list.addEventListener('click', e => this.updateSelected(e.target));
		});
	}
}