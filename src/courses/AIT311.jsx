import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [

  // ── Computer Architecture Overview ──
  { cat: "Computer Architecture", q: "What are the 4 main components that determine the architecture of a computer?", a: "1. Input devices\n2. Output devices\n3. Memory\n4. CPU (Central Processing Unit)" },
  { cat: "Computer Architecture", q: "What does the processor consist of?", a: "The processor consists of the CPU and primary memory. It follows the Read → Process → Execute cycle:\n• Instructions = what to do\n• Data = what is being processed" },
  { cat: "Computer Architecture", q: "Name the 4 main computer architectures studied in AIT 311.", a: "1. Von Neumann Architecture\n2. Harvard Architecture\n3. Modified Harvard Architecture\n4. CISC / RISC Architecture" },

  // ── Von Neumann Architecture ──
  { cat: "Von Neumann Architecture", q: "Describe the Von Neumann Architecture.", a: "Uses a SINGLE shared memory for both instructions AND data. Layout (from diagram):\nInput → Processor (CPU + Memory) → Output\nSecondary Storage sits below, connected to the processor with bidirectional arrows.\nInstructions and data share the same bus and memory." },
  { cat: "Von Neumann Architecture", q: "What is the Von Neumann bottleneck?", a: "Because instructions and data share ONE memory bus, the CPU must alternate between fetching instructions and fetching data over the same pathway. This causes the CPU to sit idle while waiting, limiting overall performance." },
  { cat: "Von Neumann Architecture", q: "What is the CPU composed of in Von Neumann architecture?", a: "The CPU contains:\n1. Control Unit (CU)\n2. ALU (Arithmetic & Logic Unit)\n3. Registers\n(Shown in the top-right diagram in the notes)" },
  { cat: "Von Neumann Architecture", q: "What is secondary storage in the Von Neumann model?", a: "Secondary storage (e.g. hard disk, SSD) sits below primary memory in the diagram. It stores data persistently and is slower than main memory. It feeds data into the processor as needed via bidirectional arrows." },

  // ── Harvard Architecture ──
  { cat: "Harvard Architecture", q: "What problem does Harvard Architecture solve?", a: "It eradicates the Von Neumann bottleneck by using SEPARATE memories for data and instructions, so both can be accessed simultaneously without delay." },
  { cat: "Harvard Architecture", q: "Describe the Harvard Architecture block diagram.", a: "The processor block contains:\n• CPU at the top centre\n• Data Memory (bottom-left of CPU block)\n• Instruction Memory (bottom-right of CPU block)\nInput feeds in from the left. The CPU connects to both memory stores independently and simultaneously." },
  { cat: "Harvard Architecture", q: "What is the main limitation of Harvard Architecture?", a: "Expensive cost — it requires additional hardware (two separate buses and two separate memory modules), which significantly increases the manufacturing and design cost." },
  { cat: "Harvard Architecture", q: "What is Modified Harvard Architecture?", a: "Introduced to solve the high cost of pure Harvard Architecture. It uses shared physical memory but SEPARATE CACHES (fast buffers) for instructions and data, giving most of the speed benefit at a lower cost. Modern CPUs use this." },

  // ── CISC / RISC Architecture ──
  { cat: "CISC / RISC Architecture", q: "What does CISC stand for and what are its characteristics?", a: "CISC = Complex Instruction Set Computer.\n• Large, complex instruction set\n• Each instruction can perform multiple operations\n• Uses Microprogrammed Control Unit\n• Slower but very flexible\n• Examples: Intel x86, smartphones, laptops" },
  { cat: "CISC / RISC Architecture", q: "What does RISC stand for and what are its characteristics?", a: "RISC = Reduced Instruction Set Computer.\n• Small, simple instruction set\n• Each instruction executes in a single clock cycle\n• Uses Hardwired Control Unit\n• Very fast for simple operations\n• Examples: ARM processors" },
  { cat: "CISC / RISC Architecture", q: "Which control unit type is used in RISC vs CISC?", a: "RISC → Hardwired Control Unit (fast, simple, fixed logic circuits)\nCISC → Microprogrammed Control Unit (flexible, handles complex instructions, stored in ROM)" },

  // ── Binary Number System ──
  { cat: "Binary Number System", q: "What is the 4-bit binary table from 0 to 15?", a: "0000=0   0001=1   0010=2   0011=3\n0100=4   0101=5   0110=6   0111=7\n1000=8   1001=9   1010=10  1011=11\n1100=12  1101=13  1110=14  1111=15" },
  { cat: "Binary Number System", q: "What are the binary place values to the RIGHT of the decimal point?", a: "Position 1: 1/2  = 0.5\nPosition 2: 1/4  = 0.25\nPosition 3: 1/8  = 0.125\nPosition 4: 1/16 = 0.0625\nPosition 5: 1/32 = 0.03125\nEach position is half the value of the position to its left." },
  { cat: "Binary Number System", q: "What is Binary Scientific Notation? Give an example.", a: "Expressing a binary number as: 1.mantissa × 2^exponent\nMethod: Move the binary point LEFT until only one digit (1) is before it. The number of moves = the exponent.\nExample: 11001001.11011 → 1.1001 × 2^6" },
  { cat: "Binary Number System", q: "Evaluate: 300,000,000 m/s × 0.000002 s using scientific notation.", a: "(3 × 10^8) × (2 × 10^−6)\n= 6 × (10^8 × 10^−6)\n= 6 × 10^(8−6)\n= 6 × 10^2\n= 600 metres" },
  { cat: "Binary Number System", q: "Evaluate the fractional part of 11001001.11011 in decimal.", a: "Fractional bits: 1 1 0 1 1\nPlace values:  1/2 1/4 1/8 1/16 1/32\n= 0.5 + 0.25 + 0 + 0.0625 + 0.03125\n= 0.84375\nInteger part (11001001) + 0.84375 ≈ 100.84375\n→ 1.008 × 10^2 in decimal scientific notation" },

  // ── Fixed Point & Floating Point ──
  { cat: "Fixed & Floating Point", q: "What is fixed point binary notation?", a: "A notation where the binary point is in a FIXED position. Some bits represent the integer part; others represent the fractional part.\nExample: 0101.110\nFractional part: 1/2 + 1/4 + 0 = 0.75\nLimitation: Not all values can be represented — limited by the number of bits." },
  { cat: "Fixed & Floating Point", q: "What is the limitation of fixed point notation?", a: "With a limited number of bits, not all real values can be derived. Increasing to 8 bits (11111111.11111) gives more precision, but there is still a ceiling. This is why floating point was invented." },
  { cat: "Fixed & Floating Point", q: "What is floating point binary notation?", a: "A notation where the binary point can 'float' to different positions, allowing representation of very large or very small numbers.\n• Single precision = 32 bits\n• Double precision = 64 bits" },
  { cat: "Fixed & Floating Point", q: "What are the three fields of a 32-bit single precision floating point number?", a: "Layout: [Sign | Exponent | Mantissa]\n1. Sign bit:     1 bit  (0 = positive, 1 = negative)\n2. Exponent:     8 bits\n3. Mantissa:    23 bits\nTotal = 32 bits" },
  { cat: "Fixed & Floating Point", q: "Interpret: 0 | 00000010 | 11000000000000000000000 (32-bit float)", a: "Sign = 0 (positive)\nExponent = 00000010 → 2 in decimal\nMantissa = 1.1 (implied leading 1)\n= +1.1 × 2^2\n= 1.75 × 4 = +7 (approximately, per notes example)" },
  { cat: "Fixed & Floating Point", q: "Convert the binary number 00100110.110 to floating point notation.", a: "Step 1: Identify number: 00100110.110\nStep 2: Normalise → move point to get 1.xxx\nResult: 1.1010 × 2^24\nExponent = 24 (number of shifts)\nIEEE encoding: Sign=0 | Exponent=00011000 | Mantissa=10100000000000000000000" },
  { cat: "Fixed & Floating Point", q: "Convert floating point 1.1010 × 2^24 back to fixed point decimal.", a: "Mantissa: 1.1010\n1 = 1\n1/2 = 0.5\n0/4 = 0\n1/8 = 0.125\n0/16 = 0\nMantissa value = 1.625\nFixed point value = 1.625 × 2^24" },
  { cat: "Fixed & Floating Point", q: "Express 834.437 in binary scientific notation form.", a: "834.437 ≈ 8.34437 × 10^2 (decimal reference)\nIn binary: convert 834 to binary then normalise.\nThe notes show: exponent = 2, mantissa ≈ 1.110 (from 8 → 1000 → 1.000 × 2^3 form)\nGeneral rule: shift mantissa to 1.xxx form; count shifts as the exponent value." },

  // ── 1's Complement ──
  { cat: "1's & 2's Complement", q: "What is the 1's complement and how do you compute it?", a: "1's complement: flip ALL bits (0→1, 1→0).\nShortcut method: 1's complement = Reference Number − Original\nReference number = all 1s for the bit length\n4-bit reference = 1111 (decimal 15)" },
  { cat: "1's & 2's Complement", q: "How do you determine the reference number for 1's complement?", a: "2-digit  → 11\n3-digit  → 111\n4-digit  → 1111\nn-digit  → all 1s (= 2^n − 1)\nThe reference is always the MAXIMUM value for that bit length." },
  { cat: "1's & 2's Complement", q: "Find the 1's complement of: 10, 11, 101, 110, 111, 1000, 1110", a: "10   (ref=11)   → 01\n11   (ref=11)   → 00\n101  (ref=111)  → 010\n110  (ref=111)  → 001\n111  (ref=111)  → 000\n1000 (ref=1111) → 0111\n1110 (ref=1111) → 0001" },
  { cat: "1's & 2's Complement", q: "What is the 2's complement and how do you calculate it?", a: "2's complement = 1's complement + 1\nSteps:\n1. Get 1's complement (flip all bits)\n2. Add 1 to the result\nThis is how computers represent negative numbers in binary." },
  { cat: "1's & 2's Complement", q: "Find the 2's complement of 1010.", a: "Step 1: 1's complement of 1010 = 0101\nStep 2: 0101 + 1 = 0110\n2's complement of 1010 = 0110" },
  { cat: "1's & 2's Complement", q: "Find the 2's complement of 1011.", a: "Step 1: Flip bits: 1011 → 0100\nStep 2: Add 1:    0100 + 1 = 0101\n2's complement = 0101" },
  { cat: "1's & 2's Complement", q: "Find the 2's complement of 1000.", a: "Step 1: 1's complement: 1000 → 0111\nStep 2: 0111 + 1 = 1000\n2's complement of 1000 = 1000\n(Note: 1000 is its own 2's complement — this represents −8 in 4-bit signed)" },

  // ── Binary Subtraction ──
  { cat: "Binary Subtraction", q: "How does binary subtraction work using 2's complement?", a: "Method:\n1. Find the 2's complement of the subtrahend (number being subtracted)\n2. Add it to the minuend\n3. If a carry occurs beyond the bit-width, DISCARD it\nThe result is the answer." },
  { cat: "Binary Subtraction", q: "Solve: 1110 − 1010 using 2's complement.", a: "Subtrahend: 1010\n1's comp:   0101\n2's comp:   0110\nAdd:\n  1110\n+ 0110\n------\n 10100 → discard carry → 0100 = 4 ✓\n(14 − 10 = 4)" },
  { cat: "Binary Subtraction", q: "Solve: 1010 − 1110 using 2's complement.", a: "Subtrahend: 1110\n1's comp:   0001\n2's comp:   0010\nAdd:\n  1010\n+ 0010\n------\n  1100 → no discard (no carry) → result = 1100\nNegative result — need 2's comp of 1100 to get magnitude = 4, so answer = −4" },
  { cat: "Binary Subtraction", q: "Solve: 1000 − 0010 using 2's complement.", a: "Subtrahend: 0010\n1's comp:   1101\n2's comp:   1110\nAdd:\n  1000\n+ 1110\n------\n 10110 → discard carry → 0110 = 6 ✓\n(8 − 2 = 6)" },
  { cat: "Binary Subtraction", q: "Solve: 1111 − 1011 using 2's complement.", a: "Subtrahend: 1011\n1's comp:   0100\n2's comp:   0101\nAdd:\n  1111\n+ 0101\n------\n 10100 → discard carry → 0100 = 4 ✓\n(15 − 11 = 4)" },
  { cat: "Binary Subtraction", q: "Solve: 0100 − 1001 using 2's complement.", a: "Subtrahend: 1001\n1's comp:   0110\n2's comp:   0111\nAdd:\n  0100\n+ 0111\n------\n  1011 → no carry discard → 1011\nNegative result: 2's comp of 1011 = 0101 = 5, so answer = −5\n(Notes circle 0101 as final answer)" },
  { cat: "Binary Subtraction", q: "What does 'discard carry' mean in 2's complement subtraction?", a: "When adding two n-bit numbers using 2's complement, if the result produces an (n+1)th bit (a carry beyond the bit width), that extra bit is simply ignored (discarded). The remaining n bits are the correct answer." },

  // ── Control Unit ──
  { cat: "Control Unit", q: "What is the Control Unit (CU) and where is it located?", a: "The Control Unit is located INSIDE the CPU. It is the 'operations manager' of the CPU — it manages all system operations. Output of the CU = Control Signals." },
  { cat: "Control Unit", q: "List the 4 main functions of the Control Unit.", a: "1. Directs the flow of data and instructions\n2. Times the speed of operation — each operation takes place within defined clock periods\n3. Controls communication of I/O devices — uses interrupt requests (IRQ), attending to the highest interrupt number first\n4. Allows operations to flow step-by-step in an orderly manner" },
  { cat: "Control Unit", q: "What are the two ways the CPU communicates (as noted)?", a: "1. System memory\n2. I/O devices" },
  { cat: "Control Unit", q: "What are the two types of Control Unit?", a: "1. Hardwired Control Unit (HCU) — also called Hardware Control Unit\n2. Microprogrammed Control Unit (MCU)" },
  { cat: "Control Unit", q: "Describe the Hardwired CU and its 4 characteristics.", a: "Works based on fixed logic circuits.\nCharacteristics:\n1. Fast — high speed\n2. Handles only simple instructions\n3. Used by RISC architecture computers\n4. Applied in RISC\nLimitation: To upgrade, the entire logic circuit must be changed or reprogrammed." },
  { cat: "Control Unit", q: "Describe the Hardwired CU diagram from the notes.", a: "Input: [Instruction Register] feeds into [Fixed Logic Circuit]\nThe Fixed Logic Circuit also receives:\n• [Sequence] input from above\n• [External Input] from the right\n• [Conditional Code] from below\nOutput → Characteristic Control Signal" },
  { cat: "Control Unit", q: "Describe the Microprogrammed CU and its 4 characteristics.", a: "Handles complex operations using pre-installed microinstructions.\nCharacteristics:\n1. Relatively slower compared to hardwired\n2. Ability to manage wide range of instructions\n3. Flexible\n4. Employed in CISC architecture\nInstalled in CPU ROM called Control Memory. Size ≈ 1MB or 2MB." },
  { cat: "Control Unit", q: "Describe the Microprogrammed CU diagram from the notes.", a: "Signal flows through 4 stages:\n[Next Instruction Generator]\n→ [Control Address Register]\n→ [Control Memory]\n→ [Control Data Register]\n→ Control Unit output\nIt is run by a set of microinstructions installed into the CPU's ROM." },
  { cat: "Control Unit", q: "Compare Hardwired CU vs Microprogrammed CU (full comparison).", a: "Hardwired CU:\n• Fast, high speed\n• Simple instructions only\n• RISC architecture\n• Fixed logic — hard to upgrade\n\nMicroprogrammed CU:\n• Relatively slower\n• Wide range of instructions\n• Flexible — easily upgraded\n• CISC architecture (smartphones, laptops)\n• Stored in Control Memory (ROM)" },

  // ── Registers ──
  { cat: "Registers", q: "What is a register? How does it differ from main memory?", a: "Register: Fast block of short-term memory INSIDE the CPU. Stores smaller amounts of data.\nMain Memory: Slow to respond to CPU requests, stores larger amounts of data.\nRegisters are significantly faster than main memory." },
  { cat: "Registers", q: "What is the Program Counter (PC)?", a: "PC = Program Counter (also: Program Controller)\nStores the address of the NEXT instruction to be fetched.\nTells the CPU where the next line of instructions is." },
  { cat: "Registers", q: "What is the Instruction Register (IR)?", a: "IR = Instruction Register\nKeeps the instruction currently being worked on, or about to be worked on." },
  { cat: "Registers", q: "What is the Accumulator (ACC)?", a: "ACC = Accumulator\nUsed for arithmetic and logic calculations.\nHolds values that are reused in a series of arithmetic operations." },
  { cat: "Registers", q: "What is the General Purpose Register (GPR)?", a: "GPR = General Purpose Register\nStreamlines tasks. Used for holding both DATA and INSTRUCTIONS.\n3 types:\n1. Data Register\n2. Pointer Register\n3. Instruction Register" },
  { cat: "Registers", q: "What are the 3 types of General Purpose Register (GPR)?", a: "1. Data Register — holds data values for operations\n2. Pointer Register — holds memory addresses (pointers to locations)\n3. Instruction Register — holds the instruction currently being processed" },
  { cat: "Registers", q: "What is the Memory Address Register (MAR)?", a: "MAR = Memory Address Register\nStores memory addresses — the CPU must know both the SOURCE and DESTINATION of data.\nAddress bus links the CPU to memory so MAR holds the relevant address." },
  { cat: "Registers", q: "List all 5 key registers and their one-line descriptions.", a: "1. PC  — address of the NEXT instruction\n2. IR  — holds CURRENT instruction being worked on\n3. ACC — arithmetic and logic results\n4. GPR — general holding (data/instructions); types: Data, Pointer, Instruction\n5. MAR — source and destination memory address" },

  // ── System Bus ──
  { cat: "System Bus", q: "What is the System Bus?", a: "The System Bus is the architecture of a pathway through which data passes inside a computer.\nAlso described as: interconnects / bus / road network / signal pathway.\nIt links the CPU, memory, and I/O devices." },
  { cat: "System Bus", q: "What are the 3 signals that travel through the System Bus?", a: "1. Data Signal — the actual data being transferred\n2. Control Signal — manages and coordinates the transfer\n3. Address Signal — specifies the source or destination location" },
  { cat: "System Bus", q: "What 3 components does the System Bus link together?", a: "1. Processor (CPU)\n2. Memory\n3. I/O Devices\n(All linked by the bus pathway)" },
  { cat: "System Bus", q: "Describe the System Bus diagram from the notes.", a: "Three horizontal lines run across connecting: CPU ↔ System Memory ↔ I/O Devices\n• Top line = Data Bus (bidirectional between CPU and memory; also to I/O)\n• Middle line = Control Bus\n• Bottom line = Address Bus (unidirectional, CPU only sends)\nCPU has 8 lines (8 bits). Address bus marked 2^8." },
  { cat: "System Bus", q: "What is the Data Bus and how is its size determined?", a: "The Data Bus reads and writes (receives and sends) data.\nSize = number of data lines.\n• 8 data lines → 8-bit data bus\n• 32 data lines → 32-bit data bus (processes 32 bits at once)" },
  { cat: "System Bus", q: "What is the Control Bus?", a: "The Control Bus carries control signals to coordinate all data transfers.\nI/O devices can send signals by direction through the control bus.\n4 signal types: Memory Read, Memory Write, I/O Read, I/O Write." },
  { cat: "System Bus", q: "What is the Address Bus and what are its key properties?", a: "The Address Bus is UNIDIRECTIONAL (one-way — from CPU to memory/I/O only).\nFormula: Address size = 2^n, where n = number of address lines.\n8 lines → 2^8 = 256 memory locations.\n16 lines → 2^16 = 65,536 locations." },
  { cat: "System Bus", q: "What are the 4 types of Control Bus signals and what does each do?", a: "1. Memory Read — CPU collects data OUT of a memory location\n2. Memory Write — CPU inputs data FROM data bus INTO a memory location\n3. I/O Read — I/O device reads data from memory\n4. I/O Write — I/O device stores data into a memory location" },

  // ── Memory & Addressing ──
  { cat: "Memory & Addressing", q: "Formula: how many memory locations can N address lines access?", a: "Memory locations = 2^N\nExamples:\n• 8 lines  → 2^8  = 256 locations\n• 16 lines → 2^16 = 65,536 locations (65K)\n• 32 lines → 2^32 = 4,294,967,296 locations (4G)" },
  { cat: "Memory & Addressing", q: "What is the total memory size formula?", a: "Total Memory Size = Data lines × 2^(Address lines)\nResult in bits; divide by 8 for bytes.\nExample: 32 data lines, 16 address lines:\n= 32 × 65,536 = 2,097,152 bits = 262,144 bytes = 256 KB" },
  { cat: "Memory & Addressing", q: "Calculate: CPU with 32 data lines and 32 address lines — total memory?", a: "Locations: 2^32 = 4,294,967,296\nTotal bits: 32 × 4,294,967,296 = 137,438,953,472 bits\n÷ 8 = 17,179,869,184 bytes\n= 17 GB" },
  { cat: "Memory & Addressing", q: "A 32-bit processor processes how many bytes/characters at a time?", a: "A 32-bit processor processes 4 bytes (4 characters) at once.\n• 1 character = 1 byte\n• 2 bytes = 1 word (minimum)\n• 4 bytes = minimum 2 words" },
  { cat: "Memory & Addressing", q: "Design Q: 32-bit system — how many memory locations can it access? If each holds 1 byte, total bytes?", a: "Data lines = 32 → can process 32 bits at once\nAddress lines = 32 → can access 2^32 = 4,294,967,296 locations\nIf each location = 1 byte: total = 4,294,967,296 bytes = 4 GB" },
  { cat: "Memory & Addressing", q: "Design Q: CPU with 16 address lines connected to ROM — how much memory (1 byte per location)?", a: "2^16 = 65,536 memory locations\n× 1 byte each = 65,536 bytes = 65 KB\n(Address bus lines: A0 to A15)" },
  { cat: "Memory & Addressing", q: "Harvard design: 65KB memory — how many address bus lines and data bus lines?", a: "65 KB = 65,536 bytes = 2^16 locations\n→ Address bus lines = 16 (A0 to A15)\n→ Data bus lines = 8 (D0 to D7) for 1 byte per location\nHarvard uses two separate buses: one for Data Memory, one for Instruction Memory." },

  // ── ALU & Logic Gates ──
  { cat: "ALU & Logic Gates", q: "What is a Half Adder and when is it used?", a: "A Half Adder adds two 1-bit binary numbers.\nOutputs: Sum and Carry\nExample: 1 + 1 = 10 → Sum = 0, Carry = 1\nUsed for the LEAST significant bit position (no carry-in)." },
  { cat: "ALU & Logic Gates", q: "What is a Full Adder and when is it used?", a: "A Full Adder adds two bits PLUS a carry-in bit from a previous stage.\nInputs: A, B, Carry-in\nOutputs: Sum, Carry-out\nUsed for all positions beyond the first bit in multi-bit addition." },
  { cat: "ALU & Logic Gates", q: "Describe the Full Adder circuit diagram from the notes.", a: "Inputs: [0] and [1] (two 1-bit values)\nOutput 1: Sum (top output — XOR-based gate)\nOutput 2: Carry-out (bottom output — AND-based gate)\nBoth gates share the same two inputs simultaneously." },
  { cat: "ALU & Logic Gates", q: "What is the difference between a Half Adder and a Full Adder?", a: "Half Adder: adds 2 single bits only, NO carry-in input. Outputs: Sum, Carry.\nFull Adder: adds 2 bits PLUS a carry-in from a previous stage. Outputs: Sum, Carry-out.\nFull Adders are chained together to build N-bit adder circuits." },

  // ── Seven Segment Display ──
  { cat: "Seven Segment Display", q: "What is a Seven Segment Display?", a: "A display device composed of 7 LED segments (labeled a, b, c, d, e, f, g) arranged to display decimal digits 0–9 by turning segments ON (1) or OFF (0)." },
  { cat: "Seven Segment Display", q: "What is the physical segment layout of a Seven Segment Display?", a: "     a\n   -----\n  |     |\n f|     |b\n  |--g--|\n  |     |\n e|     |c\n   -----\n     d\na=top, b=top-right, c=bottom-right, d=bottom, e=bottom-left, f=top-left, g=middle" },
  { cat: "Seven Segment Display", q: "What are the segment ON/OFF codes for digits 0, 1, and 2?", a: "Segments: a  b  c  d  e  f  g\n0:         1  1  1  1  1  1  0  (all except middle)\n1:         0  1  1  0  0  0  0  (right side only)\n2:         1  1  0  1  1  0  1  (top, top-right, middle, bottom-left, bottom)" },

  // ── Parallel Computing ──
  { cat: "Parallel Computing", q: "What is Parallel Computing?", a: "Parallel Computing works with MULTIPLE processor cores that handle smaller sub-tasks simultaneously (also called secret processing or concurrent processing).\nExample: Auto CAD, scientific simulations, video rendering." },
  { cat: "Parallel Computing", q: "What is the key benefit of parallel computing?", a: "Speed and efficiency — large tasks are divided into smaller subtasks processed simultaneously across multiple cores, dramatically reducing total processing time compared to single-core sequential execution." },

  // ── Excel Binary Practical ──
  { cat: "Excel Binary Practical", q: "How do you find 1's complement in Excel using the reference number method?", a: "Steps:\n1. Reference number = all 1s for that bit length (e.g. 1111 = 15 for 4-bit)\n2. Enter reference in one cell (e.g. J5)\n3. Formula per number: = BIN2DEC($J$5) - BIN2DEC(B2)\n4. Convert result back to binary with DEC2BIN\nThe $ sign locks the reference cell so it doesn't shift when copying down." },
  { cat: "Excel Binary Practical", q: "What does the $ sign do in an Excel formula like $J$5?", a: "Makes the cell reference ABSOLUTE (fixed). When the formula is copied to other rows/columns, it always refers to J5 instead of shifting relatively. Without $, the reference moves as you copy the formula." },
  { cat: "Excel Binary Practical", q: "How do you get 2's complement in Excel after getting 1's complement?", a: "1. Create a new column with '1' in every row (this is the +1 value)\n2. Decimal 2's complement = Decimal 1's complement + 1\n3. Use DEC2BIN to convert the Decimal 2's complement to Binary in a new column" },
  { cat: "Excel Binary Practical", q: "What are the Excel functions for Binary ↔ Decimal conversion?", a: "BIN2DEC(number) — converts Binary to Decimal\nDEC2BIN(number) — converts Decimal to Binary\nExamples:\n=BIN2DEC(1010) → 10\n=DEC2BIN(10)   → 1010" },
  { cat: "Excel Binary Practical", q: "Describe the full Excel table structure for the complement practical.", a: "Column A: Acc (row counter)\nColumn B: Decimal values (8–15)\nColumn C: Binary Ref No (= 1111)\nColumn D: Binary Ref No cell reference\nColumn E: 1's Complement (binary) = $D$ − B\nColumn F: Dec Ref for 2's (= 1)\nColumn G: Decimal 2's Complement = Dec 1's comp + 1\nFinal column: Binary 2's Complement using DEC2BIN" },

  // ── Exam Practice ──
  { cat: "Exam Practice", q: "Compare Von Neumann vs Harvard vs Modified Harvard Architecture.", a: "Von Neumann: Single shared memory for data + instructions → bottleneck.\nHarvard: Separate memories for data and instructions → no bottleneck, but expensive.\nModified Harvard: Shared physical memory + separate caches → fast and affordable. Used in modern CPUs." },
  { cat: "Exam Practice", q: "Compare CISC vs RISC architectures (full table).", a: "CISC:\n• Complex, many instructions\n• Multiple operations per instruction\n• Microprogrammed CU\n• Slower, flexible\n• Intel x86, laptops\n\nRISC:\n• Simple, few instructions\n• One operation per clock cycle\n• Hardwired CU\n• Fast, less flexible\n• ARM, embedded systems" },
  { cat: "Exam Practice", q: "Explain the 3 buses of the System Bus and their properties.", a: "1. Data Bus: carries actual data, BIDIRECTIONAL, width = number of data lines\n2. Address Bus: carries memory addresses, UNIDIRECTIONAL (CPU→memory/IO only), size = 2^n locations\n3. Control Bus: carries control signals (Mem Read/Write, I/O Read/Write), coordinates transfers" },
  { cat: "Exam Practice", q: "Calculate: CPU with 16 address lines and 32 data lines — total memory in bytes?", a: "Address lines = 16 → 2^16 = 65,536 locations\nData lines = 32 → 32 bits per location\nTotal = 32 × 65,536 = 2,097,152 bits\n÷ 8 = 262,144 bytes = 256 KB" },
  { cat: "Exam Practice", q: "Subtract 1011 from 1111 using 2's complement.", a: "Subtrahend: 1011\n1's comp:   0100\n2's comp:   0101\nAdd:\n  1111\n+ 0101\n------\n 10100 → discard carry → 0100 = 4 ✓\n(15 − 11 = 4)" },
  { cat: "Exam Practice", q: "List all 5 CPU registers and what each one stores.", a: "1. PC  (Program Counter)       — address of next instruction\n2. IR  (Instruction Register)  — current instruction being processed\n3. ACC (Accumulator)           — arithmetic/logic results\n4. GPR (General Purpose Reg.)  — data and instructions (3 subtypes)\n5. MAR (Memory Address Reg.)   — source and destination memory addresses" },
  { cat: "Exam Practice", q: "Convert decimal 25 to binary.", a: "Place values: 16  8  4  2  1\n25 = 16 + 8 + 1\n→   1   1  0  0  1\nAnswer: 11001\nVerify: 16 + 8 + 1 = 25 ✓" },
  { cat: "Exam Practice", q: "Why can't all decimal values be represented exactly in fixed point binary?", a: "Fixed point uses a LIMITED number of bits. Each fractional bit represents a power of 1/2. Not all decimal fractions are exact sums of powers of 1/2, so some values can only be approximated. Floating point solves this by allowing the point position to change, giving far greater range and precision." },
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
      const isFormula = /[=×^]/.test(part) && !part.includes(' is ') && !part.includes(' are ') && idx > 0;
      if (isFormula) {
        return React.createElement('span', { key: idx, className: 'formula-block', dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
      }
      return React.createElement('span', { key: idx, style: { display: 'block', marginTop: idx > 0 ? '10px' : '' }, dangerouslySetInnerHTML: { __html: part.replace(/\n/g, '<br>') } });
    });
  }
  return React.createElement('span', { dangerouslySetInnerHTML: { __html: text.replace(/\n/g, '<br>') } });
};

