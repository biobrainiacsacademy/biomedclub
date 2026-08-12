import { extraQuizQuestions } from "./quizQuestionsExtra";

export type QuizQuestion = {
  id: string;
  topic: string;
  lessonUrl: string;
  question: string;
  options: [string, string, string, string];
  correct: number;
  hint: string;
  explanation: string;
};

const TOPICS = {
  dna: {
    name: "The Blueprint Breakdown: DNA Extraction",
    url: "https://www.youtube.com/watch?v=pMD-5XF2gLc",
  },
  microbiome: {
    name: "The Human Microbiome: The Hidden Organ Inside You",
    url: "https://www.youtube.com/watch?v=Mv4r2PElIcE",
  },
  epigenetics: {
    name: "Epigenetics: Why Your DNA Isn't Your Destiny",
    url: "https://www.youtube.com/watch?v=5U2YbbhO48g",
  },
  organs: {
    name: "The Race To Build Artificial Organs",
    url: "https://www.youtube.com/watch?v=2wd2tDnCQxs",
  },
  pandemic: {
    name: "Pandemic Detectives: How Scientists Track New Diseases",
    url: "https://www.youtube.com/watch?v=YVs6P0leYFk",
  },
  trials: {
    name: "Inside Clinical Trials: How Medicines Become Safe",
    url: "https://www.youtube.com/watch?v=ULNtz5JgGms",
  },
  robots: {
    name: "Surgical Robots: Can Machines Save Lives?",
    url: "https://www.youtube.com/watch?v=b-b0jcy1QO0",
  },
  synthetic: {
    name: "The Science of Synthetic Organs: Building Life in the Lab",
    url: "https://www.youtube.com/watch?v=tPSC67jJ31s",
  },
} as const;

type TopicKey = keyof typeof TOPICS;

type RawQ = {
  q: string;
  o: [string, string, string, string];
  c: number;
  h: string;
  e: string;
};

