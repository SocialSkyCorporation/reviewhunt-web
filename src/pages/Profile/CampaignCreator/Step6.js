import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import krwImg from "assets/images/krw.svg";
import usdImg from "assets/images/usd.svg";
import btcImg from "assets/images/bitcoin.svg";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext, {
  STEP_CAMPAIGN_BUDGET
} from "contexts/NewCampaignContext";
import AuthContext from "contexts/AuthContext";
import QRCode from "qrcode.react";
import { CardElement, Elements, injectStripe } from "react-stripe-elements";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import {
  filterReviewQuests,
  filterBuzzQuests
} from "utils/helpers/campaignHelper";

const PAYMENT_USD = "USD";
const PAYMENT_KRW = "KRW";
const PAYMENT_BTC = "BTC";

class _CardForm extends React.Component {
  render() {
    return (
      <form
        onSubmit={() =>
          this.props.stripe.createToken().then(payload => console.log(payload))
        }
      >
        <label>Card Details</label>
        <div className="card-form">
          <CardElement />
          <button>Pay</button>
        </div>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

const NameValue = ({ title, value, minKeyWidth }) => {
  return (
    <div className="row-align-center title-value-item">
      <div className="text-grey text-name" style={{ minWidth: minKeyWidth }}>
        {title}
      </div>
      <div className="text-black">{value}</div>
    </div>
  );
};

const PaymentOption = ({ type, className, selected, onClick }) => {
  let text = "";
  let src = "";

  if (type === PAYMENT_USD) {
    text = "Pay in USD";
    src = usdImg;
  } else if (type === PAYMENT_KRW) {
    text = "Pay in KRW";
    src = krwImg;
  } else if (type === PAYMENT_BTC) {
    text = "Pay in Crypto";
    src = btcImg;
  }

  return (
    <div
      onClick={onClick}
      className={`payment-option ${className} ${selected ? "selected" : ""}`}
    >
      <img src={src} />
      <div>{text}</div>
    </div>
  );
};

const Step6 = ({}) => {
  const [paymentOption, setPaymentOption] = useState(null);
  const {
    campaignInfo,
    currencyInfo,
    fetchingCurrency,
    fetchCurrency,
    totalBudgetAmount,
    setStep,
    quests
  } = useContext(NewCampaignContext);
  const { emailMe } = useContext(AuthContext);
  const { email, company_name, name } = emailMe;

  const { product_name, images, quest_count, buzz } = campaignInfo;
  const reviewQuests = quests.filter(filterReviewQuests);
  const buzzQuests = quests.filter(filterBuzzQuests);
  let hasAppstoreReview = false;
  let hasPlaystoreReview = false;

  reviewQuests.forEach(r => {
    if (r.channel === "appstore") {
      hasAppstoreReview = true;
    } else if (r.channel === "playstore") {
      hasPlaystoreReview = true;
    }
  });

  const totalBudget = totalBudgetAmount;
  const platformFee = totalBudget * 0.08;
  const conversionFee = totalBudget * 0.12;

  return (
    <div className="campaign-step">
      <div className="checkout-title text-black uppercase">
        Checkout and run campaign
      </div>

      <div className="checkout-summary row-align-center">
        <img src={images[0]} alt="" />
        <div>
          <div className="text-black text-big payment-summary-title">
            {product_name}
          </div>
          <div>
            <div>{quests ? quests.length : 0} quests</div>
            {hasAppstoreReview && !hasPlaystoreReview && <div>App Store</div>}
            {hasPlaystoreReview && !hasAppstoreReview && <div>Play Store</div>}
            {hasAppstoreReview && hasPlaystoreReview && (
              <div>App Store and Play Store reviews</div>
            )}
            {buzzQuests.length > 0 && <div>Buzz content</div>}
          </div>
        </div>
      </div>

      <div className="checkout-header text-black uppercase">
        Maker information
      </div>
      <NameValue title={"Name"} value={name} minKeyWidth={160} />
      <NameValue
        title={"Company name"}
        value={company_name}
        minKeyWidth={160}
      />
      <NameValue title={"Email address"} value={email} minKeyWidth={160} />
      <div className="checkout-header text-black uppercase">Amount to pay</div>
      <NameValue
        title={"Total budget to reward hunters"}
        value={`$${numberWithCommas(totalBudget.toFixed(2))}`}
        minKeyWidth={280}
      />
      <NameValue
        title={"Platform fee (8%)"}
        value={`$${numberWithCommas(platformFee.toFixed(2))}`}
        minKeyWidth={280}
      />
      <NameValue
        title={"Accounting / Conversion fee (12%)"}
        value={`$${numberWithCommas(conversionFee.toFixed(2))}`}
        minKeyWidth={280}
      />
      <div className="divider-line" />
      <NameValue
        title={"Total"}
        value={`$${(totalBudget + platformFee + conversionFee).toFixed(2)}`}
        minKeyWidth={280}
      />
      <div className="text-grey text-info">
        * Currency fluctuations, bank fees and applicable taxes may change your
        final amount.
      </div>

      <div className="checkout-header payment text-black uppercase">
        Choose payment option
      </div>

      <div className="row-space-around">
        <PaymentOption
          onClick={() => {
            if (paymentOption === PAYMENT_USD) return;
            fetchCurrency(PAYMENT_USD);
            setPaymentOption(PAYMENT_USD);
          }}
          type={PAYMENT_USD}
          selected={paymentOption === PAYMENT_USD}
        />
        <PaymentOption
          onClick={() => {
            if (paymentOption === PAYMENT_KRW) return;
            fetchCurrency(PAYMENT_KRW);
            setPaymentOption(PAYMENT_KRW);
          }}
          selected={paymentOption === PAYMENT_KRW}
          className="payment-option-middle"
          type={PAYMENT_KRW}
        />
        <PaymentOption
          onClick={() => {
            if (paymentOption === PAYMENT_BTC) return;
            fetchCurrency(PAYMENT_BTC);
            setPaymentOption(PAYMENT_BTC);
          }}
          selected={paymentOption === PAYMENT_BTC}
          type={PAYMENT_BTC}
        />
      </div>

      {paymentOption && (
        <div className="payment-preview">
          {fetchingCurrency ? (
            <Icon type="loading" />
          ) : (
            <>
              {currencyInfo.currency === PAYMENT_USD && (
                <div className="payment-usd">
                  <Elements>
                    <CardForm />
                  </Elements>
                </div>
              )}
              {currencyInfo.currency === PAYMENT_KRW && (
                <div>
                  <NameValue
                    title={"입금계좌"}
                    value={currencyInfo.address.ko}
                    minKeyWidth={160}
                  />
                  <NameValue
                    title={"입금액 (KRW 환산)"}
                    value={`${numberWithCommas(
                      Number(currencyInfo.amount).toFixed(2)
                    )} KRW`}
                    minKeyWidth={160}
                  />
                  <div className="text-info text-grey">
                    * 입금자명이 다를 경우 입금확인이 어려우니 반드시 정확한
                    입금자명을 입력해 주시기 바랍니다. * 세금계산서 발급은
                    admin@hunt.town으로 입금내역, 사업자등록증 사본, 발급받으실
                    이메일 주소를 보내주시기 바랍니다.
                  </div>
                </div>
              )}

              {currencyInfo.currency === PAYMENT_BTC && (
                <div className="payment-btc">
                  <QRCode value={currencyInfo.address} />
                  <div className="text-btc">
                    {numberWithCommas(currencyInfo.amount)} BTC
                  </div>
                  <div className="text-black">{currencyInfo.address}</div>
                  <div
                    className="text-info text-info"
                    style={{ marginTop: 16 }}
                  >
                    * Sending any other digital asset, including Bitcoin Cash
                    (BCH), will result in permanent loss.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="save-next-container step6">
        <div
          className="row-align-center text-grey"
          onClick={() => setStep(STEP_CAMPAIGN_BUDGET)}
        >
          <Icon type="left" />
          <div>Back</div>
        </div>
      </div>
    </div>
  );
};

Step6.propTypes = {};

Step6.defaultProps = {};

export default Step6;
