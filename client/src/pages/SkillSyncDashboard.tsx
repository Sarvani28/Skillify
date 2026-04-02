import SkillSyncNavbar from "../components/SkillSyncNavbar";

const SkillSyncDashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex">

      {/* Sidebar */}
      <SkillSyncNavbar />

      {/* Main Content */}
      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">
          SkillSync Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl">Skill Input</div>
          <div className="bg-gray-800 p-4 rounded-xl">Skill Demand Chart</div>
          <div className="bg-gray-800 p-4 rounded-xl">Skill Gap Result</div>
          <div className="bg-gray-800 p-4 rounded-xl">Learning Roadmap</div>
        </div>
      </div>
    </div>
  );
};

export default SkillSyncDashboard;