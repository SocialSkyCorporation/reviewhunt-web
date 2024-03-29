import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { formatNumber } from "utils/helpers/steemitHelpers";
import { Button, Icon, Tooltip } from "antd";
import WalletContext from "contexts/WalletContext";
import WalletTab from "./WalletTab";
import CircularProgress from "components/CircularProgress";
import TransferModal from "./TransferModal";

export default () => {
  const {
    balances,
    ethAddress,
    isLoading,
    isUpdating,
    isEmpty,
    me,
    toggleTransferModal,
    etherscanLink,
    requestSignTransaction,
    getTransactions,
    handleTransfer
  } = useContext(WalletContext);
  const totalHuntBalance =
    parseFloat(balances.hunt_balance) + parseFloat(balances.external_balances);

  {
    /* if (isLoading || isUpdating || isEmpty(me)) { */
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="wallet light-grey-border">
      <Helmet>
        <title>Reward Wallet</title>
      </Helmet>
      <div className="balance-bar">
        <div className="balance-row">
          <div className="sans small">HUNT BALANCE</div>
          <div className="sans balance">
            {formatNumber(totalHuntBalance)} HUNT
            <br />
            <span>($1,142.92)</span>
          </div>

          <div className="balance-row">
            <div className="sans small">Reward Wallet</div>
            <div className="token-bar-container">
              <div className="token-bar">
                <span className="token-amount">
                  {formatNumber(balances.hunt_balance)} HUNT
                  {balances.locked_hunt > 0 && (
                    <span>
                      &nbsp;(
                      <Icon type="lock" /> {formatNumber(balances.locked_hunt)})
                    </span>
                  )}
                </span>
              </div>
              <div className="token-button">
                {ethAddress ? (
                  <Button
                    type="primary"
                    className="submit-button right text-black"
                    onClick={toggleTransferModal}
                  >
                    TRANSFER
                  </Button>
                ) : (
                  <Tooltip title="Please connect your external wallet first using CONNECT button below">
                    <Button
                      type="primary"
                      className="submit-button right text-black disabled"
                      disabled
                    >
                      TRANSFER
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>

            {balances.locked_hunt > 0 && (
              <ul className="sans small">
                <li>
                  - Ready for transfer:{" "}
                  {formatNumber(balances.hunt_balance - balances.locked_hunt)}{" "}
                  HUNT
                </li>
                <li>
                  - Unlocking tokens tomorrow:{" "}
                  {formatNumber(balances.daily_unlock)} HUNT
                </li>
              </ul>
            )}
          </div>

          <div className="balance-row">
            <div className="sans small">
              External Wallet -&nbsp;
              {ethAddress ? (
                <a
                  href={etherscanLink(ethAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ethAddress}
                </a>
              ) : (
                "Not connected"
              )}
            </div>

            <div className="token-bar-container">
              <div className="token-bar">
                <span className="token-amount">
                  {formatNumber(balances.external_balances)} HUNT
                </span>
              </div>
              <div className="token-button">
                <Button
                  type="primary"
                  className="submit-button right"
                  onClick={requestSignTransaction}
                >
                  {ethAddress ? "CHANGE ADDRESS" : "CONNECT"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <TransferModal />
      </div>
      <WalletTab />
    </div>
  );
};
