export interface ResumeEvent {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  type: 'work' | 'education' | 'project';
}

export const resumeEvents: ResumeEvent[] = [
  {
    id: '1',
    title: 'Principal Software Engineer',
    company: 'Dataminr',
    location: 'New York, NY',
    startDate: '2020-03',
    endDate: null,
    description: 'Led Web Infrastructure team enabling developer productivity through shared libraries and tooling. Integrated new product following first acquisition using micro-frontend architecture with module federation.',
    type: 'work'
  },
  {
    id: '2',
    title: 'Engineering Manager',
    company: 'Dataminr',
    location: 'New York, NY',
    startDate: '2018-08',
    endDate: '2020-03',
    description: 'Managed Customer Experience team responsible for all client-facing applications. Grew team from 4 to 9 developers while creating better hiring practices. Led cross-team engineering initiatives and roadmapping processes.',
    type: 'work'
  },
  {
    id: '3',
    title: 'Senior Software Engineer',
    company: 'Dataminr',
    location: 'New York, NY',
    startDate: '2017-08',
    endDate: '2018-07',
    description: 'Team lead for web application working with product teams on planning and prioritization. Spearheaded transition from Backbone to React/Redux. Led development of complex settings workflow for content customization.',
    type: 'work'
  },
  {
    id: '4',
    title: 'Software Engineer',
    company: 'Dataminr',
    location: 'New York, NY',
    startDate: '2014-04',
    endDate: '2017-07',
    description: 'Developed core features for Backbone application including D3 graphs, interactive maps, and real-time event displays. Created initial Selenium integration test suite.',
    type: 'work'
  },
  {
    id: '5',
    title: 'Mobile Web Developer II',
    company: 'ESPN',
    location: 'New York, NY',
    startDate: '2012-08',
    endDate: '2014-03',
    description: 'Designed and developed APIs for SC Feed mobile application. Created editor tools for infographics generation and developed modules for various sports pages including college football recruiting and NFL expert picks.',
    type: 'work'
  },
  {
    id: '6',
    title: 'Junior Application Analyst',
    company: 'News Corporation',
    location: 'New York, NY',
    startDate: '2009-11',
    endDate: '2012-07',
    description: 'Designed breaking news monitoring system for hundreds of sources using single-page JavaScript application with Solr/Lucene backend. Developed news aggregator, CMS for story redistribution, and video platform for encoding and distribution across News Corp entities.',
    type: 'work'
  },
  {
    id: '7',
    title: 'BS Computer Science Engineering',
    company: 'University of Colorado at Boulder',
    location: 'Boulder, CO',
    startDate: '2004-08',
    endDate: '2008-12',
    description: 'Bachelor of Science in Computer Science Engineering with minor in Philosophy. Completed senior project creating conference scheduling software for Conference of World Affairs using Perl and web technologies.',
    type: 'education'
  }
];
