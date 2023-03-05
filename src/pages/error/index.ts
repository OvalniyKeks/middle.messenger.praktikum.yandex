import { Block } from '../../utils/';
import { Link } from '../../components/link'

interface ErrorProps {
    className: string
}

export class Error extends Block {
    constructor(props: ErrorProps) {
        super('main', props);
    }

    init() {
        this.element?.classList.add(this.props.className);

        this.children.Link = new Link({
			className: ['link'],
			label: "На главную",
			nameRoute: 'chat',
			arrow: true
		})
    }

    render() {
        return `
            <img src="./assets/images/errorPage.png" >
            Такой страницы не существует
            {{{ Link }}}
        `;
    }
}