import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
// import UserDemographics from "./Demographics.jsx";
// import VisualProcessingSpeed from "./VPS.jsx";
// import WorkingMemory from "./WM.jsx";
// import ImageRecognition from "./IR.jsx";
// import LTVRD from "./LTVRD";
// import QuestionnaireCont from "./Questionnaires.jsx";
// import LTVRR from "./LTVRR";
import Introduction from "../components/IntroductionCMPT";
import Instructions from "../components/Instructions.jsx";
import Container from "@material-ui/core/Container";
// import UserResults from "./UserResults";

const Fallback = () => <p> Please wait while we boot up skynet! </p>;
const LazyWorkingMemory = lazy(() => import("./WM"));
const LazyImageRecognition = lazy(() => import("./IR"));
const LazyUserDemographics = lazy(() => import("./Demographics"));
const LazyVisualProcessingSpeed = lazy(() => import("./VPS"));
const LazyLTVRD = lazy(() => import("./LTVRD"));
const LazyLTVRR = lazy(() => import("./LTVRR"));
const LazyQuestionnaireCont = lazy(() => import("./Questionnaires"));
const LazyUserResults = lazy(() => import("./UserResults"));

const mapStateToProps = store => ({
  test: store.test.test,
  currentSection: store.test.currentSection,
  currentSlide: store.test.currentSlide,
  vpsAnswers: store.test.vpsAnswers,
  results: store.answers.results
});

const mapDispatchToProps = dispatch => ({
  changeSection: () => dispatch(actions.changeSection()),
  changeSlide: () => dispatch(actions.changeSlide()),
  buildVPSAnswers: () => dispatch(actions.buildVPSAnswers()),
  fetchTest: () => dispatch(actions.fetchTest()),
  setDate: () => dispatch(actions.setDate())
});

class MainTestDisplay extends Component {
  constructor(props) {
    super(props);
    this.changeSection = this.props.changeSection.bind(this);
    this.buildVPSAnswers = this.props.buildVPSAnswers.bind(this);
  }

  componentDidMount() {
    console.log("USER TEST DISPLAY COMPONENT DID MOUNT");
    this.props.fetchTest();
  }

  render() {
    console.log("THIS PROPS TEST 0", this.props.test[0]);
    console.log("results test", this.props.results);
    const compArray = [
      // <UserDemographics changeSection={this.changeSection} />,
      <LazyUserDemographics changeSection={this.changeSection} />,

      <Introduction
        intro={this.props.test[2]}
        changeSection={this.changeSection}
      />,

      // <LTVRD
      //   changeSection={this.changeSection}
      //   buildVPSAnswers={this.buildVPSAnswers}
      //   section={this.props.test[6]}
      // />,

      
      <LazyLTVRD
        changeSection={this.changeSection}
        buildVPSAnswers={this.buildVPSAnswers}
        section={this.props.test[6]}
      />,

      // <VisualProcessingSpeed
      //   changeSection={this.changeSection}
      //   vpsAnswers={this.props.vpsAnswers}
      //   section={this.props.test[5]}
      // />,

      <LazyVisualProcessingSpeed
        changeSection={this.changeSection}
        vpsAnswers={this.props.vpsAnswers}
        section={this.props.test[5]}
      />,
      // <WorkingMemory WM={this.props.test[1]} changeSlide={this.props.changeSlide} currentSlide={this.props.currentSlide} changeSection={this.changeSection}/>,

      <LazyWorkingMemory
        WM={this.props.test[1]}
        changeSlide={this.props.changeSlide}
        currentSlide={this.props.currentSlide}
        changeSection={this.changeSection}
      />,
      // <ImageRecognition IR={this.props.test[0]} changeSlide={this.props.changeSlide} currentSlide={this.props.currentSlide} changeSection={this.changeSection}/>,
      <LazyImageRecognition IR={this.props.test[0]} changeSlide={this.props.changeSlide} currentSlide={this.props.currentSlide} changeSection={this.changeSection}/>,
      
      // <LTVRR changeSection={this.props.changeSection} section={this.props.test[6]} />,
      <LazyLTVRR changeSection={this.props.changeSection} section={this.props.test[6]} />,

      // <QuestionnaireCont changeSection={this.changeSection} test={this.props.test}/>,
      <LazyQuestionnaireCont changeSection={this.changeSection} test={this.props.test}/>,

      // <UserResults />,
      <LazyUserResults />,

      <Instructions />
    ];

    // for (let i = 0; i < compArray.length; i++) {
    //   if (i % 2 === 1) compArray.splice(i, 0, <SectionEndScreen changeSection={this.changeSection}/>)
    // }

    return (
      <div>
        <ErrorBoundary>
          <Suspense fallback={<Fallback />}>
        {/* <UserDemographics changeSection={this.changeSection} /> */}

            {this.props.test.length > 0 && compArray[this.props.currentSection]}
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainTestDisplay);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.log("ERROR LOG HERE:");
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      return <h1>He's dead Jim.</h1>;
    }
    return this.props.children;
  }
}
