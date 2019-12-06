import React, { useContext } from 'react';
import { NavigationUl, NavigationLi } from '@bbc/psammead-navigation';
import {
  Dropdown,
  DropdownUl,
  DropdownLi,
} from '@bbc/psammead-navigation/dropdown';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const Navigation = () => {
  const { platform } = useContext(RequestContext);
  const isAmp = platform === 'amp';

  const {
    script,
    translations,
    navigation,
    service,
    dir,
    navigationSection,
  } = useContext(ServiceContext);
  const { currentPage, skipLinkText } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  const scrollableListItems = (
    <NavigationUl>
      {navigation.map((item, index) => {
        const { title, url } = item;
        const active = index === 0;

        return (
          <NavigationLi
            key={title}
            url={url}
            script={script}
            active={active}
            currentPageText={currentPage}
            service={service}
            dir={dir}
          >
            {title}
          </NavigationLi>
        );
      })}
    </NavigationUl>
  );

  // toggleElement is what the Amp onToggle will toggle
  const toggleElement = 'dropdown-menu';
  const dropdownListItems = (
    <Dropdown id={toggleElement} hidden={isAmp}>
      <DropdownUl>
        {navigation.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <DropdownLi
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPage}
              service={service}
              dir={dir}
            >
              {title}
            </DropdownLi>
          );
        })}
      </DropdownUl>
    </Dropdown>
  );

  return isAmp ? (
    <Amp
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      menuAnnouncedText={navigationSection}
      dir={dir}
      script={script}
      service={service}
      toggleElement={toggleElement}
    />
  ) : (
    <Canonical
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      menuAnnouncedText={navigationSection}
      dir={dir}
      script={script}
      service={service}
    />
  );
};

export default Navigation;
