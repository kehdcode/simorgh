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

const getData = results => {
  let output = {};

  Object.keys(results).forEach(config => {
    Object.keys(results[config]).forEach(service => {
      Object.keys(results[config][service].pageTypes).forEach(pageType => {
        output = {
          ...output,
          [service]: {
            ...(output[service] || {}),
            [pageType]: {
              ...((output[service] && output[service][pageType]) || {}),
              [config]: results[config][service].pageTypes[pageType].path,
            },
          },
        };
      });
    });
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
        if (
          enviroment === env &&
          services[service][pageType][enviroment] &&
          pageType !== 'errorPage404'
        ) {
          output.push(
            `[${pageType}](${environments[enviroment]}${services[service][pageType][enviroment]})`,
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

table(getData(configs));
