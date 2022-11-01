import React from "react";
import BarChart from './BarChart'

const SpoonRace = ({data, dimensions}) => {
  const formatData = (data) => {
    let totals = {}
    data.forEach(week => {
      week.results.forEach(user => {
        if (user.name in totals === false) totals[user.name] = 0
        if (user.spoon === true) totals[user.name] += 1
      })
    })
    return Object.entries(totals)
      .filter(user => user[1] > 0)
      .sort((a, b) => b[1] - a[1])
      .map((key) => {
        return {name: key[0], value: key[1]}
      })
  }

  return <BarChart title="Spoon Race" data={formatData(data)} dimensions={dimensions} />
}

export default SpoonRace
