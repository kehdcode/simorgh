/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import 'babel-polyfill';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import routes from './app/routes';

OfflinePluginRuntime.install({
  // Source: https://zach.codes/handling-client-side-app-updates-with-service-workers/
  // NB this means links must have special logic. I have no links to add this on yet, see the link above.
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  onUpdated: () => (window.swUpdate = true), // eslint-disable-line no-return-assign
});

const root = document.getElementById('root');

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    root,
  ),
);

if (module.hot) {
  module.hot.accept();
}
