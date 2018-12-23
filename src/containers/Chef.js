import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import Chef from '../components/Chef'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chef)