const bank: Record<TopicKey, RawQ[]> = {
  dna: [
    {
      q: "What is the main goal of a DNA extraction lab?",
      o: ["To separate DNA from the rest of the cell", "To copy DNA millions of times", "To read the order of DNA bases", "To turn DNA into protein"],
      c: 0,
      h: "Think about what you physically end up holding in the tube.",
      e: "Extraction separates DNA from cell membranes, proteins, and other cell parts so you can see and collect it. Copying DNA millions of times is PCR, reading the base order is sequencing, and turning DNA into protein happens inside living cells through transcription and translation, not in an extraction tube.",
    },
    {
      q: "Why is dish soap used in a DNA extraction?",
      o: ["It breaks apart the fatty cell membranes", "It cuts DNA into pieces", "It makes DNA glow", "It kills bacteria in the sample"],
      c: 0,
      h: "Soap works on grease for the same reason it works here.",
      e: "Cell and nuclear membranes are made of lipids, and soap pulls those fats apart so DNA spills out. Cutting DNA is done by restriction enzymes, glowing requires a stain or dye, and killing bacteria is not the point of the step at all.",
    },
    {
      q: "Why is cold alcohol added at the end of the extraction?",
      o: ["DNA does not dissolve in alcohol, so it clumps out of solution", "Alcohol dissolves DNA completely", "Alcohol makes DNA replicate", "Alcohol changes DNA into RNA"],
      c: 0,
      h: "Think about what makes the white stringy layer appear.",
      e: "DNA dissolves in water but not in cold alcohol, so it precipitates out and forms visible white strands you can spool. It does not dissolve, it cannot replicate without enzymes like DNA polymerase, and nothing in the tube converts DNA into RNA.",
    },
    {
      q: "What is added to break down proteins that stick to DNA?",
      o: ["Meat tenderizer or a protease enzyme", "Table sugar", "Vinegar", "Baking soda"],
      c: 0,
      h: "One kitchen ingredient is literally an enzyme.",
      e: "Meat tenderizer contains proteases, enzymes that chop up the histone proteins wrapped around DNA so the DNA comes out clean. Sugar, vinegar, and baking soda change taste or pH but they do not digest proteins.",
    },
    {
      q: "Salt is added during extraction mainly to do what?",
      o: ["Neutralize DNA's negative charge so strands can clump together", "Give DNA a positive charge permanently", "Break the sugar backbone", "Dye the DNA blue"],
      c: 0,
      h: "DNA carries a charge that makes strands push each other away.",
      e: "DNA's phosphate backbone is negatively charged, so strands repel one another. Salt ions shield that charge so strands can stick together and become visible. Salt does not permanently change DNA's charge, does not break the backbone, and adds no color.",
    },
    {
      q: "Where is most of a human cell's DNA stored?",
      o: ["The nucleus", "The ribosome", "The cell membrane", "The Golgi apparatus"],
      c: 0,
      h: "It is the control center of the cell.",
      e: "The nucleus holds nearly all of a human cell's DNA, with a small amount in mitochondria. Ribosomes build proteins, the membrane controls what enters and leaves, and the Golgi packages and ships proteins.",
    },
    {
      q: "What are the four bases found in DNA?",
      o: ["A, T, C, G", "A, U, C, G", "A, T, C, U", "G, C, U, P"],
      c: 0,
      h: "One of these lists belongs to RNA instead.",
      e: "DNA uses adenine, thymine, cytosine, and guanine. RNA swaps thymine for uracil, which is why the list with U is RNA, and the remaining choices mix the two systems or invent a base that does not exist.",
    },
    {
      q: "In the DNA double helix, adenine always pairs with which base?",
      o: ["Thymine", "Guanine", "Cytosine", "Adenine"],
      c: 0,
      h: "Two bases pair with two hydrogen bonds, the other pair uses three.",
      e: "Adenine pairs with thymine through two hydrogen bonds, and guanine pairs with cytosine through three. Guanine and cytosine are each other's partners, and a base never pairs with a copy of itself in normal DNA.",
    },
  ],
  microbiome: [
    {
      q: "What is the human microbiome?",
      o: ["The community of microbes living in and on the body", "A single organ near the stomach", "A type of human cell", "A vitamin made in the liver"],
      c: 0,
      h: "It is a community, not a body part.",
      e: "The microbiome is the collection of bacteria, fungi, and viruses that live in and on us, especially in the gut. It is not one organ, it is not made of human cells, and it is not a vitamin, although gut microbes do help produce some vitamins.",
    },
    {
      q: "Where do most of the body's microbes live?",
      o: ["The large intestine", "The brain", "The bone marrow", "The bloodstream"],
      c: 0,
      h: "Think about the end of the digestive tract.",
      e: "The large intestine is the densest microbial habitat in the body because it is warm, low in oxygen, and full of leftover fiber. The brain, bone marrow, and bloodstream are normally kept nearly sterile, and microbes in the blood usually signal serious infection.",
    },
    {
      q: "Which of these is a real job the gut microbiome does?",
      o: ["Helping digest fiber the body cannot break down", "Pumping blood", "Filtering urine", "Producing insulin"],
      c: 0,
      h: "Think about what happens to fiber you eat.",
      e: "Gut bacteria ferment fiber into short chain fatty acids that feed intestinal cells. Pumping blood is the heart's job, filtering waste into urine is the kidneys' job, and insulin is made by beta cells in the pancreas.",
    },
    {
      q: "Why is the microbiome sometimes called a hidden organ?",
      o: ["It performs organ-like functions such as digestion and immune training", "It is a solid structure attached to the liver", "It can be surgically removed in one piece", "It is visible on an X-ray"],
      c: 0,
      h: "The word organ here is about function, not shape.",
      e: "Scientists call it a hidden organ because it carries out essential jobs like digestion, vitamin production, and immune education, even though it has no fixed shape. It is not attached to the liver, cannot be removed as a unit, and does not show up on an X-ray.",
    },
    {
      q: "What are probiotics?",
      o: ["Live beneficial microbes taken to support the microbiome", "Fibers that feed gut bacteria", "Drugs that kill all bacteria", "Sugars found only in meat"],
      c: 0,
      h: "Compare the words probiotic and prebiotic.",
      e: "Probiotics are live helpful microbes, while prebiotics are the fibers that feed them. Drugs that kill bacteria broadly are antibiotics, and the last option describes nothing real since meat contains almost no fiber or gut-feeding sugars.",
    },
    {
      q: "How can antibiotics affect the microbiome?",
      o: ["They can wipe out helpful bacteria along with harmful ones", "They only kill viruses", "They permanently sterilize the gut", "They have no effect on gut bacteria"],
      c: 0,
      h: "Antibiotics are not very picky.",
      e: "Antibiotics often reduce helpful species along with the infection, which is why gut upset is a common side effect. They do not work on viruses, the gut is recolonized over time rather than permanently sterilized, and saying they have no effect contradicts what doctors observe.",
    },
    {
      q: "Which factor most shapes a baby's first microbiome?",
      o: ["Birth method and early feeding", "Eye color", "Blood type alone", "The season of the year"],
      c: 0,
      h: "Think about the very first microbes a newborn meets.",
      e: "Delivery method and whether a baby is breastfed or formula fed strongly shape which microbes arrive first. Eye color is unrelated genetics, blood type by itself does not determine microbial colonization, and season has only tiny indirect effects.",
    },
    {
      q: "What is a short chain fatty acid such as butyrate?",
      o: ["A helpful molecule made when gut bacteria ferment fiber", "A type of human hormone made in the brain", "A vitamin found only in citrus", "A protein that carries oxygen"],
      c: 0,
      h: "It comes from fiber breakdown.",
      e: "Butyrate is produced when gut bacteria ferment dietary fiber, and it feeds colon cells and calms inflammation. It is not a brain hormone, vitamin C is the citrus vitamin, and the oxygen carrying protein is hemoglobin.",
    },
  ],
  epigenetics: [
    {
      q: "What does epigenetics study?",
      o: ["Changes in gene activity that do not change the DNA sequence", "Random mutations in DNA bases", "How bones grow", "The structure of the cell membrane"],
      c: 0,
      h: "The prefix epi means above or on top of.",
      e: "Epigenetics looks at chemical marks that turn genes up or down without altering the underlying letters of DNA. Mutations do change the sequence, bone growth is developmental biology, and membrane structure is cell biology.",
    },
    {
      q: "Which chemical mark most commonly silences a gene?",
      o: ["DNA methylation", "Phosphate removal from ATP", "Adding oxygen to hemoglobin", "Salt binding to DNA"],
      c: 0,
      h: "A small methyl group is added to cytosine bases.",
      e: "Adding methyl groups to DNA, usually at cytosines in promoter regions, typically blocks the gene from being read. ATP energy transfer, oxygen binding in blood, and salt shielding are unrelated chemistry that do not switch genes off.",
    },
    {
      q: "Histone proteins matter in epigenetics because they do what?",
      o: ["Package DNA and control how tightly it is wound", "Copy DNA into new strands", "Break DNA into fragments", "Turn RNA into DNA"],
      c: 0,
      h: "DNA wraps around them like thread on a spool.",
      e: "DNA coils around histones, and chemical tags on those histones loosen or tighten the packaging, which controls whether genes can be read. Copying DNA is polymerase, cutting DNA is nucleases, and making DNA from RNA is reverse transcriptase.",
    },
    {
      q: "Why can identical twins look and behave differently over time?",
      o: ["Different environments create different epigenetic patterns", "Their DNA sequences slowly swap", "One twin loses chromosomes", "Twins never share the same DNA"],
      c: 0,
      h: "Same code, different settings.",
      e: "Twins start with the same sequence, but diet, stress, and other exposures change which genes are switched on, so their epigenomes drift apart. DNA sequences do not swap between people, healthy twins do not lose chromosomes, and identical twins do start with matching DNA.",
    },
    {
      q: "Which of these can influence a person's epigenetic marks?",
      o: ["Diet, stress, sleep, and exposure to toxins", "Only the DNA you inherit", "Nothing, they are fixed at birth", "Your height alone"],
      c: 0,
      h: "Lifestyle plays a real role here.",
      e: "Environment and behavior can add or remove epigenetic marks throughout life. Inherited DNA sets the code but not all the settings, marks are clearly not fixed at birth, and height is an outcome rather than a cause.",
    },
    {
      q: "How do stem cells become different cell types with the same DNA?",
      o: ["Different genes are switched on and off in each cell type", "Each cell type deletes the genes it does not need", "Each cell type gains new chromosomes", "They copy DNA from nearby cells"],
      c: 0,
      h: "Every body cell carries the same instruction book.",
      e: "Cell identity comes from which genes are active, controlled largely by epigenetic regulation. Cells do not delete unused genes, do not gain extra chromosomes during normal differentiation, and do not copy DNA from neighbors.",
    },
    {
      q: "Can some epigenetic changes be reversed?",
      o: ["Yes, marks can be added or removed by enzymes", "No, they are permanent once made", "Only through surgery", "Only in plants"],
      c: 0,
      h: "There are enzymes that write marks and others that erase them.",
      e: "Writer and eraser enzymes add and remove methyl and acetyl groups, so many epigenetic states are reversible, which is why some drugs target them. They are not permanent, surgery has nothing to do with it, and reversibility is not limited to plants.",
    },
    {
      q: "Which statement best fits the phrase your DNA is not your destiny?",
      o: ["Gene expression is shaped by environment, not just sequence", "Genes have no effect on health", "You can rewrite your DNA sequence by eating well", "Only twins are affected by genetics"],
      c: 0,
      h: "It is about balance between genes and environment.",
      e: "The phrase means inherited genes set possibilities while environment influences which ones are expressed. Genes clearly do matter, diet does not rewrite your sequence, and genetics affects everyone, not only twins.",
    },
  ],
  organs: [
    {
      q: "What is the biggest problem artificial organs aim to solve?",
      o: ["The shortage of donor organs for transplant", "The high cost of bandages", "A lack of hospital beds", "Slow ambulance response times"],
      c: 0,
      h: "Think about transplant waiting lists.",
      e: "Far more patients need transplants than there are donor organs, so many die waiting. Bandage cost, bed counts, and ambulance speed are real healthcare issues but none of them are what lab grown organs are designed to fix.",
    },
    {
      q: "What is a scaffold in tissue engineering?",
      o: ["A structure that gives cells a shape to grow on", "A machine that pumps blood", "A drug that stops rejection", "A type of stem cell"],
      c: 0,
      h: "Think about construction scaffolding.",
      e: "A scaffold is the three dimensional framework, natural or synthetic, that cells attach to and organize around. Blood pumps are devices, anti rejection drugs are immunosuppressants, and stem cells are the living material placed onto the scaffold.",
    },
    {
      q: "What does a bioreactor do?",
      o: ["Provides warmth, nutrients, and conditions for growing tissue", "Prints organs layer by layer", "Sequences a patient's genome", "Removes cells from a donor organ"],
      c: 0,
      h: "It is basically a life support tank for cells.",
      e: "A bioreactor keeps temperature, oxygen, nutrients, and sometimes mechanical motion just right so engineered tissue matures. Printing is bioprinting, genome reading is sequencing, and stripping cells out is decellularization.",
    },
    {
      q: "Which organ has been successfully lab grown and implanted in patients?",
      o: ["Bladder", "Whole heart", "Whole brain", "Complete pancreas"],
      c: 0,
      h: "Start with the simplest hollow organ.",
      e: "Lab grown bladders built on scaffolds seeded with a patient's own cells have been implanted successfully because bladders are relatively simple hollow structures. Whole hearts, brains, and pancreases are far too complex and remain experimental.",
    },
    {
      q: "Why is vascularization such a hard problem for engineered organs?",
      o: ["Thick tissue needs blood vessels or inner cells starve", "Blood vessels make organs too heavy", "Vessels block the immune system", "Vessels stop cells from dividing"],
      c: 0,
      h: "Oxygen only diffuses a fraction of a millimeter.",
      e: "Cells more than roughly a fraction of a millimeter from a vessel cannot get oxygen and nutrients, so thick tissues die without a vascular network. Vessels do not add meaningful weight, do not block immunity, and do not stop cell division.",
    },
    {
      q: "Using a patient's own cells to build an organ mainly helps by doing what?",
      o: ["Lowering the risk of immune rejection", "Making the organ grow instantly", "Removing the need for surgery", "Guaranteeing the organ never fails"],
      c: 0,
      h: "Think about why transplants get rejected.",
      e: "The immune system attacks tissue it reads as foreign, so a patient's own cells greatly reduce rejection risk. Growth still takes weeks or months, surgery is still required to implant, and no organ is guaranteed to last forever.",
    },
    {
      q: "What is 3D bioprinting?",
      o: ["Layer by layer printing using bio-ink made of cells and gel", "Printing X-ray images in 3D", "Printing plastic models of organs only", "Printing medicine labels"],
      c: 0,
      h: "The ink is alive.",
      e: "Bioprinters deposit bio-ink containing living cells in precise layers to build tissue structures. Printing scans or plastic anatomy models uses no living cells, and label printing is not medicine at all.",
    },
    {
      q: "Which is a major ethical concern with lab grown organs?",
      o: ["Fair access and high cost of the technology", "Organs being too easy to make", "Too many surgeons available", "Patients healing too fast"],
      c: 0,
      h: "Ask who would be able to afford it.",
      e: "Advanced organ engineering is expensive, raising real concerns about who gets access. The other options describe advantages or non-problems rather than ethical dilemmas.",
    },
  ],
  pandemic: [
    {
      q: "What is a pandemic?",
      o: ["A disease outbreak spreading across many countries or continents", "Any illness in one hospital", "A disease that only affects animals", "A seasonal allergy pattern"],
      c: 0,
      h: "Think about scale and geography.",
      e: "A pandemic spreads across multiple countries or continents and affects large numbers of people. An outbreak in one hospital is local, animal-only diseases are epizootics, and allergies are not infectious at all.",
    },
    {
      q: "What is a zoonotic disease?",
      o: ["A disease that spreads from animals to humans", "A disease only found in zoos", "A disease caused by allergies", "A genetic disease passed from parents"],
      c: 0,
      h: "The root zoo means animal.",
      e: "Zoonotic diseases jump from animals to people through spillover events, as with many flu strains. Zoos are not required, allergies are immune overreactions, and inherited conditions are genetic rather than infectious.",
    },
    {
      q: "Which lab test detects a virus's genetic material?",
      o: ["PCR", "MRI", "X-ray", "Ultrasound"],
      c: 0,
      h: "Three of these are imaging tools.",
      e: "PCR amplifies and detects a pathogen's genetic material, making it highly sensitive. MRI, X-ray, and ultrasound produce pictures of the body and cannot identify a virus's genome.",
    },
    {
      q: "What do epidemiologists mainly do during an outbreak?",
      o: ["Investigate patterns of who is infected, where, and how", "Perform surgery on patients", "Design hospital buildings", "Manufacture vaccines on the factory floor"],
      c: 0,
      h: "They are the detectives of public health.",
      e: "Epidemiologists interview patients, trace infections, and analyze data to understand spread. Surgery is for surgeons, buildings are for architects, and vaccine manufacturing is a separate industrial process.",
    },
    {
      q: "What is contact tracing?",
      o: ["Finding and notifying people exposed to an infected person", "Mapping the genome of a virus", "Counting hospital beds", "Testing water for chemicals"],
      c: 0,
      h: "It follows chains of transmission.",
      e: "Contact tracing identifies exposed people so they can be tested, monitored, or isolated, which breaks transmission chains. Genome mapping is sequencing, bed counts are capacity planning, and chemical water testing is environmental science.",
    },
    {
      q: "Why is genome sequencing useful during an outbreak?",
      o: ["It reveals mutations and helps track new variants", "It cures the infected patient", "It replaces the need for vaccines", "It shows a patient's blood pressure"],
      c: 0,
      h: "It reads the pathogen's code letter by letter.",
      e: "Sequencing shows how a pathogen is changing and how strains are related, which helps track spread. It is a diagnostic and research tool, not a treatment, it does not replace vaccines, and it says nothing about blood pressure.",
    },
    {
      q: "Which organizations coordinate global outbreak response?",
      o: ["WHO and CDC", "NASA and ESA", "FIFA and IOC", "SEC and IRS"],
      c: 0,
      h: "Look for the health agencies.",
      e: "The World Health Organization and the Centers for Disease Control and Prevention monitor diseases and coordinate responses. The other pairs handle space exploration, sports, and finance.",
    },
    {
      q: "What is wastewater surveillance used for?",
      o: ["Detecting pathogens in a community before cases are reported", "Cleaning drinking water", "Measuring rainfall", "Testing soil for nutrients"],
      c: 0,
      h: "People shed virus even before symptoms show.",
      e: "Sampling sewage can reveal rising pathogen levels days before clinical cases climb, giving early warning. Water treatment, rainfall measurement, and soil testing are unrelated to disease surveillance.",
    },
  ],
  trials: [
    {
      q: "What is a clinical trial?",
      o: ["A research study testing treatments in volunteers", "A courtroom hearing about medicine", "A survey of hospital food", "A test done only on computers"],
      c: 0,
      h: "Volunteers are central to it.",
      e: "Clinical trials are carefully designed studies that test safety and effectiveness of treatments in human volunteers under strict protocols. There is no courtroom involved, food surveys are not treatment studies, and computer simulations happen before human testing.",
    },
    {
      q: "What happens before a medicine is tested in humans?",
      o: ["Laboratory and preclinical studies", "Nationwide advertising", "FDA final approval", "Phase III testing"],
      c: 0,
      h: "It comes before Phase I.",
      e: "Preclinical laboratory and animal studies evaluate safety and promise first. Advertising cannot happen before approval, final FDA approval comes after all trial phases, and Phase III is late stage human testing.",
    },
    {
      q: "What is the main focus of a Phase I trial?",
      o: ["Safety and finding the right dose", "Proving the drug cures disease", "Marketing the drug", "Comparing thousands of patients"],
      c: 0,
      h: "It is the first time humans receive it.",
      e: "Phase I uses a small group, often healthy adults, to check safety and determine dosing. Proving effectiveness is Phase II and III work, marketing comes after approval, and large comparisons happen in Phase III.",
    },
    {
      q: "Which phase usually involves the most participants?",
      o: ["Phase III", "Phase I", "Preclinical", "Phase 0"],
      c: 0,
      h: "It is the phase before FDA review.",
      e: "Phase III enrolls hundreds to thousands of patients across many hospitals to confirm effectiveness and catch rarer side effects. Phase I is small, preclinical uses no humans, and Phase 0 studies are tiny exploratory ones.",
    },
    {
      q: "Why are placebos used in trials?",
      o: ["To fairly compare results and reduce bias", "To save money on medicine", "To speed up the trial", "To cure the control group"],
      c: 0,
      h: "You need something to compare against.",
      e: "A placebo or standard treatment gives a comparison group, so researchers can tell whether improvement came from the drug rather than chance or expectation. Cost and speed are not the reason, and a placebo has no therapeutic ingredient to cure anyone.",
    },
    {
      q: "What does double blind mean?",
      o: ["Neither participants nor researchers know who gets the treatment", "Patients close their eyes during dosing", "The study is run twice", "Only the pharmacist is informed of results"],
      c: 0,
      h: "Blind refers to knowledge, not vision.",
      e: "In a double blind trial both participants and the researchers assessing them are unaware of group assignments, which prevents expectations from skewing results. It has nothing to do with eyesight, repeating the study, or pharmacist reporting.",
    },
    {
      q: "What is informed consent?",
      o: ["Volunteers understand the study risks before agreeing to join", "A doctor signing for the patient", "Agreeing to pay for treatment", "A government approval form"],
      c: 0,
      h: "It protects the volunteer's choice.",
      e: "Informed consent means participants receive full information about purpose, risks, and rights, then freely choose to enroll. A doctor cannot consent for a competent adult, it is not a payment agreement, and government approval is a separate regulatory step.",
    },
    {
      q: "What is the purpose of Phase IV studies?",
      o: ["Monitor long term safety after approval", "Test the drug in animals", "Decide the first human dose", "Write the trial protocol"],
      c: 0,
      h: "It happens after the medicine is on the market.",
      e: "Phase IV tracks a medicine once millions of people use it, catching rare side effects and long term issues. Animal testing is preclinical, first dose finding is Phase I, and protocol writing happens before any phase begins.",
    },
  ],
  robots: [
    {
      q: "In most robotic surgery today, who controls the instruments?",
      o: ["A trained surgeon at a console", "The robot's own AI", "A hospital administrator", "The patient"],
      c: 0,
      h: "The robot is a tool, not a doctor.",
      e: "Current systems translate a surgeon's hand movements into precise instrument motion, so the surgeon stays in control. Fully autonomous surgery is still experimental, administrators never operate, and patients are under anesthesia.",
    },
    {
      q: "Which is a real benefit of robotic surgery?",
      o: ["Filtering out hand tremor for steadier movements", "Eliminating the need for anesthesia", "Removing all surgical risk", "Making surgery free"],
      c: 0,
      h: "Think about steadiness and precision.",
      e: "Robotic systems can scale motion and filter tremor, allowing very fine control. Anesthesia is still required, no surgery is risk free, and robotic systems actually raise cost rather than lowering it.",
    },
    {
      q: "Why do robotic systems use 3D high definition cameras?",
      o: ["They give magnified depth perception of the surgical field", "They record videos for social media", "They replace the need for lighting", "They scan for allergies"],
      c: 0,
      h: "Depth matters when structures are millimeters apart.",
      e: "Magnified stereoscopic vision helps surgeons judge depth and identify small structures like nerves and vessels. Recording is incidental, lighting is still needed, and cameras cannot detect allergies.",
    },
    {
      q: "Robotic surgery is often described as minimally invasive because it uses what?",
      o: ["Small incisions and thin instruments", "No incisions at all", "Larger openings for better access", "Only external lasers"],
      c: 0,
      h: "Compare it to open surgery.",
      e: "Instruments enter through small ports, which reduces tissue disruption and can shorten recovery. Some incisions are still required, larger openings describe open surgery, and external lasers are a different technology.",
    },
    {
      q: "Which is a genuine limitation of robotic surgery?",
      o: ["High cost and the need for specialized training", "It cannot be used in any real hospital", "It always takes less time than open surgery", "It works without electricity"],
      c: 0,
      h: "Think about hospital budgets and access.",
      e: "Systems are expensive, require trained teams, and are not available everywhere. Robotic surgery is widely used in real hospitals, is not always faster, and obviously requires power.",
    },
    {
      q: "In which field are surgical robots most commonly used?",
      o: ["Urology, such as prostate surgery", "Dermatology skin creams", "Dentistry cleanings", "Physical therapy sessions"],
      c: 0,
      h: "Think deep, narrow spaces in the body.",
      e: "Urology, especially prostatectomy, was an early and common use because the space is deep and narrow, where precision helps most. Skin creams, routine cleanings, and physical therapy do not involve robotic operating systems.",
    },
    {
      q: "How is AI currently used alongside surgical robots?",
      o: ["Analyzing images and assisting with planning and guidance", "Performing full operations alone in routine care", "Replacing anesthesiologists", "Choosing which patients deserve surgery"],
      c: 0,
      h: "Assist is the key word.",
      e: "AI supports surgeons by recognizing structures in images and helping with planning, while humans make the decisions. Autonomous operations are research level, anesthesiologists are still essential, and patient selection is a human clinical and ethical judgment.",
    },
    {
      q: "What is haptic feedback in surgical robotics?",
      o: ["A sense of touch or resistance sent back to the surgeon", "A cooling system for the robot", "A backup power supply", "A sterilization method"],
      c: 0,
      h: "Haptic relates to touch.",
      e: "Haptic feedback recreates the feel of tissue resistance, which many current systems lack and researchers are working to improve. Cooling, power backup, and sterilization are separate engineering concerns.",
    },
  ],
  synthetic: [
    {
      q: "What are synthetic organs?",
      o: ["Lab built organs that replace or support failing natural ones", "Organs donated from another person", "Metal machines with no living cells", "Digital simulations of organs"],
      c: 0,
      h: "The key word is built rather than donated.",
      e: "Synthetic organs combine living cells with scaffolds and engineering to replicate natural structure and function. Donated organs come from people, purely mechanical devices contain no cells, and computer models are simulations rather than implantable organs.",
    },
    {
      q: "What is decellularization?",
      o: ["Stripping cells from a donor organ to leave the scaffold behind", "Adding new cells to a scaffold", "Freezing an organ for storage", "Printing a scaffold with plastic"],
      c: 0,
      h: "The prefix de means removal.",
      e: "Decellularization washes away the donor cells and leaves the connective tissue framework, which can then be reseeded. Adding cells is recellularization, freezing is cryopreservation, and printing a scaffold is fabrication.",
    },
    {
      q: "What is recellularization?",
      o: ["Seeding a scaffold with a patient's own cells", "Removing all cells from tissue", "Cutting an organ into slices", "Sterilizing surgical tools"],
      c: 0,
      h: "It is the step right after decellularization.",
      e: "Recellularization repopulates a cleaned scaffold with the recipient's cells so the new organ is less likely to be rejected. Cell removal is the opposite step, slicing is histology, and tool sterilization is unrelated.",
    },
    {
      q: "What is an organoid?",
      o: ["A tiny simplified organ grown in a dish from stem cells", "A full sized transplantable organ", "A robotic organ replacement", "A type of antibiotic"],
      c: 0,
      h: "Think mini and research focused.",
      e: "Organoids are millimeter scale tissue clusters that mimic some organ functions and are used for research and drug testing. They are not full transplantable organs, not robotic, and have nothing to do with antibiotics.",
    },
    {
      q: "Why are stem cells so valuable in building synthetic organs?",
      o: ["They can develop into many different cell types", "They never need nutrients", "They are made of metal", "They cannot divide"],
      c: 0,
      h: "Think about flexibility of cell fate.",
      e: "Stem cells are unspecialized and can differentiate into the many cell types an organ needs. They do need nutrients and oxygen, they are living cells rather than metal, and their ability to divide is exactly what makes them useful.",
    },
    {
      q: "Which engineered tissue is already used routinely in patients?",
      o: ["Skin substitutes for burns and wounds", "Lab grown lungs", "Lab grown brains", "Lab grown kidneys"],
      c: 0,
      h: "Start with the body's largest and simplest layered organ.",
      e: "Engineered skin grafts are used clinically for burns and chronic wounds because skin is relatively thin and layered. Lungs, brains, and kidneys are far more complex and remain experimental.",
    },
    {
      q: "Why is nerve integration important for a synthetic organ?",
      o: ["Some organs need nerve signals to work and coordinate", "Nerves supply the organ with blood", "Nerves make the organ sterile", "Nerves prevent all rejection"],
      c: 0,
      h: "Think about how the body tells an organ what to do.",
      e: "Organs like the bladder rely on nerve signals for timing and control, so integration matters for real function. Blood comes from vessels, sterility comes from clean technique, and rejection is an immune issue handled by cell matching and drugs.",
    },
    {
      q: "What is a smart biomaterial scaffold?",
      o: ["A material that responds to the body and can guide or release signals", "A scaffold made of ordinary steel", "A scaffold that never interacts with cells", "A paper template for surgeons"],
      c: 0,
      h: "Smart means responsive.",
      e: "Smart scaffolds can degrade at controlled rates or release growth factors to guide cell behavior. Plain steel is inert and permanent, a non interactive scaffold defeats the purpose, and a paper template is a planning aid rather than an implant.",
    },
  ],
};

