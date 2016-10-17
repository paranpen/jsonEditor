/**
 * Attribute component that represent each Array element or Object property.
 * @param  {string} attrkey The key of the attribute in the parent.
 * @param  {Mixed} value The value of the attribute.
 * @param {Mixed} original The value of the attibute in the original json to highlight the changes.
 * @param {FreezerNode} parent The parent node to notify attribute updates.
 * State: None
 * TEST if it refresh the element after a attribute is deleted
 */
import React, {Component} from 'react'
import createAttribute from './createAttribute'

class Attribute extends Component {
	constructor(props) {
		super(props)
		this.handleRemove = this.handleRemove.bind(this)
	}

	render() {
		let typeAttribute = createAttribute( this.props.value, this.props.original, this.props.parent, this.props.attrkey )
		let modifiedClass = this.props.value == this.props.original ? '' : ' modified'
		let className = 'hashAttribute' + modifiedClass

		return (
			<div className={className}>
				<a href="#" className="attrRemove" onClick={ this.handleRemove }>[x]</a>
				<span className="attrName">{this.props.attrkey }:</span>
				<span className="attrValue">{ typeAttribute }</span>
			</div>
		)
	}

	/* Event Handler */
	handleRemove(e) {
		e.preventDefault()
		if( this.props.parent.constructor == Array )
			this.props.parent.splice( this.props.attrkey, 1 )
		else
			this.props.parent.remove( this.props.attrkey )
	}

	shouldComponentUpdate( nextProps, nextState ){
		return nextProps.value != this.props.value || 
          nextProps.parent != this.props.parent
	}
}

export default Attribute