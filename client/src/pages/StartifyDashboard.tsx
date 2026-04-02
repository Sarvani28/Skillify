const StartifyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Startify Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl">Industry Trends</div>
        <div className="bg-gray-800 p-4 rounded-xl">Funding Analysis</div>
        <div className="bg-gray-800 p-4 rounded-xl">Opportunity Score</div>
        <div className="bg-gray-800 p-4 rounded-xl">Region Insights</div>
      </div>
    </div>
  );
};

export default StartifyDashboard;