<template>
  <section v-if="hasFairAssessment" class="mb-4">
    <h2>{{ $t('fairAssessment') }}</h2>
    <eox-chart
      :spec.prop="chartSpec"
      :dataValues.prop="chartData"
    ></eox-chart>
  </section>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import { mapState, mapGetters } from 'vuex';

export default defineComponent({
  data() {
    return {
      chartSpec: null,
      chartData: null,
    };
  },
  computed: {
    ...mapState(['data']),
    ...mapGetters(['isCollection']),
    hasFairAssessment() {
      if (!this.isCollection || !this.data) {
        return false;
      }
      return (
        (this.data.access && typeof this.data.access === 'object' && !Array.isArray(this.data.access)) ||
        Object.keys(this.data).some((key) => key.startsWith("fair:"))
      );
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(collection) {
        if (!collection || !this.hasFairAssessment) {
          this.chartSpec = null;
          this.chartData = null;
          return;
        }
        this.updateChart(collection);
      }
    }
  },
  methods: {
    updateChart(collection) {
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

      function prettify(str) {
        if (!str) return "";
        return str
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }

      const chartData = [];
      let totalMetrics = 0;
      let trueMetrics = 0;

      if (collection.access && typeof collection.access === 'object' && !Array.isArray(collection.access)) {
        for (const groupName in collection.access) {
          const groupData = collection.access[groupName];
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
        for (const key in fair_descriptions) {
          if (typeof collection[key] === "undefined") {
            continue;
          }

          const value = collection[key];
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

      const overallPercentage =
        totalMetrics > 0
          ? Math.round((trueMetrics / totalMetrics) * 100)
          : 0;

      const scoreData = [
        {
          percent: overallPercentage,
          label: `${overallPercentage}%`,
        },
      ];

      const chartSpec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "FAIR Accessibility Donut Chart",
        layer: [
          {
            data: { name: "myData" },
            mark: {
              type: "arc",
              outerRadius: 80,
              innerRadius: 50,
              stroke: "#fff",
            },
            encoding: {
              theta: { aggregate: "count", stack: true },
              color: { field: "group", type: "nominal", legend: null },
              opacity: {
                field: "score",
                type: "quantitative",
                scale: { range: [0.4, 1.0] },
                legend: null,
              },
              order: { field: "group" },
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
            data: { name: "myData" },
            mark: {
              type: "arc",
              outerRadius: 110,
              innerRadius: 80,
              stroke: "#fff",
            },
            encoding: {
              theta: {
                field: "metric",
                aggregate: "count",
                stack: true,
              },
              color: {
                field: "group",
                type: "nominal",
                title: "Access Category",
              },
              opacity: {
                "field": "score",
                "aggregate": "mean",
                "type": "quantitative",
                "scale": {"range": [0.3, 1.0]},
                "legend": null
              },
              order: { field: "group" },
              tooltip: [
                { field: "group", title: "Category" },
                { aggregate: "count", title: "Metrics" },
                {
                  "aggregate": "mean",
                  "field": "score",
                  "title": "Pass Rate",
                  "format": ".0%"
                }
              ],
            },
          },
          {
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
          stroke: null,
        },
      };

      this.chartSpec = markRaw(chartSpec);
      this.chartData = markRaw({
        myData: chartData,
        scoreData: scoreData,
      });
    }
  }
});
</script>

<style scoped>
eox-chart {
  width: 400px;
  height: 400px;
}
</style>
