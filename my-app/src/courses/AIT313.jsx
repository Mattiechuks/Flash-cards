import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [
  // ── Multi-Agent Systems ──
  { cat: "Multi-Agent Systems", q: "What is a Multi-Agent System (MAS)?", a: "A system that involves multiple interacting intelligent agents within a single environment. Each agent perceives its environment and acts upon it independently or cooperatively." },
  { cat: "Multi-Agent Systems", q: "What is the key difference between cooperative and competitive MAS?", a: "Cooperative MAS: agents work together to achieve a common goal.\nCompetitive MAS: agents work against each other to achieve their own individual goals." },
  { cat: "Multi-Agent Systems", q: "Can a MAS be both cooperative and competitive?", a: "Yes. In some cases, MAS can involve both cooperative and competitive behavior, where agents must balance their own interests with the interests of the group." },
  { cat: "Multi-Agent Systems", q: "Name three techniques used to implement MAS.", a: "1. Game theory — analyzes strategic interactions between agents\n2. Machine learning — trains agents to improve decision-making over time\n3. Agent-based modeling — simulates complex systems and studies agent interactions" },
  { cat: "Multi-Agent Systems", q: "How is game theory used in MAS?", a: "Game theory is used to analyze strategic interactions between agents and predict their behavior in competitive or cooperative scenarios." },
  { cat: "Multi-Agent Systems", q: "How is machine learning used in MAS?", a: "Machine learning is used to train agents to improve their decision-making capabilities over time through experience and feedback." },
  { cat: "Multi-Agent Systems", q: "How is agent-based modeling used in MAS?", a: "Agent-based modeling is used to simulate complex systems and study the interactions between agents, enabling analysis of emergent behavior." },
  { cat: "Multi-Agent Systems", q: "What is the overall significance of multi-agent systems in AI?", a: "Multi-agent systems are a powerful tool in artificial intelligence that can help solve complex problems and improve efficiency in a variety of applications." },

  // ── Hierarchical Agents ──
  { cat: "Hierarchical Agents", q: "What are hierarchical agents?", a: "Agents that are organized into a hierarchy, with high-level agents overseeing the behavior of lower-level agents. High-level agents provide goals and constraints; low-level agents carry out specific tasks." },
  { cat: "Hierarchical Agents", q: "What role do high-level agents play in a hierarchical system?", a: "High-level agents provide goals and constraints for the lower-level agents. These goals and constraints are typically based on the overall objective of the system." },
  { cat: "Hierarchical Agents", q: "What role do low-level agents play in a hierarchical system?", a: "Low-level agents are responsible for carrying out specific tasks to achieve the goals set by the high-level agents. Tasks may be simple or complex depending on the application." },
  { cat: "Hierarchical Agents", q: "Why are hierarchical agents useful in complex environments?", a: "They allow for more efficient and organized decision-making by distributing tasks across levels. High-level agents coordinate, while low-level agents execute specific subtasks." },
  { cat: "Hierarchical Agents", q: "Name three real-world applications of hierarchical agents.", a: "1. Robotics — controlling automated tasks in manufacturing\n2. Transportation systems — managing traffic flow at multiple levels\n3. Manufacturing — setting and achieving production targets" },
  { cat: "Hierarchical Agents", q: "How many levels can a hierarchical agent system have?", a: "It depends on the complexity of the system. A simple system may have two levels (high and low). Complex systems may have multiple intermediate levels responsible for coordinating lower-level agents." },
  { cat: "Hierarchical Agents", q: "What is a key advantage of organizing agents into a hierarchy?", a: "It allows for more efficient use of resources. Tasks are allocated to the agents best suited to carry them out, avoiding duplication of effort and enabling faster, more efficient decision-making." },
  { cat: "Hierarchical Agents", q: "Give an example of hierarchical agents in a manufacturing system.", a: "High-level agents set production targets based on customer demand. Low-level agents carry out the actual manufacturing tasks to meet those targets." },
  { cat: "Hierarchical Agents", q: "Give an example of hierarchical agents in a transportation system.", a: "High-level agents manage overall route optimization and logistics, while low-level agents are responsible for managing traffic flow at specific intersections." },

  // ── Uses of Agents ──
  { cat: "Uses of Agents", q: "How are agents used in robotics?", a: "Agents can be used to control robots and automate tasks in manufacturing, transportation, and other industries." },
  { cat: "Uses of Agents", q: "How are agents used in smart homes and buildings?", a: "Agents can control heating, lighting, and other systems in smart homes and buildings, optimizing energy use and improving comfort." },
  { cat: "Uses of Agents", q: "How are agents used in transportation systems?", a: "Agents can manage traffic flow, optimize routes for autonomous vehicles, and improve logistics and supply chain management." },
  { cat: "Uses of Agents", q: "How are agents used in healthcare?", a: "Agents can monitor patients, provide personalized treatment plans, and optimize healthcare resource allocation." },
  { cat: "Uses of Agents", q: "How are agents used in finance?", a: "Agents can be used for automated trading, fraud detection, and risk management in the financial industry." },
  { cat: "Uses of Agents", q: "How are agents used in games?", a: "Agents can be used to create intelligent opponents in games and simulations, providing a more challenging and realistic experience for players." },
  { cat: "Uses of Agents", q: "How are agents used in Natural Language Processing (NLP)?", a: "Agents can be used for language translation, question answering, and chatbots that can communicate with users in natural language." },
  { cat: "Uses of Agents", q: "How are agents used in cybersecurity?", a: "Agents can be used for intrusion detection, malware analysis, and network security." },
  { cat: "Uses of Agents", q: "How are agents used in environmental monitoring?", a: "Agents can monitor and manage natural resources, track climate change, and improve environmental sustainability." },
  { cat: "Uses of Agents", q: "How are agents used in social media?", a: "Agents can analyze social media data, identify trends and patterns, and provide personalized recommendations to users." },

  // ── Agent Environment ──
  { cat: "Agent Environment", q: "What is an agent environment in AI?", a: "Everything in the world which surrounds the agent, but is NOT a part of the agent itself. It can be described as the situation in which an agent is present." },
  { cat: "Agent Environment", q: "What does the environment provide for an agent?", a: "The environment is where the agent lives, operates, and provides the agent with something to sense and act upon." },
  { cat: "Agent Environment", q: "What is the structure of an intelligent agent?", a: "Agent = Architecture + Agent Program\nArchitecture = the machinery that an agent executes on.\nAgent Program = an implementation of an agent." },
  { cat: "Agent Environment", q: "According to Russell and Norvig, how many features can an environment have?", a: "8 features: Fully/Partially Observable, Static/Dynamic, Discrete/Continuous, Deterministic/Stochastic, Single/Multi-agent, Episodic/Sequential, Known/Unknown, Accessible/Inaccessible." },

  // ── Features of Environment ──
  { cat: "Features of Environment", q: "What is a fully observable environment?", a: "If an agent's sensor can sense or access the complete state of an environment at each point in time, it is fully observable. It is easy to manage as there is no need to maintain internal state history." },
  { cat: "Features of Environment", q: "What is a partially observable environment?", a: "An environment where the agent cannot access the complete state at all times. The agent must maintain some internal state to make decisions." },
  { cat: "Features of Environment", q: "What is an unobservable environment?", a: "An environment where the agent has no sensors at all — it cannot sense anything about the environment." },
  { cat: "Features of Environment", q: "What is a deterministic environment?", a: "An environment where the next state is completely determined by the current state and the selected action of the agent. Example: Image Analysis." },
  { cat: "Features of Environment", q: "What is a stochastic environment?", a: "An environment that is random in nature and cannot be completely determined by an agent. Example: Boat driving, car driving, flight control." },
  { cat: "Features of Environment", q: "In a deterministic fully observable environment, what does the agent not need to worry about?", a: "The agent does not need to worry about uncertainty, since it knows the complete state and can fully predict the next state." },
  { cat: "Features of Environment", q: "What is an episodic environment?", a: "An environment with a series of one-shot actions where only the current percept is required for the action. Each episode is independent; subsequent episodes do not depend on previous ones. Example: Blood testing, card games." },
  { cat: "Features of Environment", q: "What is a sequential environment?", a: "An environment where an agent requires memory of past actions to determine the next best actions. Example: Chess with clock, refinery controller." },
  { cat: "Features of Environment", q: "What is a single-agent environment?", a: "An environment where only one agent is involved and operating by itself." },
  { cat: "Features of Environment", q: "What is a multi-agent environment?", a: "An environment where multiple agents are operating simultaneously. Agent design problems are different from single-agent environments." },
  { cat: "Features of Environment", q: "What is a static environment?", a: "An environment that does not change while the agent is deliberating. The agent does not need to keep looking at the world while deciding. Example: 8-queen puzzle, crossword puzzles." },
  { cat: "Features of Environment", q: "What is a dynamic environment?", a: "An environment that can change itself while the agent is deliberating. The agent must keep looking at the world at each action. Example: Taxi driving, Tutor." },
  { cat: "Features of Environment", q: "What is a discrete environment?", a: "An environment with a finite number of percepts and actions that can be performed within it. Example: Chess game (finite number of moves)." },
  { cat: "Features of Environment", q: "What is a continuous environment?", a: "An environment with an infinite or unbounded number of percepts and actions. Example: A self-driving car operating in the real world." },
  { cat: "Features of Environment", q: "What is a known environment?", a: "An environment where the results of all actions are known to the agent. Note: 'Known/Unknown' is actually a state of the agent's knowledge, not a feature of the environment itself." },
  { cat: "Features of Environment", q: "What is an unknown environment?", a: "An environment where the agent needs to learn how it works in order to perform an action. A known environment can still be partially observable, and an unknown environment can be fully observable." },
  { cat: "Features of Environment", q: "What is an accessible environment?", a: "If an agent can obtain complete and accurate information about the state of the environment. Example: An empty room whose state can be defined by its temperature." },
  { cat: "Features of Environment", q: "What is an inaccessible environment?", a: "An environment where complete and accurate information cannot be obtained. Example: Information about a global event on earth." },
  { cat: "Features of Environment", q: "Give the example of a static vs dynamic environment from everyday life.", a: "Static: Crossword puzzles (the board does not change while you think).\nDynamic: Taxi driving (traffic changes while the driver deliberates)." },
  { cat: "Features of Environment", q: "Give the example of a discrete vs continuous environment.", a: "Discrete: Chess (finite number of moves).\nContinuous: A self-driving car (infinite states and actions in the real world)." },

  // ── Deep Learning Basics ──
  { cat: "Deep Learning Basics", q: "What is deep learning?", a: "A class of machine learning algorithms that uses multiple layers to progressively extract higher-level features from raw input. For example, lower layers identify edges and higher layers identify faces or letters." },
  { cat: "Deep Learning Basics", q: "What does 'deep' refer to in deep learning?", a: "The use of multiple layers in the neural network. The adjective 'deep' refers to the depth of the network — i.e., the number of hidden layers." },
  { cat: "Deep Learning Basics", q: "What is the broader family that deep learning belongs to?", a: "Deep learning is part of a broader family of machine learning methods based on artificial neural networks with representation learning." },
  { cat: "Deep Learning Basics", q: "What learning methods are used in deep learning?", a: "Methods used can be supervised, semi-supervised, or unsupervised." },
  { cat: "Deep Learning Basics", q: "What is 'deepest learning' or fully automatic learning?", a: "It refers to fully automatic learning from a source to a final learned object, without human intervention in the learning process." },
  { cat: "Deep Learning Basics", q: "How does deep learning work in image recognition?", a: "The raw input is a pixel matrix. The first layer abstracts pixels and encodes edges. The second layer composes edges into shapes. The third layer encodes features like a nose or eyes. The fourth layer may recognize a face." },
  { cat: "Deep Learning Basics", q: "What are the three layers in a basic deep learning architecture?", a: "1. Input layer — receives raw data\n2. Hidden layers — process and combine input data\n3. Output layer — produces the outcome (result, estimation, forecast)" },
  { cat: "Deep Learning Basics", q: "Can deep learning determine which features to place in which layer on its own?", a: "Yes. A deep learning process can learn which features to optimally place in which level on its own, without the need for hand-tuning." },
  { cat: "Deep Learning Basics", q: "Name the six most common deep learning architectures.", a: "1. RNN (Recurrent Neural Network)\n2. LSTM (Long Short-Term Memory)\n3. GRU (Gated Recurrent Unit)\n4. CNN (Convolutional Neural Network)\n5. DBN (Deep Belief Network)\n6. DSN (Deep Stacking Network)" },

  // ── RNN ──
  { cat: "Deep Learning Architectures", q: "What is an RNN (Recurrent Neural Network)?", a: "One of the fundamental deep learning architectures. RNNs use their internal state (memory) to process variable-length sequences of inputs. Every processed piece of information is captured, stored, and utilized to calculate the final outcome." },
  { cat: "Deep Learning Architectures", q: "Why are RNNs useful for sequential data?", a: "They are useful when the sequence of presented information is key. They can use internal state (memory) to process variable-length sequences, making them suitable for speech recognition, NLP, and machine translation." },
  { cat: "Deep Learning Architectures", q: "Name three common use cases of RNNs.", a: "1. NLP (Natural Language Processing)\n2. Speech synthesis\n3. Machine translations" },
  { cat: "Deep Learning Architectures", q: "What are the two types of RNN?", a: "1. Bidirectional RNN — works two ways; the output layer can get information from past and future states simultaneously.\n2. Deep RNN — has multiple layers, allowing the model to extract more hierarchical information." },
  { cat: "Deep Learning Architectures", q: "What is a Bidirectional RNN?", a: "A type of RNN that works in two directions. The output layer can get information from both past and future states simultaneously." },
  { cat: "Deep Learning Architectures", q: "What is a Deep RNN?", a: "A type of RNN with multiple layers. As a result, the deep learning model can extract more hierarchical information from the sequence." },
  { cat: "Deep Learning Architectures", q: "What is LSTM (Long Short-Term Memory)?", a: "A type of RNN with feedback connections. Unlike basic RNNs, LSTM can process not only single data points (such as images) but also entire sequences of data (such as audio or video files)." },
  { cat: "Deep Learning Architectures", q: "What concept is LSTM based on?", a: "LSTM is based on the concept of a memory cell. The memory cell can retain its value for a short or long time as a function of its inputs, allowing it to remember what is essential and not just its last computed value." },
  { cat: "Deep Learning Architectures", q: "What are the three components (gates) of a typical LSTM architecture?", a: "1. Input gate — controls when new information can flow into the memory\n2. Output gate — controls when the information in the cell is used in the output\n3. Forget gate — controls when a piece of information can be forgotten, allowing the cell to process new data" },
  { cat: "Deep Learning Architectures", q: "What does the forget gate in LSTM do?", a: "Controls when a piece of information can be forgotten, allowing the cell to process new data and prevent old, irrelevant information from persisting." },
  { cat: "Deep Learning Architectures", q: "Name four modern applications of LSTM.", a: "1. Text compression\n2. Handwriting recognition\n3. Speech recognition\n4. Gesture recognition and image captioning" },
  { cat: "Deep Learning Architectures", q: "What is a CNN (Convolutional Neural Network)? What is it best known for?", a: "A deep learning architecture specifically designed for processing grid-structured data like images. CNNs use convolutional layers to automatically and adaptively learn spatial hierarchies of features. Best known for image recognition tasks." },
  { cat: "Deep Learning Architectures", q: "What is a DBN (Deep Belief Network)?", a: "A generative graphical model composed of multiple layers of latent variables. DBNs can be used in image recognition and NLP tasks. They use a layer-wise training strategy." },
  { cat: "Deep Learning Architectures", q: "What is a DSN (Deep Stacking Network)?", a: "Also called DCN — Deep Convex Network. It comprises a deep network that is actually a set of individual deep networks. Each network within DSN has its own hidden layers that process data." },
  { cat: "Deep Learning Architectures", q: "How is a DSN different from other deep learning architectures?", a: "DSNs consider training not as a single problem to be solved but as a set of individual problems. Each module consists of an input, hidden, and output layer stacked on top of each other." },
  { cat: "Deep Learning Architectures", q: "What is a GRU (Gated Recurrent Unit)?", a: "A simplified version of LSTM with fewer gates. It combines the forget and input gates into a single update gate. GRUs are computationally efficient and perform similarly to LSTM on many sequence tasks." },
  { cat: "Deep Learning Architectures", q: "How many modules does a typical DSN consist of?", a: "Three or more modules. Each module consists of an input layer, a hidden layer, and an output layer. They are stacked so the input of each module is based on the output of the prior module." },
  { cat: "Deep Learning Architectures", q: "What advantage does stacking modules in a DSN provide?", a: "It enables DSNs to learn more complex classifications than would be possible with just one module, by building progressively abstract representations across modules." },

  // ── Autoencoders ──
  { cat: "Autoencoders", q: "What is an autoencoder?", a: "A specific type of feedforward neural network where the input and the output are the same. It condenses the input into a lower-dimensional code, then reconstructs the output from that code." },
  { cat: "Autoencoders", q: "What are the three components of an autoencoder?", a: "1. Encoder — condenses the input and produces the code\n2. Code — the compact lower-dimensional representation of the input\n3. Decoder — rebuilds the input using the code" },
  { cat: "Autoencoders", q: "What are the two main uses of autoencoders?", a: "1. Dimensionality reduction\n2. Anomaly detection (for instance, fraud detection)" },
  { cat: "Autoencoders", q: "What is a key advantage of autoencoders?", a: "They are easy to build and train (simplicity is one of their greatest advantages)." },
  { cat: "Autoencoders", q: "What is a key disadvantage of autoencoders?", a: "They require high-quality, representative training data. Without it, the information that comes out of the autoencoder can be unclear or biased." },
  { cat: "Autoencoders", q: "What is the role of the encoder in an autoencoder?", a: "The encoder condenses (compresses) the input into a lower-dimensional code representation." },
  { cat: "Autoencoders", q: "What is the role of the decoder in an autoencoder?", a: "The decoder takes the compact code produced by the encoder and rebuilds (reconstructs) the original input from it." },
  { cat: "Autoencoders", q: "What does an autoencoder identify as one of its main tasks?", a: "To identify and determine what constitutes regular (normal) data, and then identify the anomalies or aberrations that deviate from that pattern." },

  // ── Deep Learning Applications ──
  { cat: "Deep Learning Applications", q: "Name ten applications of deep learning.", a: "1. Self-driving cars\n2. News accumulation & fake news detection\n3. Natural Language Processing (NLP)\n4. Virtual assistants\n5. Visual recognition\n6. Deep learning in healthcare\n7. Personalization\n8. Colorization of black & white images\n9. Adding sounds to silent movies\n10. Automatic machine translation" },
  { cat: "Deep Learning Applications", q: "How does deep learning enable self-driving cars?", a: "Deep learning technologies are 'learning machines' that use millions of datasets and training to learn how to act and respond. They use sensors, cameras, geo-mapping, and erudite models to navigate through traffic." },
  { cat: "Deep Learning Applications", q: "Name two companies using deep learning for self-driving vehicles.", a: "Uber AI Labs (driverless delivery cars) and Amazon (product delivery via drones). Tesla is also a famous example of self-driving cars." },
  { cat: "Deep Learning Applications", q: "How does deep learning help with fake news detection?", a: "Deep learning extensions can help identify true and false information across the internet, potentially eliminating harmful and fraudulent news from online platforms." },
  { cat: "Deep Learning Applications", q: "How does deep learning relate to NLP?", a: "Deep learning has embarked on attaining a similar concept of holding linguistic expression. It can classify text, answer questions, model language, and perform language modeling with NLP capabilities." },
  { cat: "Deep Learning Applications", q: "Name three virtual assistants powered by deep learning.", a: "Amazon's Alexa, Google Assistant, and Siri. They use deep learning algorithms to understand language and perform tasks like setting alarms, scheduling, and playing music." },
  { cat: "Deep Learning Applications", q: "What is visual recognition in deep learning?", a: "The ability of a deep learning application to identify people in images from many other people. It is used in face recognition systems such as smartphone face-lock." },
  { cat: "Deep Learning Applications", q: "How is deep learning used in healthcare?", a: "Deep learning is set in the healthcare sector with applications in standardization, augmented clinics, genetic engineering, speedy disease diagnosis, and designing novel treatment plans." },
  { cat: "Deep Learning Applications", q: "How is deep learning used for personalization in eCommerce?", a: "Many eCommerce sectors use chatbots trained by deep learning to personalize user experiences 24/7. Companies like Amazon, Alibaba, and eBay use chatbots to boost customer interaction and engagement." },
  { cat: "Deep Learning Applications", q: "What is semantic coloring in deep learning?", a: "The process by which deep learning colorizes black and white images. It takes grayscale images as input and yields colorized images as output. Before deep learning, this was done manually by humans." },
  { cat: "Deep Learning Applications", q: "How can deep learning add sounds to silent movies?", a: "With nearly unlimited training videos, deep learning models can match silent movies to fitting sound effects. The model is trained with 1000+ videos with sounds to learn which sound fits which scene." },
  { cat: "Deep Learning Applications", q: "What is automatic machine translation in deep learning?", a: "Deep learning can extract letters from captured images and convert pictures into actual text (instant visual translation). It is performed through stacked networks of large LSTM recurring neural networks." },

  // ── Mixed / Exam-Style ──
  { cat: "Exam Practice", q: "Distinguish between a static and a dynamic environment with examples.", a: "Static: does not change while the agent deliberates. Example: 8-Queen puzzle, crossword.\nDynamic: changes while the agent deliberates. Example: Taxi driving, car driving." },
  { cat: "Exam Practice", q: "Distinguish between episodic and sequential environments.", a: "Episodic: only the current percept is needed; episodes are independent (e.g. blood testing).\nSequential: the agent requires memory of past actions to determine future actions (e.g. chess)." },
  { cat: "Exam Practice", q: "Distinguish between discrete and continuous environments.", a: "Discrete: finite number of percepts and actions (e.g. chess — finite moves).\nContinuous: infinite number of percepts and actions (e.g. self-driving car)." },
  { cat: "Exam Practice", q: "Distinguish between deterministic and stochastic environments.", a: "Deterministic: the next state is fully determined by current state + action (e.g. image analysis).\nStochastic: the environment is random and cannot be fully determined by the agent (e.g. boat driving)." },
  { cat: "Exam Practice", q: "Compare cooperative and competitive MAS.", a: "Cooperative MAS: agents share a common goal and work together to achieve it.\nCompetitive MAS: each agent pursues its own goals, potentially conflicting with other agents." },
  { cat: "Exam Practice", q: "What is the difference between RNN and LSTM?", a: "RNN is the basic recurrent architecture using memory of past inputs. LSTM is a type of RNN but with feedback connections (gates: input, output, forget) that allow it to process entire sequences, not just individual data points." },
  { cat: "Exam Practice", q: "What is the difference between a DBN and a DSN?", a: "DBN (Deep Belief Network) is a generative graphical model with layers of latent variables used for image recognition and NLP.\nDSN (Deep Stacking Network) is a set of individual deep networks stacked on top of each other, each with its own input/hidden/output layers, designed to improve training efficiency." },
  { cat: "Exam Practice", q: "List all 8 features of an agent environment according to Russell and Norvig.", a: "1. Fully observable vs Partially Observable\n2. Static vs Dynamic\n3. Discrete vs Continuous\n4. Deterministic vs Stochastic\n5. Single-agent vs Multi-agent\n6. Episodic vs Sequential\n7. Known vs Unknown\n8. Accessible vs Inaccessible" },
  { cat: "Exam Practice", q: "What formula represents the structure of an intelligent agent?", a: "Agent = Architecture + Agent Program\nWhere Architecture = the machinery the agent executes on, and Agent Program = the implementation of the agent." },
  { cat: "Exam Practice", q: "Why is deep learning considered more powerful than traditional machine learning?", a: "Deep learning uses multiple layers to automatically extract hierarchical features from raw data without manual feature engineering. It can learn which features to place at which layer on its own, eliminating the need for hand-tuning." },
  { cat: "Exam Practice", q: "Name the three gates of an LSTM and state the function of each.", a: "1. Input gate — controls when new information enters memory\n2. Output gate — controls when stored information is used in output\n3. Forget gate — controls when old information is discarded to allow new data" },
  { cat: "Exam Practice", q: "Why are episodic environments simpler for agents to deal with compared to sequential ones?", a: "In episodic environments, the agent does not need to think ahead — only the current percept matters. In sequential environments, every action may affect future decisions, requiring memory and long-term planning." },
  { cat: "Exam Practice", q: "Why are static environments easier for agents to handle than dynamic ones?", a: "In a static environment, the agent does not need to keep observing the world while deliberating. In a dynamic environment, the world may change during deliberation, requiring continuous monitoring." },
  { cat: "Exam Practice", q: "Explain how an autoencoder can be used for anomaly detection.", a: "An autoencoder is trained on normal data. It learns to reconstruct normal inputs accurately. When an anomalous input is given, the reconstruction error is high — this high error signals the presence of an anomaly (e.g. a fraudulent transaction)." },
  { cat: "Exam Practice", q: "How does a DSN approach the training problem differently from traditional deep learning models?", a: "DSNs consider training not as a single problem to solve, but as a set of individual problems. Each module solves its own sub-problem, and modules are stacked so that each module's input is based on the output of the prior one." },
];

