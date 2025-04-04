import React from 'react';
import { BadgeDollarSign, Fan, Refrigerator, Lightbulb } from 'lucide-react';

const solutions = [
  {
    title: 'Inflation Reduction Act',
    description: 'Thanks to the Inflation Reduction Act, homeowners may be eligible for renewable tax credits each year through 2032 for purchasing energy-efficient items such as windows, doors, renewable energy systems, and more. These tax credits can often be used in operating programs to help you move energy-efficient. If you\'re currently using the data collected during your audit to develop a more extended-range energy efficiency plan, contact your Home Performance consultant for more information.',
    icon: BadgeDollarSign
  },
  {
    title: 'Heat Pumps',
    description: 'Electrification is a key trend, and heat pump technology plays a crucial role in this transition. As the technology evolves and incentive and credits become available, your assigned consultant will continue to provide you with the most up-to-date information. We encourage you to stay in touch and keep you informed of incentives and tax credits that may apply to your situation. We encourage regular check-ins with your Home Performance consultant to ensure that you are well-informed about the latest developments in heat pump technology and can take full advantage of available incentives and credits.',
    icon: Fan
  },
  {
    title: 'Appliances',
    description: 'We recommend ENERGY STAR®-rated appliances for their energy efficiency and performance. Not only do they use less energy, but they also perform better and last longer. Keep in mind that appliances were not a part of the energy audit we conducted at your home, but we always recommend considering energy efficiency when it comes to appliances. In particular, if you\'re thinking about upgrading your kitchen appliances, consider making the switch to an ENERGY STAR®-rated electric induction cooktop.',
    icon: Refrigerator
  },
  {
    title: 'Other Suggestions',
    description: 'While we didn\'t specifically check out the lighting or faucets in your home during our evaluation, we have some recommendations for you. We suggest using ENERGY STAR® and WaterSense-rated fixtures and bulbs to help save money on your energy costs. For lighting, LED bulbs are the way to go. Other energy-saving features like timers or motion sensors can be a great way to save even more. Plus, good news! You can find these energy-efficient products at a discounted rate in the PSE&G, NJNG, and JCP&L Marketplace. Give it a try!',
    icon: Lightbulb
  }
];

export const FutureUpgrades: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Future Solutions</h2>
      <div className="space-y-6">
        {solutions.map((solution, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <solution.icon className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed">{solution.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}