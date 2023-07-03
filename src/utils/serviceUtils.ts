export const getIncomeUtil = (income1: number, income2: number, income3: number): number => income1 + income2 + income3;

  export const getInterestRatePerMonthUtil = (bolan: number, rate: number): number => {
    const ratePerYear = (bolan * rate) / 100;
    const ratePerMonth = Math.round(ratePerYear / 12);
    return ratePerMonth;
  };

  export const getTotalCostLoanUtil = (mortgage: number, interest: number, amortise: number): number => {
    const ranta = getInterestRatePerMonthUtil(mortgage, interest);
    const amortering = getInterestRatePerMonthUtil(mortgage, amortise);
    const sum = ranta + amortering;
    return sum;
  };

  export const getTotalCostLoanDiscountedUtil = (mortgage: number, interest: number, amortise: number): number => {
    const fullRanta = getInterestRatePerMonthUtil(mortgage, interest);
    const fullYearRanta = fullRanta * 12;
    const thou = parseInt(fullYearRanta.toString().slice(0, -5) + "00000");
    const thirty = (thou * 30) / 100;
    const twentyone = ((fullYearRanta - thou) * 21) / 100;
    const rateDiscount = (thirty + twentyone) / 12;
    const ranta = fullRanta - rateDiscount;
    const amortering = getInterestRatePerMonthUtil(mortgage, amortise);
    const sum = ranta + amortering;

    // "Kontrolltal: 19 129"
    return Math.round(sum);
  };

  export const getTotalCostUtil = (mortgage: number, interest: number, amortise: number, housingFee: number, operatingCost: number): number => {
    const loan = getTotalCostLoanUtil(mortgage, interest, amortise);
    const avgift = housingFee;
    const drift = operatingCost;
    return Math.round(loan + avgift + drift);
  };