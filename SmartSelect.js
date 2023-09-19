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
		this.currentValue = null;

		this.init();
	}

	updateSelected(value){
		const { prev, current } = value;
		const result = {
			prev,
			current: current.dataset.value,
			index: current.dataset.smartIndex,
			text: current.textContent
		};

		this.btn.textContent = result.text;
		this.expandToggle();
		this.changeCallback?.(result);
		this.currentValue = result.current;
	}

	expandToggle(){
		this.select.classList.toggle('expanded');

		if(this.btn.ariaExpanded == 'false'){
			this.btn.ariaExpanded = true;
			// this.lists.querySelector('li:first-child').focus();
		}else{
			this.btn.ariaExpanded = false;
		}
	}

	afterChange(callback){
		if(typeof callback === 'function') this.changeCallback = callback;
	}

	init(){
		const controlConnect = this.controls + '-smart-select';

		this.btn.ariaExpanded = false;
		this.btn.ariaHasPopup = 'listbox';
		this.btn.setAttribute('aria-controls', controlConnect);
		this.btn.addEventListener('click', () => this.expandToggle());

		this.lists.id = controlConnect;
		this.lists.role = 'listbox';
		this.lists.querySelectorAll('li').forEach((list, index) => {
			list.tabIndex = 0;
			list.dataset.smartIndex = index;

			list.addEventListener('click', e => {
				const value = {
					prev: this.currentValue,
					current: e.target
				};

				this.updateSelected(value);
			});

			/*
			list.addEventListener('keydown', e => {
				const key = e.key.toLowerCase();

				if(key == 'enter'){
					const value = {
						prev: this.currentValue,
						current: e.target
					};
	
					this.updateSelected(value);
				}else if(key == 'arrowdown'){
					list.nextElementSibling.focus();
				}else if(key == 'arrowup'){
					list.previousElementSibling.focus();
				}
			});
			*/
		});

		// 다른 영역 클릭 시 select 닫음
		this.select.addEventListener('click', e => e.stopPropagation());
		document.addEventListener('click', () => {
			const state = this.select.classList.contains('expanded');
			if(state) this.expandToggle();
		});
	}
}