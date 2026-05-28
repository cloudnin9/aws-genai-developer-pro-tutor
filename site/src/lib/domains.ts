export interface Domain {
  id: string;
  number: number;
  title: string;
  slug: string;
  weight: number;
  dirName: string;
}

export const domains: Domain[] = [
  {
    id: 'domain-1',
    number: 1,
    title: 'FM Integration, Data Management, and Compliance',
    slug: 'domain-1',
    weight: 31,
    dirName: 'domain-1-fm-integration-data-compliance',
  },
  {
    id: 'domain-2',
    number: 2,
    title: 'Implementation and Integration',
    slug: 'domain-2',
    weight: 26,
    dirName: 'domain-2-implementation-integration',
  },
  {
    id: 'domain-3',
    number: 3,
    title: 'AI Safety, Security, and Governance',
    slug: 'domain-3',
    weight: 20,
    dirName: 'domain-3-ai-safety-security-governance',
  },
  {
    id: 'domain-4',
    number: 4,
    title: 'Operational Efficiency and Optimization',
    slug: 'domain-4',
    weight: 12,
    dirName: 'domain-4-operational-efficiency',
  },
  {
    id: 'domain-5',
    number: 5,
    title: 'Testing, Validation, and Troubleshooting',
    slug: 'domain-5',
    weight: 11,
    dirName: 'domain-5-testing-validation-troubleshooting',
  },
];
