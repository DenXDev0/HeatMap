# 📋 Heat Map

This project visualizes monthly global land-surface temperature data from 1753 to 2015. It presents a heat map showing temperature variations across years and months, using D3.js for dynamic, interactive visualization.

Example: [Live Demo](https://heat-map-tau.vercel.app/)


## ⚙️ Features

- **Heat map** representing temperature variance from a base temperature (8.66°C).
- X-axis: Years from 1753 to 2015 (displayed every 10 years).
- Y-axis: Months (January to December).
- Color-coded temperature cells using a diverging color scale (`RdYlBu`).
- Tooltip showing detailed information on hover:
  - Year and month
  - Actual temperature
  - Temperature variance
- Legend displaying the temperature color scale for reference.


## 🚀 Technologies Used

- [D3.js](https://d3js.org/) for data-driven documents and visualization.
- HTML and CSS for structure and styling.
- Dataset sourced from:  
  [Global Temperature JSON](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json)


## 📁 Project Structure
```
HeatMap/
├── index.html # Main HTML page with SVG containers for heatmap and legend
├── styles.css # CSS for styling heatmap, tooltip, and legend
├── script.js # JavaScript file with D3 code for rendering the heatmap
└── README.md # Documentation and instructions
```

## 🧑‍💻 How It Works

- The project fetches monthly temperature variance data and a base temperature.
- The X-axis is a band scale mapping years; the Y-axis is a band scale mapping months.
- Each rectangle (`.cell`) represents a month-year pair with color representing the absolute temperature.
- The color scale is a sequential diverging color scheme that visually encodes temperature differences.
- Tooltips appear when hovering over cells, showing exact temperature and variance values.
- The legend visually explains the color scale to help interpret temperature values on the map.


## 📌 Notes

This project is part of the freeCodeCamp [View Data Visualization Certification](https://www.freecodecamp.org/certification/DenXDev/data-visualization).
It fulfills the requirements for the "Visualize Data with a Heat Map" project challenge.