const CATEGORIES = ["All", ...new Set(ALL_CARDS.map(c => c.cat))];

const renderAnswer = (text) => {
  const hasNumberedList = text.split('\n').some(l => /^\d+\./.test(l.trim()));
  if (hasNumberedList) {
    return text.split('\n').map((line, idx) => {
      const match = line.match(/^(\d+\.\s*)(.*)/);
      if (match) {
        return React.createElement('span', { key: idx, style: { display: 'block', marginBottom: '4px' } },
          React.createElement('span', { style: { color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.85em', marginRight: '6px' } }, match[1]),
          match[2]
        );
      }
      if (line.trim()) {
        return React.createElement('span', { key: idx, style: { display: 'block', marginTop: '8px', color: 'var(--text2)', fontSize: '0.9em' } }, line);
      }
      return null;
    }).filter(Boolean);
  }
  const parts = text.split('\n\n');
  if (parts.length > 1) {
    return parts.map((part, idx) => {
      const isFormula = /[=×/ϕ_]/.test(part) && !part.includes(' is ') && !part.includes(' are ') && idx > 0;
      if (isFormula) {
        return React.createElement('span', { key: idx, className: 'formula-block', dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
      }
      return React.createElement('span', { key: idx, style: { display: 'block', marginTop: idx > 0 ? '10px' : '' }, dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
    });
  }
  return React.createElement('span', { dangerouslySetInnerHTML: { __html: text.replace(/\n/g, '<br>') } });
};

const ArtificialIntelligenceFlashcards = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIndices, setKnownIndices] = useState([]);
  const [reviewIndices, setReviewIndices] = useState([]);
  const [, setShuffledDeck] = useState([...ALL_CARDS]);

  const currentDeck = activeCat === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.cat === activeCat);

  const filterCat = (cat) => {
    setActiveCat(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const shuffleDeck = () => {
    const shuffled = [...currentDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const navigate = useCallback((dir) => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + dir + currentDeck.length) % currentDeck.length);
  }, [currentDeck.length]);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const mark = useCallback((type) => {
    const card = currentDeck[currentIndex];
    const originalIdx = ALL_CARDS.indexOf(card);
    if (type === "know") {
      setKnownIndices((prev) =>
        prev.includes(originalIdx) ? prev.filter(i => i !== originalIdx) : [...prev, originalIdx]
      );
      setReviewIndices((prev) => prev.filter(i => i !== originalIdx));
    } else {
      setReviewIndices((prev) =>
        prev.includes(originalIdx) ? prev.filter(i => i !== originalIdx) : [...prev, originalIdx]
      );
      setKnownIndices((prev) => prev.filter(i => i !== originalIdx));
    }
  }, [currentDeck, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
      else if ((e.key === "k" || e.key === "K") && isFlipped) { e.preventDefault(); mark("know"); }
      else if ((e.key === "r" || e.key === "R") && isFlipped) { e.preventDefault(); mark("review"); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex, currentDeck, mark, navigate, flipCard]);

  const currentCard = currentDeck[currentIndex];
  const originalCardIndex = currentCard ? ALL_CARDS.indexOf(currentCard) : -1;
  const isKnown = knownIndices.includes(originalCardIndex);
  const isReview = reviewIndices.includes(originalCardIndex);
  const progressPercent = Math.round(((currentIndex + 1) / currentDeck.length) * 100);

  return React.createElement('div', { className: 'flashcard-app' },
    React.createElement('style', null, `
      :root {
        --bg: #0b0d0f;
        --bg2: #111417;
        --bg3: #181c20;
        --bg4: #1e2328;
        --border: rgba(255,255,255,0.07);
        --border2: rgba(255,255,255,0.12);
        --text: #e8eaed;
        --text2: #9aa0a6;
        --text3: #5f6368;
        --accent: #818cf8;
        --accent2: #4f46e5;
        --green: #34a853;
        --green-bg: rgba(52,168,83,0.12);
        --amber: #fbbc04;
        --amber-bg: rgba(251,188,4,0.1);
        --red: #ea4335;
        --red-bg: rgba(234,67,53,0.1);
        --card-h: 320px;
        --radius: 16px;
        --mono: 'JetBrains Mono', monospace;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Syne', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
      }
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px);
        background-size: 48px 48px;
        pointer-events: none;
        z-index: 0;
      }
      body::after {
        content: '';
        position: fixed;
        top: -20vh;
        left: 50%;
        transform: translateX(-50%);
        width: 70vw;
        height: 50vh;
        background: radial-gradient(ellipse at center, rgba(129,140,248,0.07) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
      }
      .wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 780px;
        padding: 2rem 1.25rem 4rem;
        margin: 0 auto;
      }
      header { text-align: center; margin-bottom: 2rem; position: relative; }
      .back-button {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border2);
        color: var(--text2);
        padding: 6px 14px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .back-button:hover {
        background: rgba(129,140,248,0.1);
        border-color: var(--accent);
        color: var(--accent);
      }
      .header-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--accent);
        border: 1px solid rgba(129,140,248,0.25);
        background: rgba(129,140,248,0.07);
        border-radius: 99px;
        padding: 4px 14px;
        margin-bottom: 1rem;
      }
      h1 {
        font-size: clamp(1.6rem, 4vw, 2.4rem);
        font-weight: 800;
        letter-spacing: -0.5px;
        line-height: 1.1;
        color: var(--text);
      }
      h1 span { color: var(--accent); }
      .header-sub {
        font-family: 'Lora', serif;
        font-style: italic;
        font-size: 14px;
        color: var(--text3);
        margin-top: 0.5rem;
      }
      .progress-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 1.5rem;
      }
      .progress-track {
        flex: 1;
        height: 3px;
        background: var(--bg4);
        border-radius: 99px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent2), var(--accent));
        border-radius: 99px;
        transition: width 0.4s cubic-bezier(.4,0,.2,1);
        box-shadow: 0 0 8px rgba(129,140,248,0.4);
      }
      .progress-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--text3);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .progress-pct {
        font-family: var(--mono);
        font-size: 11px;
        color: var(--accent);
        min-width: 34px;
        text-align: right;
      }
      .tabs-wrap {
        margin-bottom: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .tab {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 5px 13px;
        border-radius: 99px;
        border: 1px solid var(--border2);
        background: transparent;
        color: var(--text2);
        cursor: pointer;
        transition: all 0.18s;
      }
      .tab:hover { border-color: rgba(129,140,248,0.35); color: var(--accent); }
      .tab.active {
        background: rgba(129,140,248,0.12);
        border-color: rgba(129,140,248,0.4);
        color: var(--accent);
      }
      .card-area {
        perspective: 1200px;
        cursor: pointer;
        margin-bottom: 1.25rem;
        position: relative;
      }
      .card-inner {
        position: relative;
        width: 100%;
        min-height: var(--card-h);
        transform-style: preserve-3d;
        transition: transform 0.5s cubic-bezier(.4,0,.2,1);
      }
      .card-inner.flipped { transform: rotateY(180deg); }
      .card-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        border-radius: var(--radius);
        border: 1px solid var(--border2);
        display: flex;
        flex-direction: column;
        padding: 2rem;
        min-height: var(--card-h);
      }
      .card-front {
        background: var(--bg2);
        background-image: radial-gradient(ellipse at 80% 10%, rgba(129,140,248,0.05) 0%, transparent 60%);
      }
      .card-back {
        transform: rotateY(180deg);
        background: var(--bg3);
        background-image: radial-gradient(ellipse at 20% 90%, rgba(52,168,83,0.06) 0%, transparent 60%);
      }
      .card-eyebrow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }
      .card-cat {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: var(--accent);
        background: rgba(129,140,248,0.1);
        border: 1px solid rgba(129,140,248,0.2);
        border-radius: 99px;
        padding: 3px 10px;
      }
      .card-side-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text3);
      }
      .card-body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-q {
        font-size: clamp(1rem, 2.5vw, 1.3rem);
        font-weight: 700;
        line-height: 1.4;
        color: var(--text);
        text-align: center;
      }
      .card-a {
        font-size: clamp(0.85rem, 2vw, 1rem);
        line-height: 1.7;
        color: var(--text);
        width: 100%;
      }
      .formula-block {
        display: block;
        margin-top: 10px;
        font-family: var(--mono);
        font-size: 0.88em;
        color: var(--accent);
        background: rgba(129,140,248,0.07);
        border: 1px solid rgba(129,140,248,0.15);
        border-radius: 8px;
        padding: 10px 14px;
        line-height: 1.8;
      }
      .card-hint {
        font-size: 11px;
        color: var(--text3);
        text-align: center;
        margin-top: 1.5rem;
        letter-spacing: 0.5px;
      }
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 1rem;
      }
      .btn-nav {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid var(--border2);
        background: var(--bg2);
        color: var(--text);
        font-size: 18px;
        cursor: pointer;
        transition: all 0.18s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-nav:hover { border-color: var(--accent); color: var(--accent); background: rgba(129,140,248,0.08); }
      .counter {
        font-family: var(--mono);
        font-size: 13px;
        color: var(--text2);
        min-width: 60px;
        text-align: center;
      }
      .btn-shuffle {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 99px;
        border: 1px solid var(--border2);
        background: var(--bg2);
        color: var(--text2);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.18s;
      }
      .btn-shuffle:hover { border-color: var(--accent); color: var(--accent); }
      .mark-row {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 1rem;
      }
      .mark-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 20px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.18s;
        border: 1.5px solid transparent;
      }
      .mark-btn.know {
        background: var(--green-bg);
        color: var(--green);
        border-color: rgba(52,168,83,0.3);
      }
      .mark-btn.know.active {
        background: var(--green);
        color: #fff;
        border-color: var(--green);
      }
      .mark-btn.review {
        background: var(--amber-bg);
        color: var(--amber);
        border-color: rgba(251,188,4,0.3);
      }
      .mark-btn.review.active {
        background: var(--amber);
        color: #000;
        border-color: var(--amber);
      }
      .stats-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .stat-pill {
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 99px;
      }
      .stat-know { background: var(--green-bg); color: var(--green); }
      .stat-review { background: var(--amber-bg); color: var(--amber); }
      .stat-remaining { background: rgba(255,255,255,0.05); color: var(--text3); }
      .kb-hint {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      }
      .kb-key {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--text3);
      }
      .kbd {
        font-family: var(--mono);
        font-size: 10px;
        background: var(--bg4);
        border: 1px solid var(--border2);
        border-radius: 4px;
        padding: 2px 6px;
        color: var(--text2);
      }
    `),
    React.createElement('div', { className: 'wrap' },
      React.createElement('header', null,
        React.createElement('button', { className: 'back-button', onClick: onBack }, '← Back'),
        React.createElement('div', { className: 'header-badge' }, '🤖 AIT 313'),
        React.createElement('h1', null,
          'Artificial ',
          React.createElement('span', null, 'Intelligence')
        ),
        React.createElement('p', { className: 'header-sub' }, `${ALL_CARDS.length} cards · MAS · Environments · Deep Learning`)
      ),
      React.createElement('div', { className: 'progress-row' },
        React.createElement('span', { className: 'progress-label' }, `Card ${currentIndex + 1} of ${currentDeck.length}`),
        React.createElement('div', { className: 'progress-track' },
          React.createElement('div', { className: 'progress-fill', style: { width: `${progressPercent}%` } })
        ),
        React.createElement('span', { className: 'progress-pct' }, `${progressPercent}%`)
      ),
      React.createElement('div', { className: 'tabs-wrap' },
        CATEGORIES.map(cat =>
          React.createElement('button', {
            key: cat,
            className: `tab ${activeCat === cat ? 'active' : ''}`,
            onClick: () => filterCat(cat),
          }, cat)
        )
      ),
      React.createElement('div', { className: 'card-area', onClick: flipCard },
        React.createElement('div', { className: `card-inner ${isFlipped ? 'flipped' : ''}` },
          React.createElement('div', { className: 'card-face card-front' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Question')
            ),
            React.createElement('div', { className: 'card-body' },
              React.createElement('div', { className: 'card-q' }, currentCard?.q || '')
            ),
            React.createElement('div', { className: 'card-hint' }, 'Tap to reveal answer')
          ),
          React.createElement('div', { className: 'card-face card-back' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Answer')
            ),
            React.createElement('div', { className: 'card-body' },
              React.createElement('div', { className: 'card-a' }, currentCard ? renderAnswer(currentCard.a) : null)
            )
          )
        )
      ),
      React.createElement('div', { className: 'controls' },
        React.createElement('button', { className: 'btn-nav', onClick: () => navigate(-1), 'aria-label': 'Previous' }, '←'),
        React.createElement('span', { className: 'counter' }, `${currentIndex + 1} / ${currentDeck.length}`),
        React.createElement('button', { className: 'btn-nav', onClick: () => navigate(1), 'aria-label': 'Next' }, '→'),
        React.createElement('button', { className: 'btn-shuffle', onClick: shuffleDeck },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('path', { d: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5' })
          ),
          'Shuffle'
        )
      ),
      React.createElement('div', { className: 'mark-row', style: { display: isFlipped ? 'flex' : 'none' } },
        React.createElement('button', { className: `mark-btn know ${isKnown ? 'active' : ''}`, onClick: () => mark('know') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('polyline', { points: '20 6 9 17 4 12' })
          ),
          'Got it'
        ),
        React.createElement('button', { className: `mark-btn review ${isReview ? 'active' : ''}`, onClick: () => mark('review') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('polyline', { points: '1 4 1 10 7 10' }),
            React.createElement('path', { d: 'M3.51 15a9 9 0 1 0 .49-3.37' })
          ),
          'Review again'
        )
      ),
      React.createElement('div', { className: 'stats-row' },
        React.createElement('span', { className: 'stat-pill stat-know' }, `${knownIndices.length} known`),
        React.createElement('span', { className: 'stat-pill stat-review' }, `${reviewIndices.length} to review`),
        React.createElement('span', { className: 'stat-pill stat-remaining' }, `${currentDeck.length - knownIndices.length} remaining`)
      ),
      React.createElement('div', { className: 'kb-hint' },
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'Space'), ' flip'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, '←'), React.createElement('kbd', { className: 'kbd' }, '→'), ' navigate'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'K'), ' got it ', React.createElement('kbd', { className: 'kbd' }, 'R'), ' review')
      )
    )
  );
};

export default ArtificialIntelligenceFlashcards;
