import React from 'react';
import Home from './app/home/Home';
import GettingStarted from './app/getting-started/GettingStarted';
import GettingStartedMenu from './app/getting-started/GettingStartedMenu';
import ApplicationMenu from './app/ApplicationMenu';
import Tests from './app/tests/Tests';
import TestsMenu from './app/tests/TestsMenu';

import componentConfig from './componentConfig';

import Components from './app/components/Components';
import ComponentsMenu from './app/components/ComponentsMenu';
import ComponentTests from './app/tests/ComponentTests';
import ComponentTestsMenu from './app/tests/ComponentTestsMenu';

const injectConfig = config => (
  ComponentClass => (
    props => (
      <ComponentClass {...props} config={config} />
    )
  )
);

const buildConfigForComponent = (config, ComponentClass) => {
  const generatedConfig = {};
  Object.keys(componentConfig).map((componentKey) => {
    const testRoot = componentConfig[componentKey].testRoot;
    if (testRoot) {
      return {
        path: testRoot,
        component: {
          default: {
            componentClass: injectConfig(componentConfig[componentKey])(ComponentClass),
          },
        },
      };
    }
    return undefined;
  })
  .filter(test => !!test)
  .forEach((test) => {
    generatedConfig[test.path] = test;
  });

  return generatedConfig;
};

const navigation = {
  index: '/home',
  links: [{
    path: '/home',
    text: 'Home',
  }, {
    path: '/getting-started',
    text: 'Getting Started',
  }, {
    path: '/components',
    text: 'Components',
  }, {
    path: '/tests',
    text: 'Tests',
  }],
};

const routes = Object.freeze({
  content: {
    '/home': {
      path: '/home',
      component: {
        default: {
          componentClass: Home,
        },
      },
    },
    '/getting-started': {
      path: '/getting-started',
      component: {
        default: {
          componentClass: GettingStarted,
        },
      },
    },
    '/components': {
      path: '/components',
      component: {
        default: {
          componentClass: injectConfig(componentConfig)(Components),
        },
      },
    },
    '/tests': {
      path: '/tests',
      component: {
        default: {
          componentClass: Tests,
        },
      },
    },
    ...buildConfigForComponent(componentConfig, ComponentTests),
  },
  menu: {
    '/': {
      path: '/',
      component: {
        tiny: {
          componentClass: ApplicationMenu,
          props: {
            navigation,
          },
        },
        small: {
          componentClass: ApplicationMenu,
          props: {
            navigation,
          },
        },
      },
    },
    '/getting-started': {
      path: '/getting-started',
      component: {
        default: {
          componentClass: injectConfig(componentConfig)(GettingStartedMenu),
        },
      },
    },
    '/components': {
      path: '/components',
      component: {
        default: {
          componentClass: injectConfig(componentConfig)(ComponentsMenu),
        },
      },
    },
    '/tests': {
      path: '/tests',
      component: {
        default: {
          componentClass: injectConfig(componentConfig)(TestsMenu),
        },
      },
    },
    ...buildConfigForComponent(componentConfig, ComponentTestsMenu),
  },
});

export { routes, navigation };
