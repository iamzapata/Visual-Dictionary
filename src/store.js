import { createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import ReduxLogger from "redux-logger"
import rootReducer from "reducers"

const middlewares = [ReduxThunk]

if (process.env.NODE_ENV === `development`) {
  middlewares.push(ReduxLogger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
