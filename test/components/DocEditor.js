import React from 'react';
import { mount } from 'enzyme';
import DocEditor from '../../src/components/DocEditor';
import expect from 'expect'
import sinon from 'sinon';
import Freezer from 'freezer-js'

/****************
JSON data to edit
*****************/
var json = {
	hola: 'amigo',
	adios:'enemigo',
	obj: { hi: 'man', bye: 'dude' },
	arr: ['a', 'b', {c: 1}, 'd']
};

// Create a Freezer store
var frozen = new Freezer( { json: json });

describe('<DocEditor/>', function() {
    var wrapper;

    it('calls componentDidMount once only', function() {
        var spy = sinon.spy(DocEditor.prototype, 'componentDidMount');
        wrapper = mount(<DocEditor store={frozen.get()}/>);
        console.log(wrapper)
        expect(spy.calledOnce).toEqual(true);
    });

    it('`props` contains a `text` property with a value of "Hello, world!"', function() {
        expect(wrapper.props().store).toEqual(json);
    });

    it('has an `h1` tag with the text "Home page"', function() {
        expect(wrapper.contains(<h1>Json Doc Editor</h1>)).toEqual(true);
    });

    after(function() {
        global.window.close();
    });
});
