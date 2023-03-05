import { Block } from '../../utils';


interface ButtonProps {
	className: Array<string>;
	type: string;
	name: string;
	label?: string,
	events?: {
		click: () => void;
	}
}

export class Button extends Block {
	constructor(props: ButtonProps) {
		super('div', props);
	}

	init() {
		this.props.className.forEach((element: string) => this.element!.classList.add(element));
	}

	render() {
		return `
      <button class="button" type="${this.props.type}" name="${this.props.name}">
		${this.props.label ?? ''}
      </button>`;
	}
}