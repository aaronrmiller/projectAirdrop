import {
  RECEIVE_AID,
  CALL_API,
  SEND_API,
  SEND_API_FAILURE,
  RECEIVE_API,
  SEND_QUESTIONNAIRE_RESPONSES,
  SEND_VPS_RESPONSES,
  SEND_WM_RESPONSES,
  SEND_IR_RESPONSES,
  SEND_LTVR_RESPONSES,
  RECEIVE_MEANS
} from "../constants/actionTypes";

const initialState = {
  apiStatus: "",
  apiError: "",
  aid: null,
  ltvr: {
    words: [],
    responses: {},
    mean: null
  },
  vps: {
    responses: [],
    userResponse: {
      correctResponses: []
    },
    mean: null
  },
  wm: {
    correct: [],
    responses: [],
    // new
    userResponse: {
      correctResponses: []
    },
    mean: null
  },
  ir: {
    correct: [],
    responses: [],
    // new
    userResponse: {
      correctResponses: []
    },
    mean: null
  },
  cmsq: {
    // responses: [],
    // responses: ["6","4","5","6","4","3","5","6","4","3","4", "6", "4", "4", "5", "4", "3", "5", "6", "3"],
    responses: {},
    mean: {}
  },
  cnaaq: {
    // responses: [],
    // responses: ["3","4","5","5","4","3","5","5","4","3","4","3"],
    responses: {},
    mean: {},
    composite: {}
  }
};

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_AID:
      return {
        ...state,
        aid: action.payload
      };
    case CALL_API:
      return {
        ...state,
        apiStatus: "pending"
      };
    case SEND_API:
      return {
        ...state,
        apiStatus: "success"
      };
    case SEND_API_FAILURE:
      return {
        ...state,
        apiStatus: "failure",
        apiError: action.payload
      };
    // case RECEIVE_API:
    //   return {
    //   ...state,
    //   results: action.payload.results,
    // };
    case RECEIVE_API:
      return {
        ...state,
        ltvr: {
          ...state.ltvr,
          words: [...action.payload.results.words]
        },
        wm: {
          ...state.wm,
          correct: [...action.payload.results.wm.correct]
        },
        ir: {
          ...state.ir,
          correct: [...action.payload.results.ir.correct]
        }
      };
    case SEND_QUESTIONNAIRE_RESPONSES:
      return {
        ...state,
        cmsq: {
          ...state.cmsq,
          responses: action.payload.cmsqResponses
        },
        cnaaq: {
          ...state.cnaaq,
          responses: action.payload.cnaaqResponses
        }
      };
    case SEND_VPS_RESPONSES:
      // responses: Array(4)
      // 0: {seriesIndex: 1, userChoice: "0", timeTaken: 2000, correctAnswer: 2}
      // 1: {seriesIndex: 2, userChoice: "0", timeTaken: 10000, correctAnswer: 0}
      // 2: {seriesIndex: 3, userChoice: "3", timeTaken: 2300, correctAnswer: 0}
      // 3: {seriesIndex: 4, userChoice: "3", timeTaken: 10000, correctAnswer: 3}
      const totalRightVPS = Object.keys(action.payload).reduce((a, b, c, d) => {
        if (
          Number(action.payload[b].userChoice) ===
          action.payload[b].correctAnswer
        ) {
          a.push(action.payload[b].userChoice);
        }
        return a;
      }, []);

      return {
        ...state,
        vps: {
          ...state.vps,
          responses: [...action.payload],
          userResponse: {
            correctResponses: totalRightVPS.length
          }
        }
      };
    // return {
    //   ...state,
    //   vps: {
    //     ...state.vps,
    //     responses: action.payload
    //   }
    // }
    case SEND_WM_RESPONSES:
      const totalRightWm = state.wm.correct.reduce((a, b, c, d) => {
        if (d[c+1] === action.payload[c]) {
          a.push(b);
        }
        return a;
      }, []);

      return {
        ...state,
        wm: {
          ...state.wm,
          responses: [...action.payload],
          userResponse: {
            correctResponses: totalRightWm.length
            // correct,
            // responses,
            // mean,
          }
        }
      };
    // return {
    //   ...state,
    //   wm: {
    //     ...state.wm,
    //     responses: action.payload
    //   }
    // }

    // return {
    //   ...state,
    //   wm: {
    //     ...state.wm,

    //   }
    // }
    case SEND_IR_RESPONSES:
      // ir: {
      //   correct: [],
      //   responses: [],
      //   mean: null,

      const totalRightIr = state.ir.correct.reduce((a, b, c) => {
        if (b === action.payload[c]) {
          a.push(b);
        }
        return a;
      }, []);
      return {
        ...state,
        ir: {
          ...state.ir,
          responses: [...action.payload],
          userResponse: {
            correctResponses: totalRightIr.length
            // correct,
            // responses,
            // mean,
          }
        }
      };
    // return {
    //   ...state,
    //   ir: {
    //     ...state.ir,
    //     responses: action.payload,
    //   }
    // }
    case SEND_LTVR_RESPONSES:
      const key = Object.values(state.ltvr.words).map(key => {
        return (key = key.word.toLowerCase());
      });
      const sanitizedAnswers = action.payload.map(word => {
        word = word.toLowerCase().trim();
        return word;
      });
      const correctResponses = sanitizedAnswers.filter(a => key.includes(a));
      const numberCorrect = correctResponses.length;
      return {
        ...state,
        ltvr: {
          ...state.ltvr,
          responses: {
            ...state.ltvr.responses,
            key,
            sanitizedAnswers,
            correctResponses,
            numberCorrect: numberCorrect || 0
            // }
          }
          // }
          // return {
          //   ...state,
        }
      };

    case RECEIVE_MEANS:
      return {
        ...state,
        ltvr: {
          ...state.ltvr,
          mean: action.payload.ltvr,
        },
        vps: {
          ...state.vps,
          mean: action.payload.vps,
        },
        wm: {
          ...state.wm,
          mean: action.payload.wm,
        },
        ir: {
          ...state.ir,
          mean: action.payload.ir,
        },
        cnaaq: {
          ...state.cnaaq,
          mean: {
            LEARN: action.payload.q.l,
            IMPROVE: action.payload.q.i,
            STABLE: action.payload.q.s,
            GIFT: action.payload.q.g,
          },
          composite: {
            INCREMENTAL: action.payload.q.i + action.payload.q.l,
            ENTITY: action.payload.q.s + action.payload.q.g,
          }
        },
        cmsq: {
          ...state.cmsq,
          mean: {
            DF: action.payload.q.df,
            WF: action.payload.q.wf,
            DO: action.payload.q.do,
            FE: action.payload.q.fe,
          }
        }
      };
    default:
      return {
        ...state
      };
  }
};

export default answersReducer;
// {
//     vps: 5,
//     ir: 3,
//     wm: 4,
//     ltvr: 10,
//     cnaaq: {
//       DF: 5,
//       WF: 4,
//       DO: 3,
//       FE: 6,
//     },
//     cmsq: {
//       LEARN: 3,
//       IMPROVE: 4,
//       STABLE: 3,
//       GIFT: 4,
//       INCREMENTAL: 6,
//       ENTITY: 7,
//     },


