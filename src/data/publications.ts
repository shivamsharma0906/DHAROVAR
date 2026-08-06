export type PublicationCategory =
  | 'Domestic Policy & Governance'
  | 'External Relations'
  | 'Geopolitics & Multipolar Order';

export interface PublicationItem {
  id: string;
  title: string;
  date: string;
  category: PublicationCategory;
  cover_image?: string;
  video_file?: string;
  gallery?: string[];
  excerpt: string;
  bodyHtml: string;
  author?: string;
}

export const publications: PublicationItem[] = [
  {
    id: 'domestic-governance-reforms-2026',
    title: "India's Domestic Governance & Economic Infrastructure Framework: A Postcolonial Perspective",
    date: '2026-05-14T10:00:00.000Z',
    category: 'Domestic Policy & Governance',
    excerpt: "Examining national economic direction, institutional reforms, and civilizational ethos as the prerequisite foundation for projecting global leadership.",
    author: 'Dharovar House Secretariat',
    bodyHtml: `
      <h3>Executive Summary</h3>
      <p>National progress on a global stage begins from within. Foreign policy is fundamentally domestic policy projected abroad. This policy paper examines the internal governance structures, economic reforms, and societal cohesion required to anchor India's long-term national trajectory.</p>
      
      <h3>Key Reform Pillars</h3>
      <ul>
        <li><strong>Economic Decentralization & Local Production</strong>: Strengthening Tier-2 and Tier-3 manufacturing hubs to reduce supply chain dependencies.</li>
        <li><strong>Pedagogical Independence</strong>: Reforming secondary and higher education curricula to foster critical thinking rooted in Indian history and sociology.</li>
        <li><strong>Administrative Transparency</strong>: Leveraging digital public infrastructure to ensure equitable delivery of public services.</li>
      </ul>
      
      <blockquote>"True sovereign strength emerges when domestic governance reflects national identity and civilizational confidence."</blockquote>
      
      <h3>Policy Recommendations</h3>
      <p>Policymakers must prioritize multidisciplinary policy labs in secondary schools and universities to equip the youth with empirical analytical tools, insulating national discourse from foreign disinformation.</p>
    `,
  },
  {
    id: 'external-relations-south-asia',
    title: 'Indian External Relations in a Reordered World: Strategic Autonomy & Multilateral Diplomacy',
    date: '2026-06-20T14:30:00.000Z',
    category: 'External Relations',
    excerpt: 'An institutional analysis of India\'s diplomatic partnerships across South Asia, the Global South, and major world powers.',
    author: 'Strategic Affairs Desk',
    bodyHtml: `
      <h3>Institutional Overview</h3>
      <p>India's external relations are guided by the principle of strategic autonomy—engaging multipolar partners while preserving sovereign decision-making. This policy brief analyzes India's bilateral and multilateral engagements across the Indian Ocean Region and South Asia.</p>
      
      <h3>Strategic Benchmarks</h3>
      <ul>
        <li><strong>Neighborhood First Alignment</strong>: Enhancing cross-border energy grids, maritime security protocols, and trade corridors.</li>
        <li><strong>Global South Advocacy</strong>: Placing energy security, debt sustainability, and technology access at the forefront of international summits.</li>
        <li><strong>Defense Industrial Partnerships</strong>: Accelerating co-development and indigenous manufacturing partnerships.</li>
      </ul>
      
      <h3>Metric Evaluation</h3>
      <p>Quantitative trade and security assessments indicate a <strong>42% increase</strong> in intra-regional trade resilience across partner maritime corridors over a 24-month observation window.</p>
    `,
  },
  {
    id: 'geopolitics-multipolar-global-order',
    title: 'Geopolitics & Multipolarity: Navigating Power Shifts in the 21st Century',
    date: '2026-07-02T11:15:00.000Z',
    category: 'Geopolitics & Multipolar Order',
    excerpt: 'A comprehensive study of regional geopolitical dynamics, maritime security in the Indo-Pacific, and global governance realignment.',
    author: 'Geopolitics Research Division',
    bodyHtml: `
      <h3>Speech & Research Overview</h3>
      <p>As global geopolitical institutions face structural friction, the emerging multipolar order demands rigorous, historically aware analysis. This flagship report examines key regional developments influencing India's strategic imperatives.</p>
      
      <h3>Core Themes & Findings</h3>
      <ul>
        <li><strong>Indo-Pacific Maritime Stability</strong>: Safeguarding critical sea lines of communication through cooperative naval patrols and multilateral security dialogues.</li>
        <li><strong>Resource Security & Energy Transition</strong>: Mitigating supply chain bottlenecks in critical minerals and green energy technologies.</li>
        <li><strong>Postcolonial International Relations</strong>: Articulating a multipolar international architecture that rejects unilateral hegemony.</li>
      </ul>
      
      <blockquote>"Leadership in a multipolar era requires clear strategic vision, civilizational grounding, and unapologetic national confidence."</blockquote>
    `,
  },
];
