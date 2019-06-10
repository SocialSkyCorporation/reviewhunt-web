import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";
import NotFound from "components/NotFound";
import { AppConsumer } from "contexts/AppContext";
import queryString from "query-string";
import Header from "components/Header";
import { AuthConsumer } from "contexts/AuthContext";
import Footer from "components/Footer";
import ProtectedRoute from "ProtectedRoute";
import ScrollToTop from "ScrollToTop";

const Home = asyncComponent(() => import("pages/Home"));
const About = asyncComponent(() => import("pages/About"));
const Auth = asyncComponent(() => import("pages/Auth"));
const Product = asyncComponent(() => import("pages/Product"));
const Profile = asyncComponent(() => import("pages/Profile"));

const RoutesWithContext = props => {
  return (
    <AuthConsumer>{value => <Routes {...props} {...value} />}</AuthConsumer>
  );
};

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
    const showHeaderFooter =
      window.location && window.location.pathname !== "/login";
    return (
      <AppConsumer>
        {({ isLoading, me }) => {
          return (
            <div className="content-body">
              {showHeaderFooter && <Header />}
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" component={Auth} />
                <Route path="/product" exact component={Product} />
                <Route path="/about" exact component={About} />
                <ProtectedRoute path="/profile" exact component={Profile} />
                <Route path="*" component={NotFound} />
              </Switch>
              {showHeaderFooter && <Footer />}
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}

export default withRouter(RoutesWithContext);
