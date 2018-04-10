import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { parse } from 'query-string'
import slug from 'slug'

import Sidebar from './Sidebar'
import { getPlayers } from '../api'

export default class Players extends Component {
  state = {
    players: [],
    loading: true
  }
  componentDidMount() {
    const { location } = this.props

    if (location.search) {
      this.fetchPlayers(parse(location.search).teamId)
    } else {
      this.fetchPlayers()
    }
  }
  fetchPlayers = (teamId) => {
    getPlayers(teamId)
      .then(players => this.setState({loading: false, players}))
  }
  render() {
    const { players, loading } = this.state
    const { match, location } = this.props
    return (
      <div className='container two-column'>
        <Sidebar
          loading={loading}
          title='Players'
          list={players.map(player => player.name)}
          {...this.props}
        />

        {loading === false && location.pathname === '/players'
          ? <div className='sidebar-instruction'>Select a Player</div>
          : null}
      </div>
    )
  }
}
