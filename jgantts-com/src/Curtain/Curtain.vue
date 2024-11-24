<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Mutex } from 'async-mutex';

// @ts-ignore
import { Smooth } from '../assets/Smooth'

import type { Color, Rainbow } from './Types';
import { BackgroundState, RainbowDirection } from './Types';

import { gaussians } from './gausians';

let PIXELATED_FINE_BOX_SIZE = 1
let PIXELATED_LARGE_BOX_SIZE = 8
let PIXELATED_SUPER_BOX_SIZE = 64
let PIXELATION_RATIO_SUPER_LARGE = Math.floor(PIXELATED_SUPER_BOX_SIZE / PIXELATED_LARGE_BOX_SIZE)
let PIXELATION_RATIO_LARGE_FINE = Math.floor(PIXELATED_LARGE_BOX_SIZE / PIXELATED_FINE_BOX_SIZE)
let PIXELATION_RATIO_LARGE_SUPER = Math.ceil(PIXELATED_LARGE_BOX_SIZE / PIXELATED_LARGE_BOX_SIZE)

let SMOOTHED_BOX_SIZE = 6

let TOP_BUFFER_PIXEL = 34

type Position = {
  x: number,
  y: number
}

type ColorOffset = {
  saturation: number,
  lightness: number
}

type GaussianObject = {
  position: number,
  velocity: number,
  acceleration: number,
  jolt: number,
}

/*
  Initialize variables
*/

let gaussianObjects: GaussianObject[]

let canvasContext: CanvasRenderingContext2D
let canvasElement: HTMLCanvasElement

let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

function throttledResizeHandler() {
  if (resizeTimeout) {
    return
  }
  resizedWindow();
  resizeTimeout = setTimeout(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = undefined
  }, 200);
}

async function resizedWindow() {
  await initializeBackground()
}

let widthInSuperPixels = 0
let heightInSuperPixels = 0

let widthInLargePixels = 0
let heightInLargePixels = 0

let widthInFinePixels = 0
let heightInFinePixels = 0

// Adjusted declarations to handle number arrays
let pixelColumnsSuper: number[][] = []
let pixelColumnsLarge: number[][] = []
let pixelColumnsFine: number[][] = []

/*
  Rendering functions
*/
async function initializeBackground() {
  const width = window.visualViewport?.width || canvasElement.clientWidth
  const height = window.visualViewport?.height || canvasElement.clientHeight

  doneAnimatingCurtain = false

  const ratio = window.devicePixelRatio || 1;
  if (canvasElement.width != width * ratio || canvasElement.height != height * ratio) {
    canvasElement.width = width * ratio;
    canvasElement.height = height * ratio;
    // Optionally scale the context if needed
    // canvasContext.scale(ratio, ratio);
  }

  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

  let messageQueue: MessageEvent[] = [];
  let processingAllowed: boolean = false;
  let queueLock: Mutex = new Mutex()

  async function handleWorkerMessage(event: MessageEvent) {
    pixelColumnsSuper = event.data.pixelColumnsSuper
    pixelColumnsLarge = event.data.pixelColumnsLarge
    pixelColumnsFine = event.data.pixelColumnsFine

    widthInLargePixels = event.data.widthInLargePixels
    heightInLargePixels = event.data.heightInLargePixels
    widthInSuperPixels = event.data.widthInSuperPixels
    heightInSuperPixels = event.data.heightInSuperPixels
    widthInFinePixels = event.data.widthInFinePixels
    heightInFinePixels = event.data.heightInFinePixels
    
    const playCurtain = async () => {
      if (playStateInternal != BackgroundState.First) {
        playStateInternal = BackgroundState.AfterFirstPlaying
      }
      await paintPixelsFine()
      window.requestAnimationFrame(renderLoop)
    }
    await initializeCurtain()
    emit('stageEntrance')
    playCurtain()
  }

  setTimeout(() => {
    queueLock.runExclusive(async () => {
      processingAllowed = true;
      // Process any messages that arrived during the delay
      for (const event of messageQueue) {
        handleWorkerMessage(event)
      }
      // Clear the message queue
      messageQueue = []
    })
  }, 3)

  worker.onmessage = (event: MessageEvent): void => {
    console.log("message")
    queueLock.runExclusive(async () => {
      if (processingAllowed) {
        // If processing is allowed, handle the message immediately
        handleWorkerMessage(event)
      } else {
        // If not allowed yet, store the message in the queue
        messageQueue.push(event)
      }
    })
  }

  worker.postMessage({
    width: canvasElement.width,
    height: canvasElement.height,
  })
}

