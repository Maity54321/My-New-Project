import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducers from "./rootReducers";
import userSaga from "./userSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);

export default store;
