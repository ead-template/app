if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let r = {};
    const t = (e) => n(e, c),
      u = { module: { uri: c }, exports: r, require: t };
    s[c] = Promise.all(i.map((e) => u[e] || t(e))).then((e) => (a(...e), r));
  };
}
define(['./workbox-7c2a5a06'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/CNAME', revision: 'e3e6997a26dd632753bf0d8de4916437' },
        {
          url: '/_next/app-build-manifest.json',
          revision: 'efc8834c17204e1f16e8f92a67153ed7',
        },
        {
          url: '/_next/static/chunks/120-01ac80a599c1ed9e.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/123-73325b6a8c773b88.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/137-a3290c627370c837.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/2-ef12f5dd2c0245ba.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/246-75134e80cdbe69ca.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/259-9401f36d3ac28320.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/357-0d0b80032a02842e.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/396-5f8aae425f820738.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/396464d2-fea4ff825591693c.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/59-ee8eddd4718b05d0.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/6-8d7134f94c57201d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/619-60789a9b111b1ac8.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/621-54e8b4f0464cd74a.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/628-4d2d747e43123c14.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/637-2b4f59ba71d25912.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/663-f749ff38ff01113d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/708.2937252872ef0c75.js',
          revision: '2937252872ef0c75',
        },
        {
          url: '/_next/static/chunks/734-f3fe65a3e03f57f4.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/74-ab98623ab803c823.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/784-631f5058ab8e36af.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/794-18e4d1ebeca32fc5.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/796-d84eb70e4f3fbead.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/7a49ec60.491bbc9cf5a54f05.js',
          revision: '491bbc9cf5a54f05',
        },
        {
          url: '/_next/static/chunks/8012d7e2-ca9a84fec2524c9b.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/912.6461ba6fc408cd49.js',
          revision: '6461ba6fc408cd49',
        },
        {
          url: '/_next/static/chunks/984-f7c78c65bd4b3934.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/_not-found-f929118c44a51e17.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/aula/%5BuuidAula%5D/page-7a56d168323ce2a2.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/layout-874bf0958d81a721.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/login/page-35130ed49dd0e67d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/page-9a8d6e0adc6f626c.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/perfil/page-9ab1ac6009cd7b6b.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/recover-password/page-c95301eb29c07c97.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/recovery-email-sent/page-92e7c30f491684ef.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/register/page-39a874be2df118d8.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/reset-password/page-8045c4b1a5e7945d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/app/search/page-d064801727c33ae7.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/fd9d1056-688bb1b7443ca61d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/framework-43665103d101a22d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/main-ab8a0aa58826d08d.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/main-app-8035b971f482d846.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/pages/_app-3bfc2182b3828233.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/pages/_error-41917d5cd28d3adf.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-7c6eef8f7b260c08.js',
          revision: 'uxcMVDKH72pDnl6ur_Mwb',
        },
        {
          url: '/_next/static/css/6564c56f160d6028.css',
          revision: '6564c56f160d6028',
        },
        {
          url: '/_next/static/css/7e1313103c68518e.css',
          revision: '7e1313103c68518e',
        },
        {
          url: '/_next/static/media/primeicons.0112589c.ttf',
          revision: '0112589c',
        },
        {
          url: '/_next/static/media/primeicons.943ab24c.svg',
          revision: '943ab24c',
        },
        {
          url: '/_next/static/media/primeicons.ba3f916d.woff2',
          revision: 'ba3f916d',
        },
        {
          url: '/_next/static/media/primeicons.f8b9e8a4.woff',
          revision: 'f8b9e8a4',
        },
        {
          url: '/_next/static/media/primeicons.ffecb254.eot',
          revision: 'ffecb254',
        },
        {
          url: '/_next/static/uxcMVDKH72pDnl6ur_Mwb/_buildManifest.js',
          revision: '98ff2a28b7cafd6bd1ca0d77a854e4ab',
        },
        {
          url: '/_next/static/uxcMVDKH72pDnl6ur_Mwb/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/worker/pdf-worker.js',
          revision: '00acb7601de2705f17bd69ab719102f5',
        },
        {
          url: '/android-icon-144x144.png',
          revision: 'eb78d44ccd3aee6af5256d67b025b247',
        },
        {
          url: '/android-icon-192x192.png',
          revision: '75538262b3214d61cf92a088d40c1a2d',
        },
        {
          url: '/android-icon-36x36.png',
          revision: '1de1705b34faf554c4688b8f7f3763f4',
        },
        {
          url: '/android-icon-48x48.png',
          revision: '6e8a403c3156de28de2ee37420952898',
        },
        {
          url: '/android-icon-512x512.png',
          revision: 'f8c5de78b9f6d267c57328bcf0574d2b',
        },
        {
          url: '/android-icon-72x72.png',
          revision: '3861275dd239805a7f05348729feb457',
        },
        {
          url: '/android-icon-96x96.png',
          revision: 'aef837636e2e5aaa4c99907d7a5dd101',
        },
        {
          url: '/apple-icon-114x114.png',
          revision: 'ff3d777654271502ba8d13e40828e76f',
        },
        {
          url: '/apple-icon-120x120.png',
          revision: 'cb37d202210ded30f39cd7c05da366a1',
        },
        {
          url: '/apple-icon-144x144.png',
          revision: 'eb78d44ccd3aee6af5256d67b025b247',
        },
        {
          url: '/apple-icon-152x152.png',
          revision: 'a4589b0889fbaf3437a9480c39346469',
        },
        {
          url: '/apple-icon-180x180.png',
          revision: '1dd43acae8e952dda3a58365f3db23ed',
        },
        {
          url: '/apple-icon-57x57.png',
          revision: '82eb4dac2164ccb7dccef1f1509ffe3a',
        },
        {
          url: '/apple-icon-60x60.png',
          revision: '3ceb23a5c24c0b199f9e7d07f7f93f02',
        },
        {
          url: '/apple-icon-72x72.png',
          revision: '3861275dd239805a7f05348729feb457',
        },
        {
          url: '/apple-icon-76x76.png',
          revision: 'b61eccf8ff9be7d8d2abb0af283496f4',
        },
        {
          url: '/apple-icon-precomposed.png',
          revision: '234308e2a0db3f4e4e6b03370b6a7732',
        },
        {
          url: '/apple-icon.png',
          revision: '234308e2a0db3f4e4e6b03370b6a7732',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-300.woff',
          revision: '2e8292f37b401025cca97395b005c8f4',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-300.woff2',
          revision: '1773a241892e2573201acbd11d76158f',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-700.woff',
          revision: 'c3a17dcd22924a57167bdca954763c01',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-700.woff2',
          revision: '5366c57b20a86f1956780da5e26aac90',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-regular.woff',
          revision: 'a53df66f339b35b6a9b18b41980d0005',
        },
        {
          url: '/assets/css/fonts/lato-v17-latin-ext_latin-regular.woff2',
          revision: '344ee6eaad74df6b72dec90b1b888aab',
        },
        {
          url: '/assets/css/theme-dark.css',
          revision: '86f4a1886b97de748f01e87d5214569b',
        },
        {
          url: '/assets/css/theme-light.css',
          revision: '07134a531f7c2afc21b79a0eeb2d2b61',
        },
        {
          url: '/assets/js/pdf.worker.js',
          revision: '6ba2902431222c7148862415f28d1fe3',
        },
        {
          url: '/assets/logo/logo.png',
          revision: 'c1e77d82a3353875fb12b183858a7480',
        },
        {
          url: '/assets/logo/mobile_logo.png',
          revision: '5140b72be272a70180f82f1b65315fa7',
        },
        {
          url: '/browserconfig.xml',
          revision: '653d077300a12f09a69caeea7a8947f8',
        },
        {
          url: '/favicon-16x16.png',
          revision: '242b96376789e8a1730e375ce320057d',
        },
        {
          url: '/favicon-32x32.png',
          revision: '6aa6bfdd89c1f1fbc74096919c451036',
        },
        {
          url: '/favicon-96x96.png',
          revision: 'aef837636e2e5aaa4c99907d7a5dd101',
        },
        { url: '/favicon.ico', revision: '74c4a3002ec6704e4aa7a8815acef0f9' },
        {
          url: '/logo_1200x630.jpeg',
          revision: 'b4297585ad651bb02138759a4ace7215',
        },
        { url: '/manifest.json', revision: '0b7f5c6d250b10e4c199a8a724f8b6b2' },
        {
          url: '/ms-icon-144x144.png',
          revision: 'eb78d44ccd3aee6af5256d67b025b247',
        },
        {
          url: '/ms-icon-150x150.png',
          revision: 'd12cac58af9634a90c0a8cd67c9a3d1e',
        },
        {
          url: '/ms-icon-310x310.png',
          revision: 'eedc307266c73112faef33ad4fb297d1',
        },
        {
          url: '/ms-icon-70x70.png',
          revision: 'b9d9eb745c6c68215c490bb95a99d9e5',
        },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET',
    );
});
