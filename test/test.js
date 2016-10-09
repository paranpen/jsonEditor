import expect from 'expect'
import React from 'react'
import Freezer from 'frozen'
import { shallow, mount, render } from 'enzyme'
import DocEditor from '../src/ui/DocEditor.jsx'

class ToDoItem extends React.Component {
  render() {
    const { item, onCompleteChange } = this.props;
    return (
      <div className="item">
        <span className="item-mark">{item.complete ? '✓' : '•'}</span>
        <span className="item-title">{item.title}</span>
        <a className="item-button" onClick={() => onCompleteChange(item, !item.complete)}>
          Mark as {item.complete ? 'Pending' : 'Complete'}
        </a>
      </div>
    );
  }
}
class ToDoList extends React.Component {
  render() {
    const { items, onChange } = this.props;
    return (
      <div className="todo-list">
        {items.map(item => <ToDoItem key={item.id} item={item} onCompleteChange={onChange} />)}
      </div>
    );
  }
}
function mockItem(overrides = {complete: true}) {
  return { complete: overrides.complete, title: 'kjfdjkfd' }
}

describe('<ToDoItem />', () => {
  it('renders the title', () => {
    const item = mockItem()
    const wrapper = shallow(<ToDoItem item={item} />)
    expect(wrapper.text()).toContain(item.title)
  })

  it('renders a check mark when complete', () => {
    const item = mockItem({ complete: true })
    const wrapper = shallow(<ToDoItem item={item} />)
    expect(wrapper.find('.item-mark').text()).toEqual('✓')
  })

  it('renders a bullet when not complete', () => {
    const item = mockItem({ complete: false })
    const wrapper = shallow(<ToDoItem item={item} />)
    expect(wrapper.find('.item-mark').text()).toEqual('•')
  })

  it('calls onCompleteChange handler with the right arguments when clicked', () => {
    const spy = sinon.spy()
    const item = mockItem()
    const wrapper = shallow(<ToDoItem item={item} onCompleteChange={spy} />)
    console.log(wrapper.debug())
    wrapper.find('.item-button').simulate('click')
    expect(spy.calledOnce).toBe.true
    expect(spy.calledWith(item, false)).toBe.true
  })
})

/*
function renderShalow(component) {
  const renderer = ReactTestUtils.createRenderer();
  renderer.render(component)
  return renderer.getRenderOutput()
}

class Label extends React.component {
  render() { return <span>Hello {this.props.name}</span> }
}
class Button extends React.component {
  render() { return <div><Label name={this.props.name} /></div> }
}


describe('Containers:', function() {
  describe('Component: DocEditor', () => {
    it('test', () => {
      expect(true).toEqual(true)
    }),

    it('renders', () => {
      var result = renderShalow(<DocEditor name="taewon"/>)
      console.log(result)
      //expect(result.type).toBe('div');
      //expect(result.props.children).toEqual([
      //  <div className="box">box</div>,
      //])
    })
  })
})
*/