const ComputerArchitectureFlashcards = ({ onBack }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIndices, setKnownIndices] = useState([]);
  const [reviewIndices, setReviewIndices] = useState([]);
  const [, setShuffledDeck] = useState([...ALL_CARDS]);

  const currentDeck = activeCat === "All" ? ALL_CARDS : ALL_CARDS.filter(c => c.cat === activeCat);
  const filterCat = (cat) => { setActiveCat(cat); setCurrentIndex(0); setIsFlipped(false); };
  const shuffleDeck = () => {
    const s = [...currentDeck];
    for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
    setShuffledDeck(s); setCurrentIndex(0); setIsFlipped(false);
  };
  const navigate = useCallback((dir) => { setIsFlipped(false); setCurrentIndex((p) => (p + dir + currentDeck.length) % currentDeck.length); }, [currentDeck.length]);
  const flipCard = useCallback(() => setIsFlipped((p) => !p), []);
  const mark = useCallback((type) => {
    const card = currentDeck[currentIndex];
    const idx = ALL_CARDS.indexOf(card);
    if (type === "know") { setKnownIndices(p => p.includes(idx) ? p.filter(i => i !== idx) : [...p, idx]); setReviewIndices(p => p.filter(i => i !== idx)); }
    else { setReviewIndices(p => p.includes(idx) ? p.filter(i => i !== idx) : [...p, idx]); setKnownIndices(p => p.filter(i => i !== idx)); }
  }, [currentDeck, currentIndex]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
      else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); navigate(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
      else if ((e.key === "k" || e.key === "K") && isFlipped) { e.preventDefault(); mark("know"); }
      else if ((e.key === "r" || e.key === "R") && isFlipped) { e.preventDefault(); mark("review"); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isFlipped, currentIndex, currentDeck, mark, navigate, flipCard]);

  const currentCard = currentDeck[currentIndex];
  const origIdx = currentCard ? ALL_CARDS.indexOf(currentCard) : -1;
  const isKnown = knownIndices.includes(origIdx);
  const isReview = reviewIndices.includes(origIdx);
  const pct = Math.round(((currentIndex + 1) / currentDeck.length) * 100);

  return React.createElement('div', { className: 'flashcard-app' },
    React.createElement('style', null, `
      :root { --bg:#0b0d0f;--bg2:#111417;--bg3:#181c20;--bg4:#1e2328;--border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.12);--text:#e8eaed;--text2:#9aa0a6;--text3:#5f6368;--accent:#34d399;--accent2:#059669;--green:#34a853;--green-bg:rgba(52,168,83,0.12);--amber:#fbbc04;--amber-bg:rgba(251,188,4,0.1);--card-h:320px;--radius:16px;--mono:'JetBrains Mono',monospace; }
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'Syne',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column;align-items:center;overflow-x:hidden}
      body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(52,211,153,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0}
      body::after{content:'';position:fixed;top:-20vh;left:50%;transform:translateX(-50%);width:70vw;height:50vh;background:radial-gradient(ellipse at center,rgba(52,211,153,0.07) 0%,transparent 70%);pointer-events:none;z-index:0}
      .wrap{position:relative;z-index:1;width:100%;max-width:780px;padding:2rem 1.25rem 4rem;margin:0 auto}
      header{text-align:center;margin-bottom:2rem;position:relative}
      .back-button{position:absolute;left:0;top:0;background:rgba(255,255,255,0.05);border:1px solid var(--border2);color:var(--text2);padding:6px 14px;border-radius:40px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s}
      .back-button:hover{background:rgba(52,211,153,0.1);border-color:var(--accent);color:var(--accent)}
      .header-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--accent);border:1px solid rgba(52,211,153,0.25);background:rgba(52,211,153,0.07);border-radius:99px;padding:4px 14px;margin-bottom:1rem}
      h1{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;letter-spacing:-0.5px;line-height:1.1;color:var(--text)}
      h1 span{color:var(--accent)}
      .header-sub{font-family:'Lora',serif;font-style:italic;font-size:14px;color:var(--text3);margin-top:0.5rem}
      .progress-row{display:flex;align-items:center;gap:12px;margin-bottom:1.5rem}
      .progress-track{flex:1;height:3px;background:var(--bg4);border-radius:99px;overflow:hidden}
      .progress-fill{height:100%;background:linear-gradient(90deg,var(--accent2),var(--accent));border-radius:99px;transition:width 0.4s cubic-bezier(.4,0,.2,1);box-shadow:0 0 8px rgba(52,211,153,0.4)}
      .progress-label{font-size:12px;font-weight:600;color:var(--text3);white-space:nowrap}
      .progress-pct{font-family:var(--mono);font-size:11px;color:var(--accent);min-width:34px;text-align:right}
      .tabs-wrap{margin-bottom:1.5rem;display:flex;flex-wrap:wrap;gap:6px}
      .tab{font-size:11px;font-weight:600;letter-spacing:0.5px;padding:5px 13px;border-radius:99px;border:1px solid var(--border2);background:transparent;color:var(--text2);cursor:pointer;transition:all 0.18s}
      .tab:hover{border-color:rgba(52,211,153,0.35);color:var(--accent)}
      .tab.active{background:rgba(52,211,153,0.12);border-color:rgba(52,211,153,0.4);color:var(--accent)}
      .card-area{perspective:1200px;cursor:pointer;margin-bottom:1.25rem}
      .card-inner{position:relative;width:100%;min-height:var(--card-h);transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(.4,0,.2,1)}
      .card-inner.flipped{transform:rotateY(180deg)}
      .card-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--radius);border:1px solid var(--border2);display:flex;flex-direction:column;padding:2rem;min-height:var(--card-h)}
      .card-front{background:var(--bg2);background-image:radial-gradient(ellipse at 80% 10%,rgba(52,211,153,0.05) 0%,transparent 60%)}
      .card-back{transform:rotateY(180deg);background:var(--bg3);background-image:radial-gradient(ellipse at 20% 90%,rgba(52,168,83,0.06) 0%,transparent 60%)}
      .card-eyebrow{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}
      .card-cat{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent);background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.2);border-radius:99px;padding:3px 10px}
      .card-side-label{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text3)}
      .card-body{flex:1;display:flex;align-items:center;justify-content:center}
      .card-q{font-size:clamp(1rem,2.5vw,1.3rem);font-weight:700;line-height:1.4;color:var(--text);text-align:center}
      .card-a{font-size:clamp(0.85rem,2vw,1rem);line-height:1.7;color:var(--text);width:100%}
      .formula-block{display:block;margin-top:10px;font-family:var(--mono);font-size:0.88em;color:var(--accent);background:rgba(52,211,153,0.07);border:1px solid rgba(52,211,153,0.15);border-radius:8px;padding:10px 14px;line-height:1.8}
      .card-hint{font-size:11px;color:var(--text3);text-align:center;margin-top:1.5rem;letter-spacing:0.5px}
      .controls{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:1rem}
      .btn-nav{width:44px;height:44px;border-radius:50%;border:1px solid var(--border2);background:var(--bg2);color:var(--text);font-size:18px;cursor:pointer;transition:all 0.18s;display:flex;align-items:center;justify-content:center}
      .btn-nav:hover{border-color:var(--accent);color:var(--accent);background:rgba(52,211,153,0.08)}
      .counter{font-family:var(--mono);font-size:13px;color:var(--text2);min-width:60px;text-align:center}
      .btn-shuffle{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:99px;border:1px solid var(--border2);background:var(--bg2);color:var(--text2);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.18s}
      .btn-shuffle:hover{border-color:var(--accent);color:var(--accent)}
      .mark-row{display:flex;justify-content:center;gap:10px;margin-bottom:1rem}
      .mark-btn{display:flex;align-items:center;gap:6px;padding:8px 20px;border-radius:99px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.18s;border:1.5px solid transparent}
      .mark-btn.know{background:var(--green-bg);color:var(--green);border-color:rgba(52,168,83,0.3)}
      .mark-btn.know.active{background:var(--green);color:#fff;border-color:var(--green)}
      .mark-btn.review{background:var(--amber-bg);color:var(--amber);border-color:rgba(251,188,4,0.3)}
      .mark-btn.review.active{background:var(--amber);color:#000;border-color:var(--amber)}
      .stats-row{display:flex;justify-content:center;gap:8px;margin-bottom:1.5rem;flex-wrap:wrap}
      .stat-pill{font-size:11px;font-weight:700;padding:4px 12px;border-radius:99px}
      .stat-know{background:var(--green-bg);color:var(--green)}
      .stat-review{background:var(--amber-bg);color:var(--amber)}
      .stat-remaining{background:rgba(255,255,255,0.05);color:var(--text3)}
      .kb-hint{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
      .kb-key{display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text3)}
      .kbd{font-family:var(--mono);font-size:10px;background:var(--bg4);border:1px solid var(--border2);border-radius:4px;padding:2px 6px;color:var(--text2)}
    `),
    React.createElement('div', { className: 'wrap' },
      React.createElement('header', null,
        React.createElement('button', { className: 'back-button', onClick: onBack }, '← Back'),
        React.createElement('div', { className: 'header-badge' }, '🖥️ AIT 311'),
        React.createElement('h1', null, 'Computer ', React.createElement('span', null, 'Architecture')),
        React.createElement('p', { className: 'header-sub' }, `${ALL_CARDS.length} cards · Architectures · Binary · CPU · Buses · Memory`)
      ),
      React.createElement('div', { className: 'progress-row' },
        React.createElement('span', { className: 'progress-label' }, `Card ${currentIndex + 1} of ${currentDeck.length}`),
        React.createElement('div', { className: 'progress-track' }, React.createElement('div', { className: 'progress-fill', style: { width: `${pct}%` } })),
        React.createElement('span', { className: 'progress-pct' }, `${pct}%`)
      ),
      React.createElement('div', { className: 'tabs-wrap' },
        CATEGORIES.map(cat => React.createElement('button', { key: cat, className: `tab ${activeCat === cat ? 'active' : ''}`, onClick: () => filterCat(cat) }, cat))
      ),
      React.createElement('div', { className: 'card-area', onClick: flipCard },
        React.createElement('div', { className: `card-inner ${isFlipped ? 'flipped' : ''}` },
          React.createElement('div', { className: 'card-face card-front' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Question')
            ),
            React.createElement('div', { className: 'card-body' }, React.createElement('div', { className: 'card-q' }, currentCard?.q || '')),
            React.createElement('div', { className: 'card-hint' }, 'Tap to reveal answer')
          ),
          React.createElement('div', { className: 'card-face card-back' },
            React.createElement('div', { className: 'card-eyebrow' },
              React.createElement('span', { className: 'card-cat' }, currentCard?.cat || '—'),
              React.createElement('span', { className: 'card-side-label' }, 'Answer')
            ),
            React.createElement('div', { className: 'card-body' }, React.createElement('div', { className: 'card-a' }, currentCard ? renderAnswer(currentCard.a) : null))
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
          ), 'Shuffle'
        )
      ),
      React.createElement('div', { className: 'mark-row', style: { display: isFlipped ? 'flex' : 'none' } },
        React.createElement('button', { className: `mark-btn know ${isKnown ? 'active' : ''}`, onClick: () => mark('know') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 }, React.createElement('polyline', { points: '20 6 9 17 4 12' })), 'Got it'
        ),
        React.createElement('button', { className: `mark-btn review ${isReview ? 'active' : ''}`, onClick: () => mark('review') },
          React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('polyline', { points: '1 4 1 10 7 10' }), React.createElement('path', { d: 'M3.51 15a9 9 0 1 0 .49-3.37' })
          ), 'Review again'
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

export default ComputerArchitectureFlashcards;
