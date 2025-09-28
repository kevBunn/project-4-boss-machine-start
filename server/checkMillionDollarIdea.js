const isMillionDollarIdea = (weeklyRevenue, numWeeks) => {
  const revenue = Number(weeklyRevenue);
  const weeks = Number(numWeeks);
  const total = revenue * weeks;

  return revenue > 0 && weeks > 0 && total >= 1000000;
};

// Middleware to validate if an idea is worth at least $1,000,000
/*checkMillionDollarIdea middleware
1) is a function takes three arguments - yes: req, res, next
2) sends a 400 error if the total yield is less than one million dollars - yes
3) calls next for ideas that will yield at least one million dollars - yes
4) sends a 400 error if numWeeks or weeklyRevenue is not supplied
5) sends a 400 error if numWeeks or weeklyRevenue is an invalid string*/

const checkMillionDollarIdea = (req, res, next) => { //- no.1 of test
    // Extract numWeeks and weeklyRevenue from the request body
    const { numWeeks, weeklyRevenue } = req.body;

    // Check if numWeeks and weeklyRevenue are provided - no.4 of test
    if (numWeeks === undefined || weeklyRevenue === undefined) {
        return res.status(400).send({ error: 'numWeeks and weeklyRevenue are required' });
    }

    // Check if numWeeks and weeklyRevenue are valid string numbers - no.5 of test
    if (isNaN(Number(numWeeks)) || isNaN(Number(weeklyRevenue))) {
        return res.status(400).send({ error: 'numWeeks and weeklyRevenue must be valid numbers' });
    }
    
    // Check if the idea is worth at least $1,000,000 - no.2 of test
    if (!isMillionDollarIdea(weeklyRevenue, numWeeks)) {
        return res.status(400).send({ error: 'Idea is not worth at least $1,000,000' });
    }

    next(); // If the idea is valid, proceed to the next middleware or route handler - no.3 of test
};


module.exports = checkMillionDollarIdea;