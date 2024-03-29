import React, {
  useRef,
  useCallback,
  useEffect,
  useContext,
  useState,
  memo
} from "react";

import { Icon } from "antd";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import ScreenshotCarousel from "pages/Campaign/ScreenshotCarousel";
import QuestCarousel from "pages/Campaign/QuestCarousel";
import CollapsibleText from "pages/Campaign/CollapsibleText";
import NewCampaignContext from "contexts/NewCampaignContext";

import questImg from "assets/images/quest-circle.svg";
import starImg from "assets/images/star.svg";
import appStoreImg from "assets/images/appstore.svg";
import playStoreImg from "assets/images/playstore.svg";
import websiteImg from "assets/images/website.svg";

import FullWidthButton from "components/FullWidthButton";
import CampaignContext from "contexts/CampaignContext";

import fullscreenImg from "assets/images/fullscreen.svg";
import { scrollTop } from "utils/scroller";

export default props => {
  const { dummyRef, setDummyStyle } = props;
  const ref = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [style, setStyle] = useState({
    position: "absolute",
    left: 0,
    top: 0,
    boxShadow: `0 0 30px 0 rgba(141, 151, 158, 0.2)`,
    transformOrigin: "0 0 0",
    marginTop: 20
  });

  const [fullscreen, setFullscreen] = useState(false);

  const { t } = useTranslation();

  const { quests, campaignInfo } = useContext(NewCampaignContext);

  useEffect(() => {
    if (!fullscreen) {
      const scaleValue = dummyRef.current.clientWidth / width;
      const { offsetLeft, offsetTop } = dummyRef.current;

      setStyle({
        ...style,
        width: width,
        height: "auto",
        transform: `scale(${scaleValue})`,
        left: offsetLeft,
        top: offsetTop,
        marginTop: 20
      });
    }

    const handleResize = () => {
      setStyle({ ...style, transition: "none" });
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, fullscreen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!fullscreen) {
      const { clientWidth, clientHeight } = ref.current;
      const scaleValue = dummyRef.current.clientWidth / width;
      setDummyStyle({
        width: clientWidth * scaleValue,
        height: clientHeight * scaleValue
      });
    }
  }, [style, fullscreen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { offsetLeft, offsetTop } = dummyRef.current;
    if (fullscreen) {
      setStyle({
        ...style,
        width: width,
        height: "auto",
        minHeight: document.getElementById("content-body").scrollHeight,
        backgroundColor: "#212121",
        transition: `transform .5s ease-in-out`,
        transform: `scale(1) translateX(${-offsetLeft}px) translateY(${-offsetTop}px)`,
        marginTop: 0
      });

      scrollTop();
    }
  }, [fullscreen]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentCampaign = {
    product_name: "BARK",
    urls: [],
    images: ["https://picsum.photos/600/500", "https://picsum.photos/600/500"],
    quests: [1, 2, 3]
  };

  const banner = () => {
    const {
      product_type,
      product_name,
      urls,
      joined,
    } = campaignInfo;


    return (
      <div className="padded-container banner-container primary-gradient">
        <div>
          <div className="product-category">{product_type.toUpperCase()}</div>
          <div className="product-name">{product_name}</div>
          <div className="line" />
          <div className="product-users">
            {t("product.hunters_on_quest")}: <b>0</b>
            <br />
            Campaign will be closed in: <b>30 days</b>
          </div>
        </div>

        <div className="quest-progress-container col-on-mobile">
          {quests &&
            quests.map((item, index) => {
              const { bounty_max, quest_type } = item;
              const lastItem = index === quests.length - 1;
              return (
                <div className="quest-step col-on-mobile" key={index}>
                  <div className="row-align-center">
                    <div className="step-image-container">
                      <img src={questImg} alt="" />
                    </div>
                    <div className="quest-step-text">
                      {quest_type === "buzz" && (
                        <img className="quest-star" src={starImg} alt="" />
                      )}
                      <div className="price-text">${bounty_max}</div>
                      <div className="quest-text">
                        {t("product.quest")} {index + 1}
                      </div>
                    </div>
                  </div>
                  {!lastItem && <div className="step-divider" />}
                </div>
              );
            })}
        </div>

        <div className="row-align-center">
          <SimpleButton
            text={joined ? "JOINED" : t("product.join")}
            style={{ marginTop: 30 }}
            inverse={joined}
            backgroundColor="transparent"
          />
          <div className="row-align-center url-icon-container">
            {urls["appstore"] && (
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={urls["appstore"]}
              >
                <img className="url-icon hover-link" src={appStoreImg} alt="" />
              </a>
            )}
            {urls["playstore"] && (
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={urls["playstore"]}
              >
                <img
                  className="url-icon hover-link"
                  src={playStoreImg}
                  alt=""
                />
              </a>
            )}
            {urls["website"] && (
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={urls["website"]}
              >
                <img className="url-icon hover-link" src={websiteImg} alt="" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const productInfo = () => {
    const {
      description,
      images,
      total_bounty,
      bounty_left,
      joined
    } = campaignInfo;

    let progress =
      (Number.parseFloat(bounty_left) / Number.parseFloat(total_bounty)) * 100;
    progress = !Number.isNaN(progress) ? progress : 0;

    return (
      <div className="padded-container product-info">
        <div className="title">{t("product.information")}</div>
        <ScreenshotCarousel images={images} />
        <div className="section-divider" />
        <CollapsibleText minHeight={100} text={description} />

        <div className="section-divider" />
        <div className="title">{t("product.quests_reviews")}</div>

        <ProgressBar
          height={29}
          progress={progress}
          containerStyle={{ marginTop: 21 }}
        />

        <div className="progress-bar-text">
          <div>
            {progress}% {t("product.remaining")}
          </div>
          <div>
            ${total_bounty} {t("product.bounty_fund")}
          </div>
        </div>

        <QuestCarousel quests={quests} />

        <div className="section-divider" />

        <div className="title">{t("product.please_note")}</div>
        <div className="please-note margin-right-text">
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Your proofs of quest, review, and buzz participation will be
              reviewed by our moderators, and your submission may be rejected if
              it fails to meet the guidelines that we’ve described in each
              quest, review, and buzz submission page. You won’t be able to
              receive your rewards when your submission is rejected.
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Buzz rewards have a set range of rewards, and it will be varied
              based on our buzz quality measurement that considers your channel
              size, potential reach, actual performance, etc. Please note that
              we won’t be able to reward your buzz content when it doesn’t meet
              our minimum level of buzz quality measurement score.{" "}
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Your HUNT tokens will be distributed within a week after this
              review campaign is finished. You can find your tokens via the
              wallet tab on your profile page.
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Do not submit someone else’s content, fake your screenshot proof,
              or use the same proof via multiple alt accounts. We can
              permanently blacklist your account immediately and refuse/withdraw
              all your reward tokens when your actions are determined as an
              abusing attempt.
            </div>
          </div>
        </div>

        <div className="row-align-center agree-check">
          <Icon
            type="check-circle"
            style={{
              fontSize: 34,
              borderRadius: 17,
              padding: 1,
              backgroundColor: "#fff",
              color: "#8b9699",
              marginRight: 15
            }}
          />
          <div className="text-big text-grey">
            I have read and agree to the guidelines described above.
          </div>
        </div>
        <SimpleButton
          inverse
          style={{ marginTop: 16, maxWidth: 160 }}
          text={joined ? "JOINED" : t("product.join")}
        />
      </div>
    );
  };

  return (
    <div>
      {fullscreen && (
        <div onClick={() => setFullscreen(false)} className="click-to-exit">
          Click here to exit preview
        </div>
      )}
      <div ref={ref} className="campaign-page" style={style}>
        {!fullscreen && (
          <img
            onClick={() => setFullscreen(true)}
            className="fullscreen-img hover-link"
            src={fullscreenImg}
            alt=""
          />
        )}
        {banner()}
        {productInfo()}
      </div>
    </div>
  );
};
