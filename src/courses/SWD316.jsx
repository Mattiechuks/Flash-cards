import React, { useState, useEffect, useCallback } from 'react';

const ALL_CARDS = [
  // ─────────────────────────────────────────────────────────────────
  //  SOFTWARE BASICS (Definitions from SWD316c.pdf)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Software Basics", q: "What is computer software?", a: "Software can be defined as aggregates of computer programs together with their appropriate documentation and set of data they need for real life computation/processing. It is a general name for all forms of programs." },
  { cat: "Software Basics", q: "What is a program?", a: "A program itself is a sequence of instruction which the computer follows to perform a given task." },
  { cat: "Software Basics", q: "Give three differences between a program and software.", a: "Program: usually small in size, single developer, lacks proper user interface and documentation, ad hoc development. Software: large in size, team of developers, well-designed interface, well documented, systematic development." },
  { cat: "Software Basics", q: "What are the three major types of software?", a: "1. System software, 2. Programming software, 3. Application software." },
  { cat: "Software Basics", q: "What is system software?", a: "System software helps to run the computer hardware and the entire computer system. It includes device drivers, operating systems, servers, BIOS, device firmware, utilities, and windowing systems." },
  { cat: "Software Basics", q: "What is programming software?", a: "Programming software offers tools to assist a programmer in writing programs and software using different programming languages in a more convenient way. The tools include compilers, debuggers, interpreters, linkers, and text editors." },
  { cat: "Software Basics", q: "What is application software?", a: "Application software is a class of software which the user of computer needs to accomplish one or more definite tasks. Examples: industrial automation, business software, computer games, databases, educational software, medical software, spreadsheet, word processing, decision making software." },

  // ─────────────────────────────────────────────────────────────────
  //  ENGINEERING & SOFTWARE ENGINEERING
  // ─────────────────────────────────────────────────────────────────
  { cat: "Software Engineering", q: "What is engineering according to the American Engineers' Council for Professional Development?", a: "Engineering is the creative application of scientific principles to design or develop structures, machines, apparatus, or manufacturing processes, or works utilizing them singly or in combination; or to construct or operate the same with full cognizance of their design; or to forecast their behavior under specific operating conditions; all as respects anointed function, economics of operation and safety to life and property." },
  { cat: "Software Engineering", q: "What is software engineering? (Provide the definition from the lecture notes)", a: "Software engineering can be defined as the act of employing established engineering principles in the development of good, functional, reliable and maintainable computer software. It is the application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software, and the study of these approaches. In other words, it is the application of engineering to software." },
  { cat: "Software Engineering", q: "What is software engineering according to Pressman (2000)?", a: "Software engineering is a discipline that integrates methods, tools, and procedures for the development of computer software." },
  { cat: "Software Engineering", q: "What is software engineering according to IEEE Standard Computer Dictionary?", a: "The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software, and the study of these approaches." },
  { cat: "Software Engineering", q: "What is a well-engineered software according to Sommerville?", a: "A well-engineered computer software should: Be easy to use, Be easy to maintain, Be reliable, Be efficient, Provide an appropriate user interface." },
  { cat: "Software Engineering", q: "List four reasons why we study software engineering.", a: "1. Software development needs structured application of scientific and engineering principles. 2. Large-scale software development requires disciplined application of project management principles. 3. Software's growing importance means its development must be managed carefully. 4. To acquire skills to be a better programmer, develop large programs, solve complex programming problems, and learn techniques of specification, design, testing, and project management." },
  { cat: "Software Engineering", q: "What are the four major goals of software engineering?", a: "1. Maintainability – Changes to software without increasing complexity. 2. Reliability – Software should perform its intended function with required precision at all times. 3. Efficiency – Use available resources in an optimal manner. 4. Understandability – Software should accurately model the real world and be easy to read." },
  { cat: "Software Engineering", q: "What is the principle of abstraction in software engineering?", a: "The purpose of abstraction is to bring out essential properties while omitting inessential detail. The software should be organized as a ladder of abstraction in which each level of abstraction is built from lower levels. The code is sufficiently conceptual so the user need not have a great deal of technical background." },
  { cat: "Software Engineering", q: "What is the principle of information hiding in software engineering?", a: "The code should include no needless detail. Elements that do not affect other segments of the system are inaccessible to the user, so that only the intended operations can be performed. There are no 'undocumented features'." },

  // ─────────────────────────────────────────────────────────────────
  //  SOFTWARE CRISIS
  // ─────────────────────────────────────────────────────────────────
  { cat: "Software Crisis", q: "What is the software crisis? Who coined the term?", a: "The term 'software crisis' was used in the early days of software engineering to describe the impact of rapid increases in computer power and the difficulty of problems which could be tackled. It refers to the difficulty of writing correct, understandable, and verifiable computer programs. F. L. Bauer coined the term at the first NATO Software Engineering Conference in 1968 at Garmisch, Germany." },
  { cat: "Software Crisis", q: "According to Edsger Dijkstra, what is the major cause of the software crisis?", a: "The major cause of the software crisis is that the machines have become more powerful! As long as there were no machines, programming was no problem at all; when there were weak machines, programming became a trivial problem; and now we have gigantic computers, programming has become an equally gigantic problem." },
  { cat: "Software Crisis", q: "List five manifestations of the software crisis.", a: "1. Projects running over-budget. 2. Projects running over-time. 3. Software was very inefficient. 4. Software was of low quality. 5. Software often did not meet requirements. Also: projects unmanageable, code difficult to maintain, software never delivered." },
  { cat: "Software Crisis", q: "What are the two major causes of failure in software development industries?", a: "1. Poor marketing efforts, and 2. Lack of quality products." },

  // ─────────────────────────────────────────────────────────────────
  //  SOFTWARE ENGINEERING HISTORY & FIGURES
  // ─────────────────────────────────────────────────────────────────
  { cat: "History", q: "Where and when did software engineering originate?", a: "In 1968, software engineering originated from the NATO Software Engineering Conference held in Garmisch, Germany." },
  { cat: "History", q: "Name four renowned software engineers mentioned in the lecture.", a: "1. Charles Bachman (born 1924) – known for work in databases. 2. Fred Brooks (born 1931) – managed development of OS/360. 3. Peter Chen – developed entity-relationship modeling. 4. Edsger Dijkstra (1930-2002) – developed framework for proper programming. 5. David Parnas (born 1941) – developed concept of information hiding." },
  { cat: "History", q: "Who wrote the seminal paper 'Go To Statement Considered Harmful' and in which year?", a: "E.W. Dijkstra wrote the paper in 1968." },
  { cat: "History", q: "Who introduced the concept of modularity and information hiding in 1972?", a: "David C. (David Parnas) introduced the key concept of modularity and information hiding in 1972." },
  { cat: "History", q: "Which language introduced the object-oriented programming paradigm in 1967?", a: "The Simula language introduced object-oriented programming in 1967." },
  { cat: "History", q: "Name two women who were into many programming jobs in the early days of computer development.", a: "Grace Hopper and Jamie Fenton." },

  // ─────────────────────────────────────────────────────────────────
  //  SDLC BASICS
  // ─────────────────────────────────────────────────────────────────
  { cat: "SDLC Basics", q: "What is the software development life cycle (SDLC)?", a: "The life cycle of a software represents the series of identifiable stages through which it evolves during its life time – from an initial customer request, to a fully developed software, to the stage where it is discarded." },
  { cat: "SDLC Basics", q: "What is a software development life cycle (SDLC) model?", a: "An SDLC model (also called software life cycle model or software development process model) describes the different activities that need to be carried out for the software to evolve in its life cycle. It graphically depicts the different phases and is accompanied by a textual description of activities." },
  { cat: "SDLC Basics", q: "What are the typical stages of software development (general list)?", a: "Systems analysis, System design, Programming, Testing, Conversion, and Production and Maintenance. These are collectively referred to as the software development lifecycle (SDLC)." },
  { cat: "SDLC Basics", q: "Why is it important to follow a development process when building software by a team?", a: "Adhering to a process encourages systematic and disciplined development. Without it, team members might work independently, causing severe problems in interfacing parts and managing overall development. Ad hoc development is a sure way to have a failed project." },
  { cat: "SDLC Basics", q: "What are phase entry and exit criteria in an SDLC?", a: "Phase entry (or exit) criteria is a set of conditions that need to be satisfied for the phase to start (or complete). For example, the exit criteria for requirements phase: SRS document is ready, reviewed internally, and approved by the customer." },
  { cat: "SDLC Basics", q: "What is the '99 per cent complete syndrome'?", a: "When phase entry/exit criteria are not well-defined, the project manager has no definite way to assess progress. Optimistic team members feel their work is 99% complete even when far from completion, making all projections about completion time highly inaccurate." },
  { cat: "SDLC Basics", q: "What is programming-in-the-small vs programming-in-the-large?", a: "Programming-in-the-small refers to development of a toy program by a single programmer. Programming-in-the-large refers to development of a professional software through team effort." },

  // ─────────────────────────────────────────────────────────────────
  //  WATERFALL MODEL (Classical & Iterative)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Waterfall Model", q: "What is the classical waterfall model?", a: "The classical waterfall model divides the life cycle into phases that flow downwards like a waterfall: feasibility study, requirements analysis and specification, design, coding and unit testing, integration and system testing, and maintenance. No phase starts until the previous phase has been carefully verified. It has no feedback paths." },
  { cat: "Waterfall Model", q: "List all phases of the classical waterfall model in order.", a: "1. Feasibility study, 2. Requirements analysis and specification, 3. Design, 4. Coding and unit testing, 5. Integration and system testing, 6. Maintenance." },
  { cat: "Waterfall Model", q: "What is the purpose of the feasibility study phase?", a: "To determine whether it would be financially and technically feasible to develop the software. It involves developing an overall understanding of the problem, formulating various possible strategies, and evaluating them to select the best solution. If no solution is feasible, the project is abandoned." },
  { cat: "Waterfall Model", q: "What is the purpose of the requirements analysis and specification phase?", a: "To understand the exact requirements of the customer and to document them in a Software Requirements Specification (SRS) document using end-user terminology. The SRS serves as a contract between the development team and the customer." },
  { cat: "Waterfall Model", q: "What is the purpose of the design phase?", a: "To transform the requirements specified in the SRS document into a structure suitable for implementation. It consists of architectural design (breaking product into modules) and detailed design (designing each module, algorithms, data structures)." },
  { cat: "Waterfall Model", q: "What is the purpose of the coding and unit testing phase?", a: "To translate software design into source code and to ensure that individually each function is working correctly. Each component is implemented as a program module and unit tested." },
  { cat: "Waterfall Model", q: "What is the purpose of the integration and system testing phase?", a: "To integrate different modules incrementally and test the fully working system. Integration testing verifies interfaces; system testing ensures the system conforms to the SRS. It includes α-testing (by developers), β-testing (by friendly customers), and acceptance testing (by customer)." },
  { cat: "Waterfall Model", q: "What is the maintenance phase and its three types?", a: "Maintenance occurs after delivery. Types: 1. Corrective maintenance – correct errors not discovered during development. 2. Perfective maintenance – improve performance or enhance functionalities. 3. Adaptive maintenance – port software to a new environment." },
  { cat: "Waterfall Model", q: "What are the shortcomings of the classical waterfall model?", a: "1. No feedback paths – errors cannot be corrected. 2. Difficult to accommodate change requests after requirements phase. 3. Inefficient error corrections – integration/testing delayed. 4. No overlapping of phases – causes idle team members. 5. Assumes requirements can be completely defined upfront – unrealistic." },
  { cat: "Waterfall Model", q: "Is the classical waterfall model useful at all? Explain.", a: "Yes, for documentation. As suggested by Parnas, the final documents for the product should be written as if the product was developed using a pure classical waterfall, because it makes comprehension easier for anyone reading the document." },
  { cat: "Waterfall Model", q: "What is the iterative waterfall model?", a: "The iterative waterfall model incorporates feedback paths from every phase to its preceding phases, allowing correction of errors committed during a phase when detected in a later phase. It is the practical version of the waterfall model used in real projects." },
  { cat: "Waterfall Model", q: "What is the principle of phase containment of errors?", a: "The principle of detecting errors as close to their points of commitment as possible. Early detection reduces effort and time for correction. It is achieved by rigorously reviewing documents produced at the end of each phase." },
  { cat: "Waterfall Model", q: "Why do phases overlap in real waterfall projects?", a: "1. Errors detected later cause rework of earlier phases. 2. Some team members complete their work early and start next phase without waiting for others, to avoid blocking states and wastage of resources." },

  // ─────────────────────────────────────────────────────────────────
  //  V-MODEL
  // ─────────────────────────────────────────────────────────────────
  { cat: "V-Model", q: "What is the V-model in software development?", a: "The V-model is a variant of the waterfall model where verification and validation activities are carried out throughout the development life cycle. It gets its name from its visual appearance. The left half comprises development phases, the right half validation phases." },
  { cat: "V-Model", q: "How does the V-model differ from the iterative waterfall model regarding testing?", a: "In the V-model, during each development phase (requirements, design, coding) test case design and test planning are carried out in parallel. Unit test cases are designed during coding, integration test cases during design, and system test cases during requirements specification. This reduces testing time later." },
  { cat: "V-Model", q: "What are the advantages of the V-model over the waterfall model?", a: "1. Much of testing activities are done in parallel with development, leading to shorter testing phase. 2. Test cases are designed when schedule pressure is low, so quality is better. 3. Test team is occupied throughout the cycle, leading to efficient manpower utilization. 4. Test team builds good understanding of development artifacts." },
  { cat: "V-Model", q: "What is a disadvantage of the V-model?", a: "Being a derivative of the classical waterfall model, it inherits most of the weaknesses of the waterfall model, such as difficulty accommodating change requests and rigidity." },

  // ─────────────────────────────────────────────────────────────────
  //  PROTOTYPING MODEL
  // ─────────────────────────────────────────────────────────────────
  { cat: "Prototyping Model", q: "What is a prototype in software engineering?", a: "A prototype is a toy and crude implementation of a system. It has limited functional capabilities, low reliability, or inefficient performance as compared to the actual software. It can be built quickly using shortcuts (e.g., table look-up instead of actual computations)." },
  { cat: "Prototyping Model", q: "When is the prototyping model advantageous to use? (Three cases)", a: "1. Development of graphical user interface (GUI) part – easier to illustrate input formats, messages, reports to customer. 2. When exact technical solutions are unclear to the development team – prototype helps examine technical issues. 3. When it is impossible to 'get it right' the first time – you must plan to throw away the prototype to develop good software later." },
  { cat: "Prototyping Model", q: "What are the two major activities in the prototyping model?", a: "1. Prototype development – iterative construction and customer evaluation until prototype is approved. 2. Iterative waterfall-based development of the actual software (prototype code is usually thrown away)." },
  { cat: "Prototyping Model", q: "What is a strength of the prototyping model?", a: "It is the most appropriate model for projects that suffer from technical and requirements risks. A constructed prototype helps overcome these risks." },
  { cat: "Prototyping Model", q: "What is a weakness of the prototyping model?", a: "It can increase development cost for routine projects without significant risks. It is effective only for risks that can be identified upfront before development starts. It is ineffective for risks identified later during development." },

  // ─────────────────────────────────────────────────────────────────
  //  INCREMENTAL & EVOLUTIONARY MODELS
  // ─────────────────────────────────────────────────────────────────
  { cat: "Incremental Model", q: "What is the incremental (successive versions) model?", a: "First a simple working system implementing only a few basic features is built and delivered. Over many successive iterations, successive versions are implemented and delivered until the desired system is realised. Each version adds more features." },
  { cat: "Incremental Model", q: "What are two advantages of the incremental model?", a: "1. Error reduction – core modules are used by customer from beginning and get tested thoroughly. 2. Incremental resource deployment – customer does not need to commit large resources at once." },
  { cat: "Evolutionary Model", q: "What is the evolutionary model of software development?", a: "Software is developed over a number of increments. At each increment, a concept (feature) is implemented and deployed. Requirements, plans, estimates, and solution evolve over iterations, rather than being fully defined upfront. Also called 'design a little, build a little, test a little, deploy a little'." },
  { cat: "Evolutionary Model", q: "What are two advantages of the evolutionary model?", a: "1. Effective elicitation of actual customer requirements – user experiments with partially developed software. 2. Easy handling of change requests – no long-term plans, so rework is smaller compared to sequential models." },
  { cat: "Evolutionary Model", q: "What are two disadvantages of the evolutionary model?", a: "1. Feature division into incremental parts can be non-trivial, especially for small projects or intertwined features. 2. Ad hoc design – since only current increment is designed, maintainability and optimality may suffer." },

  // ─────────────────────────────────────────────────────────────────
  //  RAPID APPLICATION DEVELOPMENT (RAD)
  // ─────────────────────────────────────────────────────────────────
  { cat: "RAD Model", q: "What is the Rapid Application Development (RAD) model?", a: "A model proposed in the early nineties to overcome rigidity of waterfall models. It has features of both prototyping and evolutionary models. It deploys an evolutionary delivery model to obtain customer feedback on incrementally delivered versions. Prototypes are not thrown away but enhanced and used in the final software." },
  { cat: "RAD Model", q: "What are the major goals of the RAD model?", a: "1. To decrease time and cost to develop software systems. 2. To limit costs of accommodating change requests. 3. To reduce the communication gap between customer and developers." },
  { cat: "RAD Model", q: "What is a 'time box' in RAD?", a: "The time planned for each iteration (short cycle) is called a time box. The end date for an iteration does not change – it is considered sacrosanct. The development team can decide to reduce delivered functionality if necessary." },
  { cat: "RAD Model", q: "How does RAD facilitate faster development?", a: "1. Minimal use of planning – gives flexibility to incorporate later changes. 2. Heavy reuse of existing code through rapid prototyping. 3. Use of specialised tools supporting visual development and reusable components." },
  { cat: "RAD Model", q: "What types of projects are suitable for RAD?", a: "1. Customised software – substantial reuse from pre-existing software. 2. Projects that can be modularized so that each major function can be completed in less than three months. 3. Well-understood business applications." },
  { cat: "RAD Model", q: "What is the main difference between RAD and the evolutionary model?", a: "In RAD each increment results in a quick-and-dirty prototype that is refined; in the evolutionary model each increment is systematically developed using iterative waterfall. Also, RAD increments are much shorter in duration." },

  // ─────────────────────────────────────────────────────────────────
  //  AGILE MODELS (General)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Agile Models", q: "What is the agile software development model?", a: "A model proposed in the mid-1990s to overcome shortcomings of waterfall models, especially to help a project adapt to change requests quickly. Agility is achieved by fitting the process to the project, removing unnecessary activities, and avoiding anything that wastes time." },
  { cat: "Agile Models", q: "List four popular agile SDLC models.", a: "1. Crystal, 2. Atern (formerly DSDM), 3. Feature-driven development, 4. Scrum, 5. Extreme programming (XP), 6. Lean development, 7. Unified process." },
  { cat: "Agile Models", q: "What are the key principles of the agile manifesto (2001)?", a: "1. Working software over comprehensive documentation. 2. Frequent delivery of incremental versions every few weeks. 3. Requirement change requests are encouraged and efficiently incorporated. 4. Competent team members and face-to-face communication over tools and strict processes. 5. Continuous interaction with customer (customer representative in team)." },
  { cat: "Agile Models", q: "What is pair programming as used in agile development?", a: "Two programmers work together at one workstation. One types code while the other reviews it as it is typed. They switch roles every hour or so. Studies indicate pairs produce compact, well-written programs with fewer errors." },
  { cat: "Agile Models", q: "What are two disadvantages of agile methods?", a: "1. Lack of formal documents leaves scope for confusion and misinterpretation. 2. Without formal documents, it becomes difficult to get important decisions reviewed by external experts, and maintenance can become a problem after the project disperses." },
  { cat: "Agile Models", q: "How does agile model differ from iterative waterfall model in measuring progress?", a: "Waterfall measures progress by number of completed artifacts (SRS, design documents, etc.). Agile measures progress by developed and delivered functionalities (working software)." },

  // ─────────────────────────────────────────────────────────────────
  //  EXTREME PROGRAMMING (XP)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Extreme Programming", q: "What is Extreme Programming (XP)?", a: "An important process model under the agile umbrella proposed by Kent Beck in 1999. It takes best practices that have worked well to extreme levels. The philosophy: 'If something is known to be beneficial, why not put it to constant use?'" },
  { cat: "Extreme Programming", q: "What are the five basic activities prescribed by XP?", a: "1. Coding – crucial part, includes drawing diagrams, scripting, choosing solutions. 2. Testing – primary means for developing fault-free software. 3. Listening – developers must listen to customers to understand domain. 4. Designing – eliminates complex dependencies. 5. Feedback – frequent contact with customer makes development effective." },
  { cat: "Extreme Programming", q: "What is a 'user story' in XP?", a: "A simplistic statement of a customer about a functionality he needs. It does not mention finer details such as preconditions or scenarios. Example: 'A library member can issue a book.'" },
  { cat: "Extreme Programming", q: "What is a 'spike' in XP?", a: "A very simple program constructed to explore the suitability of a solution being proposed. It is similar to a prototype." },
  { cat: "Extreme Programming", q: "What is the principle of 'simplicity' in XP?", a: "Build something simple that will work today, rather than trying to build something that would take time and may never be used. Focus on features immediately needed, rather than speculating about future requirements." },
  { cat: "Extreme Programming", q: "What types of projects is XP suitable for?", a: "Projects involving new technology or research projects (requirements change rapidly, unforeseen technical problems), and small projects (face-to-face meeting easier)." },

  // ─────────────────────────────────────────────────────────────────
  //  SCRUM MODEL
  // ─────────────────────────────────────────────────────────────────
  { cat: "Scrum", q: "What is the Scrum model?", a: "A project is divided into small parts of work that are incrementally developed and delivered over time boxes called sprints. Each sprint typically takes a couple of weeks. At the end of each sprint, stakeholders and team members assess progress and suggest changes." },
  { cat: "Scrum", q: "What are the three fundamental roles in Scrum?", a: "1. Software owner – communicates customer's vision to the development team. 2. Scrum master – acts as liaison between software owner and team, facilitating development work. 3. Team member – performs the development work." },

  // ─────────────────────────────────────────────────────────────────
  //  SPIRAL MODEL
  // ─────────────────────────────────────────────────────────────────
  { cat: "Spiral Model", q: "What is the spiral model of software development?", a: "A risk-driven model where each phase is represented as a loop. The exact number of loops varies by project. Each loop has four quadrants: (1) investigate objectives and risks, (2) evaluate alternatives and build prototype, (3) develop and verify next level of software, (4) review results and plan next iteration." },
  { cat: "Spiral Model", q: "How does the spiral model handle risks?", a: "At the beginning of each phase, risks are identified and resolved through prototyping. A project is terminated if it becomes clear that the product will not be cost-effective. This allows handling of risks that show up much after the project has started." },
  { cat: "Spiral Model", q: "What do the radial and angular dimensions represent in the spiral model diagram?", a: "The radius represents the cost incurred in the project so far. The angular dimension represents the progress made so far in the current phase." },
  { cat: "Spiral Model", q: "Why is the spiral model considered a meta model?", a: "Because it subsumes all other models. A single loop represents the waterfall model; prototypes are built in each phase (like prototyping model); iterations represent evolutionary levels." },
  { cat: "Spiral Model", q: "What are two disadvantages of the spiral model?", a: "1. It is complex and appears complicated to follow. 2. Risk analysis requires highly specific expertise. 3. Not suitable for small projects where risks are modest. 4. Project success highly dependent on risk analysis phase." },

  // ─────────────────────────────────────────────────────────────────
  //  SOFTWARE TESTING (from SWD316a.docx and image questions)
  // ─────────────────────────────────────────────────────────────────
  { cat: "Software Testing", q: "Why do you test software?", a: "To identify defects, ensure that the software meets requirements, verify that it works as expected, and improve quality and reliability before delivery to the customer." },
  { cat: "Software Testing", q: "What is a software test case?", a: "A set of conditions or variables under which a tester will determine whether a software application or system satisfies requirements and functions correctly. It includes inputs, execution conditions, and expected results." },
  { cat: "Software Testing", q: "What is the difference between functional and non-functional testing?", a: "Functional testing verifies that each function of the software operates in conformance with requirements (what the system does). Non-functional testing checks performance, usability, reliability, security, and other quality attributes (how the system works)." },
  { cat: "Software Testing", q: "What is unit testing?", a: "Testing of individual software modules or components in isolation to verify that each unit performs as designed. It is typically done by developers using white-box techniques." },
  { cat: "Software Testing", q: "Name two tools used for unit testing.", a: "1. JUnit (for Java), 2. NUnit (for .NET)." },
  { cat: "Software Testing", q: "What is integration testing?", a: "Testing performed to verify that interfaces among different units (modules) are working satisfactorily. Modules are integrated incrementally and tested." },
  { cat: "Software Testing", q: "Give two reasons why you would carry out integration testing.", a: "1. To detect interface defects between modules. 2. To ensure that combined modules function correctly as a group before system testing." },
  { cat: "Software Testing", q: "List two types of integration testing.", a: "1. Top-down integration testing, 2. Bottom-up integration testing. (Also sandwich/big-bang depending on lecture – answer with two common ones)" },
  { cat: "Software Testing", q: "What is system testing?", a: "Testing performed on a fully integrated system to evaluate compliance with specified requirements. It is carried out after integration testing and includes α-testing, β-testing, and acceptance testing." },
  { cat: "Software Testing", q: "Give two reasons for carrying out system testing.", a: "1. To ensure the complete system meets the requirements in the SRS document. 2. To validate that the software works in its target environment and is acceptable to the customer." },
  { cat: "Software Testing", q: "List four types of system testing.", a: "1. α-testing (by development team). 2. β-testing (by friendly customers). 3. Acceptance testing (by customer). 4. Performance testing, security testing, usability testing, etc." },

  // ─────────────────────────────────────────────────────────────────
  //  WHITE-BOX TESTING
  // ─────────────────────────────────────────────────────────────────
  { cat: "White-Box Testing", q: "What is white-box testing?", a: "A testing technique that examines the internal structure, design, and code of the software. Test cases are derived from the program's logic and implementation. It is also called clear-box, glass-box, or structural testing." },
  { cat: "White-Box Testing", q: "What do you verify in white-box testing?", a: "Internal program logic: paths through the code, condition coverage, loop correctness, branch coverage, statement coverage, data flow, and code structure." },
  { cat: "White-Box Testing", q: "Give two advantages of white-box testing.", a: "1. It forces thorough examination of all code paths, helping to find hidden errors. 2. It allows optimization of code by identifying redundant or dead code." },
  { cat: "White-Box Testing", q: "Give two disadvantages of white-box testing.", a: "1. It can be expensive and time-consuming because every path must be tested. 2. It requires detailed knowledge of the code and may miss missing requirements." },
  { cat: "White-Box Testing", q: "Name two tools used in white-box testing.", a: "1. JUnit (for unit testing with coverage), 2. NUnit, or code coverage tools like JaCoCo, Cobertura." },

  // ─────────────────────────────────────────────────────────────────
  //  BLACK-BOX TESTING
  // ─────────────────────────────────────────────────────────────────
  { cat: "Black-Box Testing", q: "What is black-box testing?", a: "A testing technique that examines the functionality of the software without looking at its internal structure or code. Test cases are derived from requirements and specifications. It is also called functional testing or behavioral testing." },
  { cat: "Black-Box Testing", q: "Name two tools used in black-box testing.", a: "1. Selenium (for web application testing), 2. QTP (QuickTest Professional) / UFT." },
  { cat: "Black-Box Testing", q: "What is the main difference between white-box and black-box testing?", a: "White-box testing uses internal code structure to design tests (structural). Black-box testing uses external specifications and requirements to design tests (functional) without knowledge of internal implementation." },

  // ─────────────────────────────────────────────────────────────────
  //  FUNCTIONAL vs NON-FUNCTIONAL REQUIREMENTS
  // ─────────────────────────────────────────────────────────────────
  { cat: "Requirements", q: "What are functional requirements of a software?", a: "Functional requirements describe what the system should do – the specific behaviors, functions, and features that the system must perform. They are derived from user needs and use cases. Example: 'The system shall allow a user to log in with a password.'" },
  { cat: "Requirements", q: "What are non-functional requirements of a software?", a: "Non-functional requirements describe how the system performs its functions – quality attributes such as performance, security, usability, reliability, maintainability, scalability, and compliance. Example: 'The system shall respond to login requests within 2 seconds.'" },
  { cat: "Requirements", q: "Give two examples of functional requirements for a banking system.", a: "1. 'The system shall allow customers to transfer money between accounts.' 2. 'The system shall generate a monthly statement for each account.'" },
  { cat: "Requirements", q: "Give two examples of non-functional requirements for a banking system.", a: "1. 'The system shall be available 99.99% of the time (reliability).' 2. 'All financial transactions shall be encrypted using AES-256 (security).'" },

  // ─────────────────────────────────────────────────────────────────
  //  BUILD-AND-FIX MODEL
  // ─────────────────────────────────────────────────────────────────
  { cat: "Build-and-Fix", q: "What is the build-and-fix model?", a: "A software development model where the entire software product is built and delivered to the client. The client points out what has to be changed, and changes are made until the client is satisfied. The product then goes into operation mode. Specification, planning, and design phases are omitted." },
  { cat: "Build-and-Fix", q: "What are two advantages of the build-and-fix model?", a: "1. It provides immediate feedback to developers and shows immediate signs of progress. 2. It removes planning/design/documentation overhead." },
  { cat: "Build-and-Fix", q: "What are two disadvantages of the build-and-fix model?", a: "1. Increased time is spent debugging and the code structure becomes messy. 2. Does not promote documentation, so software is costlier to maintain." },
  { cat: "Build-and-Fix", q: "When should the build-and-fix model be used?", a: "When the product is small and there is no possibility of ever having to maintain it in the future (e.g., a 25-50 line homework program)." },

  // ─────────────────────────────────────────────────────────────────
  //  ADDITIONAL EXAM-STYLE QUESTIONS
  // ─────────────────────────────────────────────────────────────────
  { cat: "Exam Practice", q: "What is the difference between verification and validation?", a: "Verification checks whether the software conforms to its specification (are we building the product right?). Validation checks whether the software meets customer needs (are we building the right product?)." },
  { cat: "Exam Practice", q: "What is the difference between a software development process and a methodology?", a: "A process has broader scope, addressing all activities from inception to maintenance, and may prescribe methodologies. A methodology prescribes steps for a single activity (e.g., design methodology). A process describes 'what' and 'when', a methodology describes 'how'." },
  { cat: "Exam Practice", q: "What are the three main types of maintenance?", a: "1. Corrective – fixing errors not discovered during development. 2. Perfective – improving performance or adding enhancements. 3. Adaptive – porting to new environment." },
  { cat: "Exam Practice", q: "What is α-testing and β-testing?", a: "α-testing is system testing performed by the development team at the developer's site. β-testing is system testing performed by a friendly set of customers at the customer's site." },
  { cat: "Exam Practice", q: "What is acceptance testing?", a: "After the software has been delivered, the customer performs system testing to determine whether to accept the delivered software or reject it." },
  { cat: "Exam Practice", q: "Why is documentation important in software engineering?", a: "Documentation ensures that every activity is accurately defined, prevents misinterpretation, allows tailoring of processes, is required for quality standards (ISO 9000, CMM), and helps maintainability." },
  { cat: "Exam Practice", q: "What is the difference between the classical waterfall and iterative waterfall models?", a: "Classical waterfall has no feedback paths; errors cannot be corrected once a phase is complete. Iterative waterfall incorporates feedback paths from every phase to its preceding phases, allowing error correction." },
  { cat: "Exam Practice", q: "List all phases of the waterfall model as described in the lecture (detailed phases).", a: "1. Requirements stage/phase, 2. Specification stage/phase, 3. Planning stage/phase, 4. Design stage/phase, 5. Implementation stage/phase, 6. Integration stage/phase, 7. Operations and maintenance stage/phase." },
  { cat: "Exam Practice", q: "What is contained in the Software Project Management Plan (SPMP)?", a: "The SPMP contains a description of what is to be done, how long it will take, how much it will cost, the human and computer resources needed, and a detailed timetable showing who will do what and when." },
  { cat: "Exam Practice", q: "What is the difference between architectural design and detailed design?", a: "Architectural design breaks the product into modules. Detailed design designs each module: determines function, algorithms, and data structures." },
  { cat: "Exam Practice", q: "What is a throwaway prototype?", a: "A prototype built to clarify requirements or resolve technical issues, but the code is discarded. The experience gained is used to develop the actual system using a disciplined process." },
  { cat: "Exam Practice", q: "What is the main difference between RAD and XP?", a: "RAD emphasizes quick-and-dirty prototypes and heavy code reuse. XP emphasizes systematic incremental development, pair programming, user stories, and test-driven development. Both are agile but XP is more disciplined regarding coding practices." },
  { cat: "Exam Practice", q: "What is the difference between the incremental model and the evolutionary model?", a: "In incremental model, requirements are fully specified upfront and then delivered in increments. In evolutionary model, requirements and solution evolve over iterations; no complete upfront specification." },
  { cat: "Exam Practice", q: "What is the purpose of a software life cycle model as a framework for empirical studies?", a: "It serves as a basis for conducting empirical studies to determine what affects software productivity, cost, and overall quality." },
  { cat: "Exam Practice", q: "What is the main difference between prescriptive and descriptive SDLC models?", a: "Prescriptive models prescribe how a new software system should be developed (guidelines). Descriptive models describe the history of how a particular software system was developed (observation-based)." },
  { cat: "Exam Practice", q: "Why is the prototyping model especially useful for GUI development?", a: "Because users find it easier to form opinions by experimenting with a working user interface than by trying to imagine a hypothetical interface from documents." },
  { cat: "Exam Practice", q: "What is a 'spike' in XP used for?", a: "A spike is used to explore the suitability of a proposed solution, similar to a prototype, to reduce technical risk before committing to full implementation." },
  { cat: "Exam Practice", q: "What is the difference between forward and backward chaining in expert systems? (included for completeness, though from AI)", a: "Forward chaining answers 'What can happen next?' – data-driven. Backward chaining answers 'Why did this happen?' – goal-driven." },
];

