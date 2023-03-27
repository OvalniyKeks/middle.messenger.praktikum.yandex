import { Block, FormFn } from '../../utils';

interface InputProps {
	className: Array<string>;
	type: string;
	name: string;
	placeholder?: string;
	id?: string;
	value?: string;
	autocomplete?: string,
	events?: {
		blur: () => void;
		focus: () => void;
	}
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));
		
		this.element!.setAttribute('name', this.props.name);

		if (this.props.placeholder) {
			this.element!.setAttribute('placeholder', this.props.placeholder);
		}

		if (this.props.value) {
			(this.element as HTMLInputElement).value = this.props.value
		}

		this.element!.setAttribute('type', this.props.type);
		if (this.props.id) {
			this.element!.setAttribute('id', this.props.id);
		}

		if (this.props.autocomplete) {
			this.element!.setAttribute('autocomplete', this.props.autocomplete)
		}

		this.element!.classList.add('input-field');

		if (!this.props.events) {
		  this.props.events = {
		    blur: () => FormFn.checkField(this.props.name),
		    focus: () => FormFn.deleteError(this.props.name),
		  };
		}
  }

  render() {
    return ``;
  }
}
