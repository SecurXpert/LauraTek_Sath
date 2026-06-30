import React from "react";

interface SummaryCardItem {
  label: string;
  value: string;
  icon: React.ElementType;
  trendUp: boolean;
  trendText: string;
  iconBg: string;
  iconColor: string;
}

interface SummaryCardsProps {
  cards: SummaryCardItem[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] border border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 ${card.iconBg} rounded-xl`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <p className="text-sm text-gray-500 mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
