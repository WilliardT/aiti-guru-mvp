import './App.css';
import AuthModule from './modules/AuthModule/AuthModule.tsx';
import ProductsModule from './modules/ProductsModule/ProductsModule.tsx';

function App() {
  return (
    <main className="appLayout">
      <AuthModule />
      <ProductsModule />
    </main>
  );
}

export default App;