async function initializeCurtain() {
  doneAnimatingCurtain = false
  const ratio = window.devicePixelRatio || 1;
  let countToAddSmoothed = ratio * widthInLargePixels * PIXELATED_LARGE_BOX_SIZE / SMOOTHED_BOX_SIZE

  let curve = {
    pos: { low: -300, high: 0 },
    velo: { low: 0, high: 5 },
    acc: { low: 5, high: 10 },
    jolt: { low: -5, high: 5 },
  }

  let gaussianSumsPosition: number[] = gaussians(
    countToAddSmoothed,
    () => { return Math.random() * 90 + 10 },
    curve.pos.low, curve.pos.high
  )
  let gaussianSumsVelocity: number[] = gaussians(
    countToAddSmoothed,
    () => { return Math.random() * 90 + 10 },
    curve.velo.low * (1 / 10), curve.velo.high * (1 / 10)
  )
  let gaussianSumsAcceleration: number[] = gaussians(
    countToAddSmoothed,
    () => { return Math.random() * 90 + 10 },
    curve.acc.low * (1 / 1000), curve.acc.high * (1 / 1000)
  )
  let gaussianSumsJolt: number[] = gaussians(
    countToAddSmoothed,
    () => { return Math.random() * 90 + 10 },
    curve.jolt.low * (1 / 1000000), curve.jolt.high * (1 / 1000000)
  )

  gaussianObjects = []
  for (let index = 0; index < countToAddSmoothed; index++) {
    gaussianObjects.push({
      position: gaussianSumsPosition[index] - 500 * (Math.abs(index - 0.15 * countToAddSmoothed)) / countToAddSmoothed,
      velocity: gaussianSumsVelocity[index],
      acceleration: gaussianSumsAcceleration[index],
      jolt: gaussianSumsJolt[index],
    })
  }

  const width = window.visualViewport?.width || canvasElement.clientWidth
  const height = window.visualViewport?.height || canvasElement.clientHeight

  if (clientWidthInitial != width * (window.devicePixelRatio || 1)) {
    clientWidthInitial = width * (window.devicePixelRatio || 1)
    clientHeightInitial = height * (window.devicePixelRatio || 1)
  }
}

let clientWidthInitial = 0
let clientHeightInitial = 0

enum AnimationState {
  AboveTop,
  Inside,
  BelowBottom,
}

let state: AnimationState | null = null
async function renderLoop() {
  await pauseMutex.runExclusive(async () => {
    if (playStateInternal == BackgroundState.AfterFirstPaused) {
      return
    }
    do {
      state = await renderScene(state)
    } while (state == null || state == AnimationState.AboveTop)
    if (state == AnimationState.Inside) {
      window.requestAnimationFrame(renderLoop)
    }
  })
}


let backgroundPattern: CanvasPattern | null = null
let backgroundPatternAlpha: CanvasPattern | null = null

let previousTime: number | null = null

let doneAnimatingCurtain = false
async function renderScene(state: AnimationState | null): Promise<AnimationState> {
  if (doneAnimatingCurtain) {
    return AnimationState.BelowBottom
  }

  let deltaTime: number
  if (state != AnimationState.Inside) {
    deltaTime = 1;
  } else {
    if (!previousTime) {
      previousTime = performance.now()
      deltaTime = 1
    } else {
      let currentTime = performance.now()
      deltaTime = (currentTime - previousTime) / 16
      previousTime = currentTime
    }
  }
  if (deltaTime > 10) {
    deltaTime = 1
  }

  for (let index = 0; index < gaussianObjects.length; index++) {
    gaussianObjects[index].acceleration += gaussianObjects[index].jolt * deltaTime
    gaussianObjects[index].velocity += gaussianObjects[index].acceleration * deltaTime
    // friction
    gaussianObjects[index].velocity *= 0.999
    gaussianObjects[index].position += gaussianObjects[index].velocity * deltaTime
  }

  //@ts-ignore
  let gaussionSmoothed = Smooth(gaussianObjects.map(objct => objct.position))

  let smoothedY: number[] = []

  let index = 0
  let eachIsAbove = true
  let eachIsBelow = true
  for (; index < gaussianObjects.length * SMOOTHED_BOX_SIZE; index++) {
    let smoothedIndex = index / SMOOTHED_BOX_SIZE
    smoothedY[smoothedIndex] = gaussionSmoothed(smoothedIndex)
    if (smoothedY[smoothedIndex] >= -5 ) {
      eachIsAbove = false
    }
    if (smoothedY[smoothedIndex] <= clientHeightInitial + 5 ) {
      eachIsBelow = false
    }
  }

  if (eachIsAbove) {
    return AnimationState.AboveTop
  }
  if (eachIsBelow) {
    playStateInternal = BackgroundState.AfterFirstPaused
    emit('curtainCall', '')
    doneAnimatingCurtain = true
    return AnimationState.BelowBottom
  }

  canvasContext.beginPath()
  index = 0
  canvasContext.moveTo(index, smoothedY[0])
  index++
  for (; index < gaussianObjects.length * SMOOTHED_BOX_SIZE; index++) {
    canvasContext.lineTo(index, smoothedY[index / SMOOTHED_BOX_SIZE] + 16)
  }
  canvasContext.lineTo(clientWidthInitial, 0)
  canvasContext.lineTo(0, 0)
  canvasContext.closePath()

  canvasContext.fillStyle = backgroundPattern ?? "black"
  canvasContext.fill()

  return AnimationState.Inside
}

