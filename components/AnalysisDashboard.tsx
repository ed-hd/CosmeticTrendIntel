
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { TrendData, GroundingSource } from '../types';
import { 
  TrendingUp, Globe, Droplets, UserCheck, BookOpen, ExternalLink, 
  FileText, ArrowRight
} from 'lucide-react';

interface Props {
  data: TrendData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const AnalysisDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Market Executive Summary</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
          {data.summary.split('\n').slice(0, 5).join('\n')}...
        </p>
      </div>

      {/* Grid: Charts and Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Segmentation Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-500" />
            Global Market Segmentation (%)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.segments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {data.segments.map((s, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">{s.name}</span>
                <span className="text-indigo-600 font-bold">{s.growth} YoY</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights List */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <UserCheck size={20} className="text-emerald-500" />
            Top Strategic Insights
          </h3>
          <div className="space-y-4">
            {data.keyInsights.map((insight, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <p className="text-slate-700 leading-snug">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredient Momentum Table */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <Droplets size={20} className="text-blue-500" />
          Ingredient Momentum Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-semibold text-slate-500">Ingredient</th>
                <th className="pb-4 font-semibold text-slate-500">Trend Status</th>
                <th className="pb-4 font-semibold text-slate-500">Market Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.ingredientTrends.map((trend, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-800">{trend.name}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trend.momentum === 'up' ? 'bg-green-100 text-green-800' :
                      trend.momentum === 'down' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {trend.momentum.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{trend.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Dynamics Section */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white">
        <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
          <Globe size={20} className="text-indigo-400" />
          Regional Market Dynamics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.regionalTrends.map((reg, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors group">
              <h4 className="text-lg font-bold mb-3 text-indigo-300">{reg.region}</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{reg.description}</p>
              <div className="flex flex-wrap gap-2">
                {reg.keyBrands.map((brand, bIdx) => (
                  <span key={bIdx} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* References and Sources */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <FileText size={20} className="text-slate-400" />
          Sources & Data Grounding
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.sources.map((source, idx) => (
            <a 
              key={idx} 
              href={source.uri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 group"
            >
              <div className="flex-1 mr-3 truncate">
                <p className="text-sm font-medium truncate">{source.title}</p>
                <p className="text-xs text-slate-400 truncate group-hover:text-indigo-400">{source.uri}</p>
              </div>
              <ExternalLink size={16} />
            </a>
          ))}
          {data.sources.length === 0 && (
            <p className="text-slate-400 italic">No direct sources linked for this segment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
