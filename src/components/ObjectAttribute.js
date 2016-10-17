/**
 * Component for editing a hash.
 * @param  {FreezerNode} value The value of the object.
 * @param  {Mixed} original The value of the component it the original json.
 * State: editing
 * TEST if editing mode is working
 */
import React, {Component} from 'react'
import Attribute from './Attribute'
import AttributeCreator from './AttributeCreator'
 
class ObjectAttribute extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false
		}
		this.toggleEditing = this.toggleEditing.bind(this)
	}

	render() {
		var keys = Object.keys( this.props.value )
		var className = this.state.editing ? 'open objectAttr compoundAttr' : 'objectAttr compoundAttr'
		var openHash = ''

		var attrs = []
		for( var attr in this.props.value ){
			attrs.push(
				<Attribute
					parent  ={this.props.value}
					value   ={this.props.value[attr]}
					original={this.props.original[attr]}
					key     ={attr}
					attrkey ={attr}
				/>
			)
		}

		openHash = (<div className="attrChildren">
				{ attrs }
				<AttributeCreator type="attribute" parent={ this.props.value } />
			</div>
		)

		return (<span className={ className }>
				<span onClick={ this.toggleEditing } className="hashToggle">Attribute [{ keys.length }]</span>
				{openHash}
			</span>
		)
	}

	/* Event Handler */
	toggleEditing() {
		this.setState({ editing: !this.state.editing })
	}
}

export default ObjectAttribute