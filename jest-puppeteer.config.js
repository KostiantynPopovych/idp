module.exports = {
    launch: {
        devtools: true, // allows for use of 'debugger;' in tests
        // executablePath: '/usr/bin/chromium-browser',
        headless: true,
        defaultViewport: {
            width: 1024,
            height: 768,
        },
        ignoreDefaultArgs: ['--disable-extensions'],
        args: [
            '--enable-font-antialiasing',
            '--font-render-hinting=medium',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox', // GOOD
            '--no-zygote',
            '--single-process', // GOOD

            "--renderer",
            "--no-service-autorun",
            "--no-experiments",
            "--no-default-browser-check",
            "--disable-extensions",
        ]
    },
    server: { // launches webserver just for tests @jkr
        // command: 'node server.js',
        command: 'npm run test:webserver'
        // port: 4444,
    },
    browser: 'chromium',
    browserContext: 'default'
};