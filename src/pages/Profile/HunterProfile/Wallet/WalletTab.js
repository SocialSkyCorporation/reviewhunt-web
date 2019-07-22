import React, { useContext, useState } from "react";
import WalletContext from "contexts/WalletContext";
import { Avatar, Icon, List, Tabs } from "antd";
import { formatNumber } from "utils/helpers/steemitHelpers";
import { shortFormat } from "utils/date";
import tokenPlaceholder from "assets/images/wallet/token-placeholder@2x.png";
import moneyIcon from "assets/images/money-single-black.svg";
import withdrawIcon from "assets/images/withdraw-black.svg";
import outIcon from 'assets/images/out.svg';
import inRHIcon from 'assets/images/in-rh.svg';
import inSHIcon from 'assets/images/in-sh.svg';

const { TabPane } = Tabs;

const NETWORK = "https://etherscan.io";

export default () => {
  const [activeTabKey, setActiveKey] = useState("1");
  const { withdrawals, transactions, me } = useContext(WalletContext);

  return (
    <Tabs activeKey={activeTabKey} onTabClick={key => setActiveKey(key)}>
      <TabPane
        tab={
          <span>
            <img className="tab-icon" src={moneyIcon} />
            REWARDS
          </span>
        }
        key="1"
      >
        {transactions.length === 0 ? (
          <div className="placeholder">
            <img src={tokenPlaceholder} alt="No transactions" />
            <p>No Transactions Yet</p>
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={transactions}
            className="transactions"
            renderItem={t => (
              <List.Item className="transaction-item">
                <List.Item.Meta
                  avatar={
                    me === t.sender ? (
                      <Avatar icon="arrow-right" className="icon sent" />
                    ) : (
                      <Avatar src={inRHIcon} className="icon received" />
                    )
                  }
                  title={
                    me === t.sender ? (
                      <div className="title sent">
                        {`Sent ${formatNumber(t.amount)} to ` +
                          (t.receiver
                            ? `@${t.receiver}`
                            : `ETH Wallet (${t.eth_address})`)}
                      </div>
                    ) : (
                      <div className="title received">
                        {`Received ${formatNumber(t.amount)} from ` +
                          (t.sender
                            ? `@${t.sender}`
                            : `ETH Wallet (${t.eth_address})`)}
                      </div>
                    )
                  }
                  description={
                    <div>
                      <div className="memo">{t.memo}</div>
                      <div className="date">{shortFormat(t.created_at)}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </TabPane>
      <TabPane
        tab={
          <span>
            <img className="tab-icon" src={withdrawIcon} />
            TRANSFERS
          </span>
        }
        key="2"
      >
        {withdrawals.length === 0 ? (
          <div className="placeholder">
            <img src={tokenPlaceholder} alt="No transactions" />
            <p>No Withdrawals Yet</p>
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={withdrawals}
            className="transactions"
            renderItem={w => (
              <List.Item className="transaction-item">
                <List.Item.Meta
                  avatar={
                    w.status === "sent" ? (
                      <Avatar src={outIcon} className="icon sent" />
                    ) : w.status === "error" || w.status === "failed" ? (
                      <Avatar icon="exclamation" className="icon error" />
                    ) : (
                      <Avatar icon="loading" className="icon pending" />
                    )
                  }
                  title={
                    <div className="title text-blue">
                      {`Withdraw ${formatNumber(w.amount)} HUNT`}
                    </div>
                  }
                  description={
                    <div>
                      <div className="memo">
                        Status: {w.status && w.status.replace(/_/g, " ")}
                        {w.tx_hash && (
                          <span>
                            {" "}
                            | TxHash -{" "}
                            <a
                              href={`${NETWORK}/tx/${w.tx_hash}`}
                              className="tx-hash"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {w.tx_hash} <Icon type="link" />
                            </a>
                          </span>
                        )}
                      </div>
                      <div className="date">{shortFormat(w.created_at)}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </TabPane>
    </Tabs>
  );
};
