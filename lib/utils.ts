const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am',
  "i've": 'i have',
  "i'll": 'i will',
  "i'd": 'i would',
  "you're": 'you are',
  "you've": 'you have',
  "you'll": 'you will',
  "you'd": 'you would',
  "he's": 'he is',
  "he'll": 'he will',
  "he'd": 'he would',
  "she's": 'she is',
  "she'll": 'she will',
  "she'd": 'she would',
  "it's": 'it is',
  "it'll": 'it will',
  "it'd": 'it would',
  "we're": 'we are',
  "we've": 'we have',
  "we'll": 'we will',
  "we'd": 'we would',
  "they're": 'they are',
  "they've": 'they have',
  "they'll": 'they will',
  "they'd": 'they would',
  "that's": 'that is',
  "that'll": 'that will',
  "that'd": 'that would',
  "who's": 'who is',
  "who'll": 'who will',
  "who'd": 'who would',
  "what's": 'what is',
  "what'll": 'what will',
  "what'd": 'what would',
  "what're": 'what are',
  "where's": 'where is',
  "where'd": 'where would',
  "when's": 'when is',
  "when'd": 'when would',
  "why's": 'why is',
  "why'd": 'why would',
  "how's": 'how is',
  "how'd": 'how would',
  "how'll": 'how will',
  "there's": 'there is',
  "there'll": 'there will',
  "there'd": 'there would',
  "here's": 'here is',
  "let's": 'let us',
  "can't": 'cannot',
  "couldn't": 'could not',
  "won't": 'will not',
  "wouldn't": 'would not',
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "isn't": 'is not',
  "aren't": 'are not',
  "wasn't": 'was not',
  "weren't": 'were not',
  "hasn't": 'has not',
  "haven't": 'have not',
  "hadn't": 'had not',
  "shouldn't": 'should not',
  "mustn't": 'must not',
  "needn't": 'need not',
  "ain't": 'am not',
};

function stripParenthetical(text: string): string {
  return text.replace(/\([^)]*\)\s*/g, '');
}

function expandContractions(text: string): string {
  return text.replace(/\S*'\S*/g, (match) => CONTRACTIONS[match] ?? match);
}

export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[^a-z0-9'\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalUser = normalizeAnswer(userAnswer);
  const normalCorrect = normalizeAnswer(correctAnswer);

  // Direct match
  if (normalUser === normalCorrect) return true;

  // Strip parenthetical hints from correct answer, e.g. "(Did) you hear?" → "you hear?"
  const strippedCorrect = normalizeAnswer(stripParenthetical(correctAnswer));
  if (normalUser === strippedCorrect) return true;

  // Expand contractions and compare both directions
  const expandedUser = normalizeAnswer(expandContractions(normalUser));
  const expandedCorrect = normalizeAnswer(expandContractions(normalCorrect));
  if (expandedUser === expandedCorrect) return true;

  // Expanded user vs stripped+expanded correct
  const expandedStrippedCorrect = normalizeAnswer(expandContractions(strippedCorrect));
  if (expandedUser === expandedStrippedCorrect) return true;

  return false;
}
