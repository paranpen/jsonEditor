import React, {Component} from 'react';
import Item from './Item';

class DocEditor extends Component {

    test() {
        alert('test!');
    };

    render() {
        return (
            <div className="foo">
                <div className='box'>box</div>
                <Item name={'taewony'}/>
                <br/>
                <button type='button' onClick={this.test}>TEST</button>
            </div>
        );
    }
};

export default DocEditor;
