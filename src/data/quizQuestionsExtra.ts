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
      h: "Consider what bacteria need to grow and multiply in a laboratory setting.",
      e: "The correct option is 'A nutrient gel for bacteria' because agar is a polysaccharide that forms a solid gel, providing a stable surface and essential nutrients for bacterial growth in a petri dish. 'A pH indicator solution' is incorrect because while some media contain pH indicators, agar itself is not primarily an indicator. 'A growth inhibitor for cells' is incorrect because agar promotes, rather than inhibits, the growth of bacteria when combined with nutrients. 'A medium for protein separation' is incorrect because while agar can be used in some electrophoresis techniques, its primary role in bacteria culture is as a growth medium.",
    },
    {
      q: "What is a bacterial colony?",
      o: ["A single large bacterium", "A collection of bacteria strains", "Many cells from one original", "A group of fungi cells"],
      c: 2,
      h: "Think about how bacteria reproduce and what a visible patch of bacteria represents.",
      e: "The correct option is 'Many cells from one original' because a bacterial colony typically originates from a single bacterium that has replicated numerous times, forming a visible cluster of genetically identical cells. 'A single large bacterium' is incorrect because bacteria are microscopic and colonies are macroscopic aggregates of many cells. 'A collection of bacteria strains' is incorrect because a colony is usually derived from one strain, representing a pure culture. 'A group of fungi cells' is incorrect because a bacterial colony refers specifically to bacteria, not fungi, though fungi can also form colonies.",
    },
    {
      q: "Why are plates incubated around 37 degrees Celsius?",
      o: ["It makes the agar melt", "It kills some microbes quickly", "It quickly sterilizes the plates", "It matches our body temperature"],
      c: 3,
      h: "Consider the optimal conditions for most human associated microbial growth.",
      e: "The correct option is It matches our body temperature because many bacteria that are commonly studied in labs, especially those that can affect humans, grow best at temperatures close to human body temperature. It makes the agar melt is incorrect because agar typically melts at much higher temperatures. It kills some microbes quickly is incorrect, as this temperature is often ideal for microbial growth, not for killing them. It quickly sterilizes the plates is also incorrect, as sterilization requires much higher temperatures or specific chemical treatments.",
    },
    {
      q: "Why should you work near a flame or in a clean hood?",
      o: ["To warm up the bacteria", "To help colonies grow larger", "To quickly sterilize the agar", "To avoid air contamination"],
      c: 3,
      h: "Think about how working in a sterile environment prevents unwanted elements from entering your culture.",
      e: "The correct option is To avoid air contamination. Working near a flame creates an updraft, and a clean hood uses filtered air to minimize airborne particles, both of which help prevent unwanted microorganisms from settling on your cultures. To warm up the bacteria is incorrect because the flame's primary purpose is sterilization, not warming. To help colonies grow larger is incorrect, as the environment's sterility does not directly influence colony size. To quickly sterilize the agar is incorrect, as the agar is usually sterilized before pouring and the flame or hood doesn't sterilize the entire agar surface.",
    },
  ],
  blood: [
    {
      q: "What determines your ABO blood type?",
      o: ["Antigens on red cells", "Plasma color determines it", "White blood cell numbers", "Red blood cell size"],
      c: 0,
      h: "Consider the specific structures found on the surface of your red blood cells that act as identifiers.",
      e: "The correct option is Antigens on red cells. Your ABO blood type is determined by the presence or absence of specific carbohydrate antigens, or markers, on the surface of your red blood cells. Plasma color determines it is incorrect, as plasma color is not related to blood typing. White blood cell numbers is incorrect because white blood cells are part of the immune system and do not determine ABO type. Red blood cell size is incorrect, as the size of the red blood cells does not determine the ABO blood type.",
    },
    {
      q: "Which blood type is the universal red cell donor?",
      o: ["AB positive blood", "A positive blood", "O negative blood", "B negative blood"],
      c: 2,
      h: "Which blood type is considered the 'universal donor' for red blood cells due to its lack of specific surface markers?",
      e: "The correct option is O negative blood. O negative blood is considered the universal red cell donor because its red blood cells lack both A and B antigens, as well as the Rh D antigen, making it less likely to cause a severe immune reaction in any recipient. AB positive blood is incorrect because it has A, B, and Rh D antigens, making it suitable for AB positive recipients only. A positive blood is incorrect as it has A and Rh D antigens. B negative blood is incorrect as it has B antigens.",
    },
    {
      q: "What does the positive or negative in a blood type refer to?",
      o: ["Blood pH is different", "Rh D antigen presence", "Blood clotting factor", "Iron levels in the blood"],
      c: 1,
      h: "Think about a specific protein or antigen that contributes to the 'positive' or 'negative' aspect of a blood type.",
      e: "The correct option is Rh D antigen presence. The positive or negative designation in a blood type refers to the presence or absence of the Rh D antigen on the surface of red blood cells. If you have the Rh D antigen, you are Rh positive, and if you lack it, you are Rh negative. Blood pH is different is incorrect because blood pH is tightly regulated within a narrow range and does not determine the positive or negative status. Blood clotting factor is incorrect, as clotting factors are proteins in the plasma involved in coagulation, not in determining Rh status. Iron levels in the blood is incorrect because iron levels are related to hemoglobin and oxygen transport, not blood type Rh status.",
    },
    {
      q: "Why can a mismatched transfusion be dangerous?",
      o: ["Donor blood has no oxygen", "Antibodies attack donor cells", "Recipient runs out of plasma", "Blood becomes too cold"],
      c: 1,
      h: "Consider what happens when the recipient's immune system encounters foreign components in transfused blood.",
      e: "The correct option is Antibodies attack donor cells. When a transfusion is mismatched, the recipient's immune system recognizes the donor's red blood cell antigens as foreign and produces antibodies to attack and destroy them, leading to a potentially life threatening reaction. Donor blood has no oxygen is incorrect because donor blood is collected with oxygen carrying red blood cells. Recipient runs out of plasma is incorrect, as plasma is usually separated or replenished. Blood becomes too cold is incorrect, as blood is warmed before transfusion to prevent this.",
    },
  ],
  aidrug: [
    {
      q: "Why is traditional drug discovery so slow?",
      o: ["Lab work needs extensive time", "Human trials are legally complex", "Chemical creation is rather slow", "Testing compounds takes many years"],
      c: 3,
      h: "Consider the most time consuming aspect of validating a potential drug's effectiveness and safety.",
      e: "The correct answer is 'Testing compounds takes many years' because a significant portion of drug discovery is dedicated to rigorous testing phases, including preclinical and clinical trials, which inherently demand extensive time. 'Lab work needs extensive time' is too broad and doesn't pinpoint the specific lengthy step. 'Human trials are legally complex' refers to a challenge but not the primary time sink. 'Chemical creation is rather slow' might be true for some compounds, but the testing phase is generally the longest bottleneck.",
    },
    {
      q: "How does machine learning speed up early drug discovery?",
      o: ["Designs new drug molecules directly", "Predicts molecule binding early on", "Automates many lab procedures", "Interprets complex trial data"],
      c: 1,
      h: "Think about where machine learning can make predictions about molecular interactions before extensive lab work.",
      e: "The correct answer is 'Predicts molecule binding early on'. Machine learning excels at analyzing vast datasets to predict how potential drug molecules will interact with target proteins, thereby identifying promising candidates much faster. 'Designs new drug molecules directly' is an emerging field but not the primary way ML speeds up early discovery. 'Automates many lab procedures' is true for some aspects but not the core contribution to early drug *discovery*. 'Interprets complex trial data' is more relevant to later stages of drug development, not early discovery.",
    },
    {
      q: "What did AlphaFold change for biology?",
      o: ["Mapped human brain completely", "Discovered new disease pathways", "Predicts protein 3D structures well", "Deciphered the genetic code"],
      c: 2,
      h: "Recall AlphaFold's major breakthrough in understanding the fundamental structures of biological molecules.",
      e: "The correct answer is 'Predicts protein 3D structures well'. AlphaFold, developed by DeepMind, revolutionized biology by accurately predicting the three dimensional shapes of proteins from their amino acid sequences, which is crucial for understanding their function. 'Mapped human brain completely' is an entirely different research area. 'Discovered new disease pathways' is an outcome of understanding proteins, not AlphaFold's direct contribution. 'Deciphered the genetic code' was a foundational discovery in the mid 20th century, unrelated to AlphaFold.",
    },
    {
      q: "What is a major limitation of AI in medicine?",
      o: ["AI lacks human intuition", "Computers struggle with biology", "Predictions are often too general", "Models are limited by their data"],
      c: 3,
      h: "Consider the fundamental nature of how AI models learn and what they rely on.",
      e: "The correct answer is 'Models are limited by their data'. AI algorithms learn from the data they are trained on, and if this data is biased, incomplete, or of poor quality, the AI's predictions and performance will reflect these limitations. 'AI lacks human intuition' is a philosophical debate and not a primary practical limitation in current medical AI. 'Computers struggle with biology' is incorrect, as computers are used extensively to process biological data. 'Predictions are often too general' can be a consequence of limited or biased data, but the root cause is the data itself.",
    },
  ],
  bioelectronics: [
    {
      q: "What is bioelectronics?",
      o: ["Electronics power biological systems", "Circuits connect with living tissue", "Studying cell electrical activity", "Designing synthetic organic devices"],
      c: 1,
      h: "Focus on the definition that combines electronic components directly with biological systems.",
      e: "The correct answer is 'Circuits connect with living tissue'. Bioelectronics is an interdisciplinary field that involves merging electronic devices with biological systems, often by having circuits interact directly with living tissue. 'Electronics power biological systems' is too broad, as this could simply mean powering a microscope. 'Studying cell electrical activity' is a part of neurophysiology or electrophysiology, but not the definition of bioelectronics itself. 'Designing synthetic organic devices' relates more to organic electronics or synthetic biology, not the core of bioelectronics.",
    },
    {
      q: "Which is a widely used bioelectronic implant?",
      o: ["Implanted defibrillator, quite new", "Electronic hearing aid, external", "Artificial retina for vision", "Cardiac pacemaker, common device"],
      c: 3,
      h: "Think about medical devices that are commonly implanted to regulate a vital bodily function using electronic pulses.",
      e: "The correct answer is 'Cardiac pacemaker, common device'. Cardiac pacemakers are widely used bioelectronic implants that regulate heart rhythm using electrical pulses. 'Implanted defibrillator, quite new' is a bioelectronic implant but not as widespread or as old as the pacemaker. 'Electronic hearing aid, external' is not implanted and is usually worn externally. 'Artificial retina for vision' is a developing bioelectronic implant but not yet as common as the pacemaker.",
    },
    {
      q: "Why must bioelectronic materials be biocompatible?",
      o: ["Body accepts material, no harm", "Body ignores material completely", "Material heats the body more", "Product breaks down slowly in body"],
      c: 0,
      h: "Consider what happens when a foreign object is introduced into the body and how the body reacts to it.",
      e: "The correct answer is 'Body accepts material, no harm'. Biocompatibility means a material can interact with the body without causing a harmful reaction, such as inflammation or toxicity. 'Body ignores material completely' is incorrect because the body typically reacts to foreign materials, even if subtly. 'Material heats the body more' is incorrect as heating is not a primary requirement for biocompatibility. 'Product breaks down slowly in body' is incorrect because while some biomedical materials are designed to degrade, biocompatibility focuses on the lack of harmful response.",
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
      h: "Consider the meaning of the prefix 'nano' in the metric system.",
      e: "A nanometer is indeed one billionth of a meter. The prefix 'nano' signifies one billionth, making 'one billionth of a meter' the correct answer. 'one thousandth of a meter' would be a millimeter. 'one millionth of a meter' would be a micrometer. 'one hundredth of a meter' would be a centimeter.",
    },
    {
      q: "What is a key advantage of nanoparticle drug delivery?",
      o: ["simplifies drug production", "reduces number of doses", "targets specific cells", "removes need for testing"],
      c: 2,
      h: "Think about how nanoparticles can be engineered to interact with biological systems.",
      e: "A key advantage of nanoparticle drug delivery is that it 'targets specific cells'. Nanoparticles can be designed to deliver drugs precisely to diseased cells, minimizing side effects on healthy tissues. It does not 'simplifies drug production' as nanoparticle synthesis can be complex. While it might reduce the frequency of doses in some cases, its primary advantage isn't merely 'reduces number of doses' but rather improved delivery. It certainly does not 'removes need for testing', as all drug delivery systems require rigorous testing for safety and efficacy.",
    },
    {
      q: "How were mRNA COVID vaccines delivered into cells?",
      o: ["inside lipid nanoparticles", "within metal capsules", "as plain mRNA directly", "through nasal spray methods"],
      c: 0,
      h: "Recall the unique protective coating used to get the delicate mRNA into cells for these vaccines.",
      e: "mRNA COVID vaccines were delivered into cells 'inside lipid nanoparticles'. These protective lipid shells encapsulated the fragile mRNA, preventing its degradation and facilitating its entry into cells. They were not delivered 'within metal capsules'. Delivering them 'as plain mRNA directly' would lead to rapid degradation before reaching the target cells. 'through nasal spray methods' refers to a delivery route, not the intracellular delivery mechanism of the mRNA itself.",
    },
    {
      q: "What is a theranostic nanoparticle?",
      o: ["only takes cell pictures", "composed entirely of gold", "removes the immune system", "diagnoses and treats disease"],
      c: 3,
      h: "The term 'theranostic' combines two functions related to medical treatment.",
      e: "A theranostic nanoparticle 'diagnoses and treats disease'. The term combines 'thera' from therapy and 'nostic' from diagnostic, indicating their dual capability. It does not 'only takes cell pictures' as that would be purely diagnostic. While some theranostic nanoparticles might contain gold, it is not 'composed entirely of gold'. It does not 'removes the immune system', which would be a detrimental effect.",
    },
  ],
  bioelectricity: [
    {
      q: "What creates the electrical signal in a neuron?",
      o: ["ions move across membrane", "tiny internal cell batteries", "friction between neuron cells", "light absorbed by the cell"],
      c: 0,
      h: "Consider the movement of charged particles across the neuron's boundary.",
      e: "The electrical signal in a neuron is created when 'ions move across membrane'. This movement generates action potentials, which are electrical impulses. Neurons do not contain 'tiny internal cell batteries'. 'friction between neuron cells' is not the mechanism for generating electrical signals. 'light absorbed by the cell' is how photoreceptor cells respond to light, but not the general mechanism for electrical signaling in neurons.",
    },
    {
      q: "What does an EKG or ECG measure?",
      o: ["blood oxygen levels", "electrical activity of heart", "brain wave patterns", "blood sugar levels"],
      c: 1,
      h: "Think about what the 'E' in EKG or ECG stands for and its relation to body processes.",
      e: "An EKG or ECG measures the 'electrical activity of heart'. EKG stands for Electrocardiogram, directly referring to the electrical impulses of the heart. It does not measure 'blood oxygen levels', which is typically done by a pulse oximeter. It does not measure 'brain wave patterns', which is measured by an EEG. It also does not measure 'blood sugar levels', which is done with a glucometer.",
    },
    {
      q: "What is the resting membrane potential?",
      o: ["Maximum spike voltage", "Overall body voltage", "Charge on cell exterior", "Stable negative cell voltage"],
      c: 3,
      h: "Consider the electrical state of a cell when it is not actively signaling.",
      e: "The resting membrane potential refers to the stable negative charge found inside a cell when it is not firing an impulse. This is why \"Stable negative cell voltage\" is the correct answer. \"Maximum spike voltage\" is incorrect because this describes an action potential peak, not the resting state. \"Overall body voltage\" is too broad and not specific to a cell's electrical potential. \"Charge on cell exterior\" is incorrect because while there is a charge on the exterior, the resting potential specifically refers to the inside relative to the outside, and it is the negative charge inside that defines it.",
    },
    {
      q: "How does a defibrillator help a heart in a dangerous rhythm?",
      o: ["Pumps blood mechanically", "Increases blood oxygen", "Cools the heart rapidly", "Resets heart's electrical rhythm"],
      c: 3,
      h: "Think about the primary function of a defibrillator in addressing an irregular heart rhythm.",
      e: "A defibrillator delivers an electrical shock to the heart, which is intended to stop chaotic electrical activity and allow the heart's natural pacemaker to resume a normal rhythm. Therefore, \"Resets heart's electrical rhythm\" is the correct answer. \"Pumps blood mechanically\" is incorrect, as this is the function of the heart itself or a mechanical pump. \"Increases blood oxygen\" is incorrect, as this relates to respiration or oxygen therapy. \"Cools the heart rapidly\" is incorrect, as cooling is not the primary mechanism of defibrillation.",
    },
  ],
  sleep: [
    {
      q: "What happens during REM sleep?",
      o: ["Brain activity rises. Dreaming occurs", "Brain activity slows greatly", "Body temperature rises sharply", "Muscles work more intensely"],
      c: 0,
      h: "Recall the characteristics of brain activity and dreams during this sleep stage.",
      e: "During REM (Rapid Eye Movement) sleep, brain activity increases, becoming similar to waking states, and this is when most dreaming occurs. Thus, \"Brain activity rises. Dreaming occurs\" is the correct answer. \"Brain activity slows greatly\" is incorrect, as this describes deep non REM sleep. \"Body temperature rises sharply\" is incorrect, as body temperature regulation is often less stable during REM sleep, but it does not necessarily rise sharply. \"Muscles work more intensely\" is incorrect, as most voluntary muscles are paralyzed during REM sleep to prevent acting out dreams.",
    },
    {
      q: "Which hormone signals the body that it is time to sleep?",
      o: ["Melatonin signals sleep time", "Insulin signals digestion", "Adrenaline causes alertness", "Cortisol signals stress"],
      c: 0,
      h: "Consider the hormone often associated with the body's natural sleep wake cycle.",
      e: "Melatonin is a hormone produced by the pineal gland that signals to the body that it is time to sleep and helps regulate the circadian rhythm. Therefore, \"Melatonin signals sleep time\" is the correct answer. \"Insulin signals digestion\" is incorrect, as insulin regulates blood sugar, not directly digestion or sleep. \"Adrenaline causes alertness\" is incorrect, as adrenaline is a stress hormone that promotes wakefulness and a 'fight or flight' response. \"Cortisol signals stress\" is incorrect, as cortisol is also a stress hormone and generally promotes wakefulness, not sleep.",
    },
    {
      q: "Why is deep slow wave sleep important for learning?",
      o: ["Consolidates memories for storage", "Burns many body calories", "Builds muscle tissue only", "Reduces all brain activity"],
      c: 0,
      h: "Reflect on how sleep generally impacts memory and learning processes.",
      e: "Deep slow wave sleep is crucial for memory consolidation, which is the process of stabilizing and strengthening new memories for long term storage. This makes \"Consolidates memories for storage\" the correct answer. \"Burns many body calories\" is incorrect, as sleep generally involves a lower metabolic rate compared to wakefulness. \"Builds muscle tissue only\" is incorrect, as while growth hormone release during sleep can aid tissue repair, sleep's role in learning is more about neural processes. \"Reduces all brain activity\" is incorrect, as while some brain activity patterns change, sleep involves complex and active brain processes, not a complete reduction of all activity.",
    },
    {
      q: "What is the circadian rhythm?",
      o: ["Heartbeat rhythm pattern", "Breathing exercise method", "Internal 24 hour body clock", "Specific type of brain wave"],
      c: 2,
      h: "Think about the body's natural internal timing system.",
      e: "The circadian rhythm is the body's internal biological clock that regulates various physiological processes, including the sleep wake cycle, over roughly a 24 hour period. Hence, \"Internal 24 hour body clock\" is the correct option. \"Heartbeat rhythm pattern\" is incorrect, as this refers to cardiac rhythm. \"Breathing exercise method\" is incorrect, as this is a technique for respiratory control. \"Specific type of brain wave\" is incorrect, as while brain waves change throughout the circadian cycle, the rhythm itself is a broader biological process, not a specific wave type.",
    },
  ],
  aging: [
    {
      q: "What are telomeres?",
      o: ["Protective caps on chromosome ends", "Energy makers in cells", "Proteins for food breakdown", "Signals for puberty onset"],
      c: 0,
      h: "Consider the role of telomeres in protecting genetic material during cell division.",
      e: "Telomeres are protective caps on chromosome ends, acting like the plastic tips on shoelaces to prevent DNA degradation and fusion. This makes 'Protective caps on chromosome ends' the correct answer. They are not Energy makers in cells, as mitochondria are responsible for energy production. They are not Proteins for food breakdown, a function primarily performed by enzymes in the digestive system and cells. Lastly, they are not Signals for puberty onset, which is controlled by hormones.",
    },
    {
      q: "What is cellular senescence?",
      o: ["Cells multiply very fast", "Cells turn into stem cells", "Cells become infectious agents", "Cells stop dividing, stay alive"],
      c: 3,
      h: "Think about what happens to cells when they reach the end of their replicative lifespan.",
      e: "Cellular senescence describes the state where Cells stop dividing, stay alive but lose their ability to proliferate, making it the correct answer. It is not when Cells multiply very fast, which is characteristic of uncontrolled cell growth, like in cancer. It is also not when Cells turn into stem cells, which is a process of dedifferentiation or reprogramming. Finally, it does not mean Cells become infectious agents, as senescence is a cellular process within the organism, not an infection.",
    },
    {
      q: "Why is caloric restriction studied in aging research?",
      o: ["It causes rapid weight gain", "It shortens telomeres quickly", "It removes the need for sleep", "It extends life in many animals"],
      c: 3,
      h: "Reflect on how reduced calorie intake has been observed to impact longevity in various organisms.",
      e: "Caloric restriction is studied in aging research because It extends life in many animals, showing promise as an intervention for healthy aging. This makes 'It extends life in many animals' the correct answer. It does not cause rapid weight gain, but rather weight loss or maintenance. It does not shorten telomeres quickly, as telomere shortening is generally associated with cellular aging and stress. Also, it does not remove the need for sleep, as sleep is a fundamental biological requirement.",
    },
    {
      q: "What do mitochondria have to do with aging?",
      o: ["They store all genetic code", "Damage reduces energy, increases byproducts", "They control your blood type", "They produce immune antibodies"],
      c: 1,
      h: "Consider the primary function of mitochondria within cells and how their health relates to cellular function over time.",
      e: "Mitochondria are crucial for cellular energy production, and Damage reduces energy, increases byproducts, which contributes to the aging process. This makes 'Damage reduces energy, increases byproducts' the correct answer. They do not store all genetic code, as most genetic material is in the nucleus. They do not control your blood type, which is determined by specific genes and antigens on red blood cells. Lastly, they do not produce immune antibodies, a function performed by B cells.",
    },
  ],
  biometrics: [
    {
      q: "What are biometrics?",
      o: ["A method to test air quality", "Study of only body heat", "A method for making clones", "Measurements of unique body traits"],
      c: 3,
      h: "Think about common security systems that use parts of the body for identification.",
      e: "Biometrics refers to Measurements of unique body traits, such as fingerprints, iris patterns, or facial features, for identification purposes. This makes 'Measurements of unique body traits' the correct answer. It is not A method to test air quality, which involves environmental monitoring. It is not the Study of only body heat, although thermal imaging can be a biometric. It is also not A method for making clones, which involves genetic replication.",
    },
    {
      q: "Why are fingerprints useful for identification?",
      o: ["They change every single year", "Ridge patterns are unique and stable", "Family members share one type", "They can be seen far away"],
      c: 1,
      h: "Consider what makes fingerprints a reliable tool for personal identification over time.",
      e: "Fingerprints are useful for identification because Ridge patterns are unique and stable, meaning each person has distinct patterns that do not change over their lifetime. This makes 'Ridge patterns are unique and stable' the correct answer. They do not change every single year, as their patterns are set before birth. Family members do not share one type, as even identical twins have different fingerprints. Lastly, they cannot be seen far away without specialized equipment, making visibility from a distance not their primary utility for identification.",
    },
    {
      q: "What is a false acceptance in a biometric system?",
      o: ["System accepts unauthorized person", "System rejects authorized user", "Data storage has an error", "Scanner has a power failure"],
      c: 0,
      h: "Consider the term 'acceptance' and what it means in the context of security.",
      e: "A false acceptance occurs when a biometric system incorrectly identifies an unauthorized individual as a valid user, so 'System accepts unauthorized person' is the correct answer. 'System rejects authorized user' describes a false rejection, where a legitimate user is denied access. 'Data storage has an error' and 'Scanner has a power failure' are system malfunctions but do not directly define a false acceptance or rejection.",
    },
    {
      q: "What is a main privacy concern with biometrics?",
      o: ["Data is hard to encrypt", "Scanners are very slow", "Cannot change stolen fingerprint", "Only works outside"],
      c: 2,
      h: "Think about what makes a biometric identifier unique and permanent.",
      e: "The main privacy concern with biometrics is that if a biometric identifier, like a fingerprint, is stolen or compromised, it cannot be changed, making 'Cannot change stolen fingerprint' the correct answer. Unlike passwords, you cannot simply reset a biometric. 'Data is hard to encrypt' is not the primary privacy concern. 'Scanners are very slow' refers to efficiency, not privacy. 'Only works outside' is incorrect, as biometrics are used in many indoor settings.",
    },
  ],
  dnaforensics: [
    {
      q: "What part of DNA is compared in a standard forensic profile?",
      o: ["Entire human genome is used", "Only mitochondrial DNA is used", "Short tandem repeats are compared", "Protein sequences are compared"],
      c: 2,
      h: "Recall the specific repetitive sequences commonly analyzed in DNA profiling.",
      e: "In a standard forensic DNA profile, scientists compare short tandem repeats (STRs), which are unique, repeating DNA sequences, making 'Short tandem repeats are compared' the correct answer. Comparing the 'Entire human genome is used' would be too complex and time consuming for routine forensic work. 'Only mitochondrial DNA is used' is sometimes used but not for a standard forensic profile, which typically uses nuclear DNA. 'Protein sequences are compared' is incorrect, as forensic DNA analysis focuses on the DNA itself, not its protein products.",
    },
    {
      q: "Why is PCR essential in forensic DNA work?",
      o: ["It cleans evidence samples", "It photographs latent prints", "It reads handwriting on documents", "It copies tiny DNA amounts"],
      c: 3,
      h: "Consider how small amounts of DNA can be made usable for analysis.",
      e: "PCR, or Polymerase Chain Reaction, is essential in forensic DNA work because it amplifies tiny amounts of DNA evidence into quantities large enough for analysis, so 'It copies tiny DNA amounts' is the correct answer. PCR does not 'clean evidence samples,' 'photograph latent prints,' or 'read handwriting on documents,' as these are separate forensic techniques.",
    },
    {
      q: "What is genetic genealogy in criminal cases?",
      o: ["Using databases to find relatives", "Copying DNA into a computer", "Testing animal DNA only", "Erasing DNA at a crime scene"],
      c: 0,
      h: "Think about how family relationships are revealed through shared genetic information.",
      e: "Genetic genealogy in criminal cases involves using public DNA databases to find distant relatives of an unknown suspect, which can then help narrow down the investigation, making 'Using databases to find relatives' the correct answer. It does not involve 'copying DNA into a computer' in a general sense, 'testing animal DNA only,' or 'erasing DNA at a crime scene.'",
    },
    {
      q: "Why is contamination a serious risk in DNA evidence?",
      o: ["DNA degrades into RNA", "Stray cells produce a profile", "Contamination makes DNA glow", "It changes blood type results"],
      c: 1,
      h: "Imagine what happens if foreign biological material mixes with a crime scene sample.",
      e: "Contamination is a serious risk in DNA evidence because stray cells from investigators or other sources can mix with the crime scene DNA, producing a mixed or incorrect profile that could lead to misidentification or inconclusive results, so 'Stray cells produce a profile' is the correct answer. DNA degrades over time but does not typically turn into RNA due to contamination. Contamination does not make 'DNA glow' or 'change blood type results.'",
    },
  ],
  forensics: [
    {
      q: "What is forensic entomology used for?",
      o: ["Identify blood types", "Analyze DNA evidence", "Detect hidden toxins", "Estimate time of death"],
      c: 3,
      h: "Consider what entomology is and how insects interact with a deceased body over time.",
      e: "Forensic entomology is the study of insects in legal investigations. By studying the types of insects present on remains and their developmental stages, forensic entomologists can 'Estimate time of death' with considerable accuracy. It is not used to 'Identify blood types', 'Analyze DNA evidence' directly, or 'Detect hidden toxins', although these are all forensic techniques.",
    },
    {
      q: "What does luminol reveal at a crime scene?",
      o: ["Reveal traces of blood", "Show hidden fingerprints", "Indicate gunpowder presence", "Determine document age"],
      c: 0,
      h: "Think about what luminol is famous for revealing, particularly in crime scene television shows.",
      e: "Luminol is a chemical that reacts with the iron in hemoglobin, causing a blue luminescence. This reaction allows it to 'Reveal traces of blood', even if the blood has been cleaned or is invisible to the naked eye. It does not 'Show hidden fingerprints', 'Indicate gunpowder presence', or 'Determine document age'.",
    },
    {
      q: "What is the chain of custody?",
      o: ["Sequence DNA samples", "Document evidence handling", "Question crime suspects", "Analyze bullet trajectory"],
      c: 1,
      h: "Consider the journey of an item from discovery at a crime scene to its presentation in court.",
      e: "The chain of custody refers to the chronological documentation or paper trail showing the seizure, custody, control, transfer, analysis, and disposition of physical or electronic evidence. Its primary purpose is to 'Document evidence handling' to ensure its integrity and admissibility in court. It does not involve 'Sequence DNA samples', 'Question crime suspects', or 'Analyze bullet trajectory'.",
    },
    {
      q: "Why is forensic toxicology important?",
      o: ["Measure bone density", "Identify fabric types", "Detect substances in body", "Match shoe prints"],
      c: 2,
      h: "Think about what toxicology studies and how that applies to the human body.",
      e: "Forensic toxicology is the application of toxicology to legal investigations. Its main purpose is to 'Detect substances in body', including drugs, poisons, and alcohol, and to determine their role in a death or impairment. It is not used to 'Measure bone density', 'Identify fabric types', or 'Match shoe prints'.",
    },
  ],
  stemcells: [
    {
      q: "What makes stem cells special?",
      o: ["They never die", "Self renew, become other cells", "They have extra genes", "They only live in brain"],
      c: 1,
      h: "Consider the unique capabilities that make these cells so valuable for research and potential therapies.",
      e: "Stem cells are special because they have two key properties, they can 'Self renew, become other cells'. This means they can divide and produce more stem cells, and they can differentiate into specialized cell types. They do not 'Never die', 'They have extra genes', or 'They only live in brain', though some types of stem cells are found in the brain.",
    },
    {
      q: "What does pluripotent mean?",
      o: ["Become nearly any cell", "Become only blood cells", "Divide only once", "Survive without nutrients"],
      c: 0,
      h: "The prefix 'pluri' means 'many' or 'several'. How does this relate to cell potential?",
      e: "Pluripotent stem cells are a type of stem cell that has the ability to differentiate into almost any cell type in the body, but not an entire organism. Therefore, they can 'Become nearly any cell'. They do not 'Become only blood cells', 'Divide only once', or 'Survive without nutrients', as they require specific conditions to thrive.",
    },
    {
      q: "What are induced pluripotent stem cells?",
      o: ["Embryo cells. not adult cells", "Cells from cultured bacteria", "Adult cells become stem cell like", "Cells found in marrow only"],
      c: 2,
      h: "Consider the meaning of 'induced pluripotent' and how it relates to cell differentiation.",
      e: "The correct answer is Adult cells become stem cell like. Induced pluripotent stem cells, often called iPSCs, are adult cells that have been reprogrammed to an embryonic stem cell like state, meaning they can differentiate into many different cell types. Embryo cells. not adult cells is incorrect because iPSCs start as adult cells, not embryonic cells, though they achieve an embryonic like state. Cells from cultured bacteria is incorrect because iPSCs are human or animal cells, not bacteria. Cells found in marrow only is incorrect as iPSCs are not limited to bone marrow, and their 'induced' nature means they are created in a lab from various adult cells, not just found in specific locations.",
    },
    {
      q: "Which stem cell therapy is already standard clinical care?",
      o: ["Lab grown organ transplants", "Regrown human limbs, new tech", "Anti aging therapies, future hope", "Bone marrow transplants, blood cancer"],
      c: 3,
      h: "Think about common medical procedures that involve replacing diseased tissue with healthy, similar tissue.",
      e: "The correct answer is Bone marrow transplants, blood cancer. Bone marrow transplantation is a well established and standard clinical therapy for various blood cancers and other blood disorders, effectively using stem cells found in bone marrow. Lab grown organ transplants is incorrect because while promising, this is largely still in experimental or early clinical trial stages and not standard clinical care. Regrown human limbs, new tech is incorrect as regrowing entire human limbs is currently beyond standard medical capabilities. Anti aging therapies, future hope is incorrect because most anti aging therapies involving stem cells are speculative or in very early research, not standard clinical practice.",
    },
  ],
  superbugs: [
    {
      q: "What is antibiotic resistance?",
      o: ["Humans become drug allergic", "Bacteria evolve to resist drugs", "Antibiotics lose strength, expire", "Viruses block antibiotic action"],
      c: 1,
      h: "Consider how living organisms adapt to changes in their environment, especially when exposed to harmful substances.",
      e: "The correct answer is Bacteria evolve to resist drugs. Antibiotic resistance occurs when bacteria change in ways that reduce or eliminate the effectiveness of drugs designed to cure infections, essentially evolving to survive the antibiotics. Humans become drug allergic is incorrect because antibiotic resistance is about the bacteria, not a human allergic reaction. Antibiotics lose strength, expire is incorrect because while drugs can expire, antibiotic resistance is a biological phenomenon of bacteria, not drug degradation. Viruses block antibiotic action is incorrect because antibiotics target bacteria, and viruses are a different type of pathogen, generally unaffected by antibiotics.",
    },
    {
      q: "Why does finishing a prescribed antibiotic course matter?",
      o: ["Pills degrade, lose potency", "Toughest bacteria survive, multiply", "Prevents allergic reactions, rashes", "Causes bacteria to grow faster"],
      c: 1,
      h: "Think about what happens to the weaker versus stronger pathogens when exposed to treatment.",
      e: "The correct answer is Toughest bacteria survive, multiply. If a prescribed antibiotic course is not completed, the weaker bacteria are killed, but the stronger, more resistant bacteria may survive and multiply. This can lead to a more resistant infection that is harder to treat. Pills degrade, lose potency is incorrect as this is not the primary reason for completing the course, and antibiotics are formulated to remain potent for the duration of the treatment. Prevents allergic reactions, rashes is incorrect because while some people have allergic reactions to antibiotics, completing the course does not prevent them, and stopping early can lead to resistance. Causes bacteria to grow faster is incorrect, as antibiotics are designed to kill or inhibit bacterial growth, not accelerate it.",
    },
    {
      q: "Why do antibiotics not work on the flu or a cold?",
      o: ["Doses given are too small", "Flu, colds are from viruses", "Fungi cause common colds", "Antibiotics work only in hospitals"],
      c: 1,
      h: "Consider the fundamental difference between the pathogens that cause colds and flu versus those that antibiotics target.",
      e: "The correct answer is Flu, colds are from viruses. Antibiotics are specifically designed to kill bacteria or stop their growth. The flu and common colds are caused by viruses, which are structurally different from bacteria and are not affected by antibiotics. Doses given are too small is incorrect because even large doses of antibiotics will not kill viruses. Fungi cause common colds is incorrect because colds are caused by viruses, not fungi. Antibiotics work only in hospitals is incorrect because antibiotics are prescribed and effective in various settings, including at home.",
    },
    {
      q: "What is MRSA?",
      o: ["A virus causing skin rashes", "A vaccine for drug bugs", "Staph resistant to many drugs", "A type of blood cell"],
      c: 2,
      h: "Consider the full name of MRSA, particularly the 'R' and 'SA' components, and what they signify about the bacteria.",
      e: "The correct answer is Staph resistant to many drugs. MRSA stands for Methicillin resistant Staphylococcus aureus. It is a type of staph infection that is resistant to several common antibiotics, making it difficult to treat. A virus causing skin rashes is incorrect because MRSA is a bacterium, not a virus, although it can cause skin infections. A vaccine for drug bugs is incorrect as MRSA is a bacterium, not a vaccine. A type of blood cell is incorrect because MRSA is a bacterium, not a component of human blood.",
    },
  ],
  neurotech: [
    {
      q: "What does a brain computer interface do?",
      o: ["Uploads thoughts to a network", "Interprets brain signals for devices", "Replaces neurons with wiring", "Automatically boosts intelligence"],
      c: 1,
      h: "Consider the primary function of a BCI in connecting the brain to external technology.",
      e: "A brain computer interface (BCI) interprets brain signals for devices, translating neurological activity into commands for external technology. It does not upload thoughts to a network in the literal sense of sharing consciousness, nor does it replace neurons with wiring. Additionally, a BCI does not automatically boost intelligence, though it might assist in certain cognitive tasks.",
    },
    {
      q: "What does an EEG record?",
      o: ["Brain blood flow patterns", "Spinal fluid chemical levels", "Skull bone density readings", "Brain's electrical activity on scalp"],
      c: 3,
      h: "Think about what kind of biological activity an electroencephalogram measures.",
      e: "An EEG, or electroencephalogram, records the brain's electrical activity on the scalp, detecting voltage fluctuations resulting from ionic current flows within neurons. It does not measure brain blood flow patterns, spinal fluid chemical levels, or skull bone density readings, which are assessed by different medical imaging or diagnostic techniques.",
    },
    {
      q: "How does deep brain stimulation help Parkinson's patients?",
      o: ["Removes damaged brain tissue", "Replaces dopamine cells", "Regulates brain circuit activity", "Cools brain to reduce tremors"],
      c: 2,
      h: "Consider how deep brain stimulation affects the brain's internal communication system.",
      e: "Deep brain stimulation helps Parkinson's patients by regulating brain circuit activity, using electrical impulses to modulate abnormal brain activity. It does not remove damaged brain tissue, replace dopamine cells, or cool the brain to reduce tremors, as these are not the mechanisms of DBS.",
    },
    {
      q: "What is neuroplasticity?",
      o: ["Brain rewires with experience", "Plastic covering on implants", "Number of neurons at birth", "A common nerve disease"],
      c: 0,
      h: "Focus on how the brain adapts and changes throughout life.",
      e: "Neuroplasticity refers to the brain's ability to rewire with experience, constantly reorganizing itself by forming new neural connections or strengthening existing ones. It is not a plastic covering on implants, the fixed number of neurons at birth, or a common nerve disease.",
    },
  ],
  spacemed: [
    {
      q: "Why do astronauts lose bone density in space?",
      o: ["Lack of gravity loading on bones", "Space radiation dissolves calcium", "Cabin air lacks bone oxygen", "Bones freeze in cold space"],
      c: 0,
      h: "Think about the physical forces that usually act on bones here on Earth.",
      e: "Astronauts lose bone density in space due to a lack of gravity loading on bones, which reduces the mechanical stress needed for bone maintenance and remodeling. Space radiation does not directly dissolve calcium, cabin air lacks bone oxygen is incorrect, and bones do not freeze in cold space.",
    },
    {
      q: "What is the main reason astronauts exercise about two hours a day?",
      o: ["Keeps warm in the cabin", "Slows muscle and bone loss", "Burns excess food supplies", "Helps keep station spinning"],
      c: 1,
      h: "Consider the physiological effects of prolonged weightlessness on the human body.",
      e: "The main reason astronauts exercise about two hours a day is to slow muscle and bone loss, counteracting the detrimental effects of microgravity on the musculoskeletal system. It is not primarily to keep warm in the cabin, burn excess food supplies, or help keep the station spinning.",
    },
    {
      q: "What happens to body fluids when astronauts first reach microgravity?",
      o: ["Fluid pools in the lower body", "Fluid shifts to head, chest", "Blood flow becomes very slow", "The body loses much water"],
      c: 1,
      h: "Consider the absence of gravity's pull on fluids within the body.",
      e: "When astronauts first reach microgravity, fluid shifts to head, chest because gravity no longer pulls fluids towards the feet, leading to a redistribution towards the upper body. Fluid pools in the lower body is incorrect because gravity is absent, so fluid does not pool in the lower body. Blood flow becomes very slow is incorrect, as microgravity primarily affects fluid distribution, not necessarily slowing overall blood flow. The body loses much water is incorrect, as this is not an immediate effect of entering microgravity, though fluid regulation changes over time.",
    },
    {
      q: "Why is space radiation a bigger problem beyond low Earth orbit?",
      o: ["Beyond Earth's magnetic field", "No radiation in low orbit now", "The sun emits less radiation", "Spacecraft metal creates rays"],
      c: 0,
      h: "Think about Earth's natural defense against radiation.",
      e: "Space radiation is a bigger problem beyond low Earth orbit because it is beyond Earth's magnetic field. Earth's magnetic field provides significant protection against radiation, so venturing beyond it exposes astronauts to higher levels. No radiation in low orbit now is incorrect, as there is still radiation in low Earth orbit, just less severe than in deep space. The sun emits less radiation is incorrect, as the sun is a major source of space radiation, and its emission does not decrease. Spacecraft metal creates rays is incorrect, as spacecraft material can sometimes interact with radiation, but it does not create the primary harmful rays.",
    },
    {
      q: "What is a closed loop life support system?",
      o: ["A sealed room with no air", "A backup radio channel, secure", "Recycles water, oxygen, waste", "A locked storage for medicine"],
      c: 2,
      h: "Consider the concept of self sufficiency in an isolated environment.",
      e: "A closed loop life support system recycles water, oxygen, waste, aiming to reuse and regenerate essential resources to minimize the need for resupply. A sealed room with no air is incorrect, as this would be a lethal environment rather than a life support system. A backup radio channel, secure is incorrect, as this describes a communication system, not a life support system. A locked storage for medicine is incorrect, as this describes a storage method, not a system for sustaining life processes.",
    },
    {
      q: "Why is treating a medical emergency hard on a Mars mission?",
      o: ["Illness does not occur in space", "Crew treats itself due to delay", "No medicines carried on rockets", "Doctors cannot wear gloves then"],
      c: 1,
      h: "Consider the practical challenges of medical response over vast distances.",
      e: "Treating a medical emergency is hard on a Mars mission because crew treats itself due to delay. The significant communication delay between Mars and Earth makes real time guidance from ground based doctors impractical, requiring the crew to be self sufficient in medical care. Illness does not occur in space is incorrect; astronauts can and do experience illnesses in space. No medicines carried on rockets is incorrect, as missions do carry medical supplies. Doctors cannot wear gloves then is incorrect; this is not a factor hindering emergency treatment.",
    },
    {
      q: "What causes space motion sickness in the first days of a mission?",
      o: ["Low cabin pressure is a cause", "Eating only freeze dried food", "Loud rocket engines are a factor", "Inner ear conflicts with eyes"],
      c: 3,
      h: "Focus on the sensory systems responsible for balance and orientation.",
      e: "Space motion sickness in the first days of a mission is caused by inner ear conflicts with eyes. In microgravity, the inner ear's balance organs no longer receive gravitational cues, creating a mismatch with visual information, which can lead to disorientation and nausea. Low cabin pressure is a cause is incorrect, as cabin pressure is typically regulated to a safe level to prevent issues like altitude sickness. Eating only freeze dried food is incorrect, as food type is not the primary cause of motion sickness. Loud rocket engines are a factor is incorrect, as the engines are only loud during launch and do not contribute to motion sickness experienced days into a mission.",
    },
    {
      q: "How does microgravity affect the immune system?",
      o: ["Makes astronauts fully immune", "Immune response becomes weaker", "Removes all body bacteria now", "It has no measurable effect"],
      c: 1,
      h: "Think about how the body's systems adapt, or don't adapt, to new environments.",
      e: "Microgravity affects the immune system by making the immune response become weaker. Studies have shown that spaceflight can reduce the effectiveness of immune cells, potentially increasing susceptibility to illness. Makes astronauts fully immune is incorrect, as microgravity has the opposite effect. Removes all body bacteria now is incorrect, as bacteria are still present, though their interactions with the immune system may change. It has no measurable effect is incorrect, as significant measurable changes to the immune system have been observed.",
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
