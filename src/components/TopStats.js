import React from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TopStatView({title, subtitle, data}) {
  return (
    <Paper variant='outlined' style={{width: 200}}>
      <Typography variant='h6'>{title}</Typography>
      {/* <Typography variant='subtitle1'>{subtitle}</Typography> */}
      <Typography variant='subtitle1'>{Object.values(data)[0]}</Typography>
      {Object.keys(data).map(name => {
        return <p>{name}</p>
      })}
    </Paper>
  )
}
  
function TopStats({data}) {
  const performance = (num) => {
    const totals = {}
    data.rounds.slice(num).forEach(week => {
      week.results.forEach(user => {
        if (user.name in totals === false) totals[user.name] = 0
        totals[user.name] += parseInt(user.total)
      })
    })
    return totals
  }
  
  const bestPerformer = (num) => {
    const totals = Object.entries(performance(num))
    const max = Math.max(...totals.map(user => user[1]))
    return Object.fromEntries(totals.filter(user => user[1] >= max))
  }
  
  const worstPerformer = (num) => {
    const totals = Object.entries(performance(num))
    const min = Math.min(...totals.map(user => user[1]))
    return Object.fromEntries(totals.filter(user => user[1] <= min))
  }
  
  const mostCaps = () => {
    let totals = {}
    data.rounds.forEach(week => {
      week.results.forEach(user => {
        if (user.name in totals === false) totals[user.name] = 0
        if (user.cap === true) totals[user.name] += 1
      })
    })
    totals = Object.entries(totals)
    const max = Math.max(...totals.map(user => user[1]))
    return Object.fromEntries(totals.filter(user => user[1] >= max))
  }
  
  const mostSpoons = () => {
    let totals = {}
    data.rounds.forEach(week => {
      week.results.forEach(user => {
        if (user.name in totals === false) totals[user.name] = 0
        if (user.spoon === true) totals[user.name] += 1
      })
    })
    totals = Object.entries(totals)
    const max = Math.max(...totals.map(user => user[1]))
    return Object.fromEntries(totals.filter(user => user[1] >= max))
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TopStatView title="Best Performer" subtitle="Last 5" data={bestPerformer(-5)} />
        <TopStatView title="Worst Performer" subtitle="Last 5" data={worstPerformer(-5)} />
        <TopStatView title="Most Caps" data={mostCaps()} />
        <TopStatView title="Most Spoons" data={mostSpoons()} />
      </Stack>
    </Box>
  )
}
    
export default TopStats