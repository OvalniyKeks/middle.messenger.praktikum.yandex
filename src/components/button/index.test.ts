import { Button } from './index';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Button', () => {
  beforeEach(() => {
    sinon.stub().reset()
  })

  it('element should render', () => {
    new Button({});
  });

  it('element should set className', () => {
    const props = {className: ['test']}
    const button = new Button(props);

    expect(button.element?.classList).to.include(['test']);
  });

  it('element should set label', () => {
    const props = {label: 'test'}
    const button = new Button(props);

    expect(button.element?.textContent).to.eq('test')
  });

  it('element should set name', () => {
    const props = {name: 'test'}
    const button = new Button(props);

    expect((button.element as HTMLButtonElement)?.name).to.eq('test')
  });

  it('element should set type', () => {
    const props = {type: 'submit'}
    const button = new Button(props);

    expect((button.element as HTMLButtonElement)?.type).to.eq('submit')
  });

  it('element should be clicked', () => {
    const callbackClick = sinon.stub()
    const props = {events: {click: callbackClick}}

    const button = new Button(props);
    button.element?.click();

    expect(callbackClick.called).to.eq(true)
  });

  
});
