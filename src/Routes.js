import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";
import NotFound from "components/NotFound";
import { AuthConsumer } from "contexts/AuthContext";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import queryString from "query-string";
import Header from "components/Header";
import Footer from "components/Footer";
import ProtectedRoute from "ProtectedRoute";

const Home = asyncComponent(() => import("pages/Home"));
const About = asyncComponent(() => import("pages/About"));
const Auth = asyncComponent(() => import("pages/Auth"));
const Campaign = asyncComponent(() => import("pages/Campaign"));
const HunterProfile = asyncComponent(() =>
  import("pages/Profile/HunterProfile")
);
const MakerProfile = asyncComponent(() => import("pages/Profile/MakerProfile"));

class Routes extends Component {
  componentWillMount() {
    let parsedURL = null;
    if (this.props.location.search) {
      try {
        parsedURL = queryString.parse(this.props.location.search);
        const source = this.props.location.pathname
          .split("/")
          .filter(i => i)[1]
          .toLowerCase();
        //handle contents differently based on source
        this.props.handleAuth(source, parsedURL);
      } catch (e) {
        console.error("URI Parse error", this.props.location.search);
      }
    }
  }

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
