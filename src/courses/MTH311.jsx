// AlgebraFlashcards.jsx
import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [
  // ----- Matrices & Determinants -----
  { cat: "Matrices", q: "Define the minor of an element in a matrix.", a: "The minor of an element aᵢⱼ is the determinant of the submatrix formed by deleting the i-th row and j-th column of the original matrix." },
  { cat: "Matrices", q: "What is a cofactor of an element?", a: "Cofactor = (-1)ⁱ⁺ʲ × (minor of the element)." },
  { cat: "Matrices", q: "Write the general form of a 2×2 matrix.", a: "A = [[a₁₁, a₁₂], [a₂₁, a₂₂]]" },
  { cat: "Matrices", q: "How do you multiply two matrices A (m×n) and B (n×p)?", a: "The product C = AB has size m×p, where cᵢⱼ = Σ(aᵢₖ × bₖⱼ) for k=1 to n." },
  { cat: "Matrices", q: "What is the identity matrix?", a: "A square matrix with 1s on the main diagonal and 0s elsewhere. For any A, AI = IA = A." },

  // ----- Eigenvalues & Eigenvectors -----
  { cat: "Eigenvalues", q: "What is the eigenvalue equation for a square matrix A?", a: "A x = λ x, where λ is an eigenvalue and x is the corresponding eigenvector." },
  { cat: "Eigenvalues", q: "How do you find eigenvalues of a matrix A?", a: "Solve the characteristic equation det(A - λI) = 0." },
  { cat: "Eigenvalues", q: "Given A = [[4, 2], [5, -1]], write the characteristic equation.", a: "det( [[4-λ, 2], [5, -1-λ]] ) = (4-λ)(-1-λ) - (2)(5) = λ² - 3λ - 14 = 0." },
  { cat: "Eigenvalues", q: "What does it mean that λ = 10 is an eigenvalue of a matrix?", a: "Then (A - 10I)x = 0 has a non‑trivial solution. The eigenvector satisfies the homogeneous system." },

  // ----- Complex Numbers -----
  { cat: "Complex Numbers", q: "Define a complex number.", a: "A number of the form z = a + bj, where a and b are real numbers, and j = √(-1). a is the real part, b is the imaginary part." },
  { cat: "Complex Numbers", q: "How do you add two complex numbers (a + bj) and (c + dj)?", a: "(a + c) + (b + d)j" },
  { cat: "Complex Numbers", q: "How do you multiply two complex numbers?", a: "(a + bj)(c + dj) = (ac - bd) + (ad + bc)j" },
  { cat: "Complex Numbers", q: "What is the complex conjugate of z = a + bj?", a: "z̅ = a - bj" },
  { cat: "Complex Numbers", q: "What are the mth roots of unity?", a: "Solutions to zᵐ = 1. They are given by z = e^(2πk i / m), k = 0,1,...,m-1." },
  { cat: "Complex Numbers", q: "Write the four 4th roots of unity.", a: "1, i, -1, -i (where i² = -1)." },

  // ----- Mathematical Induction -----
  { cat: "Induction", q: "State the principle of mathematical induction.", a: "If a statement P(n) is true for n = 1, and assuming P(k) true implies P(k+1) true, then P(n) is true for all natural numbers n." },
  { cat: "Induction", q: "What are the two main steps in an induction proof?", a: "1. Base case: verify P(1) is true. 2. Inductive step: assume P(k) true, then prove P(k+1) true." },

  // ----- Hyperbolic Functions -----
  { cat: "Hyperbolic", q: "Define sinh x and cosh x in terms of exponentials.", a: "sinh x = (eˣ - e⁻ˣ)/2, cosh x = (eˣ + e⁻ˣ)/2" },
  { cat: "Hyperbolic", q: "What is the value of cosh 0?", a: "cosh 0 = 1" },
  { cat: "Hyperbolic", q: "What is the value of sinh 0?", a: "sinh 0 = 0" },
  { cat: "Hyperbolic", q: "Prove the identity cosh²x - sinh²x = 1.", a: "Using exponential definitions: ((eˣ+e⁻ˣ)/2)² - ((eˣ-e⁻ˣ)/2)² = (e²ˣ+2+e⁻²ˣ - e²ˣ+2 - e⁻²ˣ)/4 = 4/4 = 1." },
  { cat: "Hyperbolic", q: "What is the derivative of sinh x?", a: "d/dx sinh x = cosh x" },
  { cat: "Hyperbolic", q: "What is the derivative of cosh x?", a: "d/dx cosh x = sinh x" },
  { cat: "Hyperbolic", q: "Express tanh x in terms of exponentials.", a: "tanh x = sinh x / cosh x = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)" },
  { cat: "Hyperbolic", q: "Define inverse hyperbolic functions (e.g., arsinh x).", a: "arsinh x = ln(x + √(x²+1)), arcosh x = ln(x + √(x²-1)) for x ≥ 1, artanh x = ½ ln((1+x)/(1-x)) for |x|<1." },
  { cat: "Hyperbolic", q: "Solve cosh x + 5 sinh x = 1.", a: "Substitute definitions: (eˣ+e⁻ˣ)/2 + 5(eˣ-e⁻ˣ)/2 = 1 → multiply 2: eˣ+e⁻ˣ+5eˣ-5e⁻ˣ = 2 → 6eˣ -4e⁻ˣ = 2 → multiply eˣ: 6e²ˣ - 4 = 2eˣ → 6e²ˣ - 2eˣ -4 = 0 → divide 2: 3e²ˣ - eˣ -2 = 0 → solve quadratic: eˣ = (1 ± √(1+24))/6 = (1±5)/6 → positive: eˣ=1 → x=0." },
  { cat: "Hyperbolic", q: "What is the relationship between hyperbolic and trigonometric functions via complex numbers?", a: "sinh(jx) = j sin x, cosh(jx) = cos x, where j = √(-1)." },

  // ----- Series & Sequences (from garbled content) -----
  { cat: "Series", q: "What is a series?", a: "The sum of the terms of a sequence. Example: ∑_{n=1}^{∞} a_n." },
  { cat: "Series", q: "What is the condition for a geometric series ∑ arⁿ to converge?", a: "|r| < 1. The sum is a/(1-r)." },

  // ----- Additional key points from the PDF -----
  { cat: "Matrices", q: "What does it mean to solve a linear system using matrix form?", a: "Write the system as A x = B, then find x = A⁻¹ B if A is invertible." },
  { cat: "Complex Numbers", q: "Express e^(jθ) in terms of sine and cosine.", a: "Euler's formula: e^(jθ) = cos θ + j sin θ." },
  { cat: "Complex Numbers", q: "What is the modulus of a complex number z = a + bj?", a: "|z| = √(a² + b²)" },
  { cat: "Induction", q: "Prove by induction that 1 + 2 + 3 + ... + n = n(n+1)/2.", a: "Base n=1: 1 = 1·2/2. Inductive: assume true for k, then sum to k+1 = k(k+1)/2 + (k+1) = (k+1)(k+2)/2." },
  { cat: "Hyperbolic", q: "Solve cosh 2x = 0.8 + 0.4 cosh x.", a: "Use cosh 2x = 2 cosh²x -1 → 2cosh²x -1 = 0.8 + 0.4 cosh x → 2cosh²x -0.4 cosh x -1.8 = 0 → multiply 5: 10cosh²x -2 cosh x -9 = 0 → solve quadratic for cosh x (positive) then x = arcosh(...)." },
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
      const isFormula = /[=×/ϕ∑λ]/.test(part) && !part.includes(' is ') && !part.includes(' are ') && idx > 0;
      if (isFormula) {
        return React.createElement('span', { key: idx, className: 'formula-block', dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
      }
      return React.createElement('span', { key: idx, style: { display: 'block', marginTop: idx > 0 ? '10px' : '' }, dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
    });
  }
  return React.createElement('span', { dangerouslySetInnerHTML: { __html: text.replace(/\n/g, '<br>') } });
};

const AlgebraFlashcards = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIndices, setKnownIndices] = useState([]);
  const [reviewIndices, setReviewIndices] = useState([]);

  const currentDeck = activeCat === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.cat === activeCat);

  const filterCat = (cat) => {
    setActiveCat(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

    const shuffleDeck = () => {
        setCurrentDeckOrder(prevDeck => {
            const shuffled = [...prevDeck];
            for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        });
        setCurrentIndex(0);
        setIsFlipped(false);
    };

  // Use state for deck order to allow shuffling
  const [deckOrder, setCurrentDeckOrder] = useState([]);
  // Initialize deck order when category changes or on mount
  useEffect(() => {
    setCurrentDeckOrder([...currentDeck]);
  }, [currentDeck]);

  // Use deckOrder for rendering, but marks still reference the original card objects
  const displayDeck = deckOrder.length ? deckOrder : currentDeck;
  const currentCard = displayDeck[currentIndex];

  const navigate = useCallback((dir) => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + dir + displayDeck.length) % displayDeck.length);
  }, [displayDeck.length]);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const mark = useCallback((type) => {
    if (!currentCard) return;
    const originalIdx = ALL_CARDS.indexOf(currentCard);
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
  }, [currentCard]);

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
  }, [isFlipped, navigate, flipCard, mark]);

  const originalCardIndex = currentCard ? ALL_CARDS.indexOf(currentCard) : -1;
  const isKnown = knownIndices.includes(originalCardIndex);
  const isReview = reviewIndices.includes(originalCardIndex);
  const progressPercent = displayDeck.length ? Math.round(((currentIndex + 1) / displayDeck.length) * 100) : 0;

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
        --accent: #3b82f6;
        --accent2: #2563eb;
        --green: #34a853;
        --green-bg: rgba(52,168,83,0.12);
        --amber: #fbbc04;
        --amber-bg: rgba(251,188,4,0.1);
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
        background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
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
        background: radial-gradient(ellipse at center, rgba(59,130,246,0.07) 0%, transparent 70%);
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
        background: rgba(59,130,246,0.1);
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
        border: 1px solid rgba(59,130,246,0.25);
        background: rgba(59,130,246,0.07);
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
        box-shadow: 0 0 8px rgba(59,130,246,0.4);
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
      .tab:hover { border-color: rgba(59,130,246,0.35); color: var(--accent); }
      .tab.active {
        background: rgba(59,130,246,0.12);
        border-color: rgba(59,130,246,0.4);
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
        background-image: radial-gradient(ellipse at 80% 10%, rgba(59,130,246,0.05) 0%, transparent 60%);
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
        background: rgba(59,130,246,0.1);
        border: 1px solid rgba(59,130,246,0.2);
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
        flex-direction: column;
        justify-content: center;
      }
      .card-q {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        font-weight: 600;
        line-height: 1.55;
        color: var(--text);
      }
      .card-a {
        font-family: 'Lora', serif;
        font-size: clamp(0.875rem, 2vw, 1rem);
        line-height: 1.75;
        color: var(--text);
      }
      .card-a .formula-block {
        font-family: var(--mono);
        font-size: 0.85em;
        background: var(--bg4);
        border: 1px solid var(--border);
        border-left: 3px solid var(--accent);
        border-radius: 8px;
        padding: 10px 14px;
        margin-top: 12px;
        color: var(--accent);
        display: block;
        white-space: pre-wrap;
        line-height: 1.6;
      }
      .card-hint {
        margin-top: 1.5rem;
        font-size: 12px;
        color: var(--text3);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .card-hint::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 1px;
        background: var(--text3);
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
        border-radius: 12px;
        border: 1px solid var(--border2);
        background: var(--bg2);
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s;
        font-size: 18px;
      }
      .btn-nav:hover {
        border-color: rgba(59,130,246,0.4);
        color: var(--accent);
        background: rgba(59,130,246,0.05);
      }
      .btn-nav:active { transform: scale(0.94); }
      .counter {
        font-family: var(--mono);
        font-size: 14px;
        color: var(--text2);
        min-width: 70px;
        text-align: center;
        font-weight: 500;
      }
      .btn-shuffle {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
        padding: 7px 14px;
        border-radius: 99px;
        border: 1px solid var(--border2);
        background: transparent;
        color: var(--text2);
        cursor: pointer;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .btn-shuffle:hover { border-color: var(--border2); color: var(--text); background: var(--bg3); }
      .mark-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-bottom: 1.25rem;
        animation: fadeUp 0.2s ease;
      }
      @keyframes fadeUp {
        from { opacity:0; transform: translateY(6px); }
        to { opacity:1; transform: translateY(0); }
      }
      .mark-btn {
        font-family: 'Syne', sans-serif;
        font-size: 12px;
        font-weight: 600;
        padding: 8px 18px;
        border-radius: 99px;
        border: 1px solid;
        cursor: pointer;
        transition: all 0.18s;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .mark-btn.know {
        border-color: rgba(52,168,83,0.35);
        color: var(--green);
        background: transparent;
      }
      .mark-btn.know:hover, .mark-btn.know.active {
        background: var(--green-bg);
        border-color: var(--green);
      }
      .mark-btn.review {
        border-color: rgba(251,188,4,0.35);
        color: var(--amber);
        background: transparent;
      }
      .mark-btn.review:hover, .mark-btn.review.active {
        background: var(--amber-bg);
        border-color: var(--amber);
      }
      .stats-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .stat-pill {
        font-size: 11px;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 99px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .stat-know { background: var(--green-bg); color: var(--green); }
      .stat-review { background: var(--amber-bg); color: var(--amber); }
      .stat-remaining { background: var(--bg3); color: var(--text3); }
      .kb-hint {
        text-align: center;
        font-size: 11px;
        color: var(--text3);
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      }
      .kb-key { display: inline-flex; align-items: center; gap: 4px; }
      .kbd {
        font-family: var(--mono);
        font-size: 10px;
        background: var(--bg3);
        border: 1px solid var(--border2);
        border-radius: 4px;
        padding: 2px 6px;
        color: var(--text2);
      }
      @media (max-width: 480px) {
        :root { --card-h: 280px; }
        .card-face { padding: 1.5rem; }
        h1 { font-size: 1.4rem; }
      }
    `),
    React.createElement('div', { className: 'wrap' },
      React.createElement('header', null,
        onBack && React.createElement('button', { className: 'back-button', onClick: onBack }, '← Back'),
        React.createElement('div', { className: 'header-badge' },
          React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, style: { width: 12, height: 12 } },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
            React.createElement('path', { d: 'M12 8v4l3 3' })
          ),
          `${ALL_CARDS.length} Cards · ${CATEGORIES.length-1} Topics`
        ),
        React.createElement('h1', null, 'Advanced ', React.createElement('span', null, 'Algebra')),
        React.createElement('p', { className: 'header-sub' }, 'Tap any card to reveal the answer')
      ),
      React.createElement('div', { className: 'progress-row' },
        React.createElement('div', { className: 'progress-label' }, `Card ${currentIndex + 1} of ${displayDeck.length}`),
        React.createElement('div', { className: 'progress-track' },
          React.createElement('div', { className: 'progress-fill', style: { width: `${progressPercent}%` } })
        ),
        React.createElement('div', { className: 'progress-pct' }, `${progressPercent}%`)
      ),
      React.createElement('div', { className: 'tabs-wrap' },
        CATEGORIES.map(cat => React.createElement('button', {
          key: cat,
          className: `tab ${activeCat === cat ? 'active' : ''}`,
          onClick: () => filterCat(cat)
        }, cat === 'All' ? `All (${ALL_CARDS.length})` : cat))
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
        React.createElement('span', { className: 'counter' }, `${currentIndex + 1} / ${displayDeck.length}`),
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
        React.createElement('span', { className: 'stat-pill stat-remaining' }, `${displayDeck.length - knownIndices.length} remaining`)
      ),
      React.createElement('div', { className: 'kb-hint' },
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'Space'), ' flip'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, '←'), React.createElement('kbd', { className: 'kbd' }, '→'), ' navigate'),
        React.createElement('span', { className: 'kb-key' }, React.createElement('kbd', { className: 'kbd' }, 'K'), ' got it ', React.createElement('kbd', { className: 'kbd' }, 'R'), ' review')
      )
    )
  );
};

export default AlgebraFlashcards;