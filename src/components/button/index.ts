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
    super('button', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    this.element!.classList.add('button')

    this.element!.setAttribute('type', this.props.type)
    this.element!.setAttribute('name', this.props.name)
  }

  render() {
    return `${this.props.label ?? ''}`;
  }
}
