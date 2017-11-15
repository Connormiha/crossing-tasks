const backstop = require('backstopjs');
const range = require('lodash/range');

const TESTS = [
    {
        selectedKind: 'Character',
        selectedStory: 'Simple',
    },
    {
        selectedKind: 'Page entry',
        selectedStory: 'Simple',
    },
    {
        selectedKind: 'Page not found',
        selectedStory: 'Simple',
    },
    ...(range(1, 8).map((i) => (
        {
            selectedKind: 'Page play',
            selectedStory: `Game ${i}`,
        }
    )))
];

backstop(process.argv[2] === 'approve' ? 'approve' : 'test', {
    config: {
      id: 'backstop_default',
      viewports: [
        {
          label: 'phone',
          width: 320,
          height: 480
        },
        {
          label: 'tablet',
          width: 1024,
          height: 768
        }
      ],
      onBeforeScript: 'chromy/onBefore.js',
      onReadyScript: 'chromy/onReady.js',
      scenarios: TESTS.map(({selectedStory, selectedKind}) => ({
          label: `${selectedStory}-${selectedKind}`,
          cookiePath: 'backstop_data/engine_scripts/cookies.json',
          url: `http://localhost:6006/iframe.html?selectedKind=${selectedKind}&selectedStory=${selectedStory}`,
          referenceUrl: '',
          readyEvent: '',
          readySelector: '',
          delay: 0,
          hideSelectors: [],
          removeSelectors: [],
          hoverSelector: '',
          clickSelector: '',
          postInteractionWait: '',
          selectors: [],
          selectorExpansion: true,
          misMatchThreshold: 0.1,
          requireSameDimensions: true,
      })),
      paths: {
        bitmaps_reference: 'backstop_data/bitmaps_reference',
        bitmaps_test: 'backstop_data/bitmaps_test',
        engine_scripts: 'backstop_data/engine_scripts',
        html_report: 'backstop_data/html_report',
        ci_report: 'backstop_data/ci_report'
      },
      report: ['ci'],
      engine: 'chrome',
      engineFlags: [],
      asyncCaptureLimit: 5,
      asyncCompareLimit: 50,
      debug: false,
      debugWindow: false
    }
});
