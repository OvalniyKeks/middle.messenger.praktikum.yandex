import { Block, Router } from '../../utils';

interface LinkProps {
	className: Array<string>;
	nameRoute: string;
	label: string;
	arrow: boolean;
	events?: {
		click: () => void;
	}
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super('div', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

    if (!this.props.events) {
      this.props.events = {};
    }
    this.props.events.click = () => {
      Router.push(this.props.nameRoute);
    };
  }

  render() {
    return `
			{{label}}
      
        	<img src="./assets/images/arrow.png" alt="">`;
  }
}
