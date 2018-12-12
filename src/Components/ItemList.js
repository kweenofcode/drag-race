import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ItemList extends Component {
  render() {
    return (
      <div>
      {this.props.kweens.map(kween => (
        <ListItem
          id={kween._id}
          key={kween._id} 
          data-eliminated={kween.eliminated}
        >
            <ListItemText 
              primary={kween.name}
            />
            <p>{kween.score}</p>
            <Link to={`/kweens/${kween._id}`}>
              ScoreCard
            </Link>
        </ListItem>
      ))}
      </div>      
    )
  }
}

export default ItemList