import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [
  { cat: "Petroleum Basics", q: "What is petroleum?", a: "A naturally occurring complex mixture of hydrocarbons that can occur as crude oil, natural gas, bitumen, and tar sand. It comes with impurities such as hydrogen sulphide, nitrogen, carbon dioxide, water, and sand." },
  { cat: "Petroleum Basics", q: "How is petroleum formed?", a: "From the remains of organisms buried over millions of years in the absence of oxygen, under conditions of high temperature and pressure." },
  { cat: "Petroleum Basics", q: "Name the five elements of a petroleum system.", a: "1. Source rock\n2. Reservoir rock\n3. Migration\n4. Accumulation\n5. Trap" },
  { cat: "Petroleum Basics", q: "What is a source rock?", a: "Fine-grained rock particles in which hydrocarbons are formed or generated. They are porous and permeable but do NOT have a trapping mechanism. Example: shale rock." },
  { cat: "Petroleum Basics", q: "What is a reservoir rock?", a: "Coarse-grained rock particles in which hydrocarbons accumulate. They are porous, permeable, AND have a trapping mechanism to hold oil in place. Examples: sandstone and carbonates." },
  { cat: "Petroleum Basics", q: "What is migration (in petroleum systems)?", a: "The movement of hydrocarbons from the fine-grained source rock (where they were formed) to the coarser-grained reservoir rock (where they accumulate)." },
  { cat: "Petroleum Basics", q: "What is accumulation in a petroleum system?", a: "The concentration and segregation of hydrocarbons that have migrated from the source rock into the reservoir rock, aided by agents of denudation such as wind, rainfall, and erosion." },
  { cat: "Petroleum Basics", q: "What is a petroleum trap?", a: "A geological structure or barrier that prevents further movement or migration of hydrocarbons. Types: structural traps, stratigraphic traps, and combination traps." },
  { cat: "Petroleum Basics", q: "What is the key difference between a source rock and a reservoir rock?", a: "A source rock generates hydrocarbons but has NO trapping mechanism. A reservoir rock accumulates hydrocarbons and DOES have a trapping mechanism." },
  { cat: "Petroleum Basics", q: "Name six types of petroleum fluids.", a: "1. Volatile oil\n2. Black oil\n3. Condensate\n4. Dry gas\n5. Wet gas\n6. Bitumen" },
  { cat: "Reservoir & Fluids", q: "What is a petroleum reservoir?", a: "A pool or accumulation of hydrocarbons in a porous and permeable rock, present in commercial quantity." },
  { cat: "Reservoir & Fluids", q: "What is a fluid?", a: "Any substance that can flow, which can be in gaseous or liquid form." },
  { cat: "Reservoir & Fluids", q: "What are reservoir fluids?", a: "Fluids occupying or existing in the pore space of a reservoir rock. These include oil, gas, and water." },
  { cat: "Reservoir & Fluids", q: "What are petroleum fluids?", a: "Fluids that are hydrocarbons by their composition. Examples: volatile oil, black oil, condensate, dry gas, wet gas, and bitumen." },
  { cat: "Reservoir & Fluids", q: "What is an under-saturated oil reservoir?", a: "A reservoir whose reservoir pressure is ABOVE the bubble point pressure. There is no free gas present in the reservoir." },
  { cat: "Reservoir & Fluids", q: "What is a saturated oil reservoir?", a: "A reservoir whose reservoir pressure is at or BELOW the bubble point pressure, so free gas is present overlying the oil zone." },
  { cat: "Reservoir & Fluids", q: "What is bubble point pressure (P_b)?", a: "The pressure at which the smallest amount of gas first comes out of the liquid phase or solution. Below this pressure, free gas begins to form in the reservoir." },
  { cat: "Porosity", q: "Define porosity (ϕ).", a: "A measure of the void space in a rock system. It is the ratio of the pore volume to the bulk volume of the rock, expressed as a percentage." },
  { cat: "Porosity", q: "Give the formula for porosity using bulk volume and grain volume.", a: "ϕ = (V_B − V_g) / V_B × 100%\n\nWhere V_B = bulk volume, V_g = volume of grain (solid)." },
  { cat: "Porosity", q: "Give the formula for porosity using pore volume.", a: "ϕ = V_p / V_B × 100%\n\nWhere V_p = pore volume, V_B = bulk volume." },
  { cat: "Porosity", q: "What is V_B, V_g, and V_p?", a: "V_B = Bulk volume (total rock volume)\nV_g = Volume of grain or solid\nV_p = Pore volume (space available for fluids)" },
  { cat: "Porosity", q: "What is effective porosity?", a: "A measure of the INTERCONNECTED pore spaces in a rock — only the connected pores that allow fluid flow count. Isolated (dead-end) pores are excluded." },
  { cat: "Porosity", q: "What is a pore space?", a: "An opening in a rock that fluids can occupy." },
  { cat: "Porosity", q: "What is pore volume?", a: "The total volume of fluids occupying the pore spaces." },
  { cat: "Porosity", q: "Name four factors that affect porosity.", a: "1. Grain size\n2. Packing\n3. Clay content\n4. Degree of cementation" },
  { cat: "Fluid Saturation", q: "Define fluid saturation.", a: "The fraction of the pore volume occupied by a particular fluid. Represented by 'S' and measured in percentage or fraction." },
  { cat: "Fluid Saturation", q: "What is the general formula for fluid saturation?", a: "S = Volume of fluid / Pore volume" },
  { cat: "Fluid Saturation", q: "Write the formula for oil saturation (S_o).", a: "S_o = V_o / V_p\n\n(Volume of oil divided by pore volume)" },
  { cat: "Fluid Saturation", q: "Write the formula for gas saturation (S_g).", a: "S_g = V_g / V_p\n\n(Volume of gas divided by pore volume)" },
  { cat: "Fluid Saturation", q: "Write the formula for water saturation (S_w).", a: "S_w = V_w / V_p\n\n(Volume of water divided by pore volume)" },
  { cat: "Fluid Saturation", q: "What is the total fluid saturation equation for a three-phase system?", a: "S_o + S_g + S_w = 1  (or 100%)\n\nAll three fluid saturations must add up to 1." },
  { cat: "Fluid Saturation", q: "Write the three two-phase saturation equations.", a: "S_o + S_w = 1 (100%)\nS_g + S_w = 1 (100%)\nS_o + S_g = 1 (100%)" },
  { cat: "Rock Wettability", q: "What is rock wettability?", a: "The tendency of a fluid to spread or adhere to a solid surface in the presence of other immiscible fluids." },
  { cat: "Rock Wettability", q: "How is the contact angle (θ°) used to determine wettability?", a: "θ° < 90° → Water-wet system\nθ° > 90° → Oil-wet system\nθ° = 90° → Intermediate / neutral wettability" },
  { cat: "Rock Wettability", q: "Give examples of solid surfaces and fluid surfaces relevant to wettability.", a: "Solid surfaces: sandstone, dolomite, limestone\nFluid surfaces: oil, gas, water" },
  { cat: "Compressibility", q: "Define isothermal compressibility (C).", a: "The fractional change in volume that a system undergoes in response to a change in pressure, while temperature remains constant." },
  { cat: "Compressibility", q: "Write the general formula for isothermal compressibility.", a: "C = −(1/V) × (dV/dP)_T\n\nThe negative sign accounts for volume decreasing as pressure increases." },
  { cat: "Compressibility", q: "What is the isothermal compressibility of an ideal gas?", a: "C_g = 1/P  (psi⁻¹)\n\nDerived from the ideal gas law PV = nRT." },
  { cat: "Compressibility", q: "What is the isothermal compressibility of a real gas?", a: "C_g = 1/P − (1/z)(dz/dP)  (psi⁻¹)\n\nWhere z is the gas deviation (compressibility) factor." },
  { cat: "Compressibility", q: "What is the real gas equation?", a: "PV = znRT\n\nWhere z = gas deviation factor, n = moles, R = gas constant, T = temperature." },
  { cat: "Compressibility", q: "What is z (the gas deviation factor)?", a: "Also called the compressibility factor or z-factor. It corrects the ideal gas law for real gas behavior. For an ideal gas, z = 1." },
  { cat: "Formation Volume Factor", q: "What is the Formation Volume Factor (FVF)?", a: "Used to convert the volume of a fluid from reservoir conditions to surface conditions. It is a conversion factor to convert one stock tank barrel (STB) to the equivalent reservoir barrel (rb)." },
  { cat: "Formation Volume Factor", q: "Write the general FVF formula.", a: "B = Volume of fluid at reservoir conditions / Volume of fluid at surface conditions" },
  { cat: "Formation Volume Factor", q: "What is B_o (oil formation volume factor)?", a: "B_o = V_o,res / V_o,surf  [rb/STB]\n\nThe ratio of oil volume at reservoir conditions to oil volume at surface (stock tank) conditions." },
  { cat: "Formation Volume Factor", q: "What is B_g (gas formation volume factor)?", a: "B_g = V_g,res / V_g,surf  [cuft/scf]\n\nThe ratio of gas volume at reservoir conditions to gas volume at standard surface conditions." },
  { cat: "Formation Volume Factor", q: "What is B_w (water formation volume factor)?", a: "B_w = V_w,res / V_w,surf  [rb/STB]\n\nThe ratio of water volume at reservoir conditions to water volume at surface conditions." },
  { cat: "Formation Volume Factor", q: "What is the simplified formula for B_g?", a: "B_g = 0.02826 × zT / P  [cuft/scf]\n\nWhere z = gas deviation factor, T = temperature (°R), P = pressure (psi)." },
  { cat: "Formation Volume Factor", q: "What are the standard conditions used to derive the B_g formula?", a: "z_sc = 1,  P_sc = 14.7 psi,  T_sc = 60°F = 520°R" },
  { cat: "Formation Volume Factor", q: "What do the abbreviations rb, STB, cuft, and scf stand for?", a: "rb = reservoir barrel\nSTB = stock tank barrel\ncuft = cubic feet\nscf = standard cubic feet" },
  { cat: "Formation Volume Factor", q: "Calculate B_g given z=0.85, T=180°F, P=3000 psi.", a: "T = 460 + 180 = 640 °R\nB_g = 0.02826 × 0.85 × 640 / 3000 = 0.005124 cuft/scf" },
  { cat: "Formation Volume Factor", q: "How do you convert °F to Rankine (°R)?", a: "°R = °F + 460\n\nExamples: 180°F = 640°R,  250°F = 710°R,  95°F = 555°R" },
  { cat: "Permeability", q: "Define permeability (k).", a: "A measure of the ability of a rock to transmit fluids through its pore spaces. Measured in millidarcies (md)." },
  { cat: "Permeability", q: "What is absolute permeability?", a: "The measure of the ability of a rock to transmit a fluid when the rock is COMPLETELY SATURATED by that single fluid only. Represented by k." },
  { cat: "Permeability", q: "What is effective permeability?", a: "The measure of the ability of a rock to transmit a fluid in the PRESENCE OF OTHER FLUIDS. Symbols: k_o (to oil), k_g (to gas), k_w (to water)." },
  { cat: "Permeability", q: "What is relative permeability?", a: "The ratio of effective permeability to the absolute permeability of the SAME rock.\n\nk_ro = k_o/k,  k_rg = k_g/k,  k_rw = k_w/k" },
  { cat: "Permeability", q: "Name six sources of permeability data.", a: "1. Production history of nearby field\n2. In-subject field data (if available)\n3. Laboratory analysis of core samples\n4. Well test analysis\n5. Generalised correlations\n6. Standardised petrophysical data" },
  { cat: "Permeability", q: "What is the relationship: k_ro = ?", a: "k_ro = k_o / k\n\n(Relative permeability to oil = effective permeability to oil / absolute permeability)" },
  { cat: "Darcy's Law", q: "State Darcy's law in words.", a: "The flow rate through a homogeneous system is directly proportional to the pressure gradient and inversely proportional to the viscosity and length of the medium." },
  { cat: "Darcy's Law", q: "Write Darcy's equation for linear flow.", a: "q = −kAΔP / (μL)\n\nWhere k = permeability, A = cross-sectional area, ΔP = pressure difference, μ = viscosity, L = length." },
  { cat: "Darcy's Law", q: "Write Darcy's equation for radial flow.", a: "q = 7.08 kh(P_r − P_wf) / [μB_o ln(r_e/r_w)]\n\nWhere h = thickness, r_e = reservoir radius, r_w = wellbore radius." },
  { cat: "Darcy's Law", q: "In Darcy's law, what does μ represent and what are its units?", a: "μ = viscosity of the fluid, measured in centipoise (cp)." },
  { cat: "Darcy's Law", q: "For beds in PARALLEL, what are the conditions for flow and pressure?", a: "Total flow = sum of individual flows: q_t = q_1 + q_2 + … + q_n\nPressure drop is the SAME across all beds: ΔP_t = ΔP_1 = ΔP_2 = … = ΔP_n" },
  { cat: "Darcy's Law", q: "For beds in SERIES, what are the conditions for flow and pressure?", a: "Flow rate is the SAME through all beds: q_t = q_1 = q_2 = … = q_n\nTotal pressure drop is the SUM: ΔP_t = ΔP_1 + ΔP_2 + … + ΔP_n" },
  { cat: "Darcy's Law", q: "Write the K_avg formula for beds in parallel.", a: "K_avg = Σ(k_i × h_i) / Σ(h_i)  for i = 1 to n" },
  { cat: "Darcy's Law", q: "Write the K_avg formula for beds in series.", a: "K_avg = Σ(L_i) / Σ(L_i / k_i)  for i = 1 to n" },
  { cat: "Darcy's Law", q: "What is P_wf in Darcy's radial flow equation?", a: "P_wf = Wellbore flowing pressure (psi) — the pressure at the bottom of the well while it is producing." },
  { cat: "Drilling", q: "Define drilling (in petroleum engineering).", a: "The application of science and technology to make a hole that is economically viable and safe to both personnel and equipment. It is the process of making a wellbore in the earth." },
  { cat: "Drilling", q: "What is a drilling rig?", a: "The assembly of heavy machinery and equipment required for hole-making during a drilling activity." },
  { cat: "Drilling", q: "Name the five types of drilling rigs.", a: "1. Land rig\n2. Submersible rig\n3. Jackup rig\n4. Semi-submersible rig\n5. Drillship rig" },
  { cat: "Drilling", q: "Describe a jackup rig.", a: "An offshore drilling rig used in water depths up to 350 ft. Suitable for developmental drilling but poorly adapted for exploratory activity." },
  { cat: "Drilling", q: "Describe a semi-submersible rig.", a: "An offshore rig that can drill in up to 7,000 ft of water depth. Maintains stability using anchors placed at the seabed by divers." },
  { cat: "Drilling", q: "Describe a drillship rig.", a: "A ship-like offshore rig that can drill in up to 20,000 ft of water depth. Maintains stability using computer-controlled automatic anchors. Can withstand any weather except hurricanes." },
  { cat: "Drilling", q: "Name the five systems of a rotary drilling rig.", a: "1. Power system\n2. Rotating system\n3. Circulating system\n4. Hoisting system\n5. Well control system" },
  { cat: "Drilling", q: "What equipment is in the ROTATING system of a rotary rig?", a: "Swivel, Kelly, TDS (top drive system), rotary table, drill pipe, drill collar, drill bit." },
  { cat: "Drilling", q: "What equipment is in the CIRCULATING system of a rotary rig?", a: "Mud tank, mud pump, drilling mud, degaser, desander, desilter, shale shaker." },
  { cat: "Drilling", q: "What equipment is in the HOISTING system of a rotary rig?", a: "Drawworks, travelling block, hook, drilling line, derrick, monkey board." },
  { cat: "Drilling", q: "What equipment is in the WELL CONTROL system?", a: "Blowout preventer (BOP), diverter, accumulator unit." },
  { cat: "Drilling", q: "What is the prime mover? Why is diesel preferred over petrol?", a: "The prime mover is the major source of power on the rig floor (an internal combustion engine). Diesel is preferred because it converts thermal energy to useful power more efficiently than a petrol engine." },
  { cat: "Drilling", q: "Name the three primary parts of drilling mud.", a: "1. Liquid phase (oil, water, or synthetic)\n2. Colloidal fraction (Bentonite clay)\n3. Inert fraction (Barite, sawdust, weighting materials)" },
  { cat: "Drilling", q: "Name six functions of drilling mud.", a: "1. Transport rock cuttings to the surface\n2. Clean the bottom of the hole\n3. Lubricate and cool the drill bit\n4. Suspend rock cuttings in an emergency\n5. Control subsurface pressure\n6. Reinforce wellbore walls by forming mud cakes" },
  { cat: "Drilling Problems", q: "What is formation damage (drilling problem)?", a: "May occur when drilling through unconsolidated sand, or when the hydrostatic pressure becomes too high, damaging the reservoir formation." },
  { cat: "Drilling Problems", q: "What is a kick?", a: "The influx of formation fluids into the wellbore when the hydrostatic pressure becomes LESS than the formation pressure." },
  { cat: "Drilling Problems", q: "What is lost circulation?", a: "The loss of a significant amount of drilling mud to the formation during circulation of the drilling mud down the hole." },
  { cat: "Drilling Problems", q: "What is a blowout?", a: "Occurs when the influx of formation fluids into the wellbore is uncontrollable, potentially leading to loss of life and equipment. It is essentially an uncontrollable kick." },
  { cat: "Drilling Problems", q: "What is the heaving shale problem?", a: "Occurs when drilling through shale with water-based mud. Water from the mud reacts with the shale, causing it to swell, which can lead to a dog-leg (wellbore deviation)." },
  { cat: "Drilling Problems", q: "What is the hydrostatic pressure formula?", a: "P_h = 0.052 × ρ_m × D\n\nP_h = hydrostatic pressure (psi), ρ_m = mud density (ppg), D = hole depth (ft)" },
  { cat: "Drilling Problems", q: "Calculate the hydrostatic pressure at 7,000 ft with 10.5 ppg mud.", a: "P_h = 0.052 × 10.5 × 7,000 = 3,822 psi" },
  { cat: "Well Completion", q: "What is well completion?", a: "The process of preparing a well for production by installing the necessary equipment and attachments for efficient production of oil and gas. Includes casing, tubing, perforation, and sand control." },
  { cat: "Well Completion", q: "What is casing in well completion?", a: "A steel pipe that is cemented to the wall of the wellbore." },
  { cat: "Well Completion", q: "Name four functions of casing.", a: "1. Gives the well a definite shape and size\n2. Prevents the well from collapsing\n3. Prevents contamination of water\n4. Isolates pressure zones" },
  { cat: "Well Completion", q: "What is tubing in well completion?", a: "A steel pipe of small internal diameter used to convey oil to the surface." },
  { cat: "Well Completion", q: "Name four functions of tubing.", a: "1. Provides better flow efficiency\n2. Provides multiple flow paths\n3. Protects casing from corrosion and abrasion\n4. Permits installation of subsurface safety valve (SSSV)" },
  { cat: "Well Completion", q: "What is a packer?", a: "A device used to seal the space between the casing and the tubing. It stabilises the flow of fluid and directs it to the tubing." },
  { cat: "Well Completion", q: "What is a blast joint?", a: "Used to prevent external erosion of the lower tubing by fluids flowing from the reservoir into the wellbore." },
  { cat: "Well Completion", q: "What is a flow coupling?", a: "Used to prevent internal erosion of the tubing from turbulent fluids flowing through it, protecting internal components." },
  { cat: "Well Completion", q: "What is a no-go nipple?", a: "Used to prevent objects or materials from falling to the bottom of the wellbore." },
  { cat: "Well Completion", q: "What is the Christmas tree in well completion?", a: "An assembly of valves and fittings at the top of the wellbore that directs the flow of fluids into (and out of) the wellbore." },
  { cat: "Well Completion", q: "What are the six valves associated with the Christmas tree?", a: "1. Upper master valve (emergency shut-in)\n2. Lower master valve (backup shut-in)\n3. Flow wing valve (directs flow to choke)\n4. Kill wing valve (injects kill fluid)\n5. Swab valve (well servicing access)\n6. Choke valve (controls flow rate)" },
  { cat: "Drive Mechanisms", q: "What is primary oil recovery?", a: "Oil is produced using the NATURAL energy inherent in the reservoir. Natural drives include water drive, gas cap drive, and solution gas drive." },
  { cat: "Drive Mechanisms", q: "What is secondary oil recovery?", a: "Oil is produced by OTHER SUPPORT (injected energy) when natural energy can no longer push oil to the surface. Methods: water flooding, gas injection, artificial lift." },
  { cat: "Drive Mechanisms", q: "What is tertiary (enhanced) oil recovery (EOR)?", a: "Used after most recoverable oil has been produced. Methods include thermal flooding, miscible flooding, hydrocarbon injection, and in-situ combustion." },
  { cat: "Drive Mechanisms", q: "What is the water drive mechanism?", a: "Oil is produced to the surface by the expansion of bottom water or edge water encroaching into the reservoir. Gives the highest recovery efficiency." },
  { cat: "Drive Mechanisms", q: "What is the gas cap drive mechanism?", a: "Oil is produced to the surface by the expansion of the free gas (gas cap) overlying the oil zone. Gives moderate recovery." },
  { cat: "Drive Mechanisms", q: "What is the solution gas drive mechanism?", a: "Oil is produced to the surface by the expansion of the oil and its dissolved gas. Life span is very short; recovery is typically above 15%. Least efficient natural drive." },
  { cat: "Drive Mechanisms", q: "What is the combination drive mechanism?", a: "It is rare for a reservoir to have only one drive mechanism; there is almost always another acting simultaneously. Examples: gas cap + water drive; solution gas + gas cap drive." },
  { cat: "Reserve Estimation", q: "Name four methods of estimating hydrocarbon reserves.", a: "1. Volumetric method\n2. Material balance equation\n3. Decline curve analysis\n4. Reservoir simulation" },
  { cat: "Reserve Estimation", q: "Write the volumetric formula for Oil Initially in Place (IOIP).", a: "N = 7758 × A × h × ϕ × (1 − S_w) / B_oi  [STB]" },
  { cat: "Reserve Estimation", q: "In the IOIP formula, what does 7758 represent?", a: "The conversion factor: 1 acre-foot = 7,758 barrels. It converts from acre-feet to stock tank barrels." },
  { cat: "Reserve Estimation", q: "In the IOIP formula, what are A, h, ϕ, S_w, and B_oi?", a: "A = Cross-sectional area (acres)\nh = Reservoir thickness (ft)\nϕ = Porosity (fraction)\nS_w = Water saturation (fraction)\nB_oi = Initial oil FVF (rb/STB)" },
  { cat: "Reserve Estimation", q: "Write the formula for oil in place at abandonment (N_a).", a: "N_a = 7758 × A × h × ϕ × (1 − S_wa) / B_oa  [STB]\n\nS_wa = water saturation at abandonment, B_oa = oil FVF at abandonment" },
  { cat: "Reserve Estimation", q: "What is cumulative oil production (N_p)?", a: "N_p = N − N_a  [STB]\n\n(Oil initially in place minus oil remaining at abandonment)" },
  { cat: "Reserve Estimation", q: "Write the recovery factor formula for oil.", a: "RF = (N_p / N) × 100% = [(N − N_a) / N] × 100%" },
  { cat: "Reserve Estimation", q: "Write the volumetric formula for Gas Initially in Place (IGIP).", a: "G = 43,560 × A × h × ϕ × (1 − S_w) / B_gi  [scf]" },
  { cat: "Reserve Estimation", q: "In the IGIP formula, what does 43,560 represent?", a: "The conversion factor: 1 acre = 43,560 square feet. It converts from acre-feet (area × thickness) to cubic feet." },
  { cat: "Reserve Estimation", q: "Write the recovery factor formula for gas.", a: "RF_g = (G_p / G) × 100% = [(G − G_a) / G] × 100%\n\nWhere G_p = cumulative gas production, G_a = gas at abandonment." },
  { cat: "Reserve Estimation", q: "In the worked example: A=1200 acres, h=80 ft, ϕ=22%, S_w=20%, B_oi=1.35. What is N?", a: "N = 7758 × 1200 × 80 × 0.22 × 0.80 / 1.35 ≈ 97.096 MM STB" },
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

const PetroleumFlashcards = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIndices, setKnownIndices] = useState([]);
  const [reviewIndices, setReviewIndices] = useState([]);
  const [ setShuffledDeck] = useState([...ALL_CARDS]);

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
        --accent: #f0a500;
        --accent2: #c07c00;
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
        background-image: linear-gradient(rgba(240,165,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.03) 1px, transparent 1px);
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
        background: radial-gradient(ellipse at center, rgba(240,165,0,0.07) 0%, transparent 70%);
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
        background: rgba(240,165,0,0.1);
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
        border: 1px solid rgba(240,165,0,0.25);
        background: rgba(240,165,0,0.07);
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
        box-shadow: 0 0 8px rgba(240,165,0,0.4);
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
      .tab:hover { border-color: rgba(240,165,0,0.35); color: var(--accent); }
      .tab.active {
        background: rgba(240,165,0,0.12);
        border-color: rgba(240,165,0,0.4);
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
        background-image: radial-gradient(ellipse at 80% 10%, rgba(240,165,0,0.05) 0%, transparent 60%);
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
        background: rgba(240,165,0,0.1);
        border: 1px solid rgba(240,165,0,0.2);
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
        border-color: rgba(240,165,0,0.4);
        color: var(--accent);
        background: rgba(240,165,0,0.05);
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
          '100 Cards · 13 Topics'
        ),
        React.createElement('h1', null, 'Petroleum ', React.createElement('span', null, 'Engineering')),
        React.createElement('p', { className: 'header-sub' }, 'Tap any card to reveal the answer')
      ),
      React.createElement('div', { className: 'progress-row' },
        React.createElement('div', { className: 'progress-label' }, `Card ${currentIndex + 1} of ${currentDeck.length}`),
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

export default PetroleumFlashcards;