// Define constants and types at the top for clarity
const BORDER_MULTI = 1;

// Predefine ImageData objects to reuse
let renderedPixelsFine: ImageData;
let renderedPixelsFineAlpha: ImageData;

// Initialize ImageData once to avoid recreating it every time
function initializeImageData(width: number, height: number) {
  renderedPixelsFine = new ImageData(width, height);
  renderedPixelsFineAlpha = new ImageData(width, height);
}

// Optimized `paintPixelsFine` function
async function paintPixelsFine() {
  // Initialize ImageData if not already done
  if (!renderedPixelsFine || !renderedPixelsFineAlpha) {
    initializeImageData(widthInFinePixels, heightInFinePixels);
  } else {
    // Reset ImageData by setting all data to 0
    renderedPixelsFine.data.fill(0);
    renderedPixelsFineAlpha.data.fill(0);
  }

  const dataFine = renderedPixelsFine.data;
  const dataFineAlpha = renderedPixelsFineAlpha.data;

  // Loop through each column and process all pixels within
  for (let columnIndex = 0; columnIndex < pixelColumnsFine.length; columnIndex++) {
    const column = pixelColumnsFine[columnIndex];
    const totalPixels = column.length / 2; // Each pixel has two values: saturation and lightness

    // Iterate through each pixel in the column starting from TOP_BUFFER_PIXEL
    for (let boxIndex = TOP_BUFFER_PIXEL; boxIndex < totalPixels; boxIndex++) {
      const saturation = column[boxIndex * 2];
      const lightness = column[boxIndex * 2 + 1];

      // Validate saturation and lightness
      if (
        saturation == null ||
        lightness == null ||
        isNaN(saturation) ||
        isNaN(lightness)
      ) {
        // Optionally, implement a throttled warning system to avoid flooding the console
        continue;
      }

      // Calculate the pixel's position
      const posX = columnIndex - 1;
      const posY = boxIndex - 1 - TOP_BUFFER_PIXEL;

      // Convert color offset and position to HSL
      const pixelColor = colorOffsetPlusThemePositionToHsl(
        { saturation, lightness },
        {
          x: posX / canvasElement.width,
          y: posY / canvasElement.height,
        }
      );

      // Validate HSL values
      if (
        isNaN(pixelColor.hue) ||
        isNaN(pixelColor.saturation) ||
        isNaN(pixelColor.lightness)
      ) {
        continue;
      }

      // Convert HSL to RGB
      const rgb = HSLToRGB(pixelColor.hue, pixelColor.saturation, pixelColor.lightness);

      // Validate RGB values
      if (rgb.some((channel) => isNaN(channel) || channel < 0 || channel > 255)) {
        continue;
      }

      // Calculate the index in the ImageData arrays
      const x = posX * PIXELATED_FINE_BOX_SIZE;
      const y = posY * PIXELATED_FINE_BOX_SIZE;

      // Ensure coordinates are within bounds
      if (
        x < 0 ||
        y < 0 ||
        x >= widthInFinePixels * PIXELATED_FINE_BOX_SIZE ||
        y >= heightInFinePixels * PIXELATED_FINE_BOX_SIZE
      ) {
        continue;
      }

      const index = (y * widthInFinePixels + x) * 4;

      // Assign RGB and Alpha values directly to ImageData
      dataFine[index] = rgb[0]; // Red
      dataFine[index + 1] = rgb[1]; // Green
      dataFine[index + 2] = rgb[2]; // Blue
      dataFine[index + 3] = 255; // Full opacity

      // Assign to alpha ImageData with BORDER_MULTI
      dataFineAlpha[index] = rgb[0] * BORDER_MULTI;
      dataFineAlpha[index + 1] = rgb[1] * BORDER_MULTI;
      dataFineAlpha[index + 2] = rgb[2] * BORDER_MULTI;
      dataFineAlpha[index + 3] = 32; // Lower opacity for alpha
    }
  }

  // Render the ImageData onto the canvas in a single call
  canvasContext.putImageData(renderedPixelsFine, 0, 0);
  canvasContext.putImageData(renderedPixelsFineAlpha, 0, 0);

  // Optionally, create patterns if they are essential elsewhere
  // To further optimize, consider caching the patterns or only updating them when necessary
  backgroundPattern = canvasContext.createPattern(await createImageBitmap(renderedPixelsFine), "no-repeat");
  backgroundPatternAlpha = canvasContext.createPattern(await createImageBitmap(renderedPixelsFineAlpha), "no-repeat");
}

