interface QuestionPanelProps {
  currentQuestion: any;
}

export default function QuestionPanel({ currentQuestion }: QuestionPanelProps) {
  if (!currentQuestion) return null;

  return (
    <div className="p-3 sm:p-4 md:p-6 shrink-0 md:overflow-y-auto md:min-h-0">
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <h2 className="text-lg font-bold">{currentQuestion.title}</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">
              {currentQuestion.score} PTS
            </span>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Problem Statement</h3>
        <p className="text-gray-600 mb-4">{currentQuestion.question}</p>

        {currentQuestion.description && (
          <>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <h4 className="font-semibold mb-2">Sample Input</h4>
            <div className="bg-gray-100 p-3 rounded">
              {currentQuestion.sample_inputs}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Expected Output</h4>
            <div className="bg-gray-100 p-3 rounded">
              {currentQuestion.sample_outputs}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
