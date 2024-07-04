import rootReducer from "./rootReducer";
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware   from "redux-saga"
import SagaData from "./saga";

// const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer:rootReducer,
    // middleware: ()=> [sagaMiddleware]
})

// sagaMiddleware.run(SagaData)

export default store