// Page registry. The 10 main sections first, then supporting pages.
import home from './home.js';
import contact from './contact.js';
import {
  about, servicesPage, projectsPage, productsPage, technologiesPage, industriesPage, whyPage, roadmapPage,
} from './sections.js';
import { privacy, terms, notFound } from './support.js';

export const pages = [
  home, about, servicesPage, projectsPage, productsPage, technologiesPage,
  industriesPage, whyPage, contact, roadmapPage,
  privacy, terms, notFound,
];
