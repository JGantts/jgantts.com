import { gaussians } from './gausians';

let widthInSuperPixels = 0;
let heightInSuperPixels = 0;
let widthInLargePixels = 0;
let heightInLargePixels = 0;
let widthInFinePixels = 0;
let heightInFinePixels = 0;

const MULTIPLIERS = {
  SUPER: { SELF: 1, FAMILY: 10 },
  LARGE: { TRANSDIM: 4, SELF: 1, FAMILY: 10 },
  FINE: { TRANSDIM: 4, SELF: 1, FAMILY: 20 },
};

const PIXEL_SIZES = {
  FINE: 1,
  LARGE: 8,
  SUPER: 64,
};

const PIXELATION_RATIOS = {
  SUPER_LARGE: PIXEL_SIZES.SUPER / PIXEL_SIZES.LARGE, // 8
  LARGE_FINE: PIXEL_SIZES.LARGE / PIXEL_SIZES.FINE,   // 8
};

const TOP_BUFFER_PIXEL = 34;

// Corrected declarations: Use consistent data structures
let pixelColumnsSuper: { data: Float32Array; index: number }[] = [];
let pixelColumnsLarge: { data: Float32Array; index: number }[] = [];
let pixelColumnsFine: { data: Float32Array; index: number }[] = [];

function reconPixels(
  pixelColumns: { data: Float32Array; index: number }[],
  calculateColumn: (index: number) => void,
  heightInPixels: number
) {
  const targetLength = (heightInPixels + TOP_BUFFER_PIXEL * 2) * 2; // *2 for saturation and lightness
  while (pixelColumns[0].index < targetLength) {
    for (let i = 0, len = pixelColumns.length; i < len; i++) {
      calculateColumn(i);
    }
  }
}

function calculateColumn(
  pixelColumns: { data: Float32Array; index: number }[],
  index: number,
  level: 'SUPER' | 'LARGE' | 'FINE',
  ancestorColumns?: { data: Float32Array; index: number }[],
  pixelationRatio?: number
) {
  const column = pixelColumns[index];
  const pos = column.index;
  const dataLength = column.data.length;

  // Check if there's enough space to write new data
  if (pos + 2 > dataLength) {
    console.error(`Not enough space in column data for index ${index} at position ${pos}`);
    return;
  }

  let saturation = Math.random() * 80 + 40;
  let lightness = Math.random() * 100 - 50;

  let sumSaturation = 0;
  let sumLightness = 0;
  let colorsAdded = 0;

  // Parent pixel
  if (pos >= 2) {
    let currentSaturation = column.data[pos - 2];
    let currentLightness = column.data[pos - 1];
    if (Number.isFinite(currentSaturation) && Number.isFinite(currentLightness)) {
      sumSaturation += currentSaturation
      sumLightness += currentLightness
      colorsAdded++;
    }
  }

  // Left cousin
  if (index > 0) {
    const leftColumn = pixelColumns[index - 1];
    if (leftColumn.index >= pos) {
      let currentSaturation = leftColumn.data[pos - 2];
      let currentLightness = leftColumn.data[pos - 1];
      if (Number.isFinite(currentSaturation) && Number.isFinite(currentLightness)) {
        sumSaturation += currentSaturation
        sumLightness += currentLightness
        colorsAdded++;
      }
    }
  }

  // Right cousin
  if (index < pixelColumns.length - 1) {
    const rightColumn = pixelColumns[index + 1];
    if (rightColumn.index >= pos) {
      let currentSaturation = rightColumn.data[pos - 2];
      let currentLightness = rightColumn.data[pos - 1];
      if (Number.isFinite(currentSaturation) && Number.isFinite(currentLightness)) {
        sumSaturation += currentSaturation
        sumLightness += currentLightness
        colorsAdded++;
      }
    }
  }

  if (colorsAdded > 0) {
    const avgSaturation = sumSaturation / colorsAdded;
    const avgLightness = sumLightness / colorsAdded;

    let multiplierSum = MULTIPLIERS[level].SELF + MULTIPLIERS[level].FAMILY;
    let totalSaturation =
      MULTIPLIERS[level].SELF * saturation +
      MULTIPLIERS[level].FAMILY * avgSaturation;
    let totalLightness =
      MULTIPLIERS[level].SELF * lightness +
      MULTIPLIERS[level].FAMILY * avgLightness;

    if (level !== 'SUPER' && ancestorColumns && pixelationRatio) {
      const ancestorIndex = Math.floor(index / pixelationRatio);
      const ancestorColumn = ancestorColumns[ancestorIndex];
      const ancestorPos = Math.floor(pos / pixelationRatio) + TOP_BUFFER_PIXEL * 2;
      const ancIdx = ancestorPos * 2;
      if (ancIdx + 1 < ancestorColumn.index) {
        const ancestorSaturation = ancestorColumn.data[ancIdx];
        const ancestorLightness = ancestorColumn.data[ancIdx + 1];
        totalSaturation += MULTIPLIERS[level].TRANSDIM * ancestorSaturation;
        totalLightness += MULTIPLIERS[level].TRANSDIM * ancestorLightness;
        multiplierSum += MULTIPLIERS[level].TRANSDIM;
      }
    }

    saturation = totalSaturation / multiplierSum;
    lightness = totalLightness / multiplierSum;
  }

  column.data[pos] = saturation;
  column.data[pos + 1] = lightness;
  column.index += 2;
}

