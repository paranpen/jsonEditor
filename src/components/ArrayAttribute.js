/**
 * Component for editing an array.
 * @param  {FreezerNode} value The value of the array.
 * @param  {Mixed} original The value of the component it the original json.
 * State: editing
 * TEST if editing mode is working
 */
import React, {Component} from 'react'
import Attribute from './Attribute'
import AttributeCreator from './AttributeCreator'

class ArrayAttribute extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false
		}
		this.toggleEditing = this.toggleEditing.bind(this)
	}
	
	render() {
		var keys = Object.keys( this.props.value )
		var className = this.state.editing ? 'open arrayAttr compoundAttr' : 'arrayAttr compoundAttr'
		var openArray = ''

		var attrs = [];
		for (var i = 0; i < this.props.value.length; i++) {
			attrs.push(
				<Attribute
					parent={ this.props.value }
					value={this.props.value[i]}
					original={this.props.original[i]}
					key={ i }
					attrkey={ i }
				/>
			)
		}

		openArray = (<div className="attrChildren">
			{ attrs }
			<AttributeCreator type="element" parent={ this.props.value } attrkey={ keys.length }/>
			</div>
		)

		return (<span className={ className }>
				<span onClick={this.toggleEditing} className="hashToggle">List [{keys.length}]</span>
				{openArray}
			</span>)
	}

	/* Event Handler */
	toggleEditing() {
		this.setState({editing: !this.state.editing})
	}
}

export default ArrayAttribute