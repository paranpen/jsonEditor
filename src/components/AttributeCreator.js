import React, {Component} from 'react'
import createAttribute from './createAttribute'

/**
 * Component to add attributes to a Hash or Array.
 * @param  {FreezerNode} root The parent to add the attribute.
 * @param  {string} attrkey Optional. If provided, the attribute added will have that key (arrays).
 *                           Otherwise an input will be shown to let the user define the key.
 */
class AttributeCreator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creating: false,
			attrkey: this.props.attrkey,
			type: 'string'
		}
		this.handleCreate = this.handleCreate.bind(this)
		this.changeKey = this.changeKey.bind(this)
		this.changeType = this.changeType.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.createAttributeFunc = this.createAttributeFunc.bind(this)
	}

	render() {
		if( !this.state.creating )
			return <a href="#" onClick={this.handleCreate}>+ Add {this.props.type}</a>

		var attrName
		if( typeof this.props.attrkey !== 'undefined' )
			attrName =  <span className="attrName">{this.props.attrkey}:</span>
		else {
			attrName = [
				<input type="text" ref={(ref) => this.keyInput = ref} value={this.state.value} onChange={this.changeKey}/>,
				<span>:</span>
			]
		}

		return (<div className="hashAttribute">
				{ attrName }
				<select value={this.state.type} onChange={ this.changeType } ref="typeSelector">
					<option value="string">String</option>
					<option value="array">List</option>
					<option value="object">Map</option>
				</select>
				<button onClick={ this.createAttributeFunc }>OK</button>,
				<a href="#" className="cancelAttr" onClick={ this.handleCancel }>Cancel</a>
		</div>)
	}

	componentDidUpdate( prevProps, prevState){
		if( !prevState.creating && this.state.creating ){
			if( this.refs.keyInput )
				this.refs.keyInput.focus()
			else
				this.refs.typeSelector.focus();
		}
	}

	componentWillReceiveProps( newProps ){
		this.setState({attrkey: newProps.attrkey})
	}

	handleCreate( e ){
		e.preventDefault()
		this.setState({creating: true})
	}

	handleCancel( e ){
		e.preventDefault()
		this.setState({creating: false})
	}

	changeType( e ){
		this.setState({type: e.target.value})
	}

	changeKey( e ){
		this.setState({attrkey: e.target.value})
	}

	createAttributeFunc(){

		this.setState({creating: false})

		var parent = this.props.parent
		var value = createAttribute.typeDefaultValues[ this.state.type ]

		if( parent.constructor === Array )
			parent.push( value )
		else
			parent.set(this.state.attrkey, value )
	}
}

export default AttributeCreator