import React from "react";
import BarChart from './BarChart1'

const Standings = ({data, dimensions}) => {
    data = data.map(d => {
        return {
            name: d.name,
            total: parseFloat(d.total),
            results: parseFloat(d.results),
            close: parseFloat(d.close),
            exact: parseFloat(d.exact),
            slam: parseFloat(d.slam)
        }
    })

    return <BarChart title="Total Points" data={data} dimensions={dimensions} />
}

export default Standings