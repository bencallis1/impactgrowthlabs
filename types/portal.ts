export interface ImpactDataPoint {
  date: string;
  jobsCreated: number;
  companiesSupported: number;
  capitalDeployed: number;
  emissionsAvoided: number;
}

export interface PortfolioMetric {
  label: string;
  value: string | number;
  unit?: string;
}
