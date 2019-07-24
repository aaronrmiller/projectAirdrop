import React, { Component } from 'react';
import WorkingMemoryCMPT from '../components/WorkingMemoryCMPT.jsx'
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import SectionHeader from "../components/SectionHeader";

const mapStateToProps = store => ({
	aid: store.answers.aid,
});

const mapDispatchToProps = dispatch => ({
  postAnswers: (sectionId, assessment) => dispatch(actions.postAnswers(sectionId, assessment)),
  postResponses: data => dispatch(actions.wmResponses(data)),
});

class WM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      timeToNext: 2000,
      currentChoice: '',
      sectionData: {},
      sectionId: 'WM',
      answerTimeArray: []
    };
    this.startPractice = this.startPractice.bind(this);
    this.startTest = this.startTest.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPracticeHandler = this.onPracticeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.optionReset = this.optionReset.bind(this);
    this.stateReset = this.stateReset.bind(this);

  }

  componentWillUnmount() {
    let subtractTime = this.state.timeToNext * 2;
    let answerTimeArrayCopy = [...this.state.answerTimeArray];
    for (let i = 0; i < this.state.answerTimeArray.length; i += 1) {
      answerTimeArrayCopy[i] -= subtractTime;
      subtractTime += 8000
    }
    const assessment = Object.keys(this.state.sectionData).reduce((a, b, i) => {
      const answer = {
        'aid': this.props.aid,
        'qid': b,
        'answer': this.state.sectionData[b],
        'timeTaken': answerTimeArrayCopy[i]
      };
      a.push(answer);
      return a
    }, []);
    console.log('assessment', assessment);

    this.props.postAnswers(this.state.sectionId, assessment)

    const wmResponses = Object.keys(this.state.sectionData).reduce((a,b,c,d) => {
      a.push(this.state.sectionData[b]);
      return a;
    }, []);
    this.props.postResponses(wmResponses);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: this.state.timeElapsed + 100
      })
    }, 100);
  }

  onSubmit() {
    this.setState({
      // currentChoice: '',
      answerTimeArray: [
        ...this.state.answerTimeArray,
        this.state.timeElapsed
      ]
    })
  }

  onChangeHandler(e, qid) {
    this.setState({
      currentChoice: e.target.value,
      sectionData: {
        ...this.state.sectionData,
        [qid]: e.target.value
      }
    })
  }

  onPracticeHandler(e) {
    this.setState({
      currentChoice: e.target.value
    })
  }

  optionReset () {
    console.log('option reset')
    this.setState({
      currentChoice: '',
    })
  }

  stateReset() {
    this.setState({
      answerTimeArray: [],
    })
  }

  startPractice() {
    this.props.changeSlide();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.optionReset();
          this.props.changeSlide();
          resolve()
        }, this.state.timeToNext)
      }
    )
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            this.stateReset();
            resolve()
          }, 3000)
        })
      })
  }

  startTest() {
    this.startTimer();
    this.props.changeSlide();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.optionReset();
          this.props.changeSlide();
          resolve()
        }, this.state.timeToNext)
      }
    )
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, 3000)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, 3000)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, 3000)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, 3000)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            this.props.changeSlide();
            resolve()
          }, this.state.timeToNext)
        })
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.optionReset();
            clearInterval(this.interval);
            this.props.changeSlide();
            resolve()
          }, 3000)
        })
      })
  }

  render() {
    // console.log('WM TIME ARRAY', this.state.answerTimeArray);
    // console.log('WM SECTION DATA', this.state.sectionData);
    console.log('currentchoice', this.state.currentChoice);
    return (
      <div>
        <SectionHeader sectionName={this.props.WM.section_display_name}/>
        <WorkingMemoryCMPT
          WM={this.props.WM}
          changeSlide={this.props.changeSlide}
          currentSlide={this.props.currentSlide}
          changeSection={this.props.changeSection}
          startPractice={this.startPractice}
          startTest={this.startTest}
          onChangeHandler={this.onChangeHandler}
          currentChoice={this.state.currentChoice}
          onPracticeHandler={this.onPracticeHandler}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WM)
