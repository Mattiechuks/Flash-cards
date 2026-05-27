import { useState } from "react";

const flashcards = [
  // SECTION: THE SENTENCE
  { id: 1, category: "The Sentence", q: "Define a sentence.", a: "A sentence is a group of words that makes complete sense. It begins with a capital letter and ends with a full stop, exclamation mark, or question mark." },
  { id: 2, category: "The Sentence", q: "What are the four types of sentences according to function?", a: "1. Declarative sentence\n2. Interrogative sentence\n3. Imperative sentence\n4. Exclamatory sentence" },
  { id: 3, category: "The Sentence", q: "What are the four types of sentences according to structure?", a: "1. Simple sentence\n2. Complex sentence\n3. Compound sentence\n4. Compound-complex sentence" },
  { id: 4, category: "The Sentence", q: "What is a simple sentence?", a: "A simple sentence has one subject and one predicate (one main clause). E.g., 'The man and the dog took a walk.'" },
  { id: 5, category: "The Sentence", q: "What is a complex sentence?", a: "A complex sentence has one main clause and one or more subordinate clauses. E.g., 'I went home because it was raining.' (MC + SC)" },
  { id: 6, category: "The Sentence", q: "What is a compound sentence?", a: "A compound sentence combines two or more independent (main) clauses. E.g., 'To err is human but to forgive is divine.'" },
  { id: 7, category: "The Sentence", q: "What is a compound-complex sentence?", a: "A compound-complex sentence has two or more main clauses and at least one subordinate clause. E.g., 'She cooked the food and her children ate it when they returned from school.'" },
  { id: 8, category: "The Sentence", q: "What is a declarative sentence and give an example?", a: "A declarative sentence makes a statement. E.g., 'I am going to school.' / 'We are having an English lecture.'" },
  { id: 9, category: "The Sentence", q: "What is an interrogative sentence and give an example?", a: "An interrogative sentence asks a question. E.g., 'How are you?' / 'Where are you?' / 'Who are you?'" },
  { id: 10, category: "The Sentence", q: "What is an imperative sentence and give an example?", a: "An imperative sentence gives a command or makes a plea. E.g., 'Come, bring the book, shut the door, pass the salt.'" },
  { id: 11, category: "The Sentence", q: "What is an exclamatory sentence?", a: "An exclamatory sentence is used to exclaim. E.g., 'Hurray!', 'Good God!', 'Alas!' — sudden expressions that could belong to any part of speech." },
  { id: 12, category: "The Sentence", q: "Identify the structural type: 'The man and the dog took a walk.'", a: "Simple sentence — it has one main clause with a compound subject." },
  { id: 13, category: "The Sentence", q: "Identify the structural type: 'Although Jennifer slapped her admirer, he did not relent in expressing his feelings for her.'", a: "Complex sentence — it has one main clause and one subordinate clause introduced by 'Although.'" },
  { id: 14, category: "The Sentence", q: "Identify the structural type: 'God made man and placed him in paradise but man fell short of God's glory.'", a: "Compound sentence — it has two or more main clauses joined by 'and' and 'but.'" },
  { id: 15, category: "The Sentence", q: "What is a sentence fragment?", a: "A sentence fragment is a group of words that does not make complete sense, i.e., it is not a complete sentence. E.g., 'Walking down the street.'" },

  // SECTION: PARTS OF THE SENTENCE
  { id: 16, category: "Parts of the Sentence", q: "What are the two main parts of a sentence?", a: "The Subject and the Predicate." },
  { id: 17, category: "Parts of the Sentence", q: "What is the subject of a sentence?", a: "The subject names what the sentence is spoken about. It also carries out the action of the verb." },
  { id: 18, category: "Parts of the Sentence", q: "What is the predicate?", a: "The predicate is what we say about the subject. It contains the verb and all other elements apart from the subject." },
  { id: 19, category: "Parts of the Sentence", q: "What does SVOCA stand for?", a: "S = Subject, V = Verb, O = Object, C = Complement, A = Adverbial" },
  { id: 20, category: "Parts of the Sentence", q: "What is the object in a sentence?", a: "The object receives or suffers the action of the verb. 'Who?' asks for the subject; 'What?' asks for the direct object; 'Whom?' asks for the indirect object." },
  { id: 21, category: "Parts of the Sentence", q: "What is the difference between a direct object and an indirect object?", a: "The direct object is the one directly acted upon (the action falls on it). The indirect object receives the direct object — it answers 'to whom' or 'for whom.' E.g., 'John gave Mary a golden ring.' — Mary = indirect object, ring = direct object." },
  { id: 22, category: "Parts of the Sentence", q: "What is a complement?", a: "A complement completes the sense or meaning of the verb 'be' or another linking verb. It functions as an adjective or noun and refers back to the subject or object." },
  { id: 23, category: "Parts of the Sentence", q: "What is a subject complement? Give an example.", a: "A subject complement describes or identifies the subject via a linking verb. E.g., 'Ese looks beautiful.' (beautiful = subject complement) / 'Karo is the class representative.'" },
  { id: 24, category: "Parts of the Sentence", q: "What is an object complement? Give an example.", a: "An object complement refers to or describes the object. E.g., 'They consider him intelligent.' (intelligent = object complement)" },
  { id: 25, category: "Parts of the Sentence", q: "What is the adverbial element?", a: "The adverbial is an optional part of the sentence structure that shows when, where, how, and why the verb's action occurs. E.g., 'He went home yesterday.' (yesterday = adverbial)" },
  { id: 26, category: "Parts of the Sentence", q: "What are transitive verbs?", a: "Transitive verbs take objects. They transfer action to an object. E.g., 'do, passed, asked, kicked.' Transitive means transferred." },
  { id: 27, category: "Parts of the Sentence", q: "What are intransitive verbs?", a: "Intransitive verbs take no object. They show no action but present state. E.g., 'to be, am, is, are.' They use complements instead." },
  { id: 28, category: "Parts of the Sentence", q: "Identify the sentence pattern: 'He kicked the ball.'", a: "SVO — Subject (He) + Verb (kicked) + Object (the ball)" },
  { id: 29, category: "Parts of the Sentence", q: "Identify the sentence pattern: 'Ese looks beautiful.'", a: "SVC — Subject (Ese) + Verb (looks) + Complement (beautiful)" },
  { id: 30, category: "Parts of the Sentence", q: "Identify the sentence pattern: 'Moses passed the ball to Muse.'", a: "SVOD — Subject (Moses) + Verb (passed) + Direct Object (ball) + Indirect Object (to Muse)" },

  // SECTION: CONCORD (SUBJECT-VERB AGREEMENT)
  { id: 31, category: "Concord", q: "What is concord?", a: "Concord (agreement) means agreement between parts of a sentence. If one part is singular, the other part will be singular; discord is disagreement." },
  { id: 32, category: "Concord", q: "State Rule 1 of concord.", a: "A singular subject takes a singular verb, and a plural subject takes a plural verb. E.g., 'The boy goes to school.' / 'The boys go to school.'" },
  { id: 33, category: "Concord", q: "State Rule 2 of concord regarding compound subjects.", a: "A compound subject is plural if the members are joined by 'and.' E.g., 'The boy and the girl go to school.' If members are paired (each a single unit), the verb is singular: 'The principal and Chief Executive is Professor Sunny Wuke.'" },
  { id: 34, category: "Concord", q: "State Rule 3 of concord regarding 'either/neither.'", a: "A compound subject with singular members joined by 'either/or' or 'neither/nor' takes a singular verb. E.g., 'Neither Peter nor Paul likes.' In a situation where one subject is plural, the verb agrees with the subject closest to it." },
  { id: 35, category: "Concord", q: "State Rule 4 of concord regarding nouns plural in form but singular in meaning.", a: "Nouns plural in form but singular in meaning take a singular verb. E.g., 'Mathematics is a difficult subject.' / 'News is bad.' / 'Physics is surprising.' / 'Three hundred dollars is my first salary.'" },
  { id: 36, category: "Concord", q: "State Rule 5 of concord regarding expressions like 'together with.'", a: "If a singular subject is linked to another word by expressions like 'together with, along with, as well as, accompanied by, escorted by,' the verb remains singular. E.g., 'The President along with his finance minister is here.'" },
  { id: 37, category: "Concord", q: "State Rule 6 of concord regarding 'the number of' vs 'a number of.'", a: "'The number of' takes a singular verb; 'A number of' takes a plural verb. E.g., 'The number of students that have submitted is low.' / 'A number of students that have submitted are low.'" },
  { id: 38, category: "Concord", q: "State Rule 7 of concord regarding collective nouns.", a: "Collective nouns generally take a singular verb. E.g., 'The class is having an English lesson.' There must be agreement between the collective noun and its pronoun." },
  { id: 39, category: "Concord", q: "Correct this sentence: 'Peter and Paul goes to school.'", a: "CORRECT: 'Peter and Paul go to school.' — Compound subject joined by 'and' takes a plural verb." },
  { id: 40, category: "Concord", q: "Correct this sentence: 'Neither the teacher nor the students was there.'", a: "CORRECT: 'Neither the teacher nor the students were there.' — The verb agrees with the subject closest to it ('students' = plural)." },
  { id: 41, category: "Concord", q: "Correct this sentence: 'The traditional ruler and Chairman of the occasion have arrived.'", a: "OKAY — The traditional ruler and Chairman refer to one person (paired title), so it can be singular: 'has arrived.' But if two different people, 'have arrived' is correct." },
  { id: 42, category: "Concord", q: "Correct this sentence: 'Either Ayo or his friends has the formula for this exam.'", a: "CORRECT: 'Either Ayo or his friends have the formula for this exam.' — Verb agrees with closest subject ('friends' = plural)." },
  { id: 43, category: "Concord", q: "Correct this sentence: 'The committee have submitted its report.'", a: "OKAY — Collective noun 'committee' can take singular verb: 'The committee has submitted its report.'" },
  { id: 44, category: "Concord", q: "Correct this sentence: 'The teacher, together with the students, are expecting the principal.'", a: "CORRECT: 'The teacher, together with the students, is expecting the principal.' — 'Together with' does not make subject plural; verb agrees with 'teacher' (singular)." },
  { id: 45, category: "Concord", q: "Correct: 'The principal, as well as his team of managers, are being investigated.'", a: "CORRECT: 'The principal, as well as his team of managers, is being investigated.' — 'As well as' does not compound the subject; verb agrees with 'principal' (singular)." },

  // SECTION: TENSES
  { id: 46, category: "Tenses", q: "What are the four types of past tense?", a: "1. Simple Past\n2. Past Continuous (Past form of 'be' + Present Participle)\n3. Past Perfect (had + Past Participle)\n4. Past Perfect Continuous (had + been + Present Participle)" },
  { id: 47, category: "Tenses", q: "What are the four types of present tense?", a: "1. Simple Present\n2. Present Continuous (Present form of 'be' + Present Participle)\n3. Present Perfect (have/has + Past Participle)\n4. Present Perfect Continuous (have/has + been + Present Participle)" },
  { id: 48, category: "Tenses", q: "What are the four types of future tense?", a: "1. Simple Future (shall/will)\n2. Future Continuous (shall/will + be + Present Participle)\n3. Future Perfect (shall/will + have + Past Participle)\n4. Future Perfect Continuous (shall/will + have + been + Present Participle)" },
  { id: 49, category: "Tenses", q: "When is the Simple Past tense used?", a: "The Simple Past is used to show that something took place at a particular point in time (stated or implied in the past). E.g., 'He took my pen in English class yesterday.'" },
  { id: 50, category: "Tenses", q: "When is the Past Continuous tense used?", a: "The Past Continuous is often used to show that an action was going on when another action took place. E.g., 'We were having an English lesson when he came in.' / 'I was going when I saw him.'" },
  { id: 51, category: "Tenses", q: "How is the Past Continuous formed?", a: "Past form of 'be' (was/were) + Present Participle. Be = am, is, are + present participle. E.g., 'I was going.'" },
  { id: 52, category: "Tenses", q: "How is the Past Perfect formed and when is it used?", a: "Formed with 'had + Past Participle.' It is used to show that one action took place before another action in the past. E.g., 'When I entered the classroom, the teacher had started the lesson.'" },
  { id: 53, category: "Tenses", q: "How is the Past Perfect Continuous formed?", a: "'had + been + Present Participle.' E.g., 'I had been waiting when the train arrived.'" },
  { id: 54, category: "Tenses", q: "When is the Simple Present tense used?", a: "For regular or habitual actions ('I go to bed at 12 midnight everyday'), for facts ('Mosquitoes cause malaria'), and in football commentary language." },
  { id: 55, category: "Tenses", q: "How is the Present Continuous formed and what does it show?", a: "Present form of 'be' (am/is/are) + Present Participle. It shows an action currently in progress. E.g., 'The teacher is teaching, the students are writing.'" },
  { id: 56, category: "Tenses", q: "What is the Present Perfect tense and when is it used?", a: "'have/has + Past Participle.' It shows that an action was started in the past and is continuing with the present / just completed. E.g., 'I have written my assignment.' / 'I have been teaching this use of English since I came to PTI.'" },
  { id: 57, category: "Tenses", q: "What is the Simple Future tense used for?", a: "For events that are going to take place in the future. 'shall' is for 1st person (I, we); 'will' is for 2nd and 3rd person. E.g., 'I shall hang here tomorrow.'" },
  { id: 58, category: "Tenses", q: "What is the Future Perfect tense used for?", a: "For an action that will have been completed at a time in the future. E.g., 'By this time next year, we shall have written our first test.'" },
  { id: 59, category: "Tenses", q: "Give the present, past, and past participle of 'go.'", a: "Go → Went → Gone" },
  { id: 60, category: "Tenses", q: "Give the present, past, and past participle of 'write.'", a: "Write → Wrote → Written" },
  { id: 61, category: "Tenses", q: "Fill in with the correct present tense form: 'The number of jobs available _______ increased.'", a: "HAS — 'The number of' takes a singular verb." },
  { id: 62, category: "Tenses", q: "Fill in with the correct present tense form: 'The lad accompanied by her relatives _______ present at the event.'", a: "IS — 'accompanied by' does not compound the subject; 'lad' is singular." },
  { id: 63, category: "Tenses", q: "Fill in with the correct present tense form: 'Neither the parents nor the friend _______ informed.'", a: "IS — Verb agrees with the closest subject 'friend' (singular)." },

  // SECTION: LOGIC
  { id: 64, category: "Logic", q: "What is logic?", a: "Logic is scientific reasoning. It moves from proposition to premise and conclusion, using a dictionary to get proper deductions from a body of facts." },
  { id: 65, category: "Logic", q: "List the key terms used in logic.", a: "1. Argument\n2. Proposition\n3. Premise\n4. Conclusion\n5. False Premise\n6. Statement\n7. Inference\n8. Generalization\n9. Valid Argument\n10. Syllogism\n11. Facts and Opinions" },
  { id: 66, category: "Logic", q: "What is an argument in logic?", a: "An argument is defined as a series of statements, facts, statistics, and so on, in support of claims or assertions — i.e., to state a position." },
  { id: 67, category: "Logic", q: "What is a proposition?", a: "A proposition is a statement without any attempt to substantiate the claim. E.g., 'Women are less prone to corruption than men.' (Anything said without proof.)" },
  { id: 68, category: "Logic", q: "What is a premise?", a: "A premise is evident, comprising facts, statistics, and examples on which a conclusion is reached. It is more of giving evidence, instances, and points to prove your argument — a statement that formulates evidence in support of the conclusion." },
  { id: 69, category: "Logic", q: "What is a conclusion in logic?", a: "The conclusion is the fact gotten from your premise. The inference made from the premise determines your conclusion." },
  { id: 70, category: "Logic", q: "What is a false premise?", a: "A false premise is reaching a conclusion from the wrong facts." },
  { id: 71, category: "Logic", q: "What is inference?", a: "Inference is the process of drawing a conclusion from a premise." },
  { id: 72, category: "Logic", q: "What is generalization?", a: "Generalization is a statement made about a particular idea or group after sampling — it is more exaggerated than the true results. E.g., 'PTI has 255 intelligent students' generalized as 'PTI students are intelligent.'" },
  { id: 73, category: "Logic", q: "What is a valid argument?", a: "A valid argument is one where if there is a point of truth in the premise, the conclusion must be true (sounds valid). E.g., 'All ITF students are intelligent. I am an ITF student. Therefore I am intelligent.'" },
  { id: 74, category: "Logic", q: "What is a syllogism?", a: "A syllogism is a relationship between the premises and the conclusion. It has a major premise, minor premise, and conclusion. E.g., 'All men must die. Socrates is a man. Therefore Socrates must die.'" },
  { id: 75, category: "Logic", q: "What is the difference between facts and opinions?", a: "A fact can be accepted to be true. E.g., 'Warri is in Delta State.' An opinion is accepted by an individual or few individuals or groups but are not supposed to argue the facts. E.g., 'Poverty in Africa.'" },
  { id: 76, category: "Logic", q: "What is deductive reasoning?", a: "Deductive reasoning proceeds from the general to the specific. It proceeds from the known to the unknown. E.g., 'All oranges have Vitamin C. This fruit is an orange. Therefore this fruit has Vitamin C.'" },
  { id: 77, category: "Logic", q: "What is inductive reasoning?", a: "Inductive reasoning is the opposite of deductive reasoning. Here we move from the specific to the general, i.e., from the individual premise to the conclusion. E.g., 'James goes to church on Sundays → James is a Christian → Christians go to church on Sundays.'" },
  { id: 78, category: "Logic", q: "Question 13 from exam: 'The sun rises in the east. Therefore, tomorrow the sun will rise in the east' is an example of _____ reasoning?", a: "INDUCTIVE reasoning — moving from a specific observation to a general conclusion." },
  { id: 79, category: "Logic", q: "Question 14 from exam: 'All metals expand when heated. Iron is a metal, so it will expand when heated' is an example of _____ reasoning?", a: "DEDUCTIVE reasoning — moving from a general rule to a specific conclusion." },
  { id: 80, category: "Logic", q: "What is a fallacy?", a: "A fallacy is an improper or erroneous way of reasoning. The conclusion is far-fetched from the premise." },

  // SECTION: FALLACIES
  { id: 81, category: "Fallacies", q: "List the five types of fallacies (illogical argumentation).", a: "1. Inconsistency\n2. Appeal to Force (argumentum ad baculum/baculorum)\n3. Appeal to Pity (misericordiam)\n4. Argument that is too personal (ad hominem)\n5. Overgeneralization" },
  { id: 82, category: "Fallacies", q: "What is inconsistency as a fallacy?", a: "Inconsistency is interested in the evidence given (premise). It occurs when you contradict yourself." },
  { id: 83, category: "Fallacies", q: "What is appeal to force as a fallacy?", a: "Appealing to force means using threats and intimidations and other such methods as premise. The premise should be made up of facts, figures, and threats — not fights/intimidations." },
  { id: 84, category: "Fallacies", q: "What is appeal to pity (misericordiam)?", a: "This occurs in a situation where rather than doing the correct action, you become sentimental — appealing to the person's miserable situation, i.e., you begin to sentimentalize." },
  { id: 85, category: "Fallacies", q: "What is argument ad hominem?", a: "Argument that is too personal — here, we look at the individual's personal life and neglect the statistics. We use the past of the individual against him. Hominem means 'person.'" },
  { id: 86, category: "Fallacies", q: "What is overgeneralization as a fallacy?", a: "Overgeneralization is a statement made about a particular idea or group after sampling that is exaggerated more than the true results." },

  // SECTION: FINITE VERBS & SENTENCE ELEMENTS
  { id: 87, category: "The Sentence", q: "What is a finite verb?", a: "A finite verb is a verb that changes according to tense, person, and number. E.g., 'John likes going to school' — 'likes' is finite. Some verbs have their form as constant — these are called non-finite verbs." },
  { id: 88, category: "The Sentence", q: "What is a gerund phrase? Give an example.", a: "A gerund phrase uses a non-finite verb form as a noun. E.g., 'Going to school is worthwhile' — 'Going to school' is a gerund phrase (subject of the sentence)." },
  { id: 89, category: "The Sentence", q: "Identify the functional type: 'I will not leave his presence unless he attends to me.'", a: "Complex sentence (structurally). Functionally — Declarative sentence (makes a statement with a conditional element)." },
  { id: 90, category: "The Sentence", q: "Identify the functional type: 'Ada, kindly go and prepare for the test.'", a: "Imperative sentence — it gives a command/instruction." },
  { id: 91, category: "The Sentence", q: "Identify the functional type: 'Please pass me the salt.'", a: "Imperative sentence — it makes a polite request/command." },

  // CONCORD EXTRA PRACTICE
  { id: 92, category: "Concord", q: "Correct if wrong: 'The audience are very impressive.'", a: "CORRECT form: 'The audience is very impressive.' — 'Audience' is a collective noun and generally takes a singular verb." },
  { id: 93, category: "Concord", q: "Correct if wrong: 'Not only her friends but Uvie were very encouraging.'", a: "CORRECT: 'Not only her friends but Uvie was very encouraging.' — Verb agrees with the closest subject 'Uvie' (singular)." },
  { id: 94, category: "Concord", q: "Correct if wrong: 'Alice, together with her siblings, plan on relocating very soon.'", a: "CORRECT: 'Alice, together with her siblings, plans on relocating very soon.' — 'Together with' does not compound; verb agrees with 'Alice' (singular)." },
  { id: 95, category: "Concord", q: "Correct if wrong: 'Bread and butter are their favorite meal.'", a: "CORRECT: 'Bread and butter is their favorite meal.' — 'Bread and butter' is treated as a single unit (paired compound subject), so it takes a singular verb." },
  { id: 96, category: "Concord", q: "Correct if wrong: 'The owner and CEO of our company have just arrived.'", a: "CORRECT: 'The owner and CEO of our company has just arrived.' — One person holds both titles, so it is singular." },
  { id: 97, category: "Concord", q: "Correct if wrong: 'The number of adjourned cases in courts these days have dropped.'", a: "CORRECT: 'The number of adjourned cases in courts these days has dropped.' — 'The number of' takes a singular verb." },
  { id: 98, category: "Concord", q: "Fill in: 'The empire and his numerous wives _____ here.'", a: "'ARE' — the empire and his numerous wives are two separate entities, so plural verb is used." },
  { id: 99, category: "Concord", q: "Correct if wrong: 'The emir, accompanied by his ten (10) assistants and three (3) guards, _____ planning a huge party.'", a: "'IS' — 'accompanied by' does not compound the subject. Verb agrees with 'emir' (singular) = 'is planning.'" },
  { id: 100, category: "Logic", q: "Question from exam (4b): Demonstrate how a logical argument can be valid yet sound on one hand and valid yet unsound on the other hand.", a: "Valid yet Sound: Both the premises and conclusion are true and logically consistent. E.g., 'All men must die. Socrates is a man. Therefore Socrates must die.' — valid form + true premises = sound.\n\nValid yet Unsound: The argument follows a correct logical form but one or more premises are false. E.g., 'All birds can fly. A penguin is a bird. Therefore a penguin can fly.' — valid form but false premise (penguins can't fly) = unsound." },
];

