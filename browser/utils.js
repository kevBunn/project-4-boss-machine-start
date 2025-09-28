export const formatCash = num => {
  if (typeof num !== 'number' || isNaN(num)) return '$0';
  return `$${num.toLocaleString()}`;
};

export const isMillionDollarIdea = (weeklyRevenue, numWeeks) => {
  const revenue = Number(weeklyRevenue);
  const weeks = Number(numWeeks);
  const total = revenue * weeks;

  return revenue > 0 && weeks > 0 && total >= 1000000;
};