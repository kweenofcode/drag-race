import React, {Component} from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class Kween extends Component {
  state = {
    kween: null,
  }

  setKween = async () => {
    const { kween_id } = this.props.match.params
    const kween = this.props.kweens.filter(kween => kween._id === kween_id)
    this.setState({
      kween: kween[0]
    })
    this.addUpTheTens(kween[0])
  }

  addUpTheTens = (kween) => {
    kween.score = 0
    kween.points.map((point) => {
      console.log(point)
      kween.score += Number(point.points)
      return point
    })
    this.setState({
      kween
    })
  }

  componentDidMount() {
    this.setKween()
  }
  render() {
    if (this.state.kween) {
      return (
        <div>
          <Link to="/">Home</Link>
          <h1>{this.state.kween.name}</h1>
          <List>
            {this.state.kween.points.map(point => 
            <ListItem
              key={point._id}
              id={point._id}>
                <ListItemText
                  primary={`${point.body} ${point.points}`}
                  secondary={point.description}
                />
            </ListItem>
            )}
          </List>
          <h2>Score: {this.state.kween.score}</h2>
        </div>
      )
    }
    return (
      <p>....loading</p>
    )
  }
}

export default Kween