// Remove `renderColumn` and `tryRenderBox` as their functionality is now integrated into `paintPixelsFine`

/**
 * Converts an HSL color value to RGB.
 * 
 * @param h - Hue component, in degrees [0, 360)
 * @param s - Saturation component, in percentage [0, 100]
 * @param l - Lightness component, in percentage [0, 100]
 * @returns A tuple containing the RGB components as [r, g, b], each in the range [0, 255]
 */
const HSLToRGB = (h: number, s: number, l: number): [number, number, number] => {
  // Ensure h is within [0, 360)
  h = h % 360;
  if (h < 0) h += 360;

  // Clamp saturation and lightness to [0, 100]
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  // Convert saturation and lightness to fractions
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
  const hPrime = h / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));

  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (0 <= hPrime && hPrime < 1) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (1 <= hPrime && hPrime < 2) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (2 <= hPrime && hPrime < 3) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (3 <= hPrime && hPrime < 4) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (4 <= hPrime && hPrime < 5) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (5 <= hPrime && hPrime < 6) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  const m = l - c / 2;
  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);

  // Clamp RGB values to [0, 255]
  return [Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, g)), Math.max(0, Math.min(255, b))];
};

function colorOffsetPlusThemePositionToHsl(offset: ColorOffset, position: Position): Color {
  let positionalPercentage: number;
  if (rainbow.dir === RainbowDirection.Regular) {
    positionalPercentage = (position.x + position.y) / 2;
  } else {
    positionalPercentage = (1 - position.x + position.y) / 2;
  }
  positionalPercentage = Math.max(0, positionalPercentage); // Clamp to [0, ∞)

  let colorBase = gradientAtPercentage(positionalPercentage);
  let color: Color = {
    hue: jganttsHue(offset.lightness, positionalPercentage, colorBase),
    saturation: jganttsSaturation(offset.saturation, positionalPercentage, colorBase),
    lightness: jganttsLightness(offset.lightness, positionalPercentage, colorBase),
  };
  return color;
}

function gradientAtPercentage(percentage: number): Color {
  let colorA: Color | null = null;
  let colorB: Color | null = null;
  let percentageAlongSection: number | null = null;

  for (let index = 0; index < rainbow.stops.length; index++) {
    if (rainbow.stops[index].stop > percentage) {
      let stopA = rainbow.stops[index - 1];
      let stopB = rainbow.stops[index];

      let lengthBetweenStops = stopB.stop - stopA.stop;
      let lengthSinceStopA = percentage - stopA.stop;
      percentageAlongSection = lengthSinceStopA / lengthBetweenStops;
      colorA = stopA.color;
      colorB = stopB.color;
      break;
    }
  }
  if (!colorA || !colorB || percentageAlongSection === null) {
    return rainbow.stops[0].color;
  }
  let hue: number;
  let saturation: number;
  let lightness: number;
  if (Math.abs(colorA.hue - colorB.hue) < 180) {
    // Linear interpolation
    hue = colorA.hue * (1 - percentageAlongSection) + colorB.hue * percentageAlongSection;
    saturation = colorA.saturation * (1 - percentageAlongSection) + colorB.saturation * percentageAlongSection;
    lightness = colorA.lightness * (1 - percentageAlongSection) + colorB.lightness * percentageAlongSection;
  } else {
    // Interpolate through 0/360
    let colorHigh: Color;
    let colorLow: Color;
    if (colorA.hue > colorB.hue) {
      colorHigh = colorA;
      colorLow = colorB;
    } else {
      colorHigh = colorB;
      colorLow = colorA;
      percentageAlongSection = 1 - percentageAlongSection;
    }
    saturation =
      colorHigh.saturation * (1 - percentageAlongSection) +
      colorLow.saturation * percentageAlongSection;
    lightness =
      colorHigh.lightness * (1 - percentageAlongSection) +
      colorLow.lightness * percentageAlongSection;
    let targetHue: number = 360 + colorLow.hue;
    let hueUnsliced =
      colorHigh.hue * (1 - percentageAlongSection) +
      targetHue * percentageAlongSection;
    hue = hueUnsliced < 360 ? hueUnsliced : hueUnsliced - 360;
  }

  return {
    hue,
    saturation,
    lightness,
  };
}

