import { configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export function configureAppStore() {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;

    const middlewares = [sagaMiddleware];

    const enhancers = (getDefaultEnhancers) => [
        ...(getDefaultEnhancers ? getDefaultEnhancers() : []),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const store = configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware({ thunk: false }),
            ...middlewares,
        ],
        devTools: {
            shouldHotReload: false,
        },
        enhancers,
    });

    return store;
}
