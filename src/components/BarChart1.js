import React from "react";
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";

const BarChart = ({data, dimensions, title}) => {
    const svgRef = React.useRef(null);
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    
    React.useEffect(() => {
        const newData = data
        
        const x = scaleLinear()
            .domain([0, d3.max(newData.map(d => d.total))])
            .range([0, width]);
        
        const y = scaleBand()
            .domain(d3.range(newData.length))
            .range([0, height]);
        
        // Create root container where we will append all other chart elements
        const svg = d3.select(svgRef.current)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");
        svg.selectAll("*").remove(); // Clear svg content before adding new elements

        svg.append("text")
            .attr("x", (svgWidth/2))
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "18")
            .attr("font-weight", "bold")
            .text(title)

        const bar = svg.selectAll("g")
            .data(newData)
            .join("g")
                .attr("transform", (d, i) => `translate(${margin.left},${y(i)+margin.top})`);

        // bar.append("rect")
        //     .attr("fill", "steelblue")
        //     .attr("width", d => x(d.total))
        //     .attr("height", y.bandwidth() - 1);

        bar.append("rect")
            .attr("fill", "red")
            .attr("width", d => x(d.results+d.close+d.exact+d.slam))
            .attr("height", y.bandwidth() - 1);

        bar.append("rect")
            .attr("fill", "steelblue")
            .attr("width", d => x(d.results+d.close+d.exact))
            .attr("height", y.bandwidth() - 1);

        bar.append("rect")
            .attr("fill", "green")
            .attr("width", d => x(d.results+d.close))
            .attr("height", y.bandwidth() - 1);

        bar.append("rect")
            .attr("fill", "orange")
            .attr("width", d => x(d.results))
            .attr("height", y.bandwidth() - 1);

            
        bar.append("text")
            .attr("fill", "black")
            .attr("font-size", "12")
            .attr("text-anchor", "start")
            .attr("x", d => x(d.total) + 10)
            .attr("y", (y.bandwidth() - 1) / 2)
            .attr("dy", "0.35em")
            .text(d => d.total);
            
        bar.append("text")
            .attr("text-anchor", "start")
            .attr("fill", "white")
            .attr("font-size", "12")
            .attr("x", 15)
            .attr("y", (y.bandwidth() - 1) / 2)
            .attr("dy", "0.35em")
            .text(d => d.name);
        
        bar.append("text")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .attr("font-size", "12")
            .attr("font-weight", "bold")
            .attr("x", -10)
            .attr("y", (y.bandwidth() - 1) / 2)
            .attr("dy", "0.35em")
            .text((d, i) => {
                if (i > 0 && d.total === newData[i-1].total) return null
                return i+1
            });

    }, [data])

    return <svg style={{border: "1px solid steelblue"}} ref={svgRef} width={svgWidth} height={svgHeight} />;
}

export default BarChart