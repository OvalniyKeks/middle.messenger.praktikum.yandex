import { Block, FormFn } from '../../utils';

interface InputProps {
	className: Array<string>;
	type: string;
	name: string;
	placeholder?: string;
	id?: string;
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

		this.element!.setAttribute('type', this.props.type);
		this.element!.setAttribute('id', this.props.id);

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
