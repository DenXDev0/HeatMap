const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
const svg = d3.select("#heatmap");
const tooltip = d3.select("#tooltip");
const legend = d3.select("#legend");

const width = +svg.attr("width");
const height = +svg.attr("height");
const padding = 60;
const months = d3.range(12);
const formatMonth = d3.timeFormat("%B");

d3.json(URL).then(data => {
  const { baseTemperature, monthlyVariance: dataset } = data;
  const years = dataset.map(d => d.year);
  const temps = dataset.map(d => baseTemperature + d.variance);

  const xScale = d3.scaleBand().domain([...new Set(years)]).range([padding, width - padding]);
  const yScale = d3.scaleBand().domain(months).range([padding, height - padding]);

  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateRdYlBu)
    .domain([d3.max(temps), d3.min(temps)]);

  const xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter((_, i) => i % 10 === 0))
    .tickFormat(d3.format("d"));

  const yAxis = d3.axisLeft(yScale).tickFormat(m => formatMonth(new Date(2000, m, 1)));

  svg.append("g").attr("id", "x-axis").attr("transform", `translate(0, ${height - padding})`).call(xAxis);
  svg.append("g").attr("id", "y-axis").attr("transform", `translate(${padding}, 0)`).call(yAxis);

  svg.selectAll(".cell")
    .data(dataset)
    .join("rect")
    .attr("class", "cell")
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => baseTemperature + d.variance)
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.month - 1))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(baseTemperature + d.variance))
    .on("mouseover", (event, d) => {
      const temp = (baseTemperature + d.variance).toFixed(2);
      tooltip
        .style("opacity", 1)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY - 40}px`)
        .style("transform", "translateY(-5px)")
        .attr("data-year", d.year)
        .html(`
          <strong>${d.year} - ${formatMonth(new Date(2000, d.month - 1))}</strong><br>
          Temp: ${temp}°C<br>
          Variance: ${d.variance.toFixed(2)}°C
        `);
    })
    .on("mouseout", () => tooltip.style("opacity", 0).style("transform", "translateY(0)"));

  const legendWidth = +legend.attr("width") - 40;
  const legendStep = (d3.max(temps) - d3.min(temps)) / 8;
  const legendValues = d3.range(d3.min(temps), d3.max(temps) + legendStep, legendStep);

  legend.selectAll("rect")
    .data(legendValues)
    .join("rect")
    .attr("x", (d, i) => i * (legendWidth / 8) + 20)
    .attr("y", 0)
    .attr("width", legendWidth / 8)
    .attr("height", 30)
    .attr("fill", d => colorScale(d));

  legend.append("g")
    .attr("transform", `translate(20, 30)`)
    .call(d3.axisBottom(d3.scaleLinear().domain([d3.min(temps), d3.max(temps)]).range([0, legendWidth]))
      .tickValues(legendValues)
      .tickFormat(d3.format(".1f"))
      .tickSize(6));
});
