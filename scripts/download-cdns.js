import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assets = [
  {
    url: "https://cdn.jsdelivr.net/npm/@eox/itemfilter@1.17.3/dist/eox-itemfilter.js",
    dest: "public/eox/eox-itemfilter.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@eox/map@2.6.1/dist/eox-map.js",
    dest: "public/eox/eox-map.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@eox/map@2.6.1/dist/eox-map-advanced-layers-and-sources.js",
    dest: "public/eox/eox-map-advanced-layers-and-sources.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@eox/timecontrol@2.5.0/dist/eox-timecontrol.js",
    dest: "public/eox/eox-timecontrol.js",
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@eox/chart@1.2.0/dist/eox-chart.js",
    dest: "public/eox/eox-chart.js",
  },
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      const file = fs.createWriteStream(destPath);

      file.on("error", (err) => {
        reject(err);
      });

      https
        .get(url, (response) => {
          if (
            response.statusCode >= 300 &&
            response.statusCode < 400 &&
            response.headers.location
          ) {
            // Handle redirect
            download(response.headers.location, destPath).then(resolve, reject);
            return;
          }
          if (response.statusCode !== 200) {
            reject(
              new Error(
                `Failed to download ${url} (${response.statusCode})`
              )
            );
            return;
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}

let runningPromise = null;

export function run() {
  if (runningPromise) {
    return runningPromise;
  }

  runningPromise = (async () => {
    const dir = path.join(__dirname, "../public/eox");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const force = process.argv.includes("--force");

    console.log("Checking external CDN assets for local cache...");
    for (const asset of assets) {
      const fullDest = path.join(__dirname, "..", asset.dest);
      if (fs.existsSync(fullDest) && !force) {
        console.log(`Asset ${asset.dest} already cached. Skipping download.`);
        continue;
      }

      console.log(`Downloading ${asset.url} to ${asset.dest}...`);
      try {
        await download(asset.url, fullDest);
        console.log(`Successfully downloaded ${asset.dest}`);
      } catch (err) {
        console.error(`Error downloading ${asset.url}:`, err);
        // Clear runningPromise on failure so it can be retried
        runningPromise = null;
        process.exit(1);
      }
    }
    console.log("All external CDN assets ready!");
  })();

  return runningPromise;
}

if (process.argv[1] && process.argv[1].endsWith('download-cdns.js')) {
  run();
}