const baseQuestions: QuizQuestion[] = Object.entries(bank).flatMap(([key, list]) =>
  list.map((item, i) => ({
    id: `${key}-${i}`,
    topic: TOPICS[key as TopicKey].name,
    lessonUrl: TOPICS[key as TopicKey].url,
    question: item.q,
    options: item.o,
    correct: item.c,
    hint: item.h,
    explanation: item.e,
  })),
);

/** Deterministic per question shuffle so the answer is not always option A. */
const seededShuffle = (q: QuizQuestion): QuizQuestion => {
  let h = 2166136261;
  for (let i = 0; i < q.id.length; i++) {
    h ^= q.id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const idx = [0, 1, 2, 3];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const options = idx.map((i) => q.options[i]) as [string, string, string, string];
  return { ...q, options, correct: idx.indexOf(q.correct) };
};

export const quizQuestions: QuizQuestion[] = [...baseQuestions, ...extraQuizQuestions].map(
  seededShuffle,
);

export const quizTopics: { name: string; url: string; count: number }[] = Object.values(
  quizQuestions.reduce<Record<string, { name: string; url: string; count: number }>>((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = { name: q.topic, url: q.lessonUrl, count: 0 };
    acc[q.topic].count += 1;
    return acc;
  }, {}),
).sort((a, b) => a.name.localeCompare(b.name));

export const totalQuestions = quizQuestions.length;

