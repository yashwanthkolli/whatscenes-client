export function buildDraftAnswer(question, value) {
  return {
    questionKey: question.questionKey,
    questionVersion: question.version,
    value,
  }
}

export function findResumeIndex(questions) {
  const index = questions.findIndex(q => !q.answered)

  if (index === -1) {
    return questions.length - 1
  }

  return index
}