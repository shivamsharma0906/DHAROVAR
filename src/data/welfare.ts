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

export const singleWelfareInitiative: WelfareItem = {
  id: 'welfare-01',
  school_name: 'Dhirubhai Ambani International School',
  project_title: 'Global Policy & Model Diplomacy Workshop',
  impact_metrics: '1,200+ Students Mentored',
  partner_tags: ['Global Policy', 'Debate & Diplomacy', 'Youth Leadership'],
  description: 'An intensive diplomatic simulation and policy drafting masterclass held in collaboration with DAIS student council, focusing on postcolonial foreign policy analysis and multilateral summit negotiations.',
};

export const welfareInitiatives: WelfareItem[] = [singleWelfareInitiative];
