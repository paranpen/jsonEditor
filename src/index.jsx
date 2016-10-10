import React  from 'react';
import ReactDOM from 'react-dom';
import DocEditor from './components/DocEditor';
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
var frozen = new Freezer( { json: json });

ReactDOM.render(<DocEditor store={ frozen.get() } original={ frozen.get() } />, 
  document.getElementById('root'));
