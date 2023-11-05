const pxToVwRE = /(-?[\.\d]+)px/g;
export default function pxToVwPreset() {
  return {
    name: '@unocss/preset-px-to-upx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === 'string' && pxToVwRE.test(value)) {
          i[1] = value.replace(pxToVwRE, (_, p1) => `${p1}rpx`);
        }
      });
    },
    preflight: true,
  };
}

