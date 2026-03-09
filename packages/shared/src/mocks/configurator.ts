import type { ConfigurableProduct } from '../types/configurator';

export const configurableProducts: ConfigurableProduct[] = [
  {
    productId: 101,
    name: 'Zeiss OPMI Pico Mora',
    brand: 'Carl Zeiss',
    basePrice: 16000,
    currency: 'EUR',
    images: [
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-right-side-picture.png', alt: 'Zeiss OPMI Pico Mora' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-mora-foldable-tube-left-side-picture.png', alt: 'Pico Mora side' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-head-cropped-image.png', alt: 'Pico Mora detail' },
    ],
    optionGroups: [
      {
        id: 'color',
        labelKey: 'configurator:options.color',
        type: 'radio',
        required: true,
        options: [
          { id: 'color_white', labelKey: 'configurator:colors.white', priceDelta: 0, available: true, colorHex: '#F5F5F5' },
          { id: 'color_black', labelKey: 'configurator:colors.black', priceDelta: 200, available: true, colorHex: '#2D2D2D' },
          { id: 'color_silver', labelKey: 'configurator:colors.silver', priceDelta: 150, available: true, colorHex: '#C0C0C0' },
        ],
      },
      {
        id: 'mount',
        labelKey: 'configurator:options.mount',
        type: 'radio',
        required: true,
        options: [
          { id: 'mount_ceiling', labelKey: 'configurator:mounts.ceiling', priceDelta: 0, available: true, icon: 'arrow-up-outline' },
          { id: 'mount_wall', labelKey: 'configurator:mounts.wall', priceDelta: -300, available: true, icon: 'tablet-landscape-outline' },
          { id: 'mount_floor', labelKey: 'configurator:mounts.floor', priceDelta: 500, available: true, icon: 'phone-portrait-outline' },
        ],
      },
      {
        id: 'illumination',
        labelKey: 'configurator:options.illumination',
        type: 'radio',
        required: true,
        options: [
          { id: 'illum_led', labelKey: 'configurator:illumination.led', priceDelta: 0, available: true, icon: 'bulb-outline' },
          { id: 'illum_xenon', labelKey: 'configurator:illumination.xenon', priceDelta: 800, available: true, icon: 'flash-outline' },
          { id: 'illum_halogen', labelKey: 'configurator:illumination.halogen', priceDelta: -200, available: false, icon: 'sunny-outline' },
        ],
      },
      {
        id: 'objective',
        labelKey: 'configurator:options.objective',
        type: 'radio',
        required: true,
        options: [
          { id: 'obj_f200', labelKey: 'configurator:objectives.f200', priceDelta: 0, available: true },
          { id: 'obj_f250', labelKey: 'configurator:objectives.f250', priceDelta: 300, available: true },
          { id: 'obj_f300', labelKey: 'configurator:objectives.f300', priceDelta: 450, available: true },
          { id: 'obj_f400', labelKey: 'configurator:objectives.f400', priceDelta: 600, available: true },
        ],
      },
      {
        id: 'camera',
        labelKey: 'configurator:options.camera',
        type: 'radio',
        required: false,
        options: [
          { id: 'camera_none', labelKey: 'configurator:camera.none', priceDelta: 0, available: true },
          { id: 'camera_hd', labelKey: 'configurator:camera.fullHd', priceDelta: 1200, available: true },
          { id: 'camera_4k', labelKey: 'configurator:camera.fourK', priceDelta: 2500, available: true },
        ],
      },
    ],
  },
  {
    productId: 103,
    name: 'Zeiss OPMI PROergo',
    brand: 'Carl Zeiss',
    basePrice: 21000,
    currency: 'EUR',
    images: [
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-head-cropped-image.png', alt: 'Zeiss OPMI PROergo' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-right-side-picture.png', alt: 'PROergo side' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-mora-foldable-tube-left-side-picture.png', alt: 'PROergo binoculars' },
    ],
    optionGroups: [
      {
        id: 'color',
        labelKey: 'configurator:options.color',
        type: 'radio',
        required: true,
        options: [
          { id: 'color_white', labelKey: 'configurator:colors.white', priceDelta: 0, available: true, colorHex: '#F5F5F5' },
          { id: 'color_black', labelKey: 'configurator:colors.black', priceDelta: 300, available: true, colorHex: '#2D2D2D' },
          { id: 'color_silver', labelKey: 'configurator:colors.silver', priceDelta: 200, available: true, colorHex: '#C0C0C0' },
        ],
      },
      {
        id: 'mount',
        labelKey: 'configurator:options.mount',
        type: 'radio',
        required: true,
        options: [
          { id: 'mount_ceiling', labelKey: 'configurator:mounts.ceiling', priceDelta: 0, available: true, icon: 'arrow-up-outline' },
          { id: 'mount_wall', labelKey: 'configurator:mounts.wall', priceDelta: -500, available: true, icon: 'tablet-landscape-outline' },
          { id: 'mount_floor', labelKey: 'configurator:mounts.floor', priceDelta: 800, available: true, icon: 'phone-portrait-outline' },
        ],
      },
      {
        id: 'illumination',
        labelKey: 'configurator:options.illumination',
        type: 'radio',
        required: true,
        options: [
          { id: 'illum_led', labelKey: 'configurator:illumination.led', priceDelta: 0, available: true, icon: 'bulb-outline' },
          { id: 'illum_xenon', labelKey: 'configurator:illumination.xenon', priceDelta: 1200, available: true, icon: 'flash-outline' },
          { id: 'illum_halogen', labelKey: 'configurator:illumination.halogen', priceDelta: -400, available: false, icon: 'sunny-outline' },
        ],
      },
      {
        id: 'objective',
        labelKey: 'configurator:options.objective',
        type: 'radio',
        required: true,
        options: [
          { id: 'obj_f200', labelKey: 'configurator:objectives.f200', priceDelta: 0, available: true },
          { id: 'obj_f250', labelKey: 'configurator:objectives.f250', priceDelta: 400, available: true },
          { id: 'obj_f300', labelKey: 'configurator:objectives.f300', priceDelta: 600, available: true },
          { id: 'obj_f400', labelKey: 'configurator:objectives.f400', priceDelta: 850, available: true },
        ],
      },
      {
        id: 'camera',
        labelKey: 'configurator:options.camera',
        type: 'radio',
        required: false,
        options: [
          { id: 'camera_none', labelKey: 'configurator:camera.none', priceDelta: 0, available: true },
          { id: 'camera_hd', labelKey: 'configurator:camera.fullHd', priceDelta: 1500, available: true },
          { id: 'camera_4k', labelKey: 'configurator:camera.fourK', priceDelta: 3200, available: true },
        ],
      },
    ],
  },
  {
    productId: 104,
    name: 'Leica M320 F12',
    brand: 'Leica Microsystems',
    basePrice: 13500,
    currency: 'EUR',
    images: [
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-sensorunit-3.jpg', alt: 'Leica M320 F12' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-sensorunit-4.jpg', alt: 'Leica M320 side' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-sensorunit-1.jpg', alt: 'Leica M320 mounted' },
    ],
    optionGroups: [
      {
        id: 'color',
        labelKey: 'configurator:options.color',
        type: 'radio',
        required: true,
        options: [
          { id: 'color_white', labelKey: 'configurator:colors.white', priceDelta: 0, available: true, colorHex: '#F5F5F5' },
          { id: 'color_black', labelKey: 'configurator:colors.black', priceDelta: 150, available: true, colorHex: '#2D2D2D' },
          { id: 'color_silver', labelKey: 'configurator:colors.silver', priceDelta: 100, available: false, colorHex: '#C0C0C0' },
        ],
      },
      {
        id: 'mount',
        labelKey: 'configurator:options.mount',
        type: 'radio',
        required: true,
        options: [
          { id: 'mount_ceiling', labelKey: 'configurator:mounts.ceiling', priceDelta: 0, available: true, icon: 'arrow-up-outline' },
          { id: 'mount_wall', labelKey: 'configurator:mounts.wall', priceDelta: -200, available: true, icon: 'tablet-landscape-outline' },
          { id: 'mount_floor', labelKey: 'configurator:mounts.floor', priceDelta: 400, available: true, icon: 'phone-portrait-outline' },
        ],
      },
      {
        id: 'illumination',
        labelKey: 'configurator:options.illumination',
        type: 'radio',
        required: true,
        options: [
          { id: 'illum_led', labelKey: 'configurator:illumination.led', priceDelta: 0, available: true, icon: 'bulb-outline' },
          { id: 'illum_xenon', labelKey: 'configurator:illumination.xenon', priceDelta: 600, available: true, icon: 'flash-outline' },
          { id: 'illum_halogen', labelKey: 'configurator:illumination.halogen', priceDelta: -150, available: false, icon: 'sunny-outline' },
        ],
      },
      {
        id: 'objective',
        labelKey: 'configurator:options.objective',
        type: 'radio',
        required: true,
        options: [
          { id: 'obj_f200', labelKey: 'configurator:objectives.f200', priceDelta: 0, available: true },
          { id: 'obj_f250', labelKey: 'configurator:objectives.f250', priceDelta: 250, available: true },
          { id: 'obj_f300', labelKey: 'configurator:objectives.f300', priceDelta: 380, available: true },
          { id: 'obj_f400', labelKey: 'configurator:objectives.f400', priceDelta: 500, available: true },
        ],
      },
      {
        id: 'camera',
        labelKey: 'configurator:options.camera',
        type: 'radio',
        required: false,
        options: [
          { id: 'camera_none', labelKey: 'configurator:camera.none', priceDelta: 0, available: true },
          { id: 'camera_hd', labelKey: 'configurator:camera.fullHd', priceDelta: 0, available: true },
          { id: 'camera_4k', labelKey: 'configurator:camera.fourK', priceDelta: 1800, available: true },
        ],
      },
    ],
  },
  {
    productId: 106,
    name: 'CJ-Optik Flexion Advanced',
    brand: 'CJ-Optik',
    basePrice: 10500,
    currency: 'EUR',
    images: [
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-2.jpg', alt: 'CJ-Optik Flexion Advanced' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-1.jpg', alt: 'Flexion arm detail' },
      { src: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-5.jpg', alt: 'Flexion optics' },
    ],
    optionGroups: [
      {
        id: 'color',
        labelKey: 'configurator:options.color',
        type: 'radio',
        required: true,
        options: [
          { id: 'color_white', labelKey: 'configurator:colors.white', priceDelta: 0, available: true, colorHex: '#F5F5F5' },
          { id: 'color_black', labelKey: 'configurator:colors.black', priceDelta: 100, available: true, colorHex: '#2D2D2D' },
          { id: 'color_silver', labelKey: 'configurator:colors.silver', priceDelta: 100, available: true, colorHex: '#C0C0C0' },
        ],
      },
      {
        id: 'mount',
        labelKey: 'configurator:options.mount',
        type: 'radio',
        required: true,
        options: [
          { id: 'mount_ceiling', labelKey: 'configurator:mounts.ceiling', priceDelta: 0, available: true, icon: 'arrow-up-outline' },
          { id: 'mount_wall', labelKey: 'configurator:mounts.wall', priceDelta: -200, available: true, icon: 'tablet-landscape-outline' },
          { id: 'mount_floor', labelKey: 'configurator:mounts.floor', priceDelta: 350, available: true, icon: 'phone-portrait-outline' },
        ],
      },
      {
        id: 'illumination',
        labelKey: 'configurator:options.illumination',
        type: 'radio',
        required: true,
        options: [
          { id: 'illum_led', labelKey: 'configurator:illumination.led', priceDelta: 0, available: true, icon: 'bulb-outline' },
          { id: 'illum_xenon', labelKey: 'configurator:illumination.xenon', priceDelta: 700, available: true, icon: 'flash-outline' },
          { id: 'illum_halogen', labelKey: 'configurator:illumination.halogen', priceDelta: -100, available: true, icon: 'sunny-outline' },
        ],
      },
      {
        id: 'objective',
        labelKey: 'configurator:options.objective',
        type: 'radio',
        required: true,
        options: [
          { id: 'obj_f200', labelKey: 'configurator:objectives.f200', priceDelta: 0, available: true },
          { id: 'obj_f250', labelKey: 'configurator:objectives.f250', priceDelta: 200, available: true },
          { id: 'obj_f300', labelKey: 'configurator:objectives.f300', priceDelta: 350, available: true },
          { id: 'obj_f400', labelKey: 'configurator:objectives.f400', priceDelta: 480, available: true },
        ],
      },
      {
        id: 'camera',
        labelKey: 'configurator:options.camera',
        type: 'radio',
        required: false,
        options: [
          { id: 'camera_none', labelKey: 'configurator:camera.none', priceDelta: 0, available: true },
          { id: 'camera_hd', labelKey: 'configurator:camera.fullHd', priceDelta: 900, available: true },
          { id: 'camera_4k', labelKey: 'configurator:camera.fourK', priceDelta: 2000, available: true },
        ],
      },
    ],
  },
];

export const getConfigurableProduct = (productId: number): ConfigurableProduct | undefined =>
  configurableProducts.find((p) => p.productId === productId);
