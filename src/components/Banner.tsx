import { Theme, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { configuration } from 'utils'

import { GridContainer, GridItem } from './Grid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      maxWidth: '100%',
      width: 'auto',
      height: 'auto',
      padding: '5px 5px 0px 12px',
      marginBottom: '-12px',
    },
  })
)

const Logo: React.FC<{ dates: string; className: string; virtual?: boolean }> = ({
  dates,
  className,
  virtual = false,
}) => {
  const background = '#ffffff'
  const purple = '#31107b'
  const red = '#ce0000'
  const yellow = '#ffce00'
  const virtualColor = '#ec0202'
  return (
    <svg
      width='550px'
      height='139px'
      viewBox='0 0 550 139'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      className={className}
    >
      {/*
      <path d='M 0.00 0.00 L 550.00 0.00 L 550.00 139.00 L 0.00 139.00 L 0.00 0.00 Z' fill={background} />
*/}
      <path
        d='M 159.00 3.97 C 159.72 9.67 159.46 15.28 159.48 21.00 C 159.46 28.61 159.52 36.22 159.43 43.83 C 163.55 41.74 167.06 39.43 171.94 39.96 C 175.44 40.24 178.01 42.27 180.20 44.84 C 181.82 50.14 182.17 55.55 179.61 60.62 C 177.44 64.94 172.86 67.81 168.01 67.67 C 165.16 67.54 162.65 66.31 160.01 65.83 C 154.36 66.57 148.72 67.21 143.01 66.88 C 138.94 66.60 134.91 66.68 130.85 66.86 C 129.68 66.81 128.51 66.71 127.35 66.57 C 128.80 65.54 130.30 64.58 131.80 63.61 C 132.00 57.58 132.33 51.39 131.56 45.39 C 129.75 43.84 128.48 43.73 126.18 43.92 C 124.32 43.97 121.70 44.46 120.47 45.95 C 119.83 46.92 119.41 47.80 119.39 49.00 C 119.16 53.80 119.38 58.64 119.49 63.45 C 120.25 63.97 121.01 64.49 121.77 65.03 C 122.57 65.62 123.36 66.26 124.13 66.94 C 119.36 66.74 114.65 66.60 109.88 66.89 C 108.86 66.89 107.84 66.88 106.82 66.86 C 108.35 65.69 109.94 64.63 111.53 63.56 C 111.88 57.49 111.91 51.42 111.39 45.37 C 109.68 44.37 108.25 43.68 106.20 43.84 C 104.33 43.73 102.09 44.23 100.73 45.60 C 100.20 46.13 99.71 46.67 99.24 47.25 C 98.62 52.59 99.05 58.12 99.22 63.49 C 99.90 63.96 100.56 64.43 101.23 64.90 C 102.03 65.50 102.81 66.12 103.57 66.78 C 97.36 66.64 91.21 66.79 85.00 66.90 C 78.49 66.38 72.41 66.44 65.90 66.97 C 64.82 66.86 63.74 66.72 62.67 66.56 C 64.89 64.74 67.44 64.49 70.16 63.91 C 69.15 59.83 67.89 55.81 66.30 51.92 L 65.57 50.23 C 59.62 49.86 53.43 49.81 47.49 50.25 C 45.98 54.67 44.79 59.19 43.88 63.76 C 44.74 63.97 45.59 64.17 46.45 64.38 C 48.38 64.84 49.97 65.29 51.34 66.83 C 45.14 66.80 39.05 66.28 32.86 66.90 C 31.72 66.88 30.58 66.83 29.44 66.75 C 32.33 63.48 36.87 65.62 38.59 61.59 C 43.93 52.07 48.28 41.76 52.86 31.85 C 55.95 25.45 58.17 18.76 60.60 12.10 C 61.15 12.86 61.68 13.63 62.21 14.40 C 62.91 20.23 65.02 25.47 67.10 30.90 C 70.57 39.74 74.00 48.60 77.60 57.38 C 78.72 59.99 79.59 62.44 81.69 64.46 C 84.76 64.93 87.78 64.94 90.87 64.67 C 91.62 58.79 91.50 52.77 91.21 46.86 C 91.14 46.00 91.07 45.14 90.99 44.28 C 89.58 44.26 88.16 44.21 86.74 44.14 C 85.82 43.80 84.90 43.45 83.98 43.07 C 88.76 41.82 93.61 40.99 98.29 39.38 C 98.57 40.17 98.83 40.96 99.07 41.76 C 98.49 43.78 99.92 44.46 101.47 43.25 C 104.96 41.57 109.05 39.86 112.98 39.92 C 115.90 39.85 117.88 42.29 119.95 43.99 C 124.18 42.22 129.28 39.55 133.94 39.94 C 136.24 40.03 137.57 41.46 139.19 42.86 C 139.80 50.06 138.99 57.40 140.20 64.48 L 141.99 64.88 C 144.93 65.57 148.45 65.60 151.05 63.92 C 152.10 58.10 151.47 51.90 151.63 46.00 C 151.45 34.53 152.07 22.98 151.20 11.54 C 151.23 10.51 150.79 9.86 149.86 9.57 C 148.15 9.29 146.43 9.09 144.73 8.80 C 149.30 6.77 154.21 5.44 159.00 3.97 Z'
        fill={purple}
      />
      <path
        d='M 149.86 9.57 C 150.79 9.86 151.23 10.51 151.20 11.54 L 149.28 11.99 C 146.88 11.46 148.01 9.70 149.86 9.57 Z'
        fill={yellow}
      />
      <path
        d='M 291.24 10.21 C 291.29 12.22 291.21 14.21 291.01 16.21 C 290.17 22.05 290.04 27.92 290.15 33.82 L 288.97 35.06 C 288.38 32.26 288.25 29.30 287.37 26.58 C 286.12 23.52 283.76 20.84 281.19 18.80 C 275.32 13.66 265.70 15.06 260.63 20.63 C 256.11 25.48 254.43 32.52 254.16 38.98 C 253.91 45.73 255.22 52.99 259.82 58.21 C 264.45 64.25 272.33 65.91 279.35 63.32 C 284.29 61.69 287.00 58.01 291.26 55.41 C 290.09 59.50 287.07 61.46 284.08 64.14 C 274.88 69.31 264.01 69.26 254.76 64.24 C 250.80 60.98 247.58 57.00 245.94 52.10 C 243.71 45.40 243.87 37.83 246.18 31.17 C 249.63 21.58 258.88 14.80 268.97 13.90 C 275.89 13.11 282.11 14.93 288.58 17.06 C 289.29 14.58 289.51 12.26 291.24 10.21 Z'
        fill={purple}
      />
      <path
        d='M 293.60 12.52 C 293.53 15.92 293.09 19.27 292.78 22.64 C 292.32 27.54 292.55 32.43 291.96 37.33 C 291.33 36.17 290.71 35.01 290.15 33.82 C 290.04 27.92 290.17 22.05 291.01 16.21 C 291.83 14.95 292.70 13.73 293.60 12.52 Z'
        fill={yellow}
      />
      <path
        d='M 62.21 14.40 C 64.96 17.68 65.28 22.05 66.81 26.19 C 71.32 39.11 76.88 51.66 81.69 64.46 C 79.59 62.44 78.72 59.99 77.60 57.38 C 74.00 48.60 70.57 39.74 67.10 30.90 C 65.02 25.47 62.91 20.23 62.21 14.40 Z'
        fill={yellow}
      />
      <path
        d='M 281.19 18.80 C 276.43 17.75 271.95 17.08 267.42 19.42 C 260.56 22.88 257.46 30.70 256.68 37.95 C 255.74 44.97 257.02 51.76 259.82 58.21 C 255.22 52.99 253.91 45.73 254.16 38.98 C 254.43 32.52 256.11 25.48 260.63 20.63 C 265.70 15.06 275.32 13.66 281.19 18.80 Z'
        fill={yellow}
      />
      <path
        d='M 430.02 26.31 C 431.56 27.43 433.07 28.61 434.48 29.90 C 433.07 33.66 431.81 37.53 430.03 41.14 C 427.93 44.88 425.19 48.31 422.75 51.84 C 420.76 54.65 419.77 58.02 418.08 61.11 C 416.17 64.65 414.01 67.88 412.90 71.81 C 409.34 83.75 404.43 95.45 401.46 107.55 C 399.82 114.20 400.42 120.71 401.61 127.37 C 402.37 129.60 399.28 131.54 398.08 133.14 C 396.06 132.44 394.03 131.76 392.03 131.01 C 389.55 128.82 387.65 126.37 387.19 123.01 C 385.61 117.94 384.45 112.93 383.54 107.70 C 382.36 93.28 379.35 79.25 379.40 64.68 C 378.72 63.99 378.01 63.34 377.27 62.72 C 376.35 64.35 375.54 66.03 374.73 67.72 C 374.19 67.48 373.65 67.25 373.11 67.01 C 372.54 66.43 371.97 65.84 371.40 65.25 C 372.94 61.56 374.51 57.90 376.29 54.31 C 377.44 51.54 378.83 49.10 378.29 46.00 C 378.14 42.60 376.84 39.82 375.45 36.80 C 376.00 34.87 377.32 33.08 378.50 31.47 C 380.27 30.53 382.15 29.63 384.09 29.06 C 388.09 29.57 391.08 31.89 393.88 34.61 C 392.43 37.35 392.78 40.02 392.76 43.00 C 392.77 47.46 391.14 51.51 391.02 55.96 C 390.82 63.66 390.86 71.37 391.45 79.06 C 391.72 86.45 392.39 93.77 394.02 100.99 C 394.33 102.67 395.30 103.86 396.33 105.15 L 397.23 106.30 C 400.18 102.76 401.23 98.10 402.61 93.71 C 403.87 88.75 405.39 84.00 407.22 79.23 C 410.67 70.23 412.84 60.05 417.78 51.77 C 419.47 49.08 418.04 46.84 417.40 44.09 C 418.82 42.22 420.29 40.54 421.47 38.50 C 424.23 33.97 425.25 29.34 430.02 26.31 Z'
        fill={red}
      />
      <path
        d='M 57.09 27.61 L 57.45 28.59 C 55.65 33.39 53.32 38.02 50.90 42.53 C 52.61 37.48 54.54 32.30 57.09 27.61 Z'
        fill={background}
      />
      <path
        d='M 519.64 27.41 C 517.56 31.03 513.61 33.72 510.56 36.59 C 505.91 40.50 502.67 45.17 498.98 49.97 C 494.68 56.10 490.53 62.46 486.88 68.99 C 484.01 74.03 481.21 79.01 479.42 84.55 C 476.39 93.40 471.28 101.84 468.98 110.85 C 467.27 118.32 466.34 125.56 462.86 132.51 C 461.51 132.48 460.16 132.44 458.81 132.42 C 457.50 131.22 456.24 129.96 454.96 128.74 C 455.07 123.57 456.25 118.59 456.68 113.45 C 457.14 109.15 458.89 105.41 458.78 101.01 C 458.61 92.86 459.73 84.88 460.65 76.81 C 460.76 75.46 460.82 74.10 460.83 72.74 C 456.75 76.16 454.67 80.46 451.82 84.82 C 447.57 91.40 443.94 98.21 439.99 104.98 C 435.26 112.98 431.45 121.78 427.74 130.33 C 425.79 130.01 423.85 129.69 421.93 129.24 C 418.11 126.49 420.10 122.95 419.92 119.00 C 420.16 115.22 419.18 112.02 420.65 108.67 C 422.87 103.67 422.73 97.42 423.15 91.99 C 423.59 82.41 426.15 73.43 429.53 64.52 C 431.86 57.08 434.54 49.79 437.72 42.67 C 439.14 38.59 441.44 35.05 443.62 31.36 C 448.37 30.86 452.26 30.77 455.57 34.75 C 452.95 42.82 450.01 50.95 446.65 58.74 C 442.32 66.53 439.32 74.83 435.87 83.03 C 434.27 86.39 431.92 89.21 430.75 92.82 C 428.88 98.69 427.64 104.50 430.02 110.46 L 430.95 109.13 C 434.52 104.21 437.14 98.57 440.43 93.44 C 447.64 81.48 455.34 69.24 461.73 56.76 C 463.20 53.66 463.63 50.12 464.76 46.87 C 467.47 46.28 470.14 45.58 472.81 44.84 C 473.75 45.75 474.68 46.64 475.59 47.57 C 473.14 57.67 470.00 67.56 467.62 77.69 C 464.66 86.35 464.02 94.15 465.18 103.23 C 465.87 102.02 466.54 100.80 467.18 99.57 C 472.23 89.08 477.39 78.46 483.63 68.63 C 491.96 57.41 497.41 46.15 507.63 36.64 C 511.27 33.42 515.00 29.09 519.64 27.41 Z'
        fill={red}
      />
      <path
        d='M 57.45 28.59 C 57.80 29.51 58.16 30.43 58.52 31.35 C 56.01 36.79 53.77 42.35 51.73 47.97 C 50.69 47.96 49.65 47.95 48.62 47.93 C 49.20 46.51 49.79 45.09 50.40 43.68 L 50.65 43.09 L 50.90 42.53 C 53.32 38.02 55.65 33.39 57.45 28.59 Z'
        fill={yellow}
      />
      <path
        d='M 434.48 29.90 C 435.30 30.85 436.03 31.83 436.45 33.02 C 435.39 36.29 433.88 39.41 432.73 42.65 C 429.43 48.51 424.34 53.68 421.97 60.02 C 420.02 64.83 416.76 68.41 415.32 73.36 C 411.59 86.29 405.88 98.94 403.18 112.13 C 401.98 118.60 403.03 124.56 403.94 130.94 C 403.11 132.74 401.25 134.17 399.95 135.67 C 397.12 134.27 394.40 133.16 392.03 131.01 C 394.03 131.76 396.06 132.44 398.08 133.14 C 399.28 131.54 402.37 129.60 401.61 127.37 C 400.42 120.71 399.82 114.20 401.46 107.55 C 404.43 95.45 409.34 83.75 412.90 71.81 C 414.01 67.88 416.17 64.65 418.08 61.11 C 419.77 58.02 420.76 54.65 422.75 51.84 C 425.19 48.31 427.93 44.88 430.03 41.14 C 431.81 37.53 433.07 33.66 434.48 29.90 Z'
        fill={purple}
      />
      <path
        d='M 522.36 29.58 C 518.82 34.16 513.72 37.53 509.70 41.70 C 501.64 50.51 495.65 60.31 489.41 70.41 C 486.68 75.69 483.28 80.99 481.66 86.70 C 478.74 95.31 473.80 103.56 471.34 112.34 C 469.69 119.85 468.42 128.35 464.79 135.17 C 462.65 134.50 460.59 133.85 458.81 132.42 C 460.16 132.44 461.51 132.48 462.86 132.51 C 466.34 125.56 467.27 118.32 468.98 110.85 C 471.28 101.84 476.39 93.40 479.42 84.55 C 481.21 79.01 484.01 74.03 486.88 68.99 C 491.40 63.61 494.66 57.49 498.84 51.86 C 503.59 44.58 510.10 38.30 516.68 32.68 C 518.46 31.11 520.02 30.18 522.36 29.58 Z'
        fill={purple}
      />
      <path
        d='M 58.52 31.35 C 60.68 36.86 62.72 42.41 64.74 47.97 C 60.40 48.01 56.06 48.01 51.73 47.97 C 53.77 42.35 56.01 36.79 58.52 31.35 Z'
        fill={background}
      />
      <path
        d='M 393.88 34.61 C 394.43 35.14 394.97 35.69 395.50 36.25 C 395.38 38.49 395.19 40.73 395.25 42.98 C 395.47 48.84 392.85 54.07 393.21 59.96 C 392.78 70.04 393.55 80.00 394.16 90.04 C 394.65 95.11 395.77 100.08 396.33 105.15 C 395.30 103.86 394.33 102.67 394.02 100.99 C 392.39 93.77 391.72 86.45 391.45 79.06 C 390.86 71.37 390.82 63.66 391.02 55.96 C 391.14 51.51 392.77 47.46 392.76 43.00 C 392.78 40.02 392.43 37.35 393.88 34.61 Z'
        fill={purple}
      />
      <path
        d='M 455.57 34.75 C 456.32 36.01 457.08 37.48 457.18 38.97 C 456.63 41.54 455.41 44.01 454.50 46.48 C 452.03 52.75 450.03 59.77 446.48 65.48 C 444.19 69.18 443.45 73.46 441.31 77.25 C 439.29 81.11 438.75 85.79 436.03 89.05 C 431.84 94.93 430.96 102.10 430.95 109.13 L 430.02 110.46 C 427.64 104.50 428.88 98.69 430.75 92.82 C 431.92 89.21 434.27 86.39 435.87 83.03 C 439.32 74.83 442.32 66.53 446.65 58.74 C 450.01 50.95 452.95 42.82 455.57 34.75 Z'
        fill={purple}
      />
      <path
        d='M 212.34 45.66 C 212.58 47.89 212.87 50.10 213.09 52.33 C 206.21 52.81 199.34 52.48 192.45 52.69 C 193.15 55.44 193.88 58.02 195.77 60.20 C 197.97 61.74 200.15 63.01 202.93 62.93 C 206.29 62.95 209.60 60.13 212.54 58.67 C 211.98 60.10 211.38 61.52 210.78 62.94 C 207.99 64.64 205.62 66.59 202.34 67.27 C 198.38 68.15 194.72 67.29 190.96 66.05 C 185.33 61.71 183.49 54.85 186.26 48.26 C 190.58 38.41 206.09 36.90 212.34 45.66 Z'
        fill={purple}
      />
      <path
        d='M 227.93 39.57 C 228.37 40.20 228.81 40.82 229.25 41.45 C 229.16 43.40 229.05 45.34 228.98 47.28 C 229.79 46.17 230.60 45.04 231.43 43.93 C 233.17 41.73 234.95 39.65 237.98 39.49 C 239.82 39.35 241.23 40.72 242.64 41.70 C 242.39 43.39 242.15 45.07 241.89 46.76 C 240.42 47.27 238.94 47.75 237.45 48.22 L 236.68 47.52 C 235.87 46.78 235.07 46.05 234.22 45.35 L 233.75 44.96 C 232.55 45.46 231.78 46.36 231.43 47.68 C 229.38 52.95 229.03 58.18 229.81 63.75 L 231.66 64.28 C 233.79 64.87 235.77 65.13 237.36 66.84 C 231.18 66.83 225.07 66.40 218.89 66.96 C 217.68 66.80 216.50 66.58 215.32 66.29 C 217.32 65.41 219.33 64.70 221.42 64.09 C 221.91 58.31 221.88 52.44 221.67 46.64 C 221.48 45.79 221.27 44.93 221.04 44.08 C 219.50 44.20 217.95 44.34 216.41 44.51 C 215.79 43.97 215.17 43.41 214.55 42.85 C 219.08 41.94 223.56 41.12 227.93 39.57 Z'
        fill={purple}
      />
      <path
        d='M 319.34 40.60 C 323.56 41.56 326.71 44.31 329.18 47.75 C 329.93 53.42 330.43 58.63 325.97 62.97 C 319.26 69.08 310.99 68.21 302.83 66.10 C 300.38 64.24 297.96 62.05 296.84 59.10 C 294.80 53.57 296.30 46.74 301.23 43.22 C 306.18 39.56 313.54 39.25 319.34 40.60 Z'
        fill={purple}
      />
      <path
        d='M 344.94 39.58 C 345.41 40.23 345.88 40.88 346.33 41.54 C 345.31 43.47 346.73 44.61 348.44 43.30 C 352.25 41.43 356.68 39.79 360.97 39.91 C 363.31 39.91 364.80 41.24 366.48 42.65 C 367.63 49.60 366.60 56.60 367.44 63.53 C 368.04 63.96 368.68 64.35 369.33 64.70 C 370.02 64.89 370.71 65.07 371.40 65.25 C 371.97 65.84 372.54 66.43 373.11 67.01 C 367.99 66.60 362.96 66.56 357.84 66.85 C 356.48 66.87 355.12 66.85 353.75 66.80 C 355.49 65.66 357.33 64.70 359.19 63.76 C 359.58 57.83 359.82 51.76 359.09 45.85 C 358.61 45.21 358.12 44.58 357.61 43.96 C 356.13 43.86 354.66 43.84 353.18 43.89 C 351.29 43.84 349.04 44.17 347.67 45.60 C 346.56 46.71 345.98 47.33 346.03 49.01 C 345.92 53.26 345.84 57.58 346.13 61.82 C 346.14 62.91 346.74 63.78 347.92 64.41 C 349.07 65.19 350.21 65.97 351.25 66.90 C 346.51 66.84 341.81 66.45 337.06 66.83 C 335.24 66.89 333.42 66.83 331.60 66.72 C 333.67 65.58 335.97 64.84 337.97 63.58 C 338.73 58.09 338.41 52.38 338.19 46.85 C 338.12 46.00 338.04 45.15 337.97 44.30 C 336.56 44.25 335.16 44.18 333.76 44.08 C 332.73 43.89 331.71 43.68 330.69 43.45 C 335.25 41.64 340.24 41.04 344.94 39.58 Z'
        fill={purple}
      />
      <path
        d='M 99.07 41.76 C 100.29 41.63 101.08 42.12 101.47 43.25 C 99.92 44.46 98.49 43.78 99.07 41.76 Z'
        fill={yellow}
      />
      <path
        d='M 199.96 41.76 C 199.19 43.03 198.16 43.27 196.86 42.51 C 197.71 41.51 198.74 41.26 199.96 41.76 Z'
        fill={background}
      />
      <path
        d='M 199.96 41.76 C 201.43 42.27 202.88 42.82 204.27 43.50 C 202.49 43.92 200.57 44.19 198.87 44.92 C 197.06 46.28 196.08 48.85 194.83 50.71 L 192.74 50.75 C 193.33 47.11 194.09 45.03 196.86 42.51 C 198.16 43.27 199.19 43.03 199.96 41.76 Z'
        fill={yellow}
      />
      <path
        d='M 229.25 41.45 C 229.98 42.28 230.70 43.10 231.43 43.93 C 230.60 45.04 229.79 46.17 228.98 47.28 C 229.05 45.34 229.16 43.40 229.25 41.45 Z'
        fill={yellow}
      />
      <path
        d='M 242.64 41.70 C 244.39 43.81 245.64 48.28 242.57 49.78 C 240.22 50.72 239.16 49.68 237.45 48.22 C 238.94 47.75 240.42 47.27 241.89 46.76 C 242.15 45.07 242.39 43.39 242.64 41.70 Z'
        fill={yellow}
      />
      <path
        d='M 311.16 42.09 C 313.80 41.31 315.98 42.24 318.18 43.62 C 314.70 44.24 311.44 43.99 309.13 47.13 C 305.46 52.20 306.65 58.57 307.75 64.26 C 304.08 59.95 303.71 54.22 304.97 48.90 C 305.89 45.72 307.71 42.83 311.16 42.09 Z'
        fill={yellow}
      />
      <path
        d='M 346.33 41.54 C 347.48 41.78 348.18 42.37 348.44 43.30 C 346.73 44.61 345.31 43.47 346.33 41.54 Z'
        fill={yellow}
      />
      <path d='M 50.65 43.09 L 50.40 43.68 L 50.65 43.09 Z' fill={background} />
      <path
        d='M 139.19 42.86 C 140.88 44.82 141.55 46.50 141.69 49.09 C 141.94 54.35 141.66 59.62 141.99 64.88 L 140.20 64.48 C 138.99 57.40 139.80 50.06 139.19 42.86 Z'
        fill={yellow}
      />
      <path
        d='M 166.05 43.62 C 168.11 43.39 169.61 44.50 171.25 45.55 C 167.53 46.16 163.97 46.06 161.64 49.52 C 161.04 54.09 161.54 58.78 161.10 63.39 C 160.42 62.87 159.74 62.34 159.06 61.80 C 159.11 56.89 159.10 51.98 159.09 47.07 C 161.16 45.67 163.48 43.79 166.05 43.62 Z'
        fill={yellow}
      />
      <path
        d='M 366.48 42.65 C 367.82 44.21 368.91 45.85 369.06 47.98 C 369.51 53.52 369.18 59.14 369.33 64.70 C 368.68 64.35 368.04 63.96 367.44 63.53 C 366.60 56.60 367.63 49.60 366.48 42.65 Z'
        fill={yellow}
      />
      <path
        d='M 86.74 44.14 C 88.16 44.21 89.58 44.26 90.99 44.28 C 91.07 45.14 91.14 46.00 91.21 46.86 C 89.74 46.56 88.27 46.27 86.80 45.98 C 86.78 45.37 86.76 44.75 86.74 44.14 Z'
        fill={yellow}
      />
      <path
        d='M 106.20 43.84 C 104.59 45.49 103.08 46.45 100.73 45.60 C 102.09 44.23 104.33 43.73 106.20 43.84 Z'
        fill={background}
      />
      <path
        d='M 106.20 43.84 C 108.25 43.68 109.68 44.37 111.39 45.37 C 107.94 46.09 104.63 46.99 101.40 48.42 C 101.17 53.91 101.23 59.40 101.23 64.90 C 100.56 64.43 99.90 63.96 99.22 63.49 C 99.05 58.12 98.62 52.59 99.24 47.25 C 99.71 46.67 100.20 46.13 100.73 45.60 C 103.08 46.45 104.59 45.49 106.20 43.84 Z'
        fill={yellow}
      />
      <path
        d='M 126.18 43.92 C 124.44 45.68 123.08 47.13 120.47 45.95 C 121.70 44.46 124.32 43.97 126.18 43.92 Z'
        fill={background}
      />
      <path
        d='M 126.18 43.92 C 128.48 43.73 129.75 43.84 131.56 45.39 C 128.50 46.18 124.00 46.62 121.75 49.07 C 121.18 54.33 121.56 59.75 121.77 65.03 C 121.01 64.49 120.25 63.97 119.49 63.45 C 119.38 58.64 119.16 53.80 119.39 49.00 C 119.41 47.80 119.83 46.92 120.47 45.95 C 123.08 47.13 124.44 45.68 126.18 43.92 Z'
        fill={yellow}
      />
      <path
        d='M 204.27 43.50 C 205.28 45.82 205.82 48.22 206.19 50.71 C 202.40 50.79 198.62 50.73 194.83 50.71 C 196.08 48.85 197.06 46.28 198.87 44.92 C 200.57 44.19 202.49 43.92 204.27 43.50 Z'
        fill={background}
      />
      <path
        d='M 216.41 44.51 C 217.95 44.34 219.50 44.20 221.04 44.08 C 221.27 44.93 221.48 45.79 221.67 46.64 C 219.61 46.35 217.91 46.14 216.41 44.51 Z'
        fill={yellow}
      />
      <path
        d='M 318.18 43.62 C 321.82 48.39 322.18 54.72 320.13 60.22 C 318.98 63.01 316.80 65.25 313.72 65.74 C 311.48 66.17 309.71 65.17 307.75 64.26 C 306.65 58.57 305.46 52.20 309.13 47.13 C 311.44 43.99 314.70 44.24 318.18 43.62 Z'
        fill={background}
      />
      <path
        d='M 333.76 44.08 C 335.16 44.18 336.56 44.25 337.97 44.30 C 338.04 45.15 338.12 46.00 338.19 46.85 C 336.69 46.56 335.20 46.27 333.70 45.99 C 333.72 45.35 333.74 44.72 333.76 44.08 Z'
        fill={yellow}
      />
      <path
        d='M 353.18 43.89 C 351.56 45.47 349.99 46.51 347.67 45.60 C 349.04 44.17 351.29 43.84 353.18 43.89 Z'
        fill={background}
      />
      <path
        d='M 353.18 43.89 C 354.66 43.84 356.13 43.86 357.61 43.96 C 358.12 44.58 358.61 45.21 359.09 45.85 C 355.13 45.89 351.90 46.78 348.32 48.39 C 348.03 53.72 348.17 59.07 347.92 64.41 C 346.74 63.78 346.14 62.91 346.13 61.82 C 345.84 57.58 345.92 53.26 346.03 49.01 C 345.98 47.33 346.56 46.71 347.67 45.60 C 349.99 46.51 351.56 45.47 353.18 43.89 Z'
        fill={yellow}
      />
      <path
        d='M 180.20 44.84 C 187.11 51.93 183.73 67.30 173.54 69.51 C 168.39 71.06 164.66 67.37 159.64 68.47 C 149.75 69.81 139.99 68.53 130.08 69.18 C 130.34 68.41 130.59 67.63 130.85 66.86 C 134.91 66.68 138.94 66.60 143.01 66.88 C 148.72 67.21 154.36 66.57 160.01 65.83 C 162.65 66.31 165.16 67.54 168.01 67.67 C 172.86 67.81 177.44 64.94 179.61 60.62 C 182.17 55.55 181.82 50.14 180.20 44.84 Z'
        fill={yellow}
      />
      <path
        d='M 233.75 44.96 L 234.22 45.35 C 233.73 46.69 233.10 47.95 231.43 47.68 C 231.78 46.36 232.55 45.46 233.75 44.96 Z'
        fill={background}
      />
      <path
        d='M 234.22 45.35 C 235.07 46.05 235.87 46.78 236.68 47.52 C 235.42 48.42 234.13 49.03 233.46 50.51 C 231.52 54.60 231.69 59.84 231.66 64.28 L 229.81 63.75 C 229.03 58.18 229.38 52.95 231.43 47.68 C 233.10 47.95 233.73 46.69 234.22 45.35 Z'
        fill={yellow}
      />
      <path
        d='M 171.25 45.55 C 174.15 50.04 174.29 55.60 172.54 60.54 C 171.54 63.02 169.73 65.09 166.97 65.53 C 164.61 65.85 162.91 64.69 161.10 63.39 C 161.54 58.78 161.04 54.09 161.64 49.52 C 163.97 46.06 167.53 46.16 171.25 45.55 Z'
        fill={background}
      />
      <path
        d='M 212.34 45.66 C 214.82 48.29 215.16 51.28 215.28 54.74 C 208.50 54.85 201.74 54.66 194.96 54.90 C 195.24 56.67 195.52 58.43 195.77 60.20 C 193.88 58.02 193.15 55.44 192.45 52.69 C 199.34 52.48 206.21 52.81 213.09 52.33 C 212.87 50.10 212.58 47.89 212.34 45.66 Z'
        fill={yellow}
      />
      <path
        d='M 329.18 47.75 C 333.38 52.64 332.79 60.77 328.21 65.21 C 325.22 68.15 321.03 69.50 316.93 69.82 C 311.86 70.14 306.85 69.46 302.83 66.10 C 310.99 68.21 319.26 69.08 325.97 62.97 C 330.43 58.63 329.93 53.42 329.18 47.75 Z'
        fill={yellow}
      />
      <path
        d='M 475.59 47.57 C 478.97 50.79 476.54 53.97 475.79 57.75 C 473.43 65.31 471.64 72.98 469.63 80.64 C 467.54 86.77 466.36 93.08 467.18 99.57 C 466.54 100.80 465.87 102.02 465.18 103.23 C 464.02 94.15 464.66 86.35 467.62 77.69 C 470.00 67.56 473.14 57.67 475.59 47.57 Z'
        fill={purple}
      />
      <path
        d='M 47.49 50.25 C 53.43 49.81 59.62 49.86 65.57 50.23 L 66.30 51.92 C 60.86 52.19 55.46 52.12 50.01 52.13 C 48.54 56.14 47.31 60.19 46.45 64.38 C 45.59 64.17 44.74 63.97 43.88 63.76 C 44.79 59.19 45.98 54.67 47.49 50.25 Z'
        fill={yellow}
      />
      <path
        d='M 293.46 57.79 C 291.72 63.17 285.83 66.89 280.80 68.79 C 272.20 71.53 261.60 70.65 254.76 64.24 C 264.01 69.26 274.88 69.31 284.08 64.14 C 287.57 62.47 290.19 59.79 293.46 57.79 Z'
        fill={yellow}
      />
      <path
        d='M 215.22 60.70 C 211.34 70.14 198.41 73.06 190.96 66.05 C 194.72 67.29 198.38 68.15 202.34 67.27 C 205.62 66.59 207.99 64.64 210.78 62.94 C 212.22 62.11 213.71 61.38 215.22 60.70 Z'
        fill={yellow}
      />
      <path
        d='M 377.27 62.72 C 378.01 63.34 378.72 63.99 379.40 64.68 C 376.91 69.24 374.76 73.96 372.76 78.75 C 368.86 88.15 364.67 97.42 360.83 106.84 C 357.21 114.92 355.19 123.63 351.79 131.82 C 351.02 133.45 350.12 135.64 348.43 136.50 C 345.81 137.66 343.11 136.86 340.75 135.49 C 342.76 134.99 344.97 134.68 346.86 133.77 C 348.46 132.41 349.37 130.09 350.18 128.19 C 352.38 122.27 354.28 116.24 356.34 110.28 C 359.75 101.51 363.59 92.91 367.27 84.25 C 369.46 79.13 371.47 74.05 374.04 69.08 L 374.73 67.72 C 375.54 66.03 376.35 64.35 377.27 62.72 Z'
        fill={purple}
      />
      <path
        d='M 32.86 66.90 C 39.05 66.28 45.14 66.80 51.34 66.83 C 52.03 67.58 52.70 68.34 53.36 69.12 C 46.25 68.87 39.27 68.61 32.17 69.28 C 32.39 68.49 32.62 67.70 32.86 66.90 Z'
        fill={yellow}
      />
      <path
        d='M 65.90 66.97 C 72.41 66.44 78.49 66.38 85.00 66.90 C 91.21 66.79 97.36 66.64 103.57 66.78 C 104.42 67.52 105.24 68.28 106.07 69.05 C 97.69 68.78 89.35 69.47 81.00 68.82 C 75.78 68.57 70.70 69.06 65.50 69.29 C 65.63 68.51 65.77 67.74 65.90 66.97 Z'
        fill={yellow}
      />
      <path
        d='M 109.88 66.89 C 114.65 66.60 119.36 66.74 124.13 66.94 C 124.86 67.61 125.59 68.30 126.30 68.99 C 120.74 69.11 115.18 68.95 109.62 69.17 C 109.71 68.41 109.79 67.65 109.88 66.89 Z'
        fill={yellow}
      />
      <path
        d='M 218.89 66.96 C 225.07 66.40 231.18 66.83 237.36 66.84 C 238.04 67.55 238.71 68.28 239.37 69.01 C 232.27 69.03 225.19 68.80 218.09 69.17 C 218.36 68.43 218.62 67.69 218.89 66.96 Z'
        fill={yellow}
      />
      <path
        d='M 337.06 66.83 C 341.81 66.45 346.51 66.84 351.25 66.90 C 351.96 67.59 352.67 68.29 353.36 69.00 C 347.09 68.99 340.82 69.01 334.55 69.00 C 335.37 68.26 336.21 67.53 337.06 66.83 Z'
        fill={yellow}
      />
      <path
        d='M 357.84 66.85 C 362.96 66.56 367.99 66.60 373.11 67.01 C 373.65 67.25 374.19 67.48 374.73 67.72 L 374.04 69.08 C 372.56 69.12 371.08 69.11 369.59 69.12 C 365.38 68.99 361.21 69.00 357.01 69.17 C 357.28 68.40 357.56 67.62 357.84 66.85 Z'
        fill={yellow}
      />
      <path
        d='M 369.59 69.12 C 371.08 69.11 372.56 69.12 374.04 69.08 C 371.47 74.05 369.46 79.13 367.27 84.25 C 363.59 92.91 359.75 101.51 356.34 110.28 C 354.28 116.24 352.38 122.27 350.18 128.19 C 349.37 130.09 348.46 132.41 346.86 133.77 C 344.97 134.68 342.76 134.99 340.75 135.49 C 339.26 133.81 337.44 132.27 337.16 129.91 C 336.63 126.20 336.83 122.48 335.86 118.81 C 335.15 114.22 334.90 108.81 338.28 105.17 C 340.42 104.28 342.79 103.85 345.03 103.30 C 345.76 104.02 346.48 104.73 347.19 105.46 C 345.56 110.67 344.99 115.82 345.26 121.27 C 346.25 120.00 347.20 118.70 348.07 117.34 C 351.25 113.07 352.57 108.42 354.63 103.56 C 357.37 97.01 359.74 90.35 363.01 84.03 C 365.07 78.98 367.24 74.05 369.59 69.12 Z'
        fill={red}
      />
      <path
        d='M 460.83 72.74 C 460.82 74.10 460.76 75.46 460.65 76.81 C 455.07 85.31 449.63 93.82 444.75 102.75 C 439.00 112.33 434.11 122.37 429.99 132.75 C 426.73 132.38 424.35 131.50 421.93 129.24 C 423.85 129.69 425.79 130.01 427.74 130.33 C 431.45 121.78 435.26 112.98 439.99 104.98 C 443.94 98.21 447.57 91.40 451.82 84.82 C 454.67 80.46 456.75 76.16 460.83 72.74 Z'
        fill={purple}
      />
      <path
        d='M 347.19 105.46 C 347.79 106.06 348.37 106.67 348.94 107.29 C 348.44 110.64 347.96 113.93 348.07 117.34 C 347.20 118.70 346.25 120.00 345.26 121.27 C 344.99 115.82 345.56 110.67 347.19 105.46 Z'
        fill={purple}
      />
      <text id='string' transform='matrix(1.0 0.0 0.0 1.0 6.5 73.5)'>
        <tspan x='1.0' y='30.0' fontFamily='Roboto' fontSize='34' fontWeight='700' textDecoration='none' fill={purple}>
          {dates}
        </tspan>
      </text>
      <text id='stringShadow' transform='matrix(1.0 0.0 0.0 1.0 4.0 71)'>
        <tspan x='1.0' y='30.0' fontFamily='Roboto' fontSize='34' fontWeight='700' textDecoration='none' fill={yellow}>
          {dates}
        </tspan>
      </text>
      {virtual && (
        <text
          id='virtual'
          transform='rotate(-35 50 100)
                                    translate(65 106)
                                    scale(1)'
        >
          <tspan
            x='1.0'
            y='30.0'
            fontFamily='Old Stamper'
            fontSize='38'
            fontWeight='600'
            textDecoration='none'
            fill={virtualColor}
          >
            virtual
          </tspan>
        </text>
      )}
    </svg>
  )
}

interface BannerProps {
  to?: string
}

const WrappedLogo: React.FC<BannerProps> = ({ to }) => {
  const classes = useStyles()
  const conventionStartDate = configuration.conventionStartDate
  const dateRange = `${conventionStartDate.toFormat('MMMM')} ${configuration.startDay}-${configuration.endDay}, ${
    configuration.year
  }`

  const logo = <Logo dates={dateRange} className={classes.banner} virtual={configuration.virtual} />
  return to ? <Link to={to}>{logo}</Link> : logo
}

export const Banner: React.FC<BannerProps> = ({ to }) => (
  <GridContainer justify='center'>
    <GridItem xs={12}>
      <WrappedLogo to={to} />
    </GridItem>
  </GridContainer>
)