self.onmessage = (event) => {
  const data = event.data;

  widthInLargePixels = Math.ceil(data.width / PIXEL_SIZES.LARGE) + 1;
  heightInLargePixels = Math.ceil(data.height / PIXEL_SIZES.LARGE) + 1;
  widthInSuperPixels = Math.ceil(widthInLargePixels / PIXELATION_RATIOS.SUPER_LARGE);
  heightInSuperPixels = Math.ceil(heightInLargePixels / PIXELATION_RATIOS.SUPER_LARGE);
  widthInFinePixels = widthInLargePixels * PIXELATION_RATIOS.LARGE_FINE;
  heightInFinePixels = heightInLargePixels * PIXELATION_RATIOS.LARGE_FINE;

  // Reinitialize pixelColumns as empty arrays
  pixelColumnsSuper = [];
  pixelColumnsLarge = [];
  pixelColumnsFine = [];

  const gaussianConfigs = [
    { width: widthInSuperPixels, columns: pixelColumnsSuper, heightInPixels: heightInSuperPixels },
    { width: widthInLargePixels, columns: pixelColumnsLarge, heightInPixels: heightInLargePixels },
    { width: widthInFinePixels, columns: pixelColumnsFine, heightInPixels: heightInFinePixels },
  ];

  for (const { width, columns, heightInPixels } of gaussianConfigs) {
    const maxLength = (heightInPixels + TOP_BUFFER_PIXEL * 2) * 2; // *2 for saturation and lightness
    for (let i = 0; i < width; i++) {
      columns.push({
        data: new Float32Array(maxLength),
        index: 0,
      });
    }
  }

  reconPixels(
    pixelColumnsSuper,
    (i) => calculateColumn(pixelColumnsSuper, i, 'SUPER'),
    heightInSuperPixels
  );

  reconPixels(
    pixelColumnsLarge,
    (i) =>
      calculateColumn(
        pixelColumnsLarge,
        i,
        'LARGE',
        pixelColumnsSuper,
        PIXELATION_RATIOS.SUPER_LARGE
      ),
    heightInLargePixels
  );

  reconPixels(
    pixelColumnsFine,
    (i) =>
      calculateColumn(
        pixelColumnsFine,
        i,
        'FINE',
        pixelColumnsLarge,
        PIXELATION_RATIOS.LARGE_FINE
      ),
    heightInFinePixels
  );

  // Prepare data for posting back
  function prepareColumnsForPost(
    pixelColumns: { data: Float32Array; index: number }[]
  ): number[][] {
    return pixelColumns.map((column) => {
      return Array.from(column.data.subarray(0, column.index));
    });
  }

  self.postMessage({
    pixelColumnsSuper: prepareColumnsForPost(pixelColumnsSuper),
    pixelColumnsLarge: prepareColumnsForPost(pixelColumnsLarge),
    pixelColumnsFine: prepareColumnsForPost(pixelColumnsFine),
    widthInLargePixels,
    heightInLargePixels,
    widthInSuperPixels,
    heightInSuperPixels,
    widthInFinePixels,
    heightInFinePixels,
  });
};
