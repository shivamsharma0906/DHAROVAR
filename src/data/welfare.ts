export interface WelfareItem {
  id: string;
  school_name: string;
  project_title: string;
  impact_metrics: string;
  cover_image?: string;
  event_photos?: string[];
  description: string;
  partner_tags?: string[];
}

export const welfareInitiatives: WelfareItem[] = [
  {
    id: 'welfare-01',
    school_name: 'Dhirubhai Ambani International School',
    project_title: 'Global Policy & Model Diplomacy Workshop',
    impact_metrics: '1,200+ Students Mentored',
    partner_tags: ['Global Policy', 'Debate & Diplomacy', 'Youth Leadership'],
    description: 'An intensive diplomatic simulation and policy drafting masterclass held in collaboration with DAIS student council, focusing on postcolonial foreign policy analysis and multilateral summit negotiations.',
  },
  {
    id: 'welfare-02',
    school_name: 'The Cathedral & John Connon School',
    project_title: 'Educational Equity & Resource Redistribution Drive',
    impact_metrics: '3,500+ Books & Digital Kits Donated',
    partner_tags: ['Educational Equity', 'Resource Sharing', 'Community Service'],
    description: 'A student-driven educational material drive connecting Cathedral & John Connon scholars with under-resourced municipal schools across Greater Mumbai to redistribute textbooks, stationery, and digital learning devices.',
  },
  {
    id: 'welfare-03',
    school_name: 'Aditya Birla World Academy',
    project_title: 'Youth Civics & Governance Leadership Forum',
    impact_metrics: '450+ Policy Essays Submitted',
    partner_tags: ['Civics', 'Domestic Governance', 'Academic Writing'],
    description: 'A multi-tier civic awareness competition empowering high school students to research local municipal challenges, urban infrastructure, and sustainable governance solutions.',
  },
];
