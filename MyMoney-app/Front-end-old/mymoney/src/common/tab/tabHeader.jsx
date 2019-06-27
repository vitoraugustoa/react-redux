import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import If from '../operador/if';

import { selectTab } from './redux/tabActions';

class TabHeader extends Component {
  render() {
    const selected = this.props.selected === this.props.target;
    const visible = this.props.visible[this.props.target]

    return (
      <If test={visible} >
        <li className={selected ? 'active' : ''}>
            <a href="javascript:;" data-toggle="tab" data-target={this.props.target} onClick={() => this.props.selectTab(this.props.target)}>
                <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
            </a>
        </li>
      </If>
        
    );
  }
}

const mapStateToProps = state => ({
  selected: state.tab.selected,
  visible : state.tab.visible,
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
  selectTab  }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);