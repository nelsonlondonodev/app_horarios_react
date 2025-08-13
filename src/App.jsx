import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';

function App() {
  return (
    <Layout>
      <div className="px-4">
        <Header />
        <ScheduleView />
      </div>
    </Layout>
  );
}

export default App;