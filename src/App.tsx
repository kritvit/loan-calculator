import { useState } from 'react';
import { Text } from './components/Text';
import './assets/styles/index.scss';
import { Input } from './components/Input';
import { toNumberFormattedStringUtil, urlGetUtil } from './utils/commonUtils';
import { getIncomeUtil, getInterestRatePerMonthUtil, getTotalCostLoanDiscountedUtil, getTotalCostLoanUtil, getTotalCostUtil } from './utils/serviceUtils';

function App() {
  const [inputIncome1, setInputIncome1] = useState(urlGetUtil("income1"));
  const [inputIncome2, setInputIncome2] = useState(urlGetUtil("income2"));
  const [inputIncome3, setInputIncome3] = useState(urlGetUtil("income3"));
  const [inputCurrentCost, setInputCurrentCost] = useState(urlGetUtil("currentCost"));
  const [inputCashStake, setInputCashStake] = useState(urlGetUtil("cashStake"));
  const [inputMortgage, setInputMortgage] = useState(urlGetUtil("mortgage"));
  const [inputInterest, setInputInterest] = useState(urlGetUtil("interest", 4.3));
  const [inputAmortise, setInputAmortise] = useState(urlGetUtil("amortise", 2));
  const [inputHousingFee, setInputHousingFee] = useState(urlGetUtil("housingFee"));
  const [inputOperatingCost, setInputOperatingCost] = useState(urlGetUtil("operatingCost"));
  const [showForm, setShowForm] = useState(false);
  const [showDiscounted, setShowDiscounted] = useState(true);

  // ?income1=41557&income2=28881&currentCost=22535&cashStake=780000&mortgage=4420000&interest=4.3&amortise=2&housingFee=3960&operatingCost=6000

  const display = (value: any): string => toNumberFormattedStringUtil(value);
  
  const getIncome = (): number => getIncomeUtil(inputIncome1, inputIncome2, inputIncome3);

  const getTotalCostLoan = (): number => getTotalCostLoanUtil(inputMortgage, inputInterest, inputAmortise);

  const getTotalCostLoanDiscounted = (): number => getTotalCostLoanDiscountedUtil(inputMortgage, inputInterest, inputAmortise);

  const getTotalCost = (): number => getTotalCostUtil(inputMortgage, inputInterest, inputAmortise, inputHousingFee, inputOperatingCost);

  const getHousingPrice = (): number => inputCashStake + inputMortgage;

  const getTotalCostDiscounted = (): number => {
    const loan = getTotalCostLoanDiscountedUtil(inputMortgage, inputInterest, inputAmortise);
    const avgift = inputHousingFee;
    const drift = inputOperatingCost;
    return Math.round(loan + avgift + drift);
  };

  const getLeftover = (): number => {
    const salary = getIncome();
    const cost = getTotalCost();
    return salary - cost;
  };

  const getLeftoverDiscounted = (): number => {
    const salary = getIncome();
    const cost = getTotalCostDiscounted();
    return salary - cost;
  };

  const getTotalDiff = (): number => {
    const salary = getIncome();
    const now = salary - inputCurrentCost;
    const future = salary - getTotalCost();
    return future - now;
  };

  const getTotalDiffDiscounted = (): number => {
    const salary = getIncome();
    const now = salary - inputCurrentCost;
    const future = salary - getTotalCostDiscounted();
    return future - now;
  };

  const color = (value: number): string => {
    return value <= 0 ? "var(--color-alert-bad)" : "var(--color-alert-good)";
  };

  const bool = (value: number): boolean => value <= 0;

  const getTotalDiffTitle = (): string => {
    const totalDiff = showDiscounted ? getTotalDiffDiscounted() : getTotalDiff();
    const totalCost = showDiscounted ? getTotalCostDiscounted() : getTotalCost();
    const zero = inputCurrentCost === 0 && totalCost === 0;
    if (zero) {
      return "";
    } else if (totalDiff === 0) {
      return `Du kommer få samma boendekostnad som idag`;
    } else {
      return `Din boendekostnad kommer att ${bool(totalDiff) ? "öka" : "minska" } med`;
    }
  };

  const getTotalDiffText = (): string => {
    const totalDiff = showDiscounted ? getTotalDiffDiscounted() : getTotalDiff();
    if (totalDiff === 0) {
      return "";
    } else {
      return display(totalDiff);
    }
  };

  return (
    <>
      <main className="global__body">

        <header className="component-header global__max-container">
          <h1 className="global__h2">Bolånekalkylator</h1>
          <div className="global__ingress">Räkna på boendekostnad</div>
        </header>
        <section className="component__teaser global__max-container">

          <div>
            <div style={{ borderBottom: "solid 1px var(--color-black-contrast)" }} className="global__grid-container">
              <div className="global__grid-item">
                <label>Visa formuläret <input
                  type="checkbox"
                  checked={showForm}
                  onChange={event => setShowForm(event.target.checked)}
                />
                </label>
              </div>
            </div>

            {showForm && <>
              <Input
                name="inputIncome1"
                label="Inkomst 1"
                info="(kr/mån)"
                value={inputIncome1}
                onChange={setInputIncome1}
              />

              <Input
                name="inputIncome2"
                label="Inkomst 2"
                info="(kr/mån)"
                value={inputIncome2}
                onChange={setInputIncome2}
              />

              <Input
                name="inputIncome3"
                label="Övriga inkomster"
                info="(kr/mån)"
                value={inputIncome3}
                onChange={setInputIncome3}
              />

              <Input
                name="inputCurrentCost"
                label="Boendekostnad idag"
                info="(kr/mån)"
                value={inputCurrentCost}
                onChange={setInputCurrentCost}
              />

              <Input
                name="inputHousingFee"
                label="Avgift"
                info="(kr/mån)"
                value={inputHousingFee}
                onChange={setInputHousingFee}
              />

              <Input
                name="inputOperatingCost"
                label="Driftkostnad"
                info="(kr/mån)"
                value={inputOperatingCost}
                onChange={setInputOperatingCost}
              />

              <Input
                name="inputCashStake"
                label="Kontantinsats"
                info="(kr)"
                value={inputCashStake}
                onChange={setInputCashStake}
              />

              <Input
                name="inputMortgage"
                label="Bolån"
                info="(kr)"
                value={inputMortgage}
                onChange={setInputMortgage}
              />

              <Input
                name="inputAmortise"
                label="Amortera"
                info="(%)"
                value={inputAmortise}
                onChange={setInputAmortise}
              />

              <Input
                name="inputInterest"
                label="Räntesats"
                info="(%)"
                value={inputInterest}
                onChange={setInputInterest}
              />
            </>}

            <div style={{ borderBottom: "solid 1px var(--color-black-contrast)" }} className="global__grid-container">
              <div className="global__grid-item">
                <label>Visa boendekostnad efter ränteavdrag <input
                  type="checkbox"
                  checked={showDiscounted}
                  onChange={event => setShowDiscounted(event.target.checked)}
                />
                </label>
              </div>
            </div>

          </div>

          <div className="global__grid-container">
            <div className="global__grid-item global__grid-item--medium-8">

              <Text title="Inkomst" text={display(getIncome())} />

              {showDiscounted && <>
                <Text title="Månadskostnad" text={display(getTotalCostDiscounted())} />
                <Text title="Kvar av inkomst" text={display(getLeftoverDiscounted())} />
                <Text title={getTotalDiffTitle()} text={getTotalDiffText()} color={color(getTotalDiffDiscounted())} />
              </>}

              {!showDiscounted && <>
                <Text title="Månadskostnad" text={display(getTotalCost())} />
                <Text title="Kvar av inkomst" text={display(getLeftover())} />
                <Text title={getTotalDiffTitle()} text={getTotalDiffText()} color={color(getTotalDiff())} />
              </>}
            </div>

            <div style={{ background: "var(--color-white-emphasized)", padding: "0 1rem" }} className="global__grid-item global__grid-item--medium-4">
              <Text title="Köpkraft" text={display(getHousingPrice())} size="small" suffix="kr" />
              <Text title={`Ränta ${inputInterest}%`} text={display(getInterestRatePerMonthUtil(inputMortgage, inputInterest))} size="small" />
              <Text title={`Amortering ${inputAmortise}%`} text={display(getInterestRatePerMonthUtil(inputMortgage, inputAmortise))} size="small" />
              {showDiscounted && <>
                <Text title="Lånekostnad" text={display(getTotalCostLoanDiscounted())} size="small" />
              </>}

              {!showDiscounted && <>
                <Text title="Lånekostnad" text={display(getTotalCostLoan())} size="small" />
              </>}
            </div>
          </div>

        </section>

      </main>

    </>
  )
}

export default App
