import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import DataUploader from './components/DataUploader';
import SalaryTable from './components/SalaryTable';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <ConfigPanel />
              <DataUploader />
            </div>
            
            <div className="lg:col-span-3 xl:col-span-4 overflow-hidden">
              <SalaryTable />
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
