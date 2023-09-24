"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import calcStyles from "styles/calculators.module.css";
import kellyStyles from "styles/kelly.module.css";
import { ev, kellyCriterion, validate } from "utils/calculator-utils";

export default function KellyCriterion() {
  const [inputs, setInputs] = useState({
    multiplier: 0,
    bankroll: 0,
    odds: 0,
    winProbability: 0,
  });
  const [outputs, setOutputs] = useState({
    evPercentage: "0.00",
    wagerPercentage: "0.00",
    evDollar: "0.00",
    wagerDollar: "0.00",
  });

  const changeInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => {
      return { ...prevValues, [name]: parseFloat(value) };
    });
  };

  const changeOutputs = (key, value) => {
    setOutputs((prevValues) => {
      return { ...prevValues, [key]: value };
    });
  };

  const calculate = () => {
    let multiplier = inputs.multiplier;
    let bankroll = inputs.bankroll;
    let odds = inputs.odds;
    let winProbability = inputs.winProbability;
    let expectedValue = ev(winProbability / 100, odds);
    let kelly = kellyCriterion(winProbability / 100, odds);

    if (odds != 0 && winProbability != 0) {
      changeOutputs("evPercentage", (expectedValue * 100).toFixed(2));
      changeOutputs("wagerPercentage", (multiplier * kelly * 100).toFixed(2));
    } else {
      changeOutputs("evPercentage", "0.00");
      changeOutputs("wagerPercentage", "0.00");
    }
    if (expectedValue > 0) {
      changeOutputs(
        "evDollar",
        (expectedValue * multiplier * kelly * bankroll).toFixed(2)
      );
      changeOutputs("wagerDollar", (multiplier * kelly * bankroll).toFixed(2));
    } else {
      changeOutputs("evDollar", "0.00");
      changeOutputs("wagerDollar", "0.00");
    }
  };

  useEffect(() => {
    calculate();
  }, [inputs]);

  return (
    <div>
      <header className={calcStyles["calc-head"]}>
        <h1 className={calcStyles["calc-header"]}>
          Kelly Criterion Calculator
        </h1>
        <aside>
          The Kelly Criterion Calculator will calculate the expected value of
          your bet and tell you how much to wager.
        </aside>
      </header>
      <main className={calcStyles["main-container"]}>
        <section className={calcStyles["calc-content"]}>
          <div className={kellyStyles["content"]}>
            <form>
              <ul className={kellyStyles["field"]}>
                <li>
                  <label>Kelly Multiplier</label>
                  <input
                    name="multiplier"
                    placeholder="0.3"
                    type="string"
                    id="american"
                    onChange={(e) => changeInputs(e)}
                  ></input>
                </li>
                <li>
                  <label>Bankroll</label>
                  <input
                    name="bankroll"
                    placeholder="5000"
                    type="string"
                    id="american"
                    onChange={(e) => changeInputs(e)}
                  ></input>
                </li>
                <li>
                  <label>Odds</label>
                  <input
                    name="odds"
                    placeholder="2.1"
                    type="string"
                    id="decimal"
                    onChange={(e) => changeInputs(e)}
                  ></input>
                </li>
                <li>
                  <label>Win Probability</label>
                  <input
                    name="winProbability"
                    placeholder="50"
                    type="string"
                    id="fractional"
                    onChange={(e) => changeInputs(e)}
                  ></input>
                </li>
              </ul>
            </form>
            <div className={kellyStyles.totals}>
              <div className={kellyStyles.output}>
                <label>Expected Value %</label>
                <span>{validate(outputs.evPercentage)}%</span>
              </div>
              <div className={kellyStyles.output}>
                <label>Wager %</label>
                <span>{outputs.wagerPercentage}%</span>
              </div>
              <div className={kellyStyles.output}>
                <label>Expected Value $</label>
                <span>${outputs.evDollar}</span>
              </div>
              <div className={kellyStyles.output}>
                <label>Wager $</label>
                <span>${outputs.wagerDollar}</span>
              </div>
            </div>
          </div>
        </section>
        <section className={calcStyles["calc-footer"]}>
          <h2>How to Use the Kelly Criterion Calculator</h2>
          <p>
            To utilize the Kelly Criterion calculator, input the odds and "fair"
            win probability of your bet, along with the desired fraction of the
            Kelly Criterion to apply. The calculator will determine the expected
            value of the bet and the optimal wager as a percentage of your
            bankroll. If you wish for the optimal wager amount to be in dollars
            and determine expected value of that wager in dollars as well, you
            have the option to enter your bankroll amount.
          </p>
          <p>
            You can determine “fair” win probability using the current market
            odds from the sharpest sportsbooks in the world. Enter the market
            into our{" "}
            <Link href="/betting-calculators/margin">Margin Calculator</Link> to
            determine the fair win probability. As an example, imagine the
            sharpest bookmaker in the world has the Toronto Raptors moneyline
            odds listed at 1.95 odds, with their oppenent having the same odds.
            In this case, both teams have identical moneyline odds, resulting in
            a "fair" win probability of 50% for the Raptors.
          </p>
          <h2>What is the Kelly Criterion?</h2>
          <p>
            The Kelly Criterion is a mathematical formula used in betting and
            investing to determine the optimal size of bets or investments. Its
            primary objective is to maximize the growth of capital over time
            while minimizing the risk of ruin. This is achieved by considering
            the expected value of each bet or investment and their associated
            risks.
          </p>
          <h2>Why Use Kelly Criterion?</h2>
          <p>
            Picture this: you've just stumbled upon an exceptional betting
            opportunity, and you're contemplating of wagering half of bankroll.
            While you should be inclined to wager more on promising bets, it's
            important to remember that even the best bets result in losses. You
            don't want to go broke in a few bets. Perserving your bankroll by
            properly sizing your bets will ensure your ability to weather
            unfavorable variance and the Kelly Criterion is the tool.
          </p>
          <p>
            What's the optimal bet size? Is it best to place a consistent $50
            bet for each wager, or would it be better to allocate a fixed
            percentage, such as 2.5% of your bankroll? Choosing any of these
            could work but it doesn't take into account the actual bet. A bet
            could have a high likehood of winning but this strategy doesn't
            factor it in. Rather than picking an arbitrary flat value or
            percentage, the Kelly Criterion will tailor the bet size for each
            bet by considering the odds and the bet's probability to win.
          </p>
          <p>
            Expected values of bets vary and so should bet sizes to match them.
            Why opt for a bet a fixed rate, whether its flat or based on
            percentage, when a bet with an expected value of 3% is higher than
            one with an expected value of 2%? The higher expected value of a bet
            , the more advantageous it becomes to stake larger amounts, since
            potential returns increase. The Kelly Criterion follows this logic
            of scaling bet sizes proportionally to maximize your ability to
            profit.
          </p>
          <h2>Why Use Fractional Kelly Criterion?</h2>
          <p>
            Although the Kelly Criterion is a very useful tool for calculating
            wager sizes, only a fraction should be considered. It is the Kelly
            mulitplier input in the calculator. Even the sharpest sportsbooks
            can't predict everything precisly, possible having errors in their
            calculations. Taking errors into account it could mean that the
            "fair" odds we are inputing are a bit off. There is also the odds of
            a market that are constantly changing and when you place a bet, the
            "fair" odds can move out of your favor. Where you get burnt the most
            will be when you over estimate your edge. It is better to be
            conservitive and use a fraction or multiplier of 0.2-0.3.
          </p>
        </section>
      </main>
    </div>
  );
}
