const fs = require('fs');
const path = require('path');

exports.router = (router) => {
	// diplomat.registerAssets({
	// 	version: process.env.DOCKER_TAG,
	// 	originPath: '/assets',
	// 	components: {
	// 		'management-ui': {
	// 			js: 'management-ui.js',
	// 			css: 'management-ui.css'
	// 		},
	// 		'management-ui-standalone': {
	// 			js: 'management-ui-standalone.js',
	// 			css: 'management-ui-standalone.css'
	// 		}
	// 	}
	// });
	//
	// if (gluon.isProdMode() || !process.env.WITH_WEBPACK) {
	// 	const express = require('express');
	//
	// 	return router.use(
	// 		'/assets',
	// 		express.static('dist/assets', {
	// 			etag: false,
	// 			// One week
	// 			maxage: 604800000
	// 		})
	// 	);
	// }

	const webpack = require('webpack');
	const devWebpackConfig = require('../../webpack.config')({ production: false });

	const compiler = webpack(devWebpackConfig);

	router.use(require('webpack-dev-middleware')(compiler, { publicPath: '/assets/' }));
};

exports.indexHtml = () => {
	const assetsDomain = 'localhost:6001';
	const assetsVersion = 'latest';

	return function indexHtml(req, res) {
		res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="referrer" content="no-referrer" />
    <title>Schema Registry</title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i" rel="stylesheet">
    ${`<link rel="stylesheet" type="text/css" href="http://${assetsDomain}/assets/management-ui-standalone.css?v=${assetsVersion}">`}
  </script>
  </head>
  <body style="margin:0;padding:0;">
    <div id="root"></div>
    <script src="http://${assetsDomain}/assets/management-ui-standalone.js?v=${assetsVersion}" crossorigin></script>
  </body>
  </html>`);
	};
};