const categories = ["All", ...new Set(flashcards.map(f => f.category))];

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mode, setMode] = useState("browse"); // browse or quiz
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [answered, setAnswered] = useState(false);
  const [seen, setSeen] = useState(new Set());

  const filtered = selectedCategory === "All"
    ? flashcards
    : flashcards.filter(f => f.category === selectedCategory);

  const card = filtered[currentIndex] || filtered[0];
  const progress = ((currentIndex + 1) / filtered.length) * 100;

  const next = () => {
    setFlipped(false);
    setAnswered(false);
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % filtered.length);
      setSeen(s => new Set([...s, card.id]));
    }, 200);
  };

  const prev = () => {
    setFlipped(false);
    setAnswered(false);
    setTimeout(() => setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length), 200);
  };

  const jump = (i) => {
    setFlipped(false);
    setAnswered(false);
    setCurrentIndex(i);
  };

  const handleScore = (correct) => {
    setScore(s => ({ ...s, [correct ? "correct" : "wrong"]: s[correct ? "correct" : "wrong"] + 1 }));
    setAnswered(true);
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setScore({ correct: 0, wrong: 0 });
    setAnswered(false);
    setSeen(new Set());
  };

  const catColors = {
    "The Sentence": "#4ade80",
    "Parts of the Sentence": "#60a5fa",
    "Concord": "#f472b6",
    "Tenses": "#fb923c",
    "Logic": "#a78bfa",
    "Fallacies": "#facc15",
  };
  const color = catColors[card?.category] || "#94a3b8";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'Georgia', serif",
      padding: "0",
      overflowX: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "24px 20px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase" }}>GNS 301 · Use of English</div>
        <h1 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: "800", margin: 0, background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Study Flash Cards
        </h1>
        <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>100 Exam-Style Questions</div>
      </div>

      {/* Controls */}
      <div style={{ padding: "16px 16px 8px", maxWidth: "680px", margin: "0 auto" }}>
        {/* Category Filter */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); resetAll(); }} style={{
              padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap", flexShrink: 0,
              background: selectedCategory === cat ? color : "rgba(255,255,255,0.06)",
              color: selectedCategory === cat ? "#0a0a0f" : "#94a3b8",
              transition: "all 0.2s",
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", marginBottom: "4px" }}>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Card <span style={{ color: "#e2e8f0", fontWeight: "700" }}>{currentIndex + 1}</span> of <span style={{ color: "#e2e8f0" }}>{filtered.length}</span>
          </div>
          <div style={{ display: "flex", gap: "12px", fontSize: "12px" }}>
            <span style={{ color: "#4ade80" }}>✓ {score.correct}</span>
            <span style={{ color: "#f87171" }}>✗ {score.wrong}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #a78bfa)`, transition: "width 0.4s ease", borderRadius: "4px" }} />
        </div>

        {/* Flash Card */}
        <div onClick={() => setFlipped(f => !f)} style={{
          minHeight: "280px", background: flipped
            ? `linear-gradient(135deg, ${color}18, ${color}08)`
            : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: `1px solid ${flipped ? color + "44" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "20px",
          padding: "28px 24px",
          cursor: "pointer",
          transition: "all 0.35s ease",
          position: "relative",
          userSelect: "none",
          boxShadow: flipped ? `0 8px 40px ${color}20` : "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          {/* Category badge */}
          <div style={{
            display: "inline-block", padding: "4px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "700",
            background: color + "22", color: color, letterSpacing: "0.5px", marginBottom: "16px",
          }}>
            {card?.category?.toUpperCase()}
          </div>

          {/* Flip indicator */}
          <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "11px", color: "#475569" }}>
            {flipped ? "ANSWER ↑" : "TAP TO FLIP"}
          </div>

          {/* Q Number */}
          <div style={{ fontSize: "11px", color: "#475569", marginBottom: "8px", fontFamily: "monospace" }}>
            Q{card?.id?.toString().padStart(3, "0")}
          </div>

          {!flipped ? (
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "10px", letterSpacing: "2px" }}>QUESTION</div>
              <p style={{ fontSize: "clamp(15px, 3.5vw, 18px)", lineHeight: "1.6", margin: 0, color: "#e2e8f0", fontWeight: "500" }}>
                {card?.q}
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "11px", color: color, marginBottom: "10px", letterSpacing: "2px" }}>ANSWER</div>
              <p style={{ fontSize: "clamp(13px, 3vw, 15px)", lineHeight: "1.8", margin: 0, color: "#cbd5e1", whiteSpace: "pre-line" }}>
                {card?.a}
              </p>
            </div>
          )}
        </div>

        {/* Self-grade buttons */}
        {flipped && !answered && (
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button onClick={() => handleScore(false)} style={{
              flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(248,113,113,0.3)",
              background: "rgba(248,113,113,0.08)", color: "#f87171", fontSize: "14px", fontWeight: "700", cursor: "pointer",
            }}>
              ✗ Missed it
            </button>
            <button onClick={() => handleScore(true)} style={{
              flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(74,222,128,0.3)",
              background: "rgba(74,222,128,0.08)", color: "#4ade80", fontSize: "14px", fontWeight: "700", cursor: "pointer",
            }}>
              ✓ Got it!
            </button>
          </div>
        )}

        {answered && (
          <div style={{ textAlign: "center", padding: "12px", marginTop: "8px", color: "#64748b", fontSize: "13px" }}>
            Marked! Navigate to next card ↓
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", marginTop: "16px", marginBottom: "24px" }}>
          <button onClick={prev} style={{
            flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)", color: "#94a3b8", fontSize: "16px", cursor: "pointer", fontWeight: "700",
          }}>← Prev</button>
          <button onClick={resetAll} style={{
            padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "#475569", fontSize: "11px", cursor: "pointer", letterSpacing: "1px",
          }}>RESET</button>
          <button onClick={next} style={{
            flex: 1, padding: "14px", borderRadius: "12px", border: `1px solid ${color}44`,
            background: `${color}15`, color: color, fontSize: "16px", cursor: "pointer", fontWeight: "700",
          }}>Next →</button>
        </div>

        {/* Quick Jump Grid */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#475569", marginBottom: "12px" }}>QUICK JUMP</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "6px" }}>
            {filtered.map((f, i) => (
              <button key={f.id} onClick={() => jump(i)} style={{
                aspectRatio: "1", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "10px", fontWeight: "700",
                background: i === currentIndex ? color : seen.has(f.id) ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                color: i === currentIndex ? "#0a0a0f" : seen.has(f.id) ? "#64748b" : "#334155",
                transition: "all 0.15s",
              }}>
                {f.id}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{
          background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "20px",
          border: "1px solid rgba(255,255,255,0.06)", marginBottom: "40px",
        }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#475569", marginBottom: "16px" }}>SESSION SUMMARY</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", textAlign: "center" }}>
            {[
              { label: "Seen", val: seen.size, col: "#94a3b8" },
              { label: "Correct", val: score.correct, col: "#4ade80" },
              { label: "Missed", val: score.wrong, col: "#f87171" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: s.col }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {(score.correct + score.wrong) > 0 && (
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#64748b" }}>Score</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: score.correct / (score.correct + score.wrong) >= 0.7 ? "#4ade80" : "#f87171" }}>
                {Math.round((score.correct / (score.correct + score.wrong)) * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
