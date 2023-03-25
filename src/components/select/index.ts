import { Block, FormFn } from '../../utils';

interface SelectProps {
	className: Array<string>;
	name: string;
  options: any,
  valueKey: string,
  labelKey: string,
	id?: string;
	value?: string;
}

export class Select extends Block {
  constructor(props: SelectProps) {
    super('select', props);
  }

  init() {
    this.props.className.forEach((element: string) => this.element!.classList.add(element));

		this.element!.setAttribute('name', this.props.name);

		if (this.props.value) {
			// @ts-ignore
			this.element!.value = this.props.value
		}

		if (this.props.id) {
			this.element!.setAttribute('id', this.props.id);
		}

		this.element!.classList.add('input-field');
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.log(newProps.options)    
    // @ts-ignore
    if (newProps.options) {
      // console.log(newProps.options)
      return true;
    }
    return false;
  }

  render() {
    return `
    {{#each options}}
      <option value="{{this.${this.props.valueKey}}}">{{this.${this.props.labelKey}}}</option>
    {{/each}}
    `;
  }
}
