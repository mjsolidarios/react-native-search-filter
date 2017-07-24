
import React, { Component, PropTypes } from 'react'
import { TextInput } from 'react-native'
import { createFilter } from './util'

export default class SearchInput extends Component{

  constructor(props){
    super(props);
    this.state = {
      searchTerm: this.props.value || ''
    }
  }

  static defaultProps = {
    onChange () {},
    caseSensitive: false,
    fuzzy: false,
    throttle: 200
  }

  componentWillReceiveProps (nextProps) {
    if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
      const e = {
        target: {
          value: nextProps.value
        }
      }
      this.updateSearch(e)
    }
  }

  render () {
    const {style, onChange, caseSensitive, sortResults, throttle, filterKeys, value, fuzzy, ...inputProps} = this.props // eslint-disable-line no-unused-vars
    inputProps.type = inputProps.type || 'search'
    inputProps.value = this.state.searchTerm
    inputProps.onChange = this.updateSearch.bind(this)
    inputProps.placeholder = inputProps.placeholder || 'Search'
    return (

      <TextInput
        style={style}
        {...inputProps}  // Inherit any props passed to it; e.g., multiline, numberOfLines below
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
    )
  }

  updateSearch (e) {
    const searchTerm = e.target.value
    this.setState({
      searchTerm: searchTerm
    }, () => {
      if (this._throttleTimeout) {
        clearTimeout(this._throttleTimeout)
      }

      this._throttleTimeout = setTimeout(
        () => this.props.onChange(searchTerm),
        this.props.throttle
      )
    })
  }

  filter (keys) {
    const {filterKeys, caseSensitive, fuzzy, sortResults} = this.props
    return createFilter(
      this.state.searchTerm,
      keys || filterKeys,
      {caseSensitive, fuzzy, sortResults}
    )
  }
}

SearchInput.propTypes = {
    onChange: PropTypes.func,
    caseSensitive: PropTypes.bool,
    sortResults: PropTypes.bool,
    fuzzy: PropTypes.bool,
    throttle: PropTypes.number,
    filterKeys: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    value: PropTypes.string
  }

export { createFilter }