const CATEGORIES = ["All", ...new Set(ALL_CARDS.map(c => c.cat))];

const renderAnswer = (text) => {
  // Same rendering logic as original – handles numbered lists and line breaks
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

const IntroductionToSoftwareDevelopmentFlashcards = ({ onBack }) => {
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
        --accent: #34a853;
        --accent2: #2b8c48;
        --green: #34a853;
        --green-bg: rgba(52,168,83,0.12);
        --amber: #fbbc04;
        --amber-bg: rgba(251,188,4,0.1);
        --red: #ea4335;
        --red-bg: rgba(234,67,53,0.1);
        --card-h: 340px;
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
        background-image: linear-gradient(rgba(52,168,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,168,83,0.03) 1px, transparent 1px);
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
        background: radial-gradient(ellipse at center, rgba(52,168,83,0.07) 0%, transparent 70%);
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
        background: rgba(52,168,83,0.1);
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
        border: 1px solid rgba(52,168,83,0.25);
        background: rgba(52,168,83,0.07);
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
        box-shadow: 0 0 8px rgba(52,168,83,0.4);
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
      .tab:hover { border-color: rgba(52,168,83,0.35); color: var(--accent); }
      .tab.active {
        background: rgba(52,168,83,0.12);
        border-color: rgba(52,168,83,0.4);
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
        background-image: radial-gradient(ellipse at 80% 10%, rgba(52,168,83,0.05) 0%, transparent 60%);
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
        background: rgba(52,168,83,0.1);
        border: 1px solid rgba(52,168,83,0.2);
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
        overflow-y: auto;
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
        background: rgba(52,168,83,0.07);
        border: 1px solid rgba(52,168,83,0.15);
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
      .btn-nav:hover { border-color: var(--accent); color: var(--accent); background: rgba(52,168,83,0.08); }
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
        React.createElement('div', { className: 'header-badge' }, '💻 SWD316'),
        React.createElement('h1', null,
          'Introduction to ',
          React.createElement('span', null, 'Software Development')
        ),
        React.createElement('p', { className: 'header-sub' }, `${ALL_CARDS.length} cards · SDLC · Testing · Requirements · Models`)
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

export default IntroductionToSoftwareDevelopmentFlashcards;