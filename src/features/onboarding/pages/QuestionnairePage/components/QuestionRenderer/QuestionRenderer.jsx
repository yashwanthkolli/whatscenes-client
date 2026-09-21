import ScaleQuestion from "../../questionTypes/ScaleQuestion/ScaleQuestion"
import SingleSelectBadges from "../../questionTypes/SingleSelectBadges/SingleSelectBadges"
import SingleSelectCardQuestion from "../../questionTypes/SingleSelectCardQuestion/SingleSelectCardQuestion"
import MultiSelectBadgesQuestion from "../../questionTypes/MultiSelectBadgesQuestion/MultiSelectBadgesQuestion"
import MultiSelectCards from "../../questionTypes/MultiSelectCards/MultiSelectCards"
import SingleLineText from "../../questionTypes/SingleLineText/SingleLineText"
import SearchSelectQuestion from "../../questionTypes/SearchSelectQuestion/SearchSelectQuestion"
import NumberInputQuestion from "../../questionTypes/NumberInputQuestion/NumberInputQuestion"
import CurrencyInputQuestion from "../../questionTypes/CurrencyInputQuestion/CurrencyInputQuestion"
import MultiTextInputQuestion from "../../questionTypes/MultiTextInputQuestion/MultiTextInputQuestion"

const QUESTION_COMPONENTS = {
  scale: ScaleQuestion,
  single_select_badges: SingleSelectBadges,
  single_select_cards: SingleSelectCardQuestion,
  multi_select_badges: MultiSelectBadgesQuestion,
  multi_select_cards: MultiSelectCards,
  single_line_text: SingleLineText,
  search_select: SearchSelectQuestion,
  number_input: NumberInputQuestion,
  currency_input: CurrencyInputQuestion,
  multi_text_input: MultiTextInputQuestion,
}

export default function QuestionRenderer({ question, value, onChange }) {
  const Component = QUESTION_COMPONENTS[question.uiType]

  if (!Component) {
    return <div>Unsupported question type: {question.uiType}</div>
  }

  return <Component question={question} value={value} onChange={onChange} />
}
