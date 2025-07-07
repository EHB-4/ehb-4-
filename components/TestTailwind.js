export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Tailwind CSS Test</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-lg">
            This is a test component showing Tailwind CSS styles.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Click Me
            </button>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Created with Tailwind CSS</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
