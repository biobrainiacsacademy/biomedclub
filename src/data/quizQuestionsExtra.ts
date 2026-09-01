import type { QuizQuestion } from "./quizQuestions";

type RawQ = {
  q: string;
  o: [string, string, string, string];
  c: number;
  h: string;
  e: string;
};

const TOPICS = {
  bacteria: {
    name: "Culturing Bacteria 101: Concepts Behind the Experiment",
    url: "https://www.youtube.com/watch?v=dNn6nS_onQU",
  },
  blood: {
    name: "Blood Types Decoded: The Science Behind Who Can Donate to Who",
    url: "https://www.youtube.com/watch?v=xo-3YKmxN2k",
  },
  aidrug: {
    name: "AI Driven Drug Discovery: How Machine Learning Accelerates Medicine",
    url: "https://www.youtube.com/watch?v=5N_uMvDQeQ0",
  },
  bioelectronics: {
    name: "The Science of Bioelectronics: Merging Biology with Circuits",
    url: "https://www.youtube.com/watch?v=mqqQOLYL2Rs",
  },
  imaging: {
    name: "Medical Imaging: Seeing the Invisible",
    url: "https://www.youtube.com/watch?v=hfHmPMDHU7g",
  },
  nanomedicine: {
    name: "Nanomedicine: Tiny Tech, Big Impact",
    url: "https://www.youtube.com/watch?v=Od1uMpTjkJw",
  },
  bioelectricity: {
    name: "Bioelectricity: The Body's Invisible Wiring",
    url: "https://www.youtube.com/watch?v=L4pAz5_jjDI",
  },
  sleep: {
    name: "The Science of Sleep: What Happens When We Snooze?",
    url: "https://www.youtube.com/watch?v=ukBtNHy0uwI",
  },
  aging: {
    name: "The Biology of Aging: Can We Slow Down Time?",
    url: "https://www.youtube.com/watch?v=fwC6pl3PIp4",
  },
  biometrics: {
    name: "Biometrics and Beyond: Identifying People Without DNA",
    url: "https://www.youtube.com/watch?v=O8kwVwpZB8Q",
  },
  dnaforensics: {
    name: "DNA Detectives: How Genetic Clues Crack Criminal Cases",
    url: "https://www.youtube.com/watch?v=QJrhw2uFLRg",
  },
  forensics: {
    name: "Forensic Science: Solving Mysteries with Biology",
    url: "https://www.youtube.com/watch?v=Tz2mN9d3kxc",
  },
  stemcells: {
    name: "Stem Cells: Medicine's Regeneration Revolution",
    url: "https://www.youtube.com/watch?v=nbAxK2BDeh0",
  },
  superbugs: {
    name: "Superbugs and Antibiotic Resistance",
    url: "https://www.youtube.com/watch?v=Dsx1j8ZPd-Y",
  },
  neurotech: {
    name: "Brain Hacks: The Science of Neurotechnology",
    url: "https://www.youtube.com/watch?v=-uG2M3i8Zpo",
  },
  spacemed: {
    name: "Space Medicine: Keeping Humans Alive Beyond Earth",
    url: "https://www.youtube.com/watch?v=grNMQxXClQA",
  },
} as const;

type TopicKey = keyof typeof TOPICS;

