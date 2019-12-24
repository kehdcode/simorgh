const getConfigUncached = (module, env) => {
  global.Cypress = { env: () => env };
  delete require.cache[require.resolve(module)];
  return require(module);
};

const configs = {
  local: getConfigUncached('../cypress/support/config/services', 'local'),
  test: getConfigUncached('../cypress/support/config/services', 'test'),
  stage: getConfigUncached('../cypress/support/config/services', 'stage'),
  live: getConfigUncached('../cypress/support/config/services', 'live'),
};

const environments = {
  local: 'http://localhost:7080',
  test: 'https://www.test.bbc.com',
  stage: 'https://www.stage.bbc.com',
  live: 'https://www.bbc.com',
};

const results = configs => {
  let output = {};
  configs.forEach;
};

const getData = results => {
  let output = {};

  results.forEach(({ env, pageType, url, service }) => {
    output = {
      ...output,
      [service]: {
        ...(output[service] || {}),
        [pageType]: {
          ...((output[service] && output[service][pageType]) || {}),
          [env]: url,
        },
      },
    };
  });

  return output;
};

const table = services => {
  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const generateLinks = (service, env) => {
    const output = [];

    Object.keys(services[service]).forEach(pageType => {
      Object.keys(services[service][pageType]).forEach(enviroment => {
        if (enviroment === env) {
          output.push(
            `[${pageType}](${services[service][pageType][enviroment]})`,
          );
        }
      });
    });

    return output.join(' - ');
  };

  console.log(`| Service | Local | Test | Stage | Live |`);
  console.log(`|---------|-------|------|-------|------|`);

  Object.keys(services).forEach(service => {
    const items = [
      capitalizeFirstLetter(service),
      generateLinks(service, 'local'),
      generateLinks(service, 'test'),
      generateLinks(service, 'stage'),
      generateLinks(service, 'live'),
    ];

    console.log(`| ${items.join(' | ')} |`);
  });
};

Object.keys(configs).forEach(config => {
  console.log(config);
  Object.keys(configs[config]).forEach(service => {
    console.log(service);
    Object.keys(configs[config][service].pageTypes).forEach(pageType => {
      console.log(configs[config][service].pageTypes[pageType].path);
    });
  });
});
