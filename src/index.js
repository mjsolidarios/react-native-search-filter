import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { createFilter } from './util';


export default class SearchInput extends Component {
  static defaultProps = {
    caseSensitive: false,
    clearIcon: null,
    clearIconViewStyles: { position: 'absolute', top: 18, right: 22 },
    fuzzy: false,
    inputViewStyles: {},
    onChange: () => { },
    throttle: 200
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.value || '',
      inputFocus: props.inputFocus,
    }
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof props.value !== 'undefined' && props.value !== state.value) {
      const e = {
        target: {
          value: props.value,
        }
      }
      this.updateSearch(e)
    }

    return null
  }

  _keyboardDidHide() {
    if (this.state.inputFocus) {
      this.setState({ inputFocus: false })
    }
  }

  renderClearIcon() {
    const { clearIcon, clearIconViewStyles, onChangeText } = this.props
    return clearIcon &&
      <TouchableOpacity
        onPress={() => {
          onChangeText('')
          this.input.clear()
        }}
        style={clearIconViewStyles}
      >
        {clearIcon}
      </TouchableOpacity>
  }

  render() {
    const {
      caseSensitive,
      filterKeys,
      fuzzy,
      onChange,
      sortResults,
      style,
      throttle,
      value,
      ...inputProps
    } = this.props // eslint-disable-line no-unused-vars
    const { searchTerm } = this.state;

    inputProps.type = inputProps.type || 'search'
    inputProps.value = searchTerm
    inputProps.onChange = this.updateSearch.bind(this)
    inputProps.placeholder = inputProps.placeholder || 'Search'
    return (
      <View style={this.props.inputViewStyles}>
        <TextInput
          style={style}
          {...inputProps}  // Inherit any props passed to it; e.g., multiline, numberOfLines below
          underlineColorAndroid={'rgba(0,0,0,0)'}
          ref={(input) => { this.input = input }}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={this.props.onSubmitEditing}
        />
        {this.renderClearIcon()}
      </View>
    )
  }

  updateSearch(e) {
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

  filter(keys) {
    const { filterKeys, caseSensitive, fuzzy, sortResults } = this.props
    return createFilter(
      this.state.searchTerm,
      keys || filterKeys,
      { caseSensitive, fuzzy, sortResults }
    )
  }
}

SearchInput.propTypes = {
  caseSensitive: PropTypes.bool,
  clearIcon: PropTypes.node,
  clearIconViewStyles: PropTypes.object,
  filterKeys: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  fuzzy: PropTypes.bool,
  inputFocus: PropTypes.bool,
  inputViewStyles: PropTypes.object,
  onChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  sortResults: PropTypes.bool,
  throttle: PropTypes.number,
  value: PropTypes.string,
}

export { createFilter };

