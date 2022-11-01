import React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/box'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'; 

function Row({player1, player2, title, sort}) {
  let p1Color = 'black', p2Color = 'black'

  if (player1 > player2 && sort === 'highest') p1Color = 'red'
  else if (player1 < player2 && sort === 'highest') p2Color = 'red'
  else if (player1 > player2 && sort === 'lowest') p2Color = 'red'
  else if (player1 < player2 && sort === 'lowest') p1Color = 'red'

  return (
    <Stack direction="row" spacing={2}>
      <Typography style={{color: p1Color}} variant='h6'>{player1}</Typography>
      <Typography variant='h6'>{title}</Typography>
      <Typography style={{color: p2Color}} variant='h6'>{player2}</Typography>
    </Stack>
  )
}

function HeadToHead({data}) {
  const [players, setPlayers] = useState()
  const [player1, setPlayer1] = useState('Jdart')
  const [player2, setPlayer2] = useState('AdamSmith959')
  const [stats, setStats] = useState()

  useEffect(() => {
    const players = {}

    data.leaderboards[0].results.forEach((user, idx) => {
      players[user.name.trim()] = {
        ...user,
        pos: idx+1,
        cap: 0,
        spoon: 0,
        best: null,
        worst: null
      }
    })

    data.rounds.forEach(week => {
      week.results.forEach(user => {
        user.total = parseInt(user.total)
        if (user.cap === true) players[user.name].cap += 1
        if (user.spoon === true) players[user.name].spoon += 1
        if (players[user.name].best === null || user.total > players[user.name].best) players[user.name].best = user.total
        if (players[user.name].worst === null || user.total < players[user.name].worst) players[user.name].worst = user.total
      })
    })

    setPlayers(Object.keys(players).sort())
    setStats(players)
  }, [data])

  return (
    <>
      {/* {JSON.stringify(players)} */}
      {players && players.map((key, idx) => {
        return <button onClick={() => setPlayer1(key)}>{key}</button>
      })}
      <br />
      {players && players.map((key, idx) => {
        return <button onClick={() => setPlayer2(key)}>{key}</button>
      })}
      <br />
      {stats &&
      <Box>
        <p>{stats[player1].name} vs {stats[player2].name}</p>
        <Row player1={parseFloat(stats[player1].pos)} player2={parseFloat(stats[player2].pos)} title='Position' sort='lowest' />
        <Row player1={parseFloat(stats[player1].total)} player2={parseFloat(stats[player2].total)} title='Points' sort='highest' />
        <Row player1={parseFloat(stats[player1].slam)} player2={parseFloat(stats[player2].slam)} title='Slam' sort='highest' />
        <Row player1={parseFloat(stats[player1].exact)} player2={parseFloat(stats[player2].exact)} title='Exact' sort='highest' />
        <Row player1={parseFloat(stats[player1].close)} player2={parseFloat(stats[player2].close)} title='Close' sort='highest' />
        <Row player1={parseFloat(stats[player1].results)} player2={parseFloat(stats[player2].results)} title='Results' sort='highest' />
        <Row player1={parseFloat(stats[player1].cap)} player2={parseFloat(stats[player2].cap)} title='Caps' sort='highest' />
        <Row player1={parseFloat(stats[player1].spoon)} player2={parseFloat(stats[player2].spoon)} title='Spoons' sort='lowest' />
        <Row player1={parseFloat(stats[player1].best)} player2={parseFloat(stats[player2].best)} title='Best Result' sort='highest' />
        <Row player1={parseFloat(stats[player1].worst)} player2={parseFloat(stats[player2].worst)} title='Worst Result' sort='highest' />
        {/* <pre>{JSON.stringify(stats[player1], null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(stats[player2], null, 2)}</pre> */}
      </Box>
      }
    </>
  )
}

export default HeadToHead