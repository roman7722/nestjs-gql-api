import WhatAboutUs from './what-about-us.model';

export const whatAboutUsProviders = [
  {
    provide: 'WHAT_ABOUT_US_REPOSITORY',
    useValue: WhatAboutUs,
  },
];
