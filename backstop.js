'use strict';

const backstop = require('backstopjs');
const range = require('lodash/range');
const http = require('http');
const {spawn} = require('child_process');

let spawnStorybook;
const isApprove = process.argv[2] === 'approve';
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

const runTests = () => {
    backstop(isApprove ? 'approve' : 'test', {
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
    }).then(() => {
        spawnStorybook && spawnStorybook.kill();
        process.exit(0);
    }).catch(() => {
        spawnStorybook && spawnStorybook.kill();
        process.exit(1);
    });
}

let attemptsCount = 0;
let nextCheck;

function checkServer() {
    attemptsCount++;
    clearTimeout(nextCheck);
    http.get('http://localhost:6006', (res) => {
        if (res.statusCode === 200) {
            clearTimeout(nextCheck);
            runTests();
        }
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

    if (attemptsCount > 10) {
        process.exit(1);
    } else {
        nextCheck = setTimeout(checkServer, 10000);
    }
}

if (isApprove) {
    runTests();
} else {
    const portInUse = (port, callback) => {
        const net = require('net');
        const server = net.createServer();

        server.once('error', (e) => {
           server.close();
           callback(true);
        });
        server.once('listening', (e) => {
    	   server.close();
    	   callback(false);
        });

        server.listen(port);
    };

    portInUse(6006, (inUse) => {
        if (!inUse) {
            console.log('Runnig storybook server');
            spawnStorybook = spawn('npm', ['run', 'storybook']);

            checkServer();
        } else {
            console.log('Storybook server is ready');
            runTests();
        }
    });
}
