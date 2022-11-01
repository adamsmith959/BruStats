import React from "react";
import BarChart from './BarChart'

const BestPerformanceRecent = ({data, dimensions}) => {
    const formatData = () => {
        const totals = {}
        data.slice(-5).forEach(week => {
          week.results.forEach(user => {
            if (user.name in totals === false) totals[user.name] = 0
            totals[user.name] += parseInt(user.total)
          })
        })

        return Object.entries(totals)
            .filter(user => user[1] > 0)
            .sort((a, b) => b[1] - a[1])
            .map((key) => {
                return {name: key[0], value: key[1]}
            })
    }

    return <BarChart title="Recent Performance (Last 5)" data={formatData(data)} dimensions={dimensions} />
}

export default BestPerformanceRecent