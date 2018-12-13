import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'

import AdminBtn from './AdminBtn'

class Kween extends Component {
  state = {
    kween: null,
  }

  setKween = async () => {
    const { kween_id } = this.props.match.params
    console.log(kween_id)
    const { data } = await axios.get(`/kweens/${kween_id}`)
    const kween = data.data[0]
    this.setState({
      kween
    })
    this.addUpTheTens(kween)
  }

  addUpTheTens = (kween) => {
    kween.score = 0
    kween.points.map((point) => {
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
        <div className="modal">
          <Link to="/" className="btn btn--rules">
            <Button>
              Home
            </Button>
          </Link>
          <AdminBtn />
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