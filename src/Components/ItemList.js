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
          className="list-item"
          id={kween._id}
          key={kween._id} 
          data-eliminated={kween.eliminated}
        >
            <Link to={`/kweens/${kween._id}`}>
              <ListItemText 
                primary={kween.name}
              />
            </Link>
            
          <p>{kween.score}</p>
        </ListItem>
      ))}
      </div>      
    )
  }
}

export default ItemList