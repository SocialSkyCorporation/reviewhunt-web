import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";
import NotFound from "components/NotFound";
import { AuthConsumer } from "contexts/AuthContext";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import Header from "components/Header";
import Footer from "components/Footer";
import ProtectedRoute from "ProtectedRoute";

const Home = asyncComponent(() => import("pages/Home"));
const About = asyncComponent(() => import("pages/About"));
const Auth = asyncComponent(() => import("pages/Auth"));
const Campaign = asyncComponent(() => import("pages/Campaign"));
const Privacy = asyncComponent(() => import("pages/Policy/Privacy"));
const Cookie = asyncComponent(() => import("pages/Policy/Cookie"));
const Terms = asyncComponent(() => import("pages/Policy/Terms"));
const HunterProfile = asyncComponent(() =>
  import("pages/Profile/HunterProfile")
);
const MakerProfile = asyncComponent(() => import("pages/Profile/MakerProfile"));

class Routes extends Component {
  componentWillUnmount() {}

  render() {
    const pathname = window.location.pathname;
    const showHeaderFooter = pathname !== "/auth";

    return (
      <AuthConsumer>
        {({ emailMe, userType }) => {
          const isHunter = userType === TYPE_HUNTER;
          return (
            <div id="content-body" className="content-body">
              {showHeaderFooter && <Header />}
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" component={Auth} />
                <Route path="/campaigns/:id" component={Campaign} />
                <Route path="/about" exact component={About} />
                <Route path="/privacy" exact component={Privacy} />
                <Route path="/terms" exact component={Terms} />
                <Route path="/cookie" exact component={Cookie} />
                <ProtectedRoute
                  path="/profile"
                  exact
                  component={isHunter ? HunterProfile : MakerProfile}
                />
                <Route path="*" component={NotFound} />
              </Switch>
              {showHeaderFooter && <Footer />}
            </div>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default withRouter(Routes);