function jganttsHue(
  offset: number,
  positionalPercentage: number,
  colorBase: Color
): number {
  let hue = colorBase.hue;
  return hue;
}

function jganttsSaturation(
  offset: number,
  positionalPercentage: number,
  colorBase: Color
): number {
  const toreturn = colorBase.saturation / 1.2 + offset;
  if (toreturn < 1) console.log(`sat: ${toreturn}`);
  return toreturn;
}

function jganttsLightness(
  offset: number,
  positionalPercentage: number,
  colorBase: Color
): number {
  const toreturn = colorBase.lightness + offset; // * positionalLightness
  if (toreturn < 1) console.log(`light: ${toreturn}`);
  return toreturn;
}


onMounted(async () => {
  //@ts-expect-error
  canvasElement = canvasRef.value
  canvasContext = canvasElement.getContext("2d")! 
})

onUnmounted(() => {
  window.removeEventListener("resize", throttledResizeHandler)
})

window.addEventListener("resize", throttledResizeHandler)
window.visualViewport?.addEventListener("resize", throttledResizeHandler)

const canvasRef = ref(null)

let rainbow: Rainbow

const loadCurtain = async (rainbowIn: Rainbow) => {
  rainbow = rainbowIn
  //await wait(100)
  initializeBackground()
}

let playStateInternal = BackgroundState.Unset
const pauseMutex = new Mutex()
const pausePlay = async (): Promise<BackgroundState> => {
  //@ts-expect-error
  return await pauseMutex.runExclusive(() => {
    switch (playStateInternal) {
      case BackgroundState.First:
        return BackgroundState.First
      case BackgroundState.AfterFirstPlaying:
        playStateInternal = BackgroundState.AfterFirstPaused
        return BackgroundState.AfterFirstPaused
      case BackgroundState.Unset:
        // eslint-disable-next-line no-fallthrough
      case BackgroundState.AfterFirstPaused:
        playStateInternal = BackgroundState.AfterFirstPlaying
        doneAnimatingCurtain = false
        window.requestAnimationFrame(renderLoop)
        return BackgroundState.AfterFirstPlaying
    }
  })
}

const play = async (): Promise<BackgroundState> => {
  //@ts-expect-error
  return await pauseMutex.runExclusive(() => {
    switch (playStateInternal) {
      case BackgroundState.First:
        return BackgroundState.First
      case BackgroundState.AfterFirstPlaying:
        return BackgroundState.AfterFirstPlaying
      case BackgroundState.Unset:
        // eslint-disable-next-line no-fallthrough
      case BackgroundState.AfterFirstPaused:
        playStateInternal = BackgroundState.AfterFirstPlaying
        doneAnimatingCurtain = false
        window.requestAnimationFrame(renderLoop)
        return BackgroundState.AfterFirstPlaying
    }
  })
}

const emit = defineEmits([
  'curtainCall',
  'stageEntrance',
])
defineExpose({ 
  loadCurtain,
  pausePlay,
  play,
})
const props = defineProps({
  playState: {
    type: Number,
    default: BackgroundState.AfterFirstPaused
  }
})
</script>

<template>
  <div id='canvas-holder'>
    <canvas class="the-canvas" ref="canvasRef"/>
  </div>
</template>

<style scoped>
.the-canvas {
  position: absolute;
  left: -25px;
  top: -25px;
  width: calc(100% + 50px);
  height: calc(100% + 50px);
  clip-path: inset(0);
}
</style>
