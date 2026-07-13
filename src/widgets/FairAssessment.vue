<template>
  <section v-if="hasFairAssessment" class="mb-4">
    <h2 class="mb-3">{{ $t('fairAssessment') }}</h2>
    <div class="row align-items-start">
      <!-- Left column: Donut Chart -->
      <div class="col-lg-6 col-12 d-flex justify-content-center mb-4 mb-lg-0">
        <eox-chart
          :spec.prop="chartSpec"
          :dataValues.prop="chartData"
        />
      </div>
      
      <!-- Right column: FAIR Categories Table / Checklist Accordion -->
      <div class="col-lg-6 col-12">
        <div class="fair-table">
          <div 
            v-for="category in categories" 
            :key="category.key" 
            class="card mb-3"
            :style="{ borderLeft: `4px solid ${categoryColor(category.key)} !important`, paddingLeft: '12px', borderRadius: '0px !important' }"
          >
            <!-- Summary Row Header -->
            <div 
              class="card-header d-flex justify-content-between align-items-center cursor-pointer bg-white py-3"
              @click="toggleGroup(category.key)"
            >
              <div class="d-flex align-items-center">
                <span class="fw-bold me-2" :style="{ fontSize: '16px !important', color: categoryColor(category.key) }">
                  {{ category.name }}
                </span>
              </div>
              <div class="d-flex align-items-center gap-2 text-nowrap">
                <span class="fw-semibold text-secondary" style="font-size: 14px; white-space: nowrap;">
                  {{ category.passed }} / {{ category.total }} ({{ category.percentage }}%)
                </span>
                <span :style="badgeStyle(category.level)">
                  {{ category.level }}
                </span>
                <span class="text-muted d-flex align-items-center justify-content-center">
                  <svg v-if="isExpanded(category.key)" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </div>
            </div>
            
            <!-- Expanded Checklist Body -->
            <div v-if="isExpanded(category.key)" class="card-body p-0 animate-fade">
              <div 
                v-for="metric in category.metrics" 
                :key="metric.metric" 
                class="py-2.5 px-0 d-flex align-items-start border-bottom last-border-none"
                style="border-bottom: 1px solid rgba(0,0,0,0.06) !important;"
              >
                <!-- Pass/Fail Checklist Icon -->
                <div class="me-3 mt-1 d-flex align-items-center justify-content-center" style="width: 20px;">
                  <span v-if="metric.score === 1" class="text-success fw-bold fs-5" title="Passed">
                    ✓
                  </span>
                  <span v-else class="text-danger fw-bold fs-5" title="Failed">
                    ✗
                  </span>
                </div>
                <!-- Metric Label & Description -->
                <div class="flex-grow-1">
                  <div class="fw-bold text-dark mb-0.5" style="font-size: 0.95rem;">
                    {{ metric.metricLabel }}
                  </div>
                  <div class="text-secondary" style="font-size: 0.85rem; line-height: 1.4;">
                    {{ metric.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      metricsList: [],
      expandedGroups: [],
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
    categories() {
      if (!this.metricsList || this.metricsList.length === 0) {
        return [];
      }
      const groups = {};
      this.metricsList.forEach(item => {
        const groupKey = item.group;
        if (!groups[groupKey]) {
          groups[groupKey] = {
            name: item.groupLabel,
            key: groupKey,
            passed: 0,
            total: 0,
            metrics: []
          };
        }
        groups[groupKey].total++;
        if (item.score === 1) {
          groups[groupKey].passed++;
        }
        groups[groupKey].metrics.push(item);
      });
      return Object.values(groups).map(g => {
        const percentage = g.total > 0 ? Math.round((g.passed / g.total) * 100) : 0;
        return {
          ...g,
          percentage,
          level: this.getFairLevel(percentage)
        };
      });
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(collection) {
        if (!collection || !this.hasFairAssessment) {
          this.chartSpec = null;
          this.chartData = null;
          this.metricsList = [];
          return;
        }
        this.updateChart(collection);
      }
    }
  },
  methods: {
    getFairLevel(percent) {
      if (percent === 100) return "Advanced";
      if (percent >= 70) return "Moderate";
      if (percent >= 30) return "Initial";
      return "Incomplete";
    },
    categoryColor(groupKey) {
      const groupLower = groupKey.toLowerCase();
      if (groupLower.includes("findable")) return "#f58518";
      if (groupLower.includes("accessible")) return "#4c78a8";
      if (groupLower.includes("interoperable")) return "#e15759";
      return "#76b7b2";
    },
    badgeStyle(level) {
      const baseStyles = {
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.8rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        whiteSpace: "nowrap"
      };
      if (level === "Advanced") {
        return { ...baseStyles, backgroundColor: "#145c32", color: "#ffffff" };
      }
      if (level === "Moderate") {
        return { ...baseStyles, backgroundColor: "#0b4f6c", color: "#ffffff" };
      }
      if (level === "Initial") {
        return { ...baseStyles, backgroundColor: "#b25e00", color: "#ffffff" };
      }
      return { ...baseStyles, backgroundColor: "#a8201a", color: "#ffffff" };
    },
    toggleGroup(groupKey) {
      const idx = this.expandedGroups.indexOf(groupKey);
      if (idx > -1) {
        this.expandedGroups.splice(idx, 1);
      } else {
        this.expandedGroups.push(groupKey);
      }
    },
    isExpanded(groupKey) {
      return this.expandedGroups.includes(groupKey);
    },
    updateChart(collection) {
      const fair_descriptions = {
        // --- FINDABLE ---
        "fair:Findable_has_doi": "F1 — The dataset has an associated globally unique, persistent DOI.",
        "fair:Findable_rich_metadata": "F2 — The metadata is richly described using the OSC extension.",
        "fair:Findable_identifier": "F3 — The metadata clearly and explicitly include the identifier of the data it describes",
        "fair:Findable_stac_assets": "F3.1 — The metadata has per-file STAC items or assets that explicitly include the identifier of the data it describes.",
        "fair:Findable_indexed": "F4 — The (meta)data are registered or indexed in a searchable resource.",
        "fair:Findable_indexed_approved_metadata": "F4.1 — The metadata are registered or indexed in an approved domain.",
        "fair:Findable_indexed_approved_data": "F4.2 — The data are registered or indexed in an approved domain.",

        // --- ACCESSIBLE ---
        "fair:Accessible_general": "A1 —  Metadata are accessible over HTTPS via STAC API, OGC CSW (20.2/3.0.0), OpenSearch, OAI-PMH, or SRU.",
        "fair:Accessible_protocols": "A1.1 — Protocols are open, free, and universally implementable.",
        "fair:Accessible_files": "A1.2 — The percentage of randomly chosen assets that were successfully opened programatically.",
        "fair:Accessible_metadata": "A2 — Metadata are accessible, even when the data are no longer available",

        // --- INTEROPERABLE ---
        "fair:Interoperable_uses_formal_language": "I1 — The metadata uses formal, accessible representation languages (e.g., JSON in STAC).",
        "fair:Interoperable_controlled_vocabularies": "I2 — The dataset adopts controlled FAIR vocabularies aligned with CF Standard Names and GCMD Keywords via the STAC OSC extension.",
        "fair:Interoperable_related_links": "I3 — The dataset has qualified links to related projects, experiments, themes, and variables.",
        "fair:Interoperable_has_documentation": "I3 — The dataset has additional information such as guides, research papers and others.",

        // --- REUSABLE ---
        "fair:Reusable_rich_descriptions": "R1 — The dataset provides rich, domain-appropriate descriptions about variables, themes, and spatial/temporal extent.",
        "fair:Reusable_has_license": "R1.1 — The products are published with clear, standardized licenses.",
        "fair:Reusable_workflow_exists": "R1.2 — The dataset has an associated workflow to record processing provenance.",
        "fair:Reusable_cloud_assets_rate": "R1.3 — The percentage of assets that align with community standards by being in cloud-native formats (e.g., Zarr, COG, GeoParquet).",
        "fair:Reusable_has_visualisation": "R1.4 — The dataset has an associated visualisation dashboard, notebooks or tools.",
        "fair:Reusable_has_access_example": "R1.5 — The dataset has an associated access example script or notebook.",
      };

      function prettify(str) {
        if (!str) {return "";}
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
            let metricLabel = prettify(metricName);
            let description = metricData.description || "";
            if (description && description.includes(" — ")) {
              metricLabel = description.split(" — ")[0].trim();
              description = description.split(" — ").slice(1).join(" — ").trim();
            }

            let groupOrder = 4;
            let normalizedGroup = "Reusable";
            const groupLower = groupName.toLowerCase();
            if (groupLower.includes("findable")) {
              groupOrder = 1;
              normalizedGroup = "Findable";
            } else if (groupLower.includes("accessible")) {
              groupOrder = 2;
              normalizedGroup = "Accessible";
            } else if (groupLower.includes("interoperable")) {
              groupOrder = 3;
              normalizedGroup = "Interoperable";
            }

            chartData.push({
              group: normalizedGroup,
              groupLabel: groupLabel,
              groupOrder: groupOrder,
              metric: metricName,
              metricLabel: metricLabel,
              value: value,
              score: score,
              description: description,
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

          let value = collection[key];

          const metricName = key.replace("fair:", "");
          const groupName = metricName.split("_")[0];

          const groupLabel = prettify(groupName);
          let metricLabel = prettify(metricName.replace(groupName + "_", ""));
          let description = fair_descriptions[key];
          if (description && description.includes(" — ")) {
            metricLabel = description.split(" — ")[0].trim();
            description = description.split(" — ").slice(1).join(" — ").trim();
          }

          let groupOrder = 4;
          let normalizedGroup = "Reusable";
          const groupLower = groupName.toLowerCase();
          if (groupLower.includes("findable")) {
            groupOrder = 1;
            normalizedGroup = "Findable";
          } else if (groupLower.includes("accessible")) {
            groupOrder = 2;
            normalizedGroup = "Accessible";
          } else if (groupLower.includes("interoperable")) {
            groupOrder = 3;
            normalizedGroup = "Interoperable";
          }

          let score = 0;
          if (typeof value === "boolean") {
            score = value ? 1 : 0;
          } else if (typeof value === "number") {
            score = value >= 0.5 ? 1 : 0;
          }

          chartData.push({
            group: normalizedGroup,
            groupLabel: groupLabel,
            groupOrder: groupOrder,
            metric: key,
            metricLabel: metricLabel,
            value: value,
            score: score,
            description: description,
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
        background: "transparent",
        layer: [
          {
            data: { name: "myData" },
            mark: {
              type: "arc",
              outerRadius: 120,
              innerRadius: 60,
              stroke: "#fff",
            },
            encoding: {
              theta: { aggregate: "count", stack: true },
              color: { 
                field: "group", 
                type: "nominal", 
                scale: {
                  domain: ["Findable", "Accessible", "Interoperable", "Reusable"],
                  range: ["#f58518", "#4c78a8", "#e15759", "#76b7b2"]
                },
                legend: null 
              },
              opacity: {
                field: "score",
                type: "quantitative",
                scale: { range: [0.4, 1.0] },
                legend: null,
              },
              order: { field: "groupOrder", type: "quantitative" },
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
              type: "text",
              radius: 90,
              fill: "#fff",
              fontSize: 9,
              fontWeight: "bold",
            },
            encoding: {
              theta: {
                field: "metric",
                aggregate: "count",
                stack: true,
              },
              text: { field: "metricLabel", type: "nominal" },
              order: { field: "groupOrder", type: "quantitative" },
            },
          },
          {
            data: { name: "myData" },
            mark: {
              type: "arc",
              outerRadius: 140,
              innerRadius: 120,
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
                scale: {
                  domain: ["Findable", "Accessible", "Interoperable", "Reusable"],
                  range: ["#f58518", "#4c78a8", "#e15759", "#76b7b2"]
                },
                title: "Access Category",
              },
              opacity: {
                "field": "score",
                "aggregate": "mean",
                "type": "quantitative",
                "scale": {"range": [0.3, 1.0]},
                "legend": null
              },
              order: { field: "groupOrder", type: "quantitative" },
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
              radius: 155,
              fill: "#003247",
              fontSize: 11,
              fontWeight: "bold",
            },
            encoding: {
              theta: {
                field: "metric",
                aggregate: "count",
                stack: true,
              },
              text: { field: "groupLabel", type: "nominal" },
              order: { field: "groupOrder", type: "quantitative" },
            },
          },
          {
            data: { name: "scoreData" },
            mark: {
              type: "text",
              fontSize: 34,
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
      this.metricsList = chartData;
      // Start collapsed by default
      this.expandedGroups = [];
    }
  }
});
</script>

<style scoped>
eox-chart {
  width: 380px;
  height: 380px;
  margin-top: -30px;
}
.fair-table {
  max-height: 380px;
  overflow-y: auto;
  padding-right: 6px;
}
.fair-table::-webkit-scrollbar {
  width: 6px;
}
.fair-table::-webkit-scrollbar-track {
  background: transparent;
}
.fair-table::-webkit-scrollbar-thumb {
  background-color: rgba(0, 50, 71, 0.2);
  border-radius: 4px;
}
.fair-table::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 50, 71, 0.35);
}
.fair-table .card {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
.fair-table .card-header {
  background: #ffffff !important;
  border: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: sticky;
  top: -2px;
  z-index: 10;
}
.cursor-pointer {
  cursor: pointer;
}
.gap-3 {
  gap: 1rem;
}
.last-border-none:last-child {
  border-bottom: none !important;
}
.animate-fade {
  animation: fadeIn 0.15s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
