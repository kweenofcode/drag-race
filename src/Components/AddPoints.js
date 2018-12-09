import React, {Component} from 'react'
import axios from 'axios'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'

class AddPoints extends Component {
  state = {
    kween: null,
    rules: null,
    points: null,
    submit: true,
  }

  handleSubmit = async(e) => {
    e.preventDefault()
    const { kween_id } = this.props.match.params
    const { points } = this.state
    try {
      await axios.put(`/kweens/${kween_id}/points`, { points })
      this.props.history.push('/admin')
    } catch(e) {
      console.log(e)
    }
  }
  getKween = (e) => {
    const {kween_id} = this.props.match.params
    const kween = this.props.kweens.filter(kween =>  kween._id === kween_id)
    this.setState({
      kween: kween[0],
      rules: this.props.rules,
      points: kween[0].points
    })
  }
  toggleSubmit = (length) => {
    if (length > 0) {
      this.setState({
        submit: false,
      }) 
    } else {
      this.setState({
        submit: true
      })
    }
  }
  handleChange = (e) => {
    const { points } = this.state
    if (e.target.checked) {
      points.push(e.target.value)
    } else {
      const index = points.indexOf(e.target.value)
      points.splice(index, 1)
    }
    this.toggleSubmit(points.length)
    this.setState({
      points
    })
  }

  componentDidMount() {
    this.getKween()
  }
  render() {
    if (!this.state.kween) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <div>
        <h1>{this.state.kween.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            {this.state.rules.map(rule =>
              <FormControlLabel
                control={
                  <Switch
                    value={rule._id}
                    onChange={this.handleChange}
                  />
                }
                label={rule.description}
                key={rule._id}
              />)}
          </FormGroup>
          <Button 
            type="submit"
            id="submit-btn"
            disabled={this.state.submit}
          >
            Add Up the 10's
          </Button>
        </form>
      </div>
    )
  }
}

export default AddPoints