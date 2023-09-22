/**
 * Version: #
 * Web: #
 * Github: https://github.com/FE-jw/SmartSelect
 * Released: ####-##-##
*/

/**
 * TODO
 * [O] 선택된 옵션에 활성화 class 추가
 * [O] type popup 에서 우측 O 아이콘 추가
 * 
 * # 이슈
 * [] 1번 옵션에서 enter 입력 시 안닫힘
 */

class SmartSelect{
	constructor(selector, options){
		this.controls = selector.replace('#', '').replace('.', '');
		this.select = document.querySelector(selector);
		this.btn = this.select.querySelector('button');
		this.lists = this.select.querySelector('ul');
		this.changeCallback = null;
		this.currentValue = null;
		this.type = options?.type ?? 'dropdown';

		this.init();
	}

	/**
	 * 
	 * @param {object} value - 선택된 옵션 정보
	 */
	updateSelected(value){
		const { prev, current } = value;
		const result = {
			prev,
			current: current.dataset.value,
			index: current.dataset.smartIndex,
			text: current.textContent
		};

		if(prev){
			this.lists.querySelector(`li[data-value="${prev}"]`).classList.remove('selected');
		}

		current.classList.add('selected');

		this.btn.textContent = result.text;
		this.btn.focus();
		this.expandToggle();
		this.changeCallback?.(result);
		this.currentValue = result.current;
	}

	/**
	 * select on/off toggle
	 */
	expandToggle(){
		const isExpanded = this.select.classList.contains('expanded');

		if(!isExpanded){
			this.select.classList.add('expanded');
			this.btn.ariaExpanded = true;
		}else{
			this.select.classList.remove('expanded');
			this.btn.ariaExpanded = false;
		}
	}

	/**
	 * 
	 * @param {function} callback - 옵션 선택 후 실행할 기능
	 */
	afterChange(callback){
		if(typeof callback === 'function') this.changeCallback = callback;
	}

	/**
	 * 초기화
	 */
	init(){
		this.select.dataset.selectType = this.type;

		const controlConnect = this.controls + '-smart-select';

		this.btn.ariaExpanded = false;
		this.btn.ariaHasPopup = 'listbox';
		this.btn.setAttribute('aria-controls', controlConnect);
		this.btn.addEventListener('click', () => this.expandToggle());

		this.lists.id = controlConnect;
		this.lists.role = 'listbox';
		this.lists.querySelectorAll('li').forEach((li, index) => {
			li.tabIndex = 0;
			li.role = 'option';
			li.dataset.smartIndex = index;

			li.addEventListener('click', e => {
				const value = {
					prev: this.currentValue,
					current: e.target
				};

				this.updateSelected(value);
			});

			li.addEventListener('keydown', e => {
				const key = e.key.toLowerCase();

				switch(key){
					case 'enter':
						const value = {
							prev: this.currentValue,
							current: e.target
						};
						
						this.updateSelected(value);
					case 'arrowdown':
					case 'arrowup':
						const nextOption = key === 'arrowdown' ? li.nextElementSibling : li.previousElementSibling;

						if(nextOption){
							nextOption.focus();
							e.preventDefault();
							return false;
						}
					default:
						break;
				}
			});
		});

		// 다른 영역 클릭 시 select 닫음
		this.select.addEventListener('click', e => e.stopPropagation());
		document.addEventListener('click', () => {
			const state = this.select.classList.contains('expanded');

			if(state){
				this.expandToggle();
			}
		});
	}
}