
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MarketSegment {
  name: string;
  value: number;
  growth: string;
}

export interface TrendData {
  summary: string;
  keyInsights: string[];
  segments: MarketSegment[];
  regionalTrends: {
    region: string;
    description: string;
    keyBrands: string[];
  }[];
  ingredientTrends: {
    name: string;
    momentum: 'up' | 'stable' | 'down';
    reason: string;
  }[];
  consumerBehavior: string[];
  sources: GroundingSource[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
