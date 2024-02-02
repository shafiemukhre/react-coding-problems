import { useState } from "react";
import "./styles.css";

const defaultFormData = {
  loanAmount: "100000",
  loanTerm: "30",
  interestRate: "3",
};

export default function MortgageCalculator() {
  const [formData, setFormData] = useState(defaultFormData);
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent form from reloading page

    console.log(formData);

    // get and convert form data
    const loanAmount = Number(formData.loanAmount);
    const loanTermInMonths = Number(formData.loanTerm) * 12;
    const monthlyInterestRate = Number(formData.interestRate) / 100 / 12;

    // calculate
    const monthPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthPaymentAmount * loanTermInMonths;
    const totalInterest = totalPayment - loanAmount;

    // currency formatting
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // set state
    setMonthlyPayment(currencyFormatter.format(monthPaymentAmount));
    setTotalPayment(currencyFormatter.format(totalPayment));
    setTotalInterest(currencyFormatter.format(totalInterest));
  };

  return (
    <div className="mortgage">
      <div className="mortgage-wrapper">
        <form onSubmit={onSubmit}>
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="number"
            id="loanAmount"
            defaultValue="100000"
            min="1"
            required
            onChange={onChange}
          />

          <label htmlFor="loanTerm">Loan Term (years)</label>
          <input
            type="number"
            id="loanTerm"
            defaultValue="30"
            min="1"
            required
            onChange={onChange}
          />

          <label htmlFor="interestRate">Interest Rate (%)</label>
          <input
            type="number"
            id="interestRate"
            defaultValue="3"
            step="0.01"
            min="0.01"
            required
            onChange={onChange}
          />

          <button type="submit">Calculate Mortgage</button>
        </form>
        <hr />
        <div className="mortgage-result">
          <ul>
            <li>
              <span>
                Monthly Payment Amount: <strong>{monthlyPayment}</strong>
              </span>
            </li>
            <li>
              <span>
                Total Payment Amount: <strong>{totalPayment}</strong>
              </span>
            </li>
            <li>
              <span>
                Total Interest Paid: <strong>{totalInterest}</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
