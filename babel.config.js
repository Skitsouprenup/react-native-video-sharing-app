module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      [
        'module-resolver',
        {
          root: ['./my-app'],
          alias: {
            '@/assets': './assets',
            '@/shared': './shared',
            '@/components': './components',
            '@/lib': './lib',
            '@/context': './context'
          },
        },
      ],
    ],
  };
};
