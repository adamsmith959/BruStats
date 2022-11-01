import React from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";



const LineChart = ({data, dimensions}) => {
    const svgRef = React.useRef(null);
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    const players = {}
    data.forEach((round, index) => {
        round.results.forEach(result => {
            if (result.name in players === false) players[result.name] = []
            players[result.name].push([index+1, result.total])
        })
    })


    React.useEffect(() => {
        const xScale = scaleLinear().domain([1, data.length]).range([0, width])
        const yScale = d3.scaleLinear().domain([0, Math.ceil(data[data.length-1].results[0].total)]).range([height, 0])

        // Create root container where we will append all other chart elements
        const svg = d3.select(svgRef.current)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        // Title
        svg.append('text')
            .attr('x', svgWidth / 2)
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .style('font-family', 'Helvetica')
            .style('font-size', 20)
            .text('Season Points');

        // X axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height+margin.top})`)
            .call(d3.axisBottom(xScale).ticks(6));
        // X label
        svg.append('text')
            .attr('x', width/2)
            .attr('y', height + margin.top + 35 )
            .attr('text-anchor', 'middle')
            .style('font-family', 'Helvetica')
            .style('font-size', 12)
            .text('Rounds');
        // Y axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale));
        // Y label
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', `translate(${margin.left - 40}, ${svgHeight/2})rotate(-90)`)
            .style('font-family', 'Helvetica')
            .style('font-size', 12)
            .text('Points');
        
        for(const player in players) {
            svg.append('g')
                .selectAll("dot")
                .data(players[player])
                .enter()
                .append("circle")
                .attr("cx", function (d) { return xScale(d[0]); } )
                .attr("cy", function (d) { return yScale(d[1]); } )
                .attr("r", 2)
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "#CC0000");
    
            var line = d3.line()
                .x(function(d) { return xScale(d[0]); }) 
                .y(function(d) { return yScale(d[1]); }) 
                // .curve(d3.curveMonotoneX)
                
            svg.append("path")
                .datum(players[player]) 
                .attr("class", "line") 
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "#CC0000")
                .style("stroke-width", "2");
        }

        // data.forEach(dataset => {
        //     svg.append('g')
        //         .selectAll("dot")
        //         .data(dataset)
        //         .enter()
        //         .append("circle")
        //         .attr("cx", function (d) { return xScale(d[0]); } )
        //         .attr("cy", function (d) { return yScale(d[1]); } )
        //         .attr("r", 2)
        //         .attr("transform", `translate(${margin.left}, ${margin.top})`)
        //         .style("fill", "#CC0000");
    
        //     var line = d3.line()
        //         .x(function(d) { return xScale(d[0]); }) 
        //         .y(function(d) { return yScale(d[1]); }) 
        //         .curve(d3.curveMonotoneX)
                
        //     svg.append("path")
        //         .datum(dataset) 
        //         .attr("class", "line") 
        //         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        //         .attr("d", line)
        //         .style("fill", "none")
        //         .style("stroke", "#CC0000")
        //         .style("stroke-width", "2");
        // })

    }, [data])

    return <svg style={{border: "1px solid steelblue"}} ref={svgRef} width={svgWidth} height={svgHeight} />;
}

export default LineChart