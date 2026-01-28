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
    const fair_descriptions = {
      "fair:product_url_resolves": "Test whether the dataset URL resolves successfully.",
      "fair:product_has_doi": "Test whether the dataset has an associated DOI.",
      "fair:product_has_documentation": "Test whether the dataset has documentation.",
      "fair:product_approved_metadata_domain": "Test whether the metadata is hosted on an approved domain.",
      "fair:product_approved_data_domain": "Test whether the data is hosted on an approved domain.",
      "fair:file_access": "Test whether the metadata has per-file metadata, or if the data is a raw dump.",
      "fair:file_acessible_files_rate": "Percent of assets that could be opened in tests.",
      "fair:file_cloud_assets_rate": "Percent of assets that are in cloud-optimised format.",
      "fair:workflow_exists": "Dataset has associated workflow."
    };

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

    const chartData = [];
    let totalMetrics = 0;
    let trueMetrics = 0;

    if (this.collection.access && typeof this.collection.access === 'object' && !Array.isArray(this.collection.access)) {
      // Old structure
      for (const groupName in this.collection.access) {
        const groupData = this.collection.access[groupName];
        const groupLabel = prettify(groupName.split(":").pop());

        for (const metricName in groupData) {
          const metricData = groupData[metricName];
          const value = metricData.value;
          const score = (typeof value === "number" ? value >= 0.5 : value) ? 1 : 0;
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
          trueMetrics += score;
        }
      }
    } else {
      // New structure
      for (const key in fair_descriptions) {
        if (typeof this.collection[key] === "undefined") {
          continue;
        }

        const value = this.collection[key];
        const metricName = key.replace("fair:", "");
        const groupName = metricName.split("_")[0];

        const groupLabel = prettify(groupName);
        const metricLabel = prettify(metricName.replace(groupName + "_", ""));

        let score = 0;
        if (typeof value === "boolean") {
          score = value ? 1 : 0;
        } else if (typeof value === "number") {
          score = value >= 0.5 ? 1 : 0;
        }

        chartData.push({
          group: groupName,
          groupLabel: groupLabel,
          metric: key,
          metricLabel: metricLabel,
          value: value,
          score: score,
          description: fair_descriptions[key],
        });

        totalMetrics++;
        trueMetrics += score;
      }
    }

    if (chartData.length === 0) {
      return;
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
            
            // Opacity is the average score of the group (0.0 to 1.0)
            opacity: {
              "field": "score",
              "aggregate": "mean", // Calculates the average (pass rate)
              "type": "quantitative",
              // Map [0, 1] to [30%, 100%] so 0% is still visible
              "scale": {"range": [0.3, 1.0]}, 
              "legend": null
            },

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