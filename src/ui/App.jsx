import React, {Component} from 'react';
import Item from './Item';

class App extends Component {

    test() {
        alert('test!');
    };

    render() {
        return (
            <div>
                <h1>Hey</h1>
                <div className='box'>
                    <div>Help!</div>
                </div>
                <Item name={'taewony'}/>
                <br/>
                <button type='button' onClick={this.test}>TEST</button>
            </div>
        );
    }
};

module.exports = App;
