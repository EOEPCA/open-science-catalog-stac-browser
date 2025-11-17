<template>
  <eox-chart
    :spec.prop="chartSpec"
    :dataValues.prop="chartData"
  ></eox-chart>
</template>

<script>
export default {
  data: () => ({
    chartSpec: null,
    chartData: null,
  }),
  props: {
    collection: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    // --- Data Processing ---

    /**
     * Helper function to convert keys like "acessible_files_rate" or "product"
     * into "Acessible files rate" or "Product"
     */
      function prettify(str) {
      if (!str) return "";
      return str
        .replace(/[_-]/g, " ") // Replace underscores/hyphens with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    }

    // Transform the nested JSON into a flat array for Vega-Lite
    const accessData = this.collection.access;
    if (!accessData) {
      // No access data available
      return;
    }
    const chartData = [];
    let totalMetrics = 0;
    let trueMetrics = 0;

    for (const groupName in accessData) {
      const groupData = accessData[groupName];
      
      // Create the clean, capitalized label for the group, e.g., "Product"
      const groupLabel = prettify(groupName.split(":").pop());

      for (const metricName in groupData) {
        const metricData = groupData[metricName];
        const value = metricData.value;
        const score = value ? 1 : 0; // 1 for true (pass), 0 for false (fail)
        
        // Create the clean label for the metric
        const metricLabel = prettify(metricName);

        chartData.push({
          group: groupName,
          groupLabel: groupLabel,
          metric: metricName,
          metricLabel: metricLabel,
          value: value,
          score: score,
          description: metricData.description,
        });

        totalMetrics++;
        if (value) {
          trueMetrics++;
        }
      }
    }

    // Calculate overall percentage for the center label
    const overallPercentage =
      totalMetrics > 0
        ? Math.round((trueMetrics / totalMetrics) * 100)
        : 0;

    // Create a separate data source for the center text
    const scoreData = [
      {
        percent: overallPercentage,
        label: `${overallPercentage}%`,
      },
    ];
    // --- End Data Processing ---

    // --- Vega-Lite Specification ---
    const chartSpec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      description: "FAIR Accessibility Donut Chart",
      layer: [
        {
          // Layer 1: Inner Ring (The Metrics)
          data: { name: "myData" },
          mark: {
            type: "arc",
            outerRadius: 80,
            innerRadius: 50,
            stroke: "#fff",
          },
          encoding: {
            // Each metric gets an equal slice
            theta: { aggregate: "count", stack: true },
            // Color matches the group
            color: { field: "group", type: "nominal", legend: null },
            // Opacity shows the individual score (pass/fail)
            opacity: {
              field: "score", // 0 or 1
              type: "quantitative",
              scale: { range: [0.4, 1.0] }, // 0=40%, 1=100%
              legend: null,
            },
            // Order segments by group to keep them together
            order: { field: "group" },
            // Add inner labels
            text: {
              field: "metricLabel",
              type: "nominal",
              fontSize: 9,
              color: "#333",
            },
            tooltip: [
              { field: "metricLabel", title: "Metric" },
              { field: "group", title: "Category" },
              { field: "value", title: "Passed" },
              { field: "description", title: "Description" },
            ],
          },
        },
        {
          // Layer 2: Outer Ring (The Groups)
          data: { name: "myData" },
          mark: {
            type: "arc",
            outerRadius: 110,
            innerRadius: 80,
            stroke: "#fff",
          },
          encoding: {
            // The angle (theta) is proportional to the count of metrics in the group
            theta: {
              field: "metric",
              aggregate: "count",
              stack: true,
            },
            // Color is based on the group name
            color: {
              field: "group",
              type: "nominal",
              title: "Access Category",
            },
            
            // *** THIS IS THE NEWLY ADDED SECTION ***
            // Opacity is the average score of the group (0.0 to 1.0)
            opacity: {
              "field": "score",
              "aggregate": "mean", // Calculates the average (pass rate)
              "type": "quantitative",
              // Map [0, 1] to [30%, 100%] so 0% is still visible
              "scale": {"range": [0.3, 1.0]}, 
              "legend": null
            },
            // *** END OF NEW SECTION ***

            // Order segments by group
            order: { field: "group" },
            tooltip: [
              { field: "group", title: "Category" },
              { aggregate: "count", title: "Metrics" },
              // Added pass rate to the group tooltip
              { 
                "aggregate": "mean", 
                "field": "score", 
                "title": "Pass Rate", 
                "format": ".0%" // Format as percentage
              }
            ],
          },
        },
        {
          // Layer 3: Outer Text Labels (for Groups)
          data: { name: "myData" },
          mark: {
            type: "text",
            radius: 125, 
            fill: "#444",
            fontSize: 10,
          },
          encoding: {
            theta: {
              field: "metric",
              aggregate: "count",
              stack: true,
            },
            text: { field: "groupLabel", type: "nominal" },
            order: { field: "group" },
          },
        },
        {
          // Layer 4: Center Text (The Score)
          data: { name: "scoreData" },
          mark: {
            type: "text",
            fontSize: 30,
            fontWeight: "bold",
            color: "#111",
          },
          encoding: {
            text: { field: "label", type: "nominal" },
          },
        },
      ],
      view: {
        // Remove the default square border around the chart
        stroke: null,
      },
    };
    // --- End Spec ---

    this.chartSpec = chartSpec;
    this.chartData = {
      myData: chartData,
      scoreData: scoreData,
    };
  }
};
</script>

<style scoped>
eox-chart {
  width: 400px;
  height: 400px;
}
</style>