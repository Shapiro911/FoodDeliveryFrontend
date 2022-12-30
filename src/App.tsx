import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from './components/Router/Router';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