const bank: Record<TopicKey, RawQ[]> = {
  bacteria: [
    {
      q: "What is agar used for in a bacteria culture?",
      o: ["A pH indicator solution", "A nutrient gel for bacteria", "A growth inhibitor for cells", "A medium for protein separation"],
      c: 1,
      h: "Consider what bacteria require to grow and thrive in a laboratory setting.",
      e: "The correct answer is A nutrient gel for bacteria. Agar is used to solidify a growth medium that contains essential nutrients, providing a stable surface and food source for bacteria to grow and form colonies in a petri dish. A pH indicator solution is incorrect, as while some media contain pH indicators, agar itself is not primarily an indicator. A growth inhibitor for cells is incorrect, as agar supports, rather than inhibits, bacterial growth. A medium for protein separation is incorrect, as protein separation techniques typically use gels like polyacrylamide, not agar.",
    },
    {
      q: "What is a bacterial colony?",
      o: ["A single large bacterium", "A collection of bacteria strains", "Many cells from one original", "A group of fungi cells"],
      c: 2,
      h: "Think about how a single bacterial cell can multiply and form a visible mass.",
      e: "The correct answer is Many cells from one original. A bacterial colony is a visible mass of bacteria growing on a solid medium, all originating from a single bacterial cell or a single group of identical cells that have undergone numerous divisions. A single large bacterium is incorrect because even the largest individual bacteria are microscopic and do not form visible colonies. A collection of bacteria strains is incorrect, as a colony typically consists of one pure strain, all descendants of a single cell. A group of fungi cells is incorrect, as bacteria and fungi are distinct types of microorganisms, and a bacterial colony refers specifically to bacteria.",
    },
    {
      q: "Why are plates incubated around 37 degrees Celsius?",
      o: ["It makes the agar melt", "It kills some microbes quickly", "It quickly sterilizes the plates", "It matches our body temperature"],
      c: 3,
      h: "Consider the environment most conducive for the organisms being studied.",
      e: "The correct answer is 'It matches our body temperature'. Most bacteria and human cells thrive at this temperature, making it ideal for their growth and study. 'It makes the agar melt' is incorrect, as agar melts at a much higher temperature. 'It kills some microbes quickly' is incorrect, as 37 degrees Celsius is an optimal temperature for many microbes, not a lethal one. 'It quickly sterilizes the plates' is also incorrect, as sterilization requires much higher temperatures or specific chemical treatments.",
    },
    {
      q: "Why should you work near a flame or in a clean hood?",
      o: ["To warm up the bacteria", "To help colonies grow larger", "To quickly sterilize the agar", "To avoid air contamination"],
      c: 3,
      h: "Think about the purpose of these controlled environments in microbiology.",
      e: "The correct answer is 'To avoid air contamination'. Working near a flame creates an updraft, and a clean hood provides a sterile airflow, both minimizing airborne microbes from contaminating your samples. 'To warm up the bacteria' is incorrect, as warming bacteria is typically done in an incubator. 'To help colonies grow larger' is incorrect, as growth occurs during incubation, not while preparing the plates. 'To quickly sterilize the agar' is incorrect, as sterilization of agar is usually done by autoclaving before pouring.",
    },
  ],
  blood: [
    {
      q: "What determines your ABO blood type?",
      o: ["Antigens on red cells", "Plasma color determines it", "White blood cell numbers", "Red blood cell size"],
      c: 0,
      h: "Focus on the components of red blood cells that act as identifiers.",
      e: "The correct answer is 'Antigens on red cells'. Your ABO blood type is determined by the presence or absence of specific carbohydrate antigens (A and B) on the surface of your red blood cells. 'Plasma color determines it' is incorrect, as plasma color is not related to blood type. 'White blood cell numbers' is incorrect, as white blood cells are part of the immune system and do not determine ABO blood type. 'Red blood cell size' is incorrect, as red blood cell size is not a factor in ABO blood typing.",
    },
    {
      q: "Which blood type is the universal red cell donor?",
      o: ["AB positive blood", "A positive blood", "O negative blood", "B negative blood"],
      c: 2,
      h: "Consider the blood type that lacks both A and B antigens, and also the Rh factor.",
      e: "The correct answer is 'O negative blood'. O negative blood is considered the universal red cell donor because it lacks A, B, and Rh D antigens, making it compatible with all other blood types without causing an immune reaction. 'AB positive blood' is incorrect, as it has A, B, and Rh D antigens, making it a universal recipient but not a universal donor. 'A positive blood' is incorrect, as it has A and Rh D antigens. 'B negative blood' is incorrect, as it has B antigens.",
    },
    {
      q: "What does the positive or negative in a blood type refer to?",
      o: ["Blood pH is different", "Rh D antigen presence", "Blood clotting factor", "Iron levels in the blood"],
      c: 1,
      h: "This designation relates to another important factor on red blood cells besides A and B antigens.",
      e: "The correct answer is 'Rh D antigen presence'. The positive or negative in a blood type refers to the presence (positive) or absence (negative) of the Rh D antigen on the surface of red blood cells. 'Blood pH is different' is incorrect, as blood pH is tightly regulated and not indicated by the positive or negative sign in blood typing. 'Blood clotting factor' is incorrect, as clotting factors are in plasma and not related to the Rh designation. 'Iron levels in the blood' is incorrect, as iron levels are not indicated by the positive or negative blood type designation.",
    },
    {
      q: "Why can a mismatched transfusion be dangerous?",
      o: ["Donor blood has no oxygen", "Antibodies attack donor cells", "Recipient runs out of plasma", "Blood becomes too cold"],
      c: 1,
      h: "Think about how the body's immune system reacts to foreign substances.",
      e: "The correct answer is 'Antibodies attack donor cells'. If a recipient receives incompatible blood, their immune system produces antibodies that recognize and attack the donor red blood cells, leading to a dangerous transfusion reaction. 'Donor blood has no oxygen' is incorrect, as donor blood is specifically collected and stored to preserve its oxygen carrying capacity. 'Recipient runs out of plasma' is incorrect, as the primary concern in a mismatched transfusion is the immune reaction to red cells, not plasma depletion. 'Blood becomes too cold' is incorrect, as while cold blood can be an issue, it's not the primary danger of a mismatched transfusion, which is an immune response.",
    },
  ],
  aidrug: [
    {
      q: "Why is traditional drug discovery so slow?",
      o: ["Lab work needs extensive time", "Human trials are legally complex", "Chemical creation is rather slow", "Testing compounds takes many years"],
      c: 3,
      h: "Consider the most time consuming aspect of evaluating potential drug candidates.",
      e: "The correct option is Testing compounds takes many years because the thorough evaluation of drug candidates, including multiple phases of clinical trials to ensure safety and efficacy, is a very lengthy process. Lab work needs extensive time is incorrect because while lab work is time consuming, it is not the primary reason for the overall slowness. Human trials are legally complex is incorrect because while true, legal complexity is a part of the process, but not the fundamental rate limiting step compared to the actual time taken for testing. Chemical creation is rather slow is incorrect because while drug synthesis can be complex, it typically doesn't account for the majority of the overall discovery timeline.",
    },
    {
      q: "How does machine learning speed up early drug discovery?",
      o: ["Designs new drug molecules directly", "Predicts molecule binding early on", "Automates many lab procedures", "Interprets complex trial data"],
      c: 1,
      h: "Think about the earliest stages of drug discovery where machine learning can make a significant impact on efficiency.",
      e: "The correct option is Predicts molecule binding early on. Machine learning can rapidly analyze vast datasets to predict how potential drug molecules will interact with target proteins, significantly accelerating the initial screening process. Designs new drug molecules directly is incorrect because while AI can assist in design, its primary early speed up comes from prediction, not direct creation. Automates many lab procedures is incorrect because while automation exists, machine learning's unique contribution is predictive power, not just robotic action. Interprets complex trial data is incorrect because this occurs later in the drug discovery pipeline, not in the early stages.",
    },
    {
      q: "What did AlphaFold change for biology?",
      o: ["Mapped human brain completely", "Discovered new disease pathways", "Predicts protein 3D structures well", "Deciphered the genetic code"],
      c: 2,
      h: "Recall AlphaFold's main achievement in understanding the fundamental building blocks of life.",
      e: "The correct option is Predicts protein 3D structures well. AlphaFold is renowned for its breakthrough in accurately predicting the three dimensional structures of proteins from their amino acid sequences, which is crucial for understanding their function. Mapped human brain completely is incorrect, as this is a different field of neuroscience. Discovered new disease pathways is incorrect, as AlphaFold's focus is on protein structure, which can inform disease research but isn't a direct discovery of pathways. Deciphered the genetic code is incorrect, as the genetic code was deciphered much earlier in biology's history.",
    },
    {
      q: "What is a major limitation of AI in medicine?",
      o: ["AI lacks human intuition", "Computers struggle with biology", "Predictions are often too general", "Models are limited by their data"],
      c: 3,
      h: "Consider where AI systems get their information and how that impacts their generalizability.",
      e: "The correct option is Models are limited by their data. AI models can only learn from the data they are trained on, and if this data is biased, incomplete, or not representative of the real world, the AI's predictions and performance will suffer. AI lacks human intuition is incorrect because while AI doesn't have human intuition, this isn't considered a major limitation in terms of its practical application in medicine where data driven decisions are key. Computers struggle with biology is incorrect, as computers excel at processing complex biological data. Predictions are often too general is incorrect, as AI can make highly specific predictions, but their accuracy is tied to the quality and specificity of the training data.",
    },
  ],
  bioelectronics: [
    {
      q: "What is bioelectronics?",
      o: ["Electronics power biological systems", "Circuits connect with living tissue", "Studying cell electrical activity", "Designing synthetic organic devices"],
      c: 1,
      h: "Think about the intersection of two distinct fields mentioned in the term 'bioelectronics'.",
      e: "The correct option is Circuits connect with living tissue. Bioelectronics is the field that combines biology and electronics, focusing on devices and systems where electronic components interface directly with biological systems or living tissues. Electronics power biological systems is incorrect, as bioelectronics is more about interaction than just power. Studying cell electrical activity is incorrect because while relevant, it describes a subfield of electrophysiology, not the broader concept of bioelectronics itself. Designing synthetic organic devices is incorrect, as this falls more under organic electronics or materials science, not necessarily bioelectronics, unless these devices interact with biological systems.",
    },
    {
      q: "Which is a widely used bioelectronic implant?",
      o: ["Implanted defibrillator, quite new", "Electronic hearing aid, external", "Artificial retina for vision", "Cardiac pacemaker, common device"],
      c: 3,
      h: "Think about common medical devices that directly regulate a vital bodily function using electronic components.",
      e: "The correct option is Cardiac pacemaker, common device. Cardiac pacemakers are widely used bioelectronic implants that regulate the heart's rhythm. Implanted defibrillator, quite new is incorrect because while an implanted defibrillator is a bioelectronic implant, the statement claims it is 'quite new' when pacemakers have a longer and more widespread history. Electronic hearing aid, external is incorrect because hearing aids are typically external devices, not implants. Artificial retina for vision is incorrect because while an artificial retina is a bioelectronic implant, it is not as widely used or as common as a cardiac pacemaker.",
    },
    {
      q: "Why must bioelectronic materials be biocompatible?",
      o: ["Body accepts material, no harm", "Body ignores material completely", "Material heats the body more", "Product breaks down slowly in body"],
      c: 0,
      h: "Think about what it means for two different things to exist together harmoniously, especially when one is inside a living system.",
      e: "Biocompatibility is crucial because the body must accept the material without causing harm, ensuring the material can function as intended without triggering adverse reactions or rejection. The body does not ignore material completely, as it will react to foreign substances. Material heats the body more is incorrect, as this would be harmful and is not a goal of biocompatibility. Product breaks down slowly in body is not the primary definition of biocompatibility, although degradation characteristics can be part of material design.",
    },
    {
      q: "What does a neural interface do?",
      o: ["Replaces entire bone structure", "Changes thoughts into proteins", "Connects with nerve signals", "Provides energy for brain cells"],
      c: 2,
      h: "Consider the primary function of the nervous system and how a device might interact with it.",
      e: "A neural interface connects with nerve signals, allowing for direct communication between the nervous system and an external device. This technology aims to restore or enhance neurological function. Replaces entire bone structure is incorrect, as this is related to orthopedic implants, not neural interfaces. Changes thoughts into proteins is not what a neural interface does, as proteins are complex molecules, not directly formed from thoughts via an interface. Provides energy for brain cells is incorrect, as neural interfaces focus on signal transmission, not direct energy provision.",
    },
  ],
  imaging: [
    {
      q: "What do X rays image best?",
      o: ["Shows individual cell structures", "Images dense body parts well", "Reveals precise blood makeup", "Diagrams genetic material in cells"],
      c: 1,
      h: "Consider what types of structures are often highlighted when someone gets an X ray, perhaps after an injury.",
      e: "X rays image dense body parts well, such as bones and teeth, because denser tissues absorb more X ray radiation, creating a clearer contrast on the image. Shows individual cell structures is incorrect, as X rays do not have the resolution for individual cells. Reveals precise blood makeup is incorrect, as X rays do not analyze blood composition. Diagrams genetic material in cells is incorrect, as genetic material is microscopic and not visible with standard X rays.",
    },
    {
      q: "What does MRI primarily use to build an image?",
      o: ["High energy radiation exposure", "Rapid sound pulse emissions", "Radioactive sugar injection method", "Magnets, radio waves, water"],
      c: 3,
      h: "Think about the main components often associated with an MRI machine, especially its powerful core.",
      e: "MRI primarily uses magnets, radio waves, and water to build an image. The strong magnetic field aligns water molecules in the body, and radio waves are then used to detect energy released as these molecules realign, providing detailed images of soft tissues. High energy radiation exposure is incorrect, as MRI does not use ionizing radiation. Rapid sound pulse emissions is incorrect, as this describes ultrasound technology. Radioactive sugar injection method is incorrect, as this is a characteristic of PET scans.",
    },
    {
      q: "Which imaging method is safest for viewing a fetus?",
      o: ["CT scan method is safest", "PET scan method is safest", "Ultrasound method is safest", "X ray method is safest"],
      c: 2,
      h: "When considering the safety of a developing baby, which imaging technique avoids radiation entirely?",
      e: "The ultrasound method is safest for viewing a fetus because it uses sound waves instead of radiation, making it non invasive and harmless to the developing baby. CT scan method is safest is incorrect, as CT scans use X rays, which are a form of ionizing radiation and generally avoided during pregnancy. PET scan method is safest is incorrect, as PET scans involve injecting a radioactive tracer, which is not safe for a fetus. X ray method is safest is incorrect, as X rays use ionizing radiation, which can be harmful to a fetus.",
    },
    {
      q: "What makes a PET scan different from a CT scan?",
      o: ["PET uses magnets, CT uses sound", "PET shows function, CT shows form", "PET scans only bone tissue", "CT cannot show soft tissues"],
      c: 1,
      h: "Consider what each scan typically reveals about the body, whether it's structure or activity.",
      e: "PET shows function, CT shows form. A PET scan uses a radioactive tracer to visualize metabolic activity and blood flow, revealing how organs and tissues are functioning, while a CT scan uses X rays to create detailed cross sectional images of body structures. PET uses magnets, CT uses sound is incorrect, as PET uses tracers and CT uses X rays. PET scans only bone tissue is incorrect, as PET scans are excellent for soft tissues and metabolic activity, not just bone. CT cannot show soft tissues is incorrect, as CT scans can show soft tissues, though MRI often provides better soft tissue contrast.",
    },
  ],
  nanomedicine: [
    {
      q: "How small is a nanometer?",
      o: ["one billionth of a meter", "one thousandth of a meter", "one millionth of a meter", "one hundredth of a meter"],
      c: 0,
      h: "Consider the prefix 'nano' and what it typically represents in scientific measurements of size.",
      e: "The correct answer is 'one billionth of a meter'. A nanometer is indeed one billionth of a meter, a unit of length in the metric system. 'one thousandth of a meter' describes a millimeter. 'one millionth of a meter' describes a micrometer. 'one hundredth of a meter' describes a centimeter.",
    },
    {
      q: "What is a key advantage of nanoparticle drug delivery?",
      o: ["simplifies drug production", "reduces number of doses", "targets specific cells", "removes need for testing"],
      c: 2,
      h: "Think about how nanoparticles are specifically engineered to interact with biological systems.",
      e: "The correct answer is 'targets specific cells'. Nanoparticle drug delivery systems are designed to precisely deliver drugs to specific cells or tissues, minimizing damage to healthy cells and improving therapeutic outcomes. It does not 'simplifies drug production', as nanoparticle formulation can be complex. It may 'reduces number of doses' in some cases, but this is a consequence of improved targeting, not the primary advantage. It certainly does not 'removes need for testing', as all drug delivery systems require rigorous testing for safety and efficacy.",
    },
    {
      q: "How were mRNA COVID vaccines delivered into cells?",
      o: ["inside lipid nanoparticles", "within metal capsules", "as plain mRNA directly", "through nasal spray methods"],
      c: 0,
      h: "Recall the common method used to protect and deliver delicate genetic material into cells for vaccine purposes.",
      e: "The correct answer is 'inside lipid nanoparticles'. mRNA vaccines, such as those for COVID 19, use lipid nanoparticles (LNPs) to encapsulate and protect the fragile mRNA, allowing it to enter cells and express the desired protein. They were not delivered 'within metal capsules' or 'as plain mRNA directly', as bare mRNA would be quickly degraded by the body. While some vaccines use 'nasal spray methods', this was not the primary delivery method for the mRNA COVID vaccines themselves.",
    },
    {
      q: "What is a theranostic nanoparticle?",
      o: ["only takes cell pictures", "composed entirely of gold", "removes the immune system", "diagnoses and treats disease"],
      c: 3,
      h: "Consider the two main functions implied by the term 'theranostic' in a medical context.",
      e: "The correct answer is 'diagnoses and treats disease'. Theranostic nanoparticles are a type of nanotechnology that combines diagnostic imaging capabilities with therapeutic drug delivery into a single system, allowing for simultaneous diagnosis and treatment. They do not 'only take cell pictures', as they also have therapeutic functions. They are not necessarily 'composed entirely of gold', although gold can be a component. They do not 'remove the immune system', but rather interact with it in specific ways for therapeutic benefit.",
    },
  ],
  bioelectricity: [
    {
      q: "What creates the electrical signal in a neuron?",
      o: ["ions move across membrane", "tiny internal cell batteries", "friction between neuron cells", "light absorbed by the cell"],
      c: 0,
      h: "Think about the fundamental process involving charged particles that drives electrical signals in biological systems.",
      e: "The correct answer is 'ions move across membrane'. The electrical signal in a neuron, known as an action potential, is generated by the rapid movement of ions, such as sodium and potassium, across the neuron's cell membrane through specialized channels. Neurons do not contain 'tiny internal cell batteries'. 'friction between neuron cells' does not generate electrical signals. 'light absorbed by the cell' is how photoreceptor cells in the eye respond to stimuli, not the general mechanism for creating electrical signals in all neurons.",
    },
    {
      q: "What does an EKG or ECG measure?",
      o: ["blood oxygen levels", "electrical activity of heart", "brain wave patterns", "blood sugar levels"],
      c: 1,
      h: "Consider the meaning of the letters 'EKG' or 'ECG' and what they stand for in relation to the human body.",
      e: "The correct answer is 'electrical activity of heart'. EKG (electrocardiogram) or ECG is a test that measures the electrical activity of the heart, showing how fast it's beating and if it's beating normally. It does not measure 'blood oxygen levels', which is done by pulse oximetry. It does not measure 'brain wave patterns', which is done by an EEG (electroencephalogram). It does not measure 'blood sugar levels', which is done by a glucometer.",
    },
    {
      q: "What is the resting membrane potential?",
      o: ["Maximum spike voltage", "Overall body voltage", "Charge on cell exterior", "Stable negative cell voltage"],
      c: 3,
      h: "Consider the electrical state of a cell when it is not actively firing.",
      e: "The correct option is 'Stable negative cell voltage'. The resting membrane potential is the stable, baseline electrical charge across the cell membrane, typically negative inside compared to outside. 'Maximum spike voltage' refers to the peak depolarization during an action potential, not the resting state. 'Overall body voltage' is too broad and not specific to a single cell's potential. 'Charge on cell exterior' only describes one side of the membrane and not the potential difference across it.",
    },
    {
      q: "How does a defibrillator help a heart in a dangerous rhythm?",
      o: ["Pumps blood mechanically", "Increases blood oxygen", "Cools the heart rapidly", "Resets heart's electrical rhythm"],
      c: 3,
      h: "Think about how electricity can be used to restart or regulate electrical systems.",
      e: "The correct option is 'Resets heart's electrical rhythm'. A defibrillator delivers a controlled electrical shock to the heart, which momentarily stops all electrical activity, allowing the heart's natural pacemaker to restart with a normal, synchronized rhythm. 'Pumps blood mechanically' describes the function of a ventricular assist device or artificial heart, not a defibrillator. 'Increases blood oxygen' is a function of respiration or oxygen therapy. 'Cools the heart rapidly' is a technique used in some medical procedures, but not the primary action of a defibrillator for dangerous rhythms.",
    },
  ],
  sleep: [
    {
      q: "What happens during REM sleep?",
      o: ["Brain activity rises. Dreaming occurs", "Brain activity slows greatly", "Body temperature rises sharply", "Muscles work more intensely"],
      c: 0,
      h: "Recall the characteristics of sleep stages, particularly the one associated with vivid dreams.",
      e: "The correct option is 'Brain activity rises. Dreaming occurs'. During REM sleep, brain activity significantly increases, becoming similar to wakefulness, and this is the stage where most vivid dreaming occurs. 'Brain activity slows greatly' is characteristic of deep non REM sleep. 'Body temperature rises sharply' is not a primary or defining characteristic of REM sleep. 'Muscles work more intensely' is incorrect, as muscles are typically paralyzed during REM sleep to prevent acting out dreams.",
    },
    {
      q: "Which hormone signals the body that it is time to sleep?",
      o: ["Melatonin signals sleep time", "Insulin signals digestion", "Adrenaline causes alertness", "Cortisol signals stress"],
      c: 0,
      h: "Consider the hormone often associated with regulating our sleep wake cycle.",
      e: "The correct option is 'Melatonin signals sleep time'. Melatonin is a hormone produced by the pineal gland that helps regulate the sleep wake cycle, signaling to the body when it is time to sleep. 'Insulin signals digestion' is incorrect, as insulin primarily regulates blood sugar levels. 'Adrenaline causes alertness' is correct regarding adrenaline's function, but it promotes wakefulness, not sleep. 'Cortisol signals stress' is correct regarding cortisol's function, but it is also associated with wakefulness and alertness, not sleep initiation.",
    },
    {
      q: "Why is deep slow wave sleep important for learning?",
      o: ["Consolidates memories for storage", "Burns many body calories", "Builds muscle tissue only", "Reduces all brain activity"],
      c: 0,
      h: "Think about the cognitive benefits of sleep, especially in relation to learning new information.",
      e: "The correct option is 'Consolidates memories for storage'. Deep slow wave sleep is crucial for memory consolidation, where newly acquired information is processed and transferred from short term to long term storage. 'Burns many body calories' is not a primary or significant function of deep sleep for learning. 'Builds muscle tissue only' is incorrect, as sleep benefits overall body repair and growth, but this is not its specific role in learning. 'Reduces all brain activity' is incorrect, as while some brain activity slows, specific neural processes vital for memory consolidation are highly active during deep sleep.",
    },
    {
      q: "What is the circadian rhythm?",
      o: ["Heartbeat rhythm pattern", "Breathing exercise method", "Internal 24 hour body clock", "Specific type of brain wave"],
      c: 2,
      h: "Consider the natural daily cycles that your body follows.",
      e: "The correct option is 'Internal 24 hour body clock'. The circadian rhythm is the body's natural, internal 24 hour cycle that regulates various physiological processes, including sleep wake patterns, hormone release, and body temperature. 'Heartbeat rhythm pattern' refers to the cardiac cycle. 'Breathing exercise method' describes a specific technique for controlling respiration. 'Specific type of brain wave' refers to patterns of electrical activity in the brain, like alpha or theta waves, which are part of the circadian rhythm but not the rhythm itself.",
    },
  ],
  aging: [
    {
      q: "What are telomeres?",
      o: ["Protective caps on chromosome ends", "Energy makers in cells", "Proteins for food breakdown", "Signals for puberty onset"],
      c: 0,
      h: "Consider the role of these structures at the very ends of our genetic material.",
      e: "The correct answer is 'Protective caps on chromosome ends'. Telomeres are specialized DNA protein structures found at the ends of chromosomes, protecting them from damage and fusion with other chromosomes. 'Energy makers in cells' describes mitochondria, not telomeres. 'Proteins for food breakdown' refers to enzymes involved in digestion or metabolism. 'Signals for puberty onset' relates to hormones, not telomeres.",
    },
    {
      q: "What is cellular senescence?",
      o: ["Cells multiply very fast", "Cells turn into stem cells", "Cells become infectious agents", "Cells stop dividing, stay alive"],
      c: 3,
      h: "Think about what happens when cells reach the end of their replicative lifespan.",
      e: "The correct answer is 'Cells stop dividing, stay alive'. Cellular senescence is a state where cells permanently exit the cell cycle, meaning they stop dividing, but they remain metabolically active and alive. 'Cells multiply very fast' describes uncontrolled cell proliferation, like in cancer. 'Cells turn into stem cells' describes dedifferentiation or reprogramming, which is a different biological process. 'Cells become infectious agents' would describe pathogens like bacteria or viruses, or cells infected by them.",
    },
    {
      q: "Why is caloric restriction studied in aging research?",
      o: ["It causes rapid weight gain", "It shortens telomeres quickly", "It removes the need for sleep", "It extends life in many animals"],
      c: 3,
      h: "Consider the long term biological effects observed in various organisms when food intake is reduced without malnutrition.",
      e: "The correct answer is 'It extends life in many animals'. Caloric restriction, a reduction in calorie intake without malnutrition, has been shown to increase lifespan and health span in a wide range of organisms, from yeast to primates. 'It causes rapid weight gain' is contrary to caloric restriction. 'It shortens telomeres quickly' is incorrect, as caloric restriction is often associated with telomere maintenance or slower shortening. 'It removes the need for sleep' is not a known effect or research area related to caloric restriction.",
    },
    {
      q: "What do mitochondria have to do with aging?",
      o: ["They store all genetic code", "Damage reduces energy, increases byproducts", "They control your blood type", "They produce immune antibodies"],
      c: 1,
      h: "Focus on the primary function of these cellular organelles and how their decline might impact cellular health over time.",
      e: "The correct answer is 'Damage reduces energy, increases byproducts'. Mitochondria are the powerhouses of the cell, producing energy through cellular respiration. Damage to mitochondria, often accumulating with age, leads to decreased energy production and increased reactive oxygen species, which contribute to the aging process. 'They store all genetic code' describes the nucleus, not mitochondria, although mitochondria do have their own small genome. 'They control your blood type' is determined by genes on chromosomes in the nucleus. 'They produce immune antibodies' is a function of B lymphocytes and plasma cells, not mitochondria.",
    },
  ],
  biometrics: [
    {
      q: "What are biometrics?",
      o: ["A method to test air quality", "Study of only body heat", "A method for making clones", "Measurements of unique body traits"],
      c: 3,
      h: "Consider technologies that use unique physical or behavioral characteristics for identification.",
      e: "The correct answer is 'Measurements of unique body traits'. Biometrics involves the measurement and statistical analysis of people's unique physical and behavioral characteristics, such as fingerprints, facial patterns, or voice, for identification and authentication purposes. 'A method to test air quality' relates to environmental monitoring. 'Study of only body heat' is too narrow, as biometrics encompasses many traits. 'A method for making clones' relates to genetic engineering, not biometrics.",
    },
    {
      q: "Why are fingerprints useful for identification?",
      o: ["They change every single year", "Ridge patterns are unique and stable", "Family members share one type", "They can be seen far away"],
      c: 1,
      h: "Think about the characteristics that make these skin patterns reliable for forensic and security applications.",
      e: "The correct answer is 'Ridge patterns are unique and stable'. Fingerprints are valuable for identification because the patterns of ridges and valleys on fingertips are unique to each individual and remain largely unchanged throughout a person's life, barring severe injury. 'They change every single year' is incorrect, as their stability is key to their use. 'Family members share one type' is false, fingerprints are unique even among identical twins. 'They can be seen far away' is not a characteristic that makes them useful for identification, as they require close examination or scanning.",
    },
    {
      q: "What is a false acceptance in a biometric system?",
      o: ["System accepts unauthorized person", "System rejects authorized user", "Data storage has an error", "Scanner has a power failure"],
      c: 0,
      h: "Consider what 'false acceptance' implies about who is being allowed access.",
      e: "A false acceptance means the system incorrectly identifies an unauthorized person as authorized, so the 'System accepts unauthorized person' is correct. The system does not reject an authorized user, which is a false rejection. Data storage errors or scanner power failures are technical issues, not direct false acceptances.",
    },
    {
      q: "What is a main privacy concern with biometrics?",
      o: ["Data is hard to encrypt", "Scanners are very slow", "Cannot change stolen fingerprint", "Only works outside"],
      c: 2,
      h: "Think about what makes biometric data unique and irreplaceable.",
      e: "A main privacy concern with biometrics is that if data like a fingerprint is compromised, it cannot be changed, making 'Cannot change stolen fingerprint' the correct answer. While data encryption is important, biometric data itself presents a unique challenge when compromised. Scanners are not inherently slow, and biometrics work in many environments, not just outside.",
    },
  ],
  dnaforensics: [
    {
      q: "What part of DNA is compared in a standard forensic profile?",
      o: ["Entire human genome is used", "Only mitochondrial DNA is used", "Short tandem repeats are compared", "Protein sequences are compared"],
      c: 2,
      h: "Recall the specific repetitive sequences commonly used in DNA profiling.",
      e: "In a standard forensic profile, 'Short tandem repeats are compared' is the correct answer because STRs are unique, highly variable markers used for individual identification. Comparing the entire human genome is too complex and unnecessary for identification. Mitochondrial DNA is used in specific cases, but not typically for a standard forensic profile, and protein sequences are not directly used for DNA profiling.",
    },
    {
      q: "Why is PCR essential in forensic DNA work?",
      o: ["It cleans evidence samples", "It photographs latent prints", "It reads handwriting on documents", "It copies tiny DNA amounts"],
      c: 3,
      h: "Consider the primary function of PCR in molecular biology, especially with limited samples.",
      e: "PCR, or Polymerase Chain Reaction, is essential in forensic DNA work because 'It copies tiny DNA amounts', allowing for analysis even from very small or degraded samples. PCR does not clean evidence samples, photograph latent prints, or read handwriting on documents, as these are unrelated processes.",
    },
    {
      q: "What is genetic genealogy in criminal cases?",
      o: ["Using databases to find relatives", "Copying DNA into a computer", "Testing animal DNA only", "Erasing DNA at a crime scene"],
      c: 0,
      h: "Think about how genetic information can connect individuals through family lines.",
      e: "In criminal cases, genetic genealogy involves 'Using databases to find relatives' by comparing unknown DNA profiles to public genetic databases to identify potential family members of a suspect. It does not involve copying DNA into a computer in this specific context, testing only animal DNA, or erasing DNA at a crime scene.",
    },
    {
      q: "Why is contamination a serious risk in DNA evidence?",
      o: ["DNA degrades into RNA", "Stray cells produce a profile", "Contamination makes DNA glow", "It changes blood type results"],
      c: 1,
      h: "Imagine what happens when foreign genetic material mixes with evidence.",
      e: "Contamination is a serious risk in DNA evidence because 'Stray cells produce a profile', meaning DNA from another source can mix with the evidence, leading to a false or mixed profile that complicates or invalidates forensic analysis. DNA does not degrade into RNA, contamination does not make DNA glow, and it does not change blood type results.",
    },
  ],
  forensics: [
    {
      q: "What is forensic entomology used for?",
      o: ["Identify blood types", "Analyze DNA evidence", "Detect hidden toxins", "Estimate time of death"],
      c: 3,
      h: "Consider the primary role of insects and decomposition in investigations.",
      e: "Forensic entomology is the study of insects in a legal context. It is primarily used to estimate the time of death, as insects colonize a body in a predictable sequence. Identifying blood types, analyzing DNA evidence, and detecting hidden toxins are all important forensic techniques but are not the main purpose of forensic entomology.",
    },
    {
      q: "What does luminol reveal at a crime scene?",
      o: ["Reveal traces of blood", "Show hidden fingerprints", "Indicate gunpowder presence", "Determine document age"],
      c: 0,
      h: "Think about what a common chemical spray reveals at a crime scene related to biological fluids.",
      e: "Luminol is a chemical that reacts with the iron in hemoglobin found in blood, causing a blue luminescence. Therefore, it is used to reveal traces of blood, even if it has been cleaned. Showing hidden fingerprints requires different techniques like dusting, indicating gunpowder presence involves residue analysis, and determining document age is a separate forensic specialty.",
    },
    {
      q: "What is the chain of custody?",
      o: ["Sequence DNA samples", "Document evidence handling", "Question crime suspects", "Analyze bullet trajectory"],
      c: 1,
      h: "This term refers to the unbroken record of possession for physical evidence.",
      e: "The chain of custody is a critical procedure in forensic science that documents the chronological possession, handling, transfer, and analysis of physical evidence from the moment it is collected until it is presented in court. Sequencing DNA samples, questioning crime suspects, and analyzing bullet trajectory are specific forensic tasks, not the definition of the chain of custody.",
    },
    {
      q: "Why is forensic toxicology important?",
      o: ["Measure bone density", "Identify fabric types", "Detect substances in body", "Match shoe prints"],
      c: 2,
      h: "Consider the branch of science that studies the effects of chemicals on living organisms.",
      e: "Forensic toxicology is the study of drugs, poisons, and other toxic substances in biological samples to help determine their role in a crime or death. Thus, it is important to detect substances in body. Measuring bone density is related to anthropology or medicine, identifying fabric types is a trace evidence analysis, and matching shoe prints falls under impression evidence.",
    },
  ],
  stemcells: [
    {
      q: "What makes stem cells special?",
      o: ["They never die", "Self renew, become other cells", "They have extra genes", "They only live in brain"],
      c: 1,
      h: "Focus on the unique properties that allow these cells to form various tissues and organs.",
      e: "Stem cells are special because they have two key characteristics: they can self renew, making copies of themselves, and they can become other cells, differentiating into various specialized cell types. They do not never die, they do not have extra genes, and they do not only live in brain, as they are found throughout the body.",
    },
    {
      q: "What does pluripotent mean?",
      o: ["Become nearly any cell", "Become only blood cells", "Divide only once", "Survive without nutrients"],
      c: 0,
      h: "Consider the broad developmental potential of cells that can differentiate into nearly any cell type.",
      e: "Pluripotent means that a cell has the ability to differentiate into nearly any cell in the body, except for extraembryonic tissues like the placenta. Becoming only blood cells describes multipotent or hematopoietic stem cells, dividing only once is not characteristic of stem cells, and surviving without nutrients is not a biological possibility for living cells.",
    },
    {
      q: "What are induced pluripotent stem cells?",
      o: ["Embryo cells. not adult cells", "Cells from cultured bacteria", "Adult cells become stem cell like", "Cells found in marrow only"],
      c: 2,
      h: "Consider the term 'induced' and 'pluripotent' in relation to their origin.",
      e: "The correct answer is 'Adult cells become stem cell like'. Induced pluripotent stem cells, often called iPS cells, are a type of pluripotent stem cell that can be generated directly from adult cells, meaning they are 'induced' to revert to a stem cell like state. 'Embryo cells, not adult cells' is incorrect because iPS cells are derived from adult cells, not embryos. 'Cells from cultured bacteria' is incorrect as iPS cells are mammalian cells, not bacterial. 'Cells found in marrow only' is incorrect because while some stem cells are in marrow, iPS cells are specifically adult cells reprogrammed to a pluripotent state, not just restricted to marrow.",
    },
    {
      q: "Which stem cell therapy is already standard clinical care?",
      o: ["Lab grown organ transplants", "Regrown human limbs, new tech", "Anti aging therapies, future hope", "Bone marrow transplants, blood cancer"],
      c: 3,
      h: "Think about which stem cell therapy has been in widespread clinical use for decades.",
      e: "The correct answer is 'Bone marrow transplants, blood cancer'. Bone marrow transplants have been a standard and life saving treatment for various blood cancers and disorders for many years. 'Lab grown organ transplants' is incorrect as this is still largely experimental or in early clinical trials. 'Regrown human limbs, new tech' is incorrect as regrowing entire human limbs is not yet a clinical reality. 'Anti aging therapies, future hope' is incorrect as anti aging therapies using stem cells are still largely speculative and not standard clinical care.",
    },
  ],
  superbugs: [
    {
      q: "What is antibiotic resistance?",
      o: ["Humans become drug allergic", "Bacteria evolve to resist drugs", "Antibiotics lose strength, expire", "Viruses block antibiotic action"],
      c: 1,
      h: "Consider how living organisms adapt to their environment, especially in the presence of threats.",
      e: "The correct answer is 'Bacteria evolve to resist drugs'. Antibiotic resistance occurs when bacteria change in ways that reduce or eliminate the effectiveness of drugs designed to cure infections, essentially evolving to survive exposure to antibiotics. 'Humans become drug allergic' is incorrect as antibiotic resistance is about the bacteria, not the human immune response. 'Antibiotics lose strength, expire' is incorrect, as while drugs can expire, antibiotic resistance refers to the bacteria's ability to withstand the drug, not the drug's inherent potency. 'Viruses block antibiotic action' is incorrect because antibiotics target bacteria, not viruses, and viruses do not directly block antibiotic action.",
    },
    {
      q: "Why does finishing a prescribed antibiotic course matter?",
      o: ["Pills degrade, lose potency", "Toughest bacteria survive, multiply", "Prevents allergic reactions, rashes", "Causes bacteria to grow faster"],
      c: 1,
      h: "Think about what happens to the weaker versus stronger bacteria during an antibiotic course.",
      e: "The correct answer is 'Toughest bacteria survive, multiply'. When you do not finish a prescribed antibiotic course, some of the more resistant bacteria may survive and multiply, leading to a harder to treat infection and contributing to antibiotic resistance. 'Pills degrade, lose potency' is incorrect, as this is not the primary reason to finish a course. 'Prevents allergic reactions, rashes' is incorrect because finishing the course does not prevent allergic reactions, it addresses the infection. 'Causes bacteria to grow faster' is incorrect because antibiotics aim to kill or inhibit bacteria, not make them grow faster.",
    },
    {
      q: "Why do antibiotics not work on the flu or a cold?",
      o: ["Doses given are too small", "Flu, colds are from viruses", "Fungi cause common colds", "Antibiotics work only in hospitals"],
      c: 1,
      h: "Recall the fundamental difference between what antibiotics treat and the cause of the flu or common cold.",
      e: "The correct answer is 'Flu, colds are from viruses'. Antibiotics are specifically designed to kill or inhibit bacteria, while the flu and common colds are caused by viruses. Therefore, antibiotics are ineffective against these viral infections. 'Doses given are too small' is incorrect because the issue is the type of pathogen, not the dosage. 'Fungi cause common colds' is incorrect because common colds are caused by viruses, not fungi. 'Antibiotics work only in hospitals' is incorrect, as antibiotics are widely used in various healthcare settings and at home.",
    },
    {
      q: "What is MRSA?",
      o: ["A virus causing skin rashes", "A vaccine for drug bugs", "Staph resistant to many drugs", "A type of blood cell"],
      c: 2,
      h: "Consider the full name or a common description for the 'MR' in MRSA.",
      e: "The correct answer is 'Staph resistant to many drugs'. MRSA stands for Methicillin resistant Staphylococcus aureus, which is a type of staph bacteria that has become resistant to many of the antibiotics used to treat ordinary staph infections. 'A virus causing skin rashes' is incorrect as MRSA is a bacterium, not a virus. 'A vaccine for drug bugs' is incorrect as MRSA is a type of bacteria, not a vaccine. 'A type of blood cell' is incorrect, as MRSA is a bacterium that can cause infection, not a component of human blood.",
    },
  ],
  neurotech: [
    {
      q: "What does a brain computer interface do?",
      o: ["Uploads thoughts to a network", "Interprets brain signals for devices", "Replaces neurons with wiring", "Automatically boosts intelligence"],
      c: 1,
      h: "Consider the primary function of an interface between two different systems, in this case, the brain and a computer.",
      e: "A brain computer interface (BCI) interprets brain signals for devices, translating neurological activity into commands that control external technology. It does not upload thoughts to a network, as BCIs are currently focused on control, not direct thought transfer. It also does not replace neurons with wiring, but rather works alongside the brain's existing structures. Finally, while it can enhance capabilities, it does not automatically boost intelligence directly in the way a computer processes information.",
    },
    {
      q: "What does an EEG record?",
      o: ["Brain blood flow patterns", "Spinal fluid chemical levels", "Skull bone density readings", "Brain's electrical activity on scalp"],
      c: 3,
      h: "Think about what kind of energy activity is most fundamentally associated with brain function that can be measured non invasively from the scalp.",
      e: "An EEG, or electroencephalogram, records the brain's electrical activity on scalp. This is achieved by detecting the electrical impulses generated by neurons. It does not record brain blood flow patterns, which are measured by fMRI. It also does not measure spinal fluid chemical levels, which would require a spinal tap. Lastly, it is not used for skull bone density readings, which are typically assessed with X rays or DEXA scans.",
    },
    {
      q: "How does deep brain stimulation help Parkinson's patients?",
      o: ["Removes damaged brain tissue", "Replaces dopamine cells", "Regulates brain circuit activity", "Cools brain to reduce tremors"],
      c: 2,
      h: "Consider how electrical stimulation might directly impact the communication pathways in the brain to alleviate symptoms.",
      e: "Deep brain stimulation (DBS) helps Parkinson's patients by regulating brain circuit activity. It involves surgically implanting electrodes that deliver electrical impulses to specific brain areas, thereby modulating abnormal neural activity. It does not remove damaged brain tissue, as DBS is a neuromodulation technique, not an ablative one. It also does not replace dopamine cells, which is the primary deficit in Parkinson's, but rather manages the symptoms. Furthermore, it does not cool the brain to reduce tremors, as its mechanism involves electrical stimulation, not temperature regulation.",
    },
    {
      q: "What is neuroplasticity?",
      o: ["Brain rewires with experience", "Plastic covering on implants", "Number of neurons at birth", "A common nerve disease"],
      c: 0,
      h: "Think about the brain's ability to change and adapt throughout life based on new experiences and learning.",
      e: "Neuroplasticity refers to the brain rewires with experience, meaning its structure and function can change and adapt over time in response to learning, new experiences, or injury. It is not a plastic covering on implants, which refers to a physical material. It also does not define the number of neurons at birth, as neuroplasticity is about dynamic changes, not a fixed count. Lastly, it is not a common nerve disease, but a fundamental property of the healthy nervous system.",
    },
  ],
  spacemed: [
    {
      q: "Why do astronauts lose bone density in space?",
      o: ["Lack of gravity loading on bones", "Space radiation dissolves calcium", "Cabin air lacks bone oxygen", "Bones freeze in cold space"],
      c: 0,
      h: "Consider the constant force on bones that exists on Earth and what happens when that force is removed.",
      e: "Astronauts lose bone density in space primarily due to the lack of gravity loading on bones. On Earth, gravity constantly stresses bones, promoting their strength. In microgravity, this stimulus is absent, leading to bone demineralization. Space radiation does not directly dissolve calcium, though radiation can have other negative health effects. Cabin air lacks bone oxygen is incorrect, as oxygen is supplied to the cabin. Lastly, bones freezing in cold space is also incorrect, as astronauts are protected within the spacecraft environment.",
    },
    {
      q: "What is the main reason astronauts exercise about two hours a day?",
      o: ["Keeps warm in the cabin", "Slows muscle and bone loss", "Burns excess food supplies", "Helps keep station spinning"],
      c: 1,
      h: "Think about the physiological effects of prolonged microgravity on the human body.",
      e: "The main reason astronauts exercise about two hours a day is to slow muscle and bone loss. In the microgravity environment of space, muscles atrophy and bones lose density due to the lack of normal gravitational forces. Daily exercise helps to counteract these debilitating effects. It does not primarily keep them warm in the cabin, as cabin temperature is regulated by environmental control systems. Burning excess food supplies is not the primary reason, though exercise does consume calories. Lastly, it does not help keep the station spinning, as the station's orbital mechanics are independent of astronaut activity.",
    },
    {
      q: "What happens to body fluids when astronauts first reach microgravity?",
      o: ["Fluid pools in the lower body", "Fluid shifts to head, chest", "Blood flow becomes very slow", "The body loses much water"],
      c: 1,
      h: "Consider how the absence of gravity might influence the distribution of fluids within the body.",
      e: "When astronauts first reach microgravity, fluid shifts to head, chest because gravity no longer pulls blood and other fluids toward the feet, causing them to redistribute upwards. 'Fluid pools in the lower body' is incorrect because gravity is absent. 'Blood flow becomes very slow' is incorrect as blood flow is regulated by the heart and circulatory system, not primarily by gravity in this initial response. 'The body loses much water' is incorrect, as this initial fluid shift is a redistribution, not an immediate loss of overall body water.",
    },
    {
      q: "Why is space radiation a bigger problem beyond low Earth orbit?",
      o: ["Beyond Earth's magnetic field", "No radiation in low orbit now", "The sun emits less radiation", "Spacecraft metal creates rays"],
      c: 0,
      h: "Think about Earth's natural protection against space radiation.",
      e: "Space radiation is a bigger problem beyond low Earth orbit because astronauts are then Beyond Earth's magnetic field, which normally shields our planet from harmful cosmic rays and solar particles. 'No radiation in low orbit now' is incorrect, as there is still some radiation in low Earth orbit, though less severe than deep space. 'The sun emits less radiation' is incorrect, as the sun constantly emits radiation. 'Spacecraft metal creates rays' is incorrect, as spacecraft metal primarily provides physical shielding, it does not create harmful radiation itself.",
    },
    {
      q: "What is a closed loop life support system?",
      o: ["A sealed room with no air", "A backup radio channel, secure", "Recycles water, oxygen, waste", "A locked storage for medicine"],
      c: 2,
      h: "Consider what would be essential for long duration space missions to minimize resource resupply from Earth.",
      e: "A closed loop life support system Recycles water, oxygen, waste to sustain human life and minimize the need for external supplies, mimicking Earth's natural cycles. 'A sealed room with no air' is incorrect, as a sealed room needs air to be breathable. 'A backup radio channel, secure' describes a communication system, not life support. 'A locked storage for medicine' describes storage, not a system for recycling vital resources.",
    },
    {
      q: "Why is treating a medical emergency hard on a Mars mission?",
      o: ["Illness does not occur in space", "Crew treats itself due to delay", "No medicines carried on rockets", "Doctors cannot wear gloves then"],
      c: 1,
      h: "Consider the communication delays involved in missions to distant planets.",
      e: "Treating a medical emergency is hard on a Mars mission because Crew treats itself due to delay, meaning there is a significant time delay in communication with Earth, preventing immediate guidance from ground medical personnel. 'Illness does not occur in space' is incorrect, as astronauts can get sick in space. 'No medicines carried on rockets' is incorrect, as spacecraft carry medical supplies. 'Doctors cannot wear gloves then' is incorrect, as sterile procedures are still possible.",
    },
    {
      q: "What causes space motion sickness in the first days of a mission?",
      o: ["Low cabin pressure is a cause", "Eating only freeze dried food", "Loud rocket engines are a factor", "Inner ear conflicts with eyes"],
      c: 3,
      h: "Think about how our senses of balance and spatial orientation work together on Earth and what happens when one input changes dramatically.",
      e: "Space motion sickness in the first days of a mission is caused by Inner ear conflicts with eyes, where the brain receives conflicting signals from the visual system and the vestibular system (inner ear) which relies on gravity for orientation. 'Low cabin pressure is a cause' is incorrect, as cabin pressure is maintained at a safe level. 'Eating only freeze dried food' is incorrect, as diet does not directly cause motion sickness in this context. 'Loud rocket engines are a factor' is incorrect, as the engines are only loud during launch, not throughout the initial days of the mission.",
    },
    {
      q: "How does microgravity affect the immune system?",
      o: ["Makes astronauts fully immune", "Immune response becomes weaker", "Removes all body bacteria now", "It has no measurable effect"],
      c: 1,
      h: "Consider how the stressors of space travel might impact the body's defense mechanisms.",
      e: "Microgravity affects the immune system by making the Immune response becomes weaker, which can increase susceptibility to illness and reduce the effectiveness of vaccines. 'Makes astronauts fully immune' is incorrect, as microgravity does not enhance immunity. 'Removes all body bacteria now' is incorrect, as bacteria are still present in and on the body. 'It has no measurable effect' is incorrect, as numerous studies have shown measurable changes in immune function in space.",
    },
  ],
};

export const extraQuizQuestions: QuizQuestion[] = Object.entries(bank).flatMap(([key, list]) =>
  list.map((item, i) => ({
    id: `x-${key}-${i}`,
    topic: TOPICS[key as TopicKey].name,
    lessonUrl: TOPICS[key as TopicKey].url,
    question: item.q,
    options: item.o,
    correct: item.c,
    hint: item.h,
    explanation: item.e,
  })),
);
