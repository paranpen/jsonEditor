/**
 * Creates an specific attribute component depending on the value given
 * @param  {Mixed} value    The value for the attribute
 * @param  {Mixed} original The value of the attribute on the original json
 * @param  {FreezerNode} parent   The parent node is needed to let the attribute update
 * @param  {String} key      The key for the attribute.
 * @return {ReactComponent}  A react component to edit the attribute.
 */
import React from 'react'
import StringAttribute from './StringAttribute'
import ObjectAttribute from './ObjectAttribute'
import ArrayAttribute from './ArrayAttribute'

/****************
Helper functions
*****************/

// Guess the type given a value to create the proper attribute
var guessType = function( value ) {
	var type = typeof value

	if( type != 'object' )
		return type

	if( value instanceof Array )
		return 'array'

	if( value instanceof Date)
		return 'date'

	return 'object'
}

var createAttribute = function( value, original, parent, key ) {
	// Default values to initialize attributes
	var typeDefaultValues = {
		string: '',
		object: {},
		array: []
	}

	var type = guessType( value )
	var	className = StringAttribute

	if( type == 'object' )
		className = ObjectAttribute
	else if( type == 'array' )
		className = ArrayAttribute

	if( typeof original == 'undefined' )
		original = typeDefaultValues[ type ]

	return React.createElement( className, {
		value: value,
		attrkey: typeof key != 'undefined' ? key : '',
		parent: parent,
		original: original
	})
}

export default createAttribute