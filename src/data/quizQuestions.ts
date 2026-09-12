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
      o: ["Isolate DNA from cell parts", "Copy DNA to make more", "Sequence DNA base pairs", "Convert DNA into protein"],
      c: 0,
      h: "Consider the primary objective of separating DNA from its cellular environment.",
      e: "The main goal of a DNA extraction lab is to Isolate DNA from cell parts, meaning to separate the DNA from all other cellular components. It is not to Copy DNA to make more, as that is a different process like PCR. It is also not to Sequence DNA base pairs, which is done after extraction to determine the order of nucleotides. Lastly, it is not to Convert DNA into protein, which describes gene expression or translation.",
    },
    {
      q: "Why is dish soap used in a DNA extraction?",
      o: ["Breaks DNA into pieces", "Makes DNA appear brighter", "Kills bacteria in sample", "Dissolves cell membranes"],
      c: 3,
      h: "Think about the structure of a cell and what needs to be broken down to release DNA.",
      e: "Dish soap is used in a DNA extraction because it Dissolves cell membranes. Cell membranes are made of lipids, and soap helps to break down these fatty layers. It does not Break DNA into pieces, as that would damage the DNA. It also does not Make DNA appear brighter, nor does it Kill bacteria in sample, although some soaps have antiseptic properties, that is not its primary role in DNA extraction.",
    },
    {
      q: "Why is cold alcohol added at the end of the extraction?",
      o: ["DNA won't dissolve, it clumps", "Alcohol dissolves DNA fully", "Alcohol causes DNA replication", "Alcohol converts DNA to RNA"],
      c: 0,
      h: "Consider how DNA behaves in different solutions, especially when separating it from water.",
      e: "Cold alcohol is added at the end of the extraction because DNA won't dissolve, it clumps. DNA is not soluble in alcohol, causing it to precipitate out of the solution and become visible. Alcohol does not dissolve DNA fully, which would defeat the purpose. It also does not cause DNA replication, nor does it convert DNA to RNA, as those are biological processes.",
    },
    {
      q: "What is added to break down proteins that stick to DNA?",
      o: ["Meat tenderizer, a protease enzyme", "Table sugar, a sweet molecule", "Vinegar, an acidic solution", "Baking soda, a basic compound"],
      c: 0,
      h: "Recall which type of biological molecule is often broken down by enzymes that end in 'ase'.",
      e: "Meat tenderizer, a protease enzyme is added to break down proteins that stick to DNA. Proteases are enzymes that specifically break down proteins, which can be bound to DNA or part of the cellular debris. Table sugar, a sweet molecule, would not break down proteins. Vinegar, an acidic solution, and Baking soda, a basic compound, might denature proteins but are not typically used for targeted breakdown in DNA extraction like proteases.",
    },
    {
      q: "Salt is added during extraction mainly to do what?",
      o: ["Give DNA a positive charge", "Break the sugar backbone apart", "Neutralize DNA, allowing clumps", "Dye the DNA a blue color"],
      c: 2,
      h: "Think about the charge of DNA and how salt might influence its interaction with water.",
      e: "Salt is added during extraction mainly to neutralize DNA, allowing clumps. DNA has a negative charge, and the positive ions from salt neutralize this charge, allowing the DNA strands to come closer together and precipitate more easily. It does not Give DNA a positive charge, nor does it Break the sugar backbone apart. It also does not Dye the DNA a blue color, as dyes are separate reagents.",
    },
    {
      q: "Where is most of a human cell's DNA stored?",
      o: ["In the cell's nucleus", "In the cell's ribosome", "In the cell's membrane", "In the Golgi apparatus"],
      c: 0,
      h: "Consider the primary location where genetic material is organized and protected within a eukaryotic cell.",
      e: "Most of a human cell's DNA is stored In the cell's nucleus. The nucleus is the control center of the cell and contains the vast majority of the cell's genetic material. The cell's ribosome is involved in protein synthesis, not DNA storage. The cell's membrane regulates what enters and leaves the cell, and the Golgi apparatus modifies, sorts, and packages proteins and lipids.",
    },
    {
      q: "What are the four bases found in DNA?",
      o: ["Adenine, Uracil, Cytosine, Guanine", "Adenine, Thymine, Cytosine, Uracil", "Guanine, Cytosine, Uracil, Phosphate", "Adenine, Thymine, Cytosine, Guanine"],
      c: 3,
      h: "Recall the unique nitrogenous bases that make up the genetic alphabet of DNA, distinguishing them from those found in RNA.",
      e: "The correct answer is Adenine, Thymine, Cytosine, Guanine. These are the four nitrogenous bases specific to DNA. Adenine, Uracil, Cytosine, Guanine is incorrect because Uracil replaces Thymine in RNA, not DNA. Adenine, Thymine, Cytosine, Uracil is incorrect because DNA contains Thymine, not Uracil, as its fourth base. Guanine, Cytosine, Uracil, Phosphate is incorrect because Uracil is an RNA base, and phosphate is part of the DNA backbone, not one of the four bases.",
    },
    {
      q: "In the DNA double helix, adenine always pairs with which base?",
      o: ["Adenine pairs with Guanine", "Adenine pairs with Thymine", "Adenine pairs with Cytosine", "Adenine pairs with Uracil"],
      c: 1,
      h: "Remember the specific base pairing rule for adenine in the DNA double helix.",
      e: "The correct answer is Adenine pairs with Thymine. In DNA, adenine always forms two hydrogen bonds with thymine. Adenine pairs with Guanine is incorrect because adenine pairs with thymine, and guanine pairs with cytosine. Adenine pairs with Cytosine is incorrect because adenine pairs with thymine, and cytosine pairs with guanine. Adenine pairs with Uracil is incorrect because uracil is found in RNA, not DNA, and adenine pairs with thymine in DNA.",
    },
  ],
  microbiome: [
    {
      q: "What is the human microbiome?",
      o: ["All microbes in or on body", "One organ by the stomach", "A specific type of cell", "A key vitamin from liver"],
      c: 0,
      h: "Consider all the microscopic life forms that live on and within the human body.",
      e: "The correct answer is All microbes in or on body. The human microbiome refers to the collective genetic material of all microbes, including bacteria, fungi, protozoa, and viruses, that reside on or in the human body. One organ by the stomach is incorrect because the microbiome encompasses the entire body, not just a single organ. A specific type of cell is incorrect because the microbiome refers to a community of microorganisms, not a single cell type. A key vitamin from liver is incorrect because the microbiome is a collection of living organisms, not a vitamin.",
    },
    {
      q: "Where do most of the body's microbes live?",
      o: ["Most microbes in the brain", "Most microbes in bloodstream", "Most microbes in large intestine", "Most microbes in bone marrow"],
      c: 2,
      h: "Think about the parts of the body that provide a rich, diverse environment for microorganisms.",
      e: "The correct answer is Most microbes in large intestine. The large intestine provides an ideal environment for a vast and diverse community of microbes due to its anaerobic conditions and abundant nutrients. Most microbes in the brain is incorrect because the brain is largely sterile. Most microbes in bloodstream is incorrect because the bloodstream is typically sterile and microbes there would indicate an infection. Most microbes in bone marrow is incorrect because bone marrow is a sterile environment involved in blood cell production.",
    },
    {
      q: "Which of these is a real job the gut microbiome does?",
      o: ["Pumps blood through body", "Filters waste from urine", "Helps digest fiber in gut", "Produces insulin in pancreas"],
      c: 2,
      h: "Consider the roles that microorganisms play in maintaining human health, particularly in digestion.",
      e: "The correct answer is Helps digest fiber in gut. Gut microbes ferment complex carbohydrates, like fiber, that human enzymes cannot break down, producing beneficial short chain fatty acids. Pumps blood through body is incorrect because the heart is responsible for pumping blood. Filters waste from urine is incorrect because the kidneys filter waste from the blood to produce urine. Produces insulin in pancreas is incorrect because specialized cells in the pancreas produce insulin.",
    },
    {
      q: "Why is the microbiome sometimes called a hidden organ?",
      o: ["Performs organ like functions", "A solid structure near liver", "Can be surgically removed easily", "Clearly visible on an X ray"],
      c: 0,
      h: "Reflect on how the functions of the microbiome compare to those of traditional organs in the body.",
      e: "The correct answer is Performs organ like functions. The microbiome contributes to essential bodily processes like digestion, vitamin synthesis, and immune system development, much like a traditional organ. A solid structure near liver is incorrect because the microbiome is a collection of microorganisms, not a single solid structure. Can be surgically removed easily is incorrect because the microbiome is dispersed throughout the body, making surgical removal impractical and not a defining characteristic. Clearly visible on an X ray is incorrect because individual microbes are microscopic and not visible on standard X rays.",
    },
    {
      q: "What are probiotics?",
      o: ["Dietary fibers for bacteria", "Beneficial gut bacteria", "Medicines that kill all germs", "Sugars from red meat only"],
      c: 1,
      h: "Consider the meaning of 'pro' and 'biotic' in relation to the gut.",
      e: "The correct answer is Beneficial gut bacteria. Probiotics are living microorganisms, usually bacteria, that provide health benefits when consumed, often by improving or restoring the gut flora. Dietary fibers for bacteria describes prebiotics, which are food for beneficial bacteria. Medicines that kill all germs describes broad spectrum antibiotics. Sugars from red meat only is incorrect, as probiotics are not sugars and are not exclusively found in red meat.",
    },
    {
      q: "How can antibiotics affect the microbiome?",
      o: ["Only destroy harmful viruses", "Kill good and bad bacteria", "Permanently sterilize the gut", "Do not affect gut microbes"],
      c: 1,
      h: "Think about the broad impact of antibiotics on microbial populations, not just harmful ones.",
      e: "The correct answer is Kill good and bad bacteria. Antibiotics are designed to target and kill bacteria, but they often cannot differentiate between harmful pathogenic bacteria and beneficial bacteria in the microbiome, leading to a reduction in both populations. Only destroy harmful viruses is incorrect, as antibiotics target bacteria, not viruses. Permanently sterilize the gut is an overstatement, as the gut microbiome can often recover, though it may be altered. Do not affect gut microbes is incorrect, as antibiotics have a significant impact on gut microbial communities.",
    },
    {
      q: "Which factor most shapes a baby's first microbiome?",
      o: ["Inherited eye color genetics", "Blood type alone matters", "The season of the year", "Birth method and early diet"],
      c: 3,
      h: "Consider the first significant exposures a baby has and what they consume.",
      e: "The correct answer is Birth method and early diet. A baby's first exposure to microbes occurs during birth, either through the birth canal or via skin contact during a C section, and their early diet, particularly breastfeeding versus formula feeding, significantly influences the developing microbiome. Inherited eye color genetics is incorrect, as genetics play a role in susceptibility but do not directly shape the microbiome's composition. Blood type alone matters is incorrect, as blood type is not a primary factor in microbiome development. The season of the year is incorrect, as while environment plays a role, birth method and diet are far more direct and significant influences at this stage.",
    },
    {
      q: "What is a short chain fatty acid such as butyrate?",
      o: ["Brain's own human hormone", "Vitamin from citrus fruits", "Molecule made by gut microbes", "Protein carrying oxygen"],
      c: 2,
      h: "Think about what substances gut microbes produce that are beneficial to the host.",
      e: "The correct answer is Molecule made by gut microbes. Short chain fatty acids like butyrate are produced when beneficial gut bacteria ferment dietary fibers in the colon, and they play crucial roles in gut health and overall metabolic regulation. Brain's own human hormone is incorrect, as short chain fatty acids are not hormones produced by the brain. Vitamin from citrus fruits is incorrect, as they are not vitamins and are not primarily sourced from citrus fruits. Protein carrying oxygen is incorrect, as this describes molecules like hemoglobin, which are not short chain fatty acids.",
    },
  ],
  epigenetics: [
    {
      q: "What does epigenetics study?",
      o: ["Random DNA base changes", "How bones grow over time", "Cell membrane structure", "Gene activity, no DNA change"],
      c: 3,
      h: "This field explores how external factors can influence gene expression without altering the underlying DNA sequence.",
      e: "The correct answer is 'Gene activity, no DNA change'. Epigenetics studies how behaviors and environment can cause changes that affect the way genes work, without altering the DNA sequence itself, but by turning genes 'on' or 'off'. 'Random DNA base changes' describes mutations. 'How bones grow over time' is a topic in developmental biology or osteology, but not epigenetics specifically. 'Cell membrane structure' is a topic in cell biology.",
    },
    {
      q: "Which chemical mark most commonly silences a gene?",
      o: ["Phosphate removal from ATP", "Adding oxygen to hemoglobin", "Salt binding onto DNA", "Adding methyl to DNA"],
      c: 3,
      h: "Consider a common chemical modification to DNA that can compact it and make genes inaccessible.",
      e: "The correct answer is 'Adding methyl to DNA'. DNA methylation, specifically the addition of a methyl group to cytosine bases, is a common epigenetic mechanism that typically silences genes by recruiting proteins that block transcription or by directly interfering with transcription factor binding. 'Phosphate removal from ATP' is a part of energy release, not gene silencing. 'Adding oxygen to hemoglobin' describes oxygen transport in blood. 'Salt binding onto DNA' is a general interaction and not the primary mechanism for targeted gene silencing.",
    },
    {
      q: "Histone proteins matter in epigenetics because what is their function?",
      o: ["They package DNA into chromosomes", "They make copies of DNA", "They chop DNA into fragments", "They change RNA to DNA"],
      c: 0,
      h: "Consider the structural role of histones in organizing genetic material within a cell.",
      e: "The correct answer is 'They package DNA into chromosomes'. Histone proteins are crucial for compacting DNA into a smaller volume to fit within the cell's nucleus, forming structures called chromosomes. They do not 'make copies of DNA', as that is the role of DNA polymerase during replication. They do not 'chop DNA into fragments', which is a function of restriction enzymes or DNA repair mechanisms. They also do not 'change RNA to DNA', as that process, reverse transcription, is carried out by reverse transcriptase.",
    },
    {
      q: "Why can identical twins look and behave differently over time?",
      o: ["Environment changes gene activity.", "DNA sequences always swap.", "One twin loses its chromosomes.", "Twins do not share genes."],
      c: 0,
      h: "Think about how external factors can influence genetic expression without changing the underlying code.",
      e: "The correct answer is Environment changes gene activity. Even though identical twins share the same DNA sequence, their environments, lifestyles, and experiences can lead to different epigenetic modifications, which in turn alter how their genes are expressed, leading to differences in appearance and behavior over time. DNA sequences do not always swap; this is not a common biological process explaining differences in identical twins. One twin does not lose its chromosomes; this would be a major genetic anomaly incompatible with healthy development. Twins do not share genes is incorrect, as identical twins are genetically identical, sharing nearly all their genes.",
    },
    {
      q: "Which of these can influence a person's epigenetic marks?",
      o: ["Only inherited DNA matters.", "Diet, stress, and toxins.", "Epigenetics fixed at birth.", "Your height alone affects."],
      c: 1,
      h: "Consider daily influences and lifestyle choices that might impact cellular processes.",
      e: "The correct answer is Diet, stress, and toxins. These environmental factors can significantly influence a person's epigenetic marks by altering chemical tags on DNA or histone proteins, thereby affecting gene expression. Only inherited DNA matters is incorrect because epigenetics specifically studies changes in gene expression that are not due to alterations in the DNA sequence itself. Epigenetics fixed at birth is also incorrect, as epigenetic marks are dynamic and can change throughout an individual's life in response to various stimuli. Your height alone affects is not a recognized factor influencing epigenetic marks.",
    },
    {
      q: "How do stem cells become different cell types with the same DNA?",
      o: ["Cells delete unneeded genes.", "Cells gain new chromosomes.", "They copy nearby DNA.", "Genes switch on and off."],
      c: 3,
      h: "Think about how different cell types, despite having the same blueprint, express different parts of that blueprint.",
      e: "The correct answer is Genes switch on and off. Stem cells differentiate into various specialized cell types by selectively activating or deactivating specific genes through epigenetic mechanisms, even though all cells retain the same complete set of DNA. Cells do not delete unneeded genes during differentiation. Cells do not gain new chromosomes; their chromosome number typically remains constant. They do not copy nearby DNA to differentiate into new types.",
    },
    {
      q: "Can some epigenetic changes be reversed?",
      o: ["No, marks are permanent.", "Only through surgery works.", "Only plants show reversal.", "Yes, enzymes alter marks."],
      c: 3,
      h: "Consider the dynamic nature of epigenetic tags and the cellular machinery involved in modifying them.",
      e: "The correct answer is Yes, enzymes alter marks. Epigenetic changes, such as DNA methylation or histone modifications, are dynamic and can be reversed by specific enzymes that add or remove these chemical tags, allowing for flexibility in gene expression. No, marks are permanent is incorrect. Only through surgery works is incorrect, as surgery is not a mechanism for reversing epigenetic marks. Only plants show reversal is also incorrect, as epigenetic reversal occurs in many organisms, including humans.",
    },
    {
      q: "Which statement best fits the phrase 'your DNA is not your destiny'?",
      o: ["Genes have no health effect", "Environment shapes gene expression", "You can rewrite your DNA", "Only twins show genetics"],
      c: 1,
      h: "This phrase suggests that while your genes provide a foundation, other forces play a significant role in your biological outcome.",
      e: "The correct answer is 'Environment shapes gene expression'. The phrase 'your DNA is not your destiny' emphasizes that while DNA provides the genetic blueprint, environmental factors, lifestyle, and experiences can significantly influence how those genes are expressed, thereby shaping an individual's traits and health outcomes. 'Genes have no health effect' is incorrect, as genes undeniably play a critical role in health. 'You can rewrite your DNA' is generally incorrect in the context of natural biological processes. 'Only twins show genetics' is incorrect, as genetics apply to all individuals.",
    },
  ],
  organs: [
    {
      q: "What is the biggest problem artificial organs aim to solve?",
      o: ["Organ donation shortage", "Surgery costs too high", "Doctors lack training skills", "Recovery time is very slow"],
      c: 0,
      h: "Consider the current limitations and challenges faced by patients needing organ transplants.",
      e: "The correct option is Organ donation shortage. Artificial organs are primarily developed to address the critical lack of available organs from donors, which results in long waiting lists and patient deaths. Surgery costs too high, while a concern, is not the primary problem artificial organs aim to solve, as costs are often associated with complex medical procedures regardless of organ origin. Doctors lack training skills is incorrect, as medical professionals are continually trained, and this is not the fundamental issue artificial organs address. Recovery time is very slow is also not the main problem, although faster recovery is a beneficial outcome, the core issue remains organ availability.",
    },
    {
      q: "What is a scaffold in tissue engineering?",
      o: ["A fluid pump machine", "A structure for cell growth", "A drug for infection", "A living cell culture"],
      c: 1,
      h: "Think about what provides structural support for something to grow upon, especially in a biological context.",
      e: "The correct option is A structure for cell growth. In tissue engineering, a scaffold acts as a temporary framework or support matrix that encourages cells to attach, proliferate, and differentiate, eventually forming new tissue. A fluid pump machine is incorrect, as scaffolds are physical structures, not mechanical devices for fluid transport. A drug for infection is wrong because scaffolds are not pharmacological agents used to treat infections. A living cell culture describes cells growing in a controlled environment, but the scaffold is the underlying support for that growth, not the culture itself.",
    },
    {
      q: "What does a bioreactor do?",
      o: ["Prints tissues layer by layer", "Grows tissues in control", "Analyzes genetic patient data", "Removes donor cells only"],
      c: 1,
      h: "Consider controlled environments used to support and develop biological systems outside a living organism.",
      e: "The correct option is Grows tissues in control. A bioreactor provides a controlled environment, including nutrients, oxygen, and physical stimuli, necessary for cells to grow and organize into functional tissues or organs in vitro. Prints tissues layer by layer describes a method like 3D bioprinting, which can be part of tissue engineering but is not the sole function of a bioreactor. Analyzes genetic patient data is incorrect, as this is a function of genetic testing and analysis, not a bioreactor. Removes donor cells only is wrong, as a bioreactor's purpose is to promote growth and development, not solely to remove specific cells.",
    },
    {
      q: "Which organ has been successfully lab grown and implanted in patients?",
      o: ["The urinary bladder", "The human heart", "The complex human brain", "A working pancreas"],
      c: 0,
      h: "Consider which organ has a relatively simple structure and function, making it an early candidate for successful lab engineering.",
      e: "The correct option is The urinary bladder. The urinary bladder was one of the first organs successfully grown in a lab and implanted into patients, demonstrating functional success. The human heart, while a target for bioengineering, has not yet been successfully grown and implanted as a fully functional organ. The complex human brain is far too intricate to be fully lab grown and implanted. A working pancreas, while also a goal, has not yet reached the same level of successful clinical implantation as the bladder.",
    },
    {
      q: "Why is vascularization such a hard problem for engineered organs?",
      o: ["Vessels make organs heavy", "Vessels block immunity", "Inner cells starve without vessels", "Vessels stop cell division"],
      c: 2,
      h: "Consider the essential needs of living cells within a larger structure to remain viable.",
      e: "The correct option is Inner cells starve without vessels. Vascularization, the formation of blood vessels, is crucial because blood vessels deliver oxygen and nutrients to cells and remove waste products. Without them, cells deep within engineered tissues or organs will not survive. Vessels make organs heavy is incorrect, as the weight of vessels is not the primary challenge in their engineering. Vessels block immunity is wrong, as vessels are part of the body's natural system and do not inherently block immunity, although immune response to engineered tissues is a separate challenge. Vessels stop cell division is also incorrect, as blood supply actually supports cell division and growth.",
    },
    {
      q: "Using a patient's own cells to build an organ mainly helps by doing what?",
      o: ["Makes organs grow quickly", "Eliminates need for surgery", "Guarantees organs never fail", "Lowers immune rejection risk"],
      c: 3,
      h: "Think about the body's natural defense system and how it reacts to foreign materials.",
      e: "The correct option is Lowers immune rejection risk. Using a patient's own cells, known as autologous cells, minimizes the chance that the patient's immune system will recognize the engineered organ as foreign and attack it, which is a major challenge in organ transplantation. Makes organs grow quickly is incorrect, as using autologous cells does not inherently speed up organ growth compared to other cell sources. Eliminates need for surgery is wrong, as implantation of engineered organs still requires surgical procedures. Guarantees organs never fail is an overstatement, as no medical intervention can offer such a guarantee, and engineered organs can still face other complications.",
    },
    {
      q: "What is 3D bioprinting?",
      o: ["Creating plastic practice models", "Building tissues using bio ink", "Designing prosthetics from plastic", "Developing medical devices digitally"],
      c: 1,
      h: "Consider the core components involved in creating biological structures using advanced printing technology.",
      e: "Building tissues using bio ink is correct because 3D bioprinting involves using living cells, known as bio ink, to create complex biological structures, mimicking natural tissues and organs. Creating plastic practice models describes a different application of 3D printing, not specifically bioprinting. Designing prosthetics from plastic involves engineering artificial limbs, which is distinct from creating biological tissues. Developing medical devices digitally refers to the design phase of medical devices, not the physical creation of biological material.",
    },
    {
      q: "Which is a major ethical concern with lab grown organs?",
      o: ["Changes in human identity", "Impact on human population", "Risk of organ rejection", "Unequal access due to cost"],
      c: 3,
      h: "Think about the societal implications and accessibility of advanced medical technologies.",
      e: "Unequal access due to cost is correct because the high cost of developing and producing lab grown organs could lead to significant disparities in access, creating ethical dilemmas about fairness and equity in healthcare. Changes in human identity is a philosophical concern but less directly related to the practical ethical issues of organ transplantation itself. Impact on human population is generally not considered a primary ethical concern for lab grown organs. Risk of organ rejection is a biological and medical challenge, not a fundamental ethical concern related to the existence of lab grown organs.",
    },
  ],
  pandemic: [
    {
      q: "What is a pandemic?",
      o: ["Severe seasonal flu outbreak", "Widespread disease over continents", "New disease in one country", "Epidemic contained regionally"],
      c: 1,
      h: "Consider the geographical scale and impact of a disease outbreak.",
      e: "Widespread disease over continents is correct because a pandemic is defined as an epidemic that has spread across multiple countries or continents, affecting a large number of people. Severe seasonal flu outbreak describes a recurring, but typically more localized, event. New disease in one country might be an epidemic, but not necessarily a pandemic until it spreads widely. Epidemic contained regionally describes an outbreak limited to a specific area, not a pandemic.",
    },
    {
      q: "What is a zoonotic disease?",
      o: ["Disease by insect vectors", "Genetic disease in animals", "Disease from animals to humans", "Illness only in wild animals"],
      c: 2,
      h: "Recall the origin and transmission pathways of many infectious diseases.",
      e: "Disease from animals to humans is correct because zoonotic diseases are infections that can be transmitted naturally from vertebrate animals to humans. Disease by insect vectors describes vector borne diseases, which can be zoonotic but not all zoonotic diseases are vector borne. Genetic disease in animals refers to inherited conditions within animal populations, not necessarily transmissible to humans. Illness only in wild animals implies a disease that does not cross the species barrier to humans.",
    },
    {
      q: "Which lab test detects a virus's genetic material?",
      o: ["Detects virus antibodies", "Detects viral genetic material", "Identifies viral proteins", "Measures immune response"],
      c: 1,
      h: "Focus on what distinguishes a direct detection of the pathogen itself.",
      e: "Detects viral genetic material is correct because this describes tests like PCR (Polymerase Chain Reaction), which directly identify the DNA or RNA of a virus. Detects virus antibodies measures the body's immune response to a virus, not the virus itself. Identifies viral proteins looks for components of the virus, but not its core genetic blueprint. Measures immune response is similar to detecting antibodies and does not directly find the virus's genetic material.",
    },
    {
      q: "What do epidemiologists mainly do during an outbreak?",
      o: ["Investigate outbreak patterns", "Treat infected patients", "Develop new vaccines", "Manage hospital resources"],
      c: 0,
      h: "Consider the primary role of this field during a public health crisis.",
      e: "Investigate outbreak patterns is correct because epidemiologists are primarily responsible for studying the patterns, causes, and effects of health and disease conditions in defined populations, especially during outbreaks. Treat infected patients is the role of clinicians and doctors. Develop new vaccines is the role of vaccinologists and pharmaceutical researchers. Manage hospital resources is an administrative and logistical role within healthcare systems.",
    },
    {
      q: "What is contact tracing?",
      o: ["Tracking viral spread in population", "Assessing exposure risk factors", "Counting disease hospital visits", "Finding those exposed to disease"],
      c: 3,
      h: "Think about the primary goal of this public health strategy during an infectious disease outbreak.",
      e: "Finding those exposed to disease is correct. Contact tracing identifies people who may have come into contact with an infected person to break transmission chains. Counting disease hospital visits is part of epidemiology. Tracking viral spread in population is a broader goal that contact tracing contributes to. Assessing exposure risk factors is a component of contact tracing, but not its main purpose.",
    },
    {
      q: "Why is genome sequencing useful during an outbreak?",
      o: ["Directly treat patients", "Measures blood pressure", "Monitors changes, finds mutations", "Replaces all vaccinations"],
      c: 2,
      h: "Consider how understanding the genetic makeup of a pathogen can help manage an outbreak.",
      e: "Monitors changes, finds mutations is correct. Genome sequencing identifies a pathogen's genetic sequence, helping track its evolution, detect new variants, and understand its spread. This informs effective public health responses. It does not directly treat patients, measure blood pressure, or replace all vaccinations, though it informs strategies that might involve treatments and vaccines.",
    },
    {
      q: "Which organizations coordinate global outbreak response?",
      o: ["UN and NATO health regulations", "WHO and CDC work globally", "NIH and FDA fund studies", "WMO and UNEP climate monitoring"],
      c: 1,
      h: "Recall the major global and national health organizations that often lead international health efforts.",
      e: "WHO and CDC work globally is correct. The World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC) are prominent organizations involved in coordinating global outbreak responses, with WHO having a global mandate and CDC often collaborating internationally. UN and NATO health regulations are not the primary coordinating bodies for outbreaks. NIH and FDA fund studies are important US agencies but not the main global coordinators. WMO and UNEP climate monitoring are related to weather and environment, not directly outbreak response.",
    },
    {
      q: "What is wastewater surveillance used for?",
      o: ["Early pathogen detection in communities", "Purifies drinking water supply", "Measures rainfall and water levels", "Tests soil for nutrients"],
      c: 0,
      h: "Consider how communities can monitor for health threats without testing every individual.",
      e: "Early pathogen detection in communities is correct. Wastewater surveillance tests sewage for pathogen genetic material, allowing for early detection of infections even before symptoms appear, providing an early warning system. It does not purify drinking water supply, measure rainfall and water levels, or test soil for nutrients.",
    },
  ],
  trials: [
    {
      q: "What is a clinical trial?",
      o: ["Studies treatment safety in volunteers", "A doctor's medical examination", "An audit of hospital finances", "Computer simulation of diseases"],
      c: 0,
      h: "Think about the rigorous process new medical treatments undergo before becoming widely available.",
      e: "A clinical trial is a research study conducted in human volunteers to evaluate the safety and effectiveness of new medical treatments, drugs, or interventions. It is not 'A doctor's medical examination', which is for individual patient care. It is not 'An audit of hospital finances'. It is also not a 'Computer simulation of diseases', although simulations can be used in drug discovery prior to human trials.",
    },
    {
      q: "What happens before a medicine is tested in humans?",
      o: ["Widespread public advertisements begin", "FDA grants final approval now", "Lab and preclinical studies occur", "Phase III human trials start first"],
      c: 2,
      h: "Before human testing, where do researchers first gather data on a potential medicine's safety and efficacy?",
      e: "Before a medicine is tested in humans, it undergoes extensive lab and preclinical studies. This involves testing in cells and animals to assess safety, dosage, and initial efficacy. Only if these studies are successful will the medicine proceed to human trials. 'Widespread public advertisements begin' and 'FDA grants final approval now' happen much later. 'Phase III human trials start first' is incorrect, as Phase I and II trials precede Phase III.",
    },
    {
      q: "What is the main focus of a Phase I trial?",
      o: ["Confirm drug effectiveness now", "Prepare drug for market entry", "Evaluate drug safety, find dose", "Assess drug in all patients"],
      c: 2,
      h: "Consider the very first step in human trials and what critical information is gathered first.",
      e: "The correct answer is Evaluate drug safety, find dose. Phase I trials are the initial stage of testing in humans, focusing on understanding the drug's safety profile, identifying side effects, and determining the appropriate dosage range. Confirm drug effectiveness now is incorrect because effectiveness is primarily assessed in later phases. Prepare drug for market entry is incorrect as this happens much later, after all clinical trials are complete and regulatory approval is sought. Assess drug in all patients is incorrect because Phase I trials involve a small number of healthy volunteers or patients, not all patients.",
    },
    {
      q: "Which phase usually involves the most participants?",
      o: ["Phase I, few volunteers", "Preclinical, animal studies", "Phase III has most patients", "Phase 0, initial testing"],
      c: 2,
      h: "Think about the phase where the drug is tested on a large and diverse group of individuals to confirm efficacy and safety.",
      e: "The correct answer is Phase III has most patients. Phase III clinical trials involve a large number of participants, often thousands, to confirm the drug's effectiveness, monitor side effects, and compare it to standard treatments. Phase I, few volunteers is incorrect because Phase I trials involve a very small number of participants. Preclinical, animal studies is incorrect as this phase involves animal testing, not human participants. Phase 0, initial testing is incorrect because Phase 0 involves a very small exploratory group, not the most participants overall.",
    },
    {
      q: "Why are placebos used in trials?",
      o: ["Reduce overall trial costs", "Accelerate study progress", "Compare fairly, reduce bias", "Provide treatment to control"],
      c: 2,
      h: "Consider the scientific principle of comparison and minimizing researcher influence in an experiment.",
      e: "The correct answer is Compare fairly, reduce bias. Placebos are inactive substances used in clinical trials to create a control group that receives a treatment identical in appearance to the actual drug. This allows researchers to fairly compare the effects of the investigational drug against no treatment, reducing bias from patient or researcher expectations. Reduce overall trial costs is incorrect, as placebos do not directly reduce costs. Accelerate study progress is incorrect, as placebos are for validity, not speed. Provide treatment to control is incorrect because placebos do not provide therapeutic treatment.",
    },
    {
      q: "What does double blind mean?",
      o: ["Patients cannot see dosing", "Neither knows treatment assignment", "Study performed two times", "Only pharmacist is informed"],
      c: 1,
      h: "Think about who should and should not know which treatment a participant is receiving to maintain objectivity.",
      e: "The correct answer is Neither knows treatment assignment. In a double blind study, neither the participants nor the researchers administering the treatment know who is receiving the active drug and who is receiving the placebo. This helps prevent bias from expectations affecting the study's results. Patients cannot see dosing is incorrect, as 'double blind' refers to knowledge of assignment, not visual observation of administration. Study performed two times is incorrect, as 'double blind' is a study design feature, not a repetition. Only pharmacist is informed is incorrect because for the study to be double blind, even the researchers directly interacting with patients should not know the assignment.",
    },
    {
      q: "What is informed consent?",
      o: ["Volunteers understand risks, then agree", "Doctor signs for patient", "Agreeing to pay treatment", "Government approval form"],
      c: 0,
      h: "Consider the ethical requirement for individuals to fully understand what they are agreeing to before participating in a medical study.",
      e: "The correct answer is Volunteers understand risks, then agree. Informed consent is a fundamental ethical principle in clinical research, requiring that participants are given comprehensive information about the study's purpose, procedures, potential risks, and benefits, and then voluntarily agree to participate. Doctor signs for patient is incorrect as the patient or their legal representative must provide consent. Agreeing to pay treatment is incorrect, as informed consent is about understanding and agreeing to participate, not payment terms. Government approval form is incorrect, as while government approval is needed for trials, informed consent is specifically from the participant.",
    },
    {
      q: "What is the purpose of Phase IV studies?",
      o: ["Track safety after approval", "Test the drug in animals", "Find the first human dose", "Write the trial protocol"],
      c: 0,
      h: "Consider what happens to a drug after it has been approved and released to the general public.",
      e: "The correct answer is Track safety after approval. Phase IV studies, also called post marketing surveillance, happen once a drug is approved and in public use, and they look for rare side effects and long term risks in much larger groups of patients. Test the drug in animals is wrong because animal work belongs to preclinical research, long before approval. Find the first human dose is wrong because that is the goal of a Phase I trial. Write the trial protocol is wrong because the protocol is written before any human testing begins.",
    },
  ],
  robots: [
    {
      q: "In most robotic surgery today, who controls the instruments?",
      o: ["Robot's AI makes decisions", "Nurse directs robot's movements", "Patient operates controls personally", "Surgeon controls instruments directly"],
      c: 3,
      h: "Consider who maintains ultimate control and expertise in a surgical setting.",
      e: "The correct option is 'Surgeon controls instruments directly' because in most robotic surgeries, the robot is a tool that the human surgeon manipulates. 'Robot's AI makes decisions' is incorrect as AI typically assists, but does not autonomously control the entire procedure. 'Nurse directs robot's movements' is incorrect as the primary surgeon is responsible for directing the surgical actions. 'Patient operates controls personally' is incorrect as patients are under anesthesia and not involved in operating the surgical equipment.",
    },
    {
      q: "Which is a real benefit of robotic surgery?",
      o: ["Filters hand tremor, steadies motions", "Removes anesthesia requirements", "Eliminates all surgical dangers", "Makes surgery completely free now"],
      c: 0,
      h: "Think about how technology can improve precision and mitigate human physical limitations during delicate procedures.",
      e: "The correct option is 'Filters hand tremor, steadies motions' because robotic systems are designed to enhance a surgeon's precision by stabilizing movements and eliminating natural hand tremors. 'Removes anesthesia requirements' is incorrect, as anesthesia is still necessary for patient comfort and safety during surgery. 'Eliminates all surgical dangers' is incorrect because while risks are reduced, no surgery is entirely danger free. 'Makes surgery completely free now' is incorrect, as robotic surgery is typically an expensive procedure and not free.",
    },
    {
      q: "Why do robotic systems use 3D high definition cameras?",
      o: ["Records videos for education", "Magnified depth, clearer view", "Replaces need for bright lights", "Scans for patient sensitivities"],
      c: 1,
      h: "Ponder how enhanced visual perception aids a surgeon in performing intricate tasks with greater accuracy.",
      e: "The correct option is 'Magnified depth, clearer view' because 3D high definition cameras provide surgeons with an enhanced, three dimensional, and magnified view of the surgical field, which is crucial for precision. 'Records videos for education' is a secondary benefit, not the primary reason for their use. 'Replaces need for bright lights' is incorrect, as bright illumination is still essential for clear visualization. 'Scans for patient sensitivities' is incorrect, as camera systems are for visual guidance, not for detecting patient sensitivities.",
    },
    {
      q: "Robotic surgery is often described as minimally invasive because it uses what?",
      o: ["Small incisions, thin instruments", "No incisions, completely external", "Requires large access openings", "Only external lasers are used"],
      c: 0,
      h: "Consider the meaning of 'minimally invasive' in the context of surgical access.",
      e: "The correct option is 'Small incisions, thin instruments' because minimally invasive surgery, including robotic surgery, is characterized by using small cuts and specialized slender tools to operate inside the body. 'No incisions, completely external' is incorrect, as most robotic surgeries require some form of incision. 'Requires large access openings' is incorrect, as this describes traditional open surgery, not minimally invasive. 'Only external lasers are used' is incorrect, as robotic surgery involves internal instrumentation, not just external lasers.",
    },
    {
      q: "Which is a genuine limitation of robotic surgery?",
      o: ["Cannot be used in many hospitals", "Always faster than open methods", "High cost, special training", "Functions without any electricity"],
      c: 2,
      h: "Think about the practical challenges associated with implementing and maintaining advanced technological equipment and expertise.",
      e: "The correct option is 'High cost, special training' because robotic surgery systems are very expensive to acquire and maintain, and they require surgeons and staff to undergo specialized training. 'Cannot be used in many hospitals' is incorrect, as their use is becoming more widespread, though still limited by cost. 'Always faster than open methods' is incorrect, as robotic procedures can sometimes take longer than traditional open surgery. 'Functions without any electricity' is incorrect, as robotic systems are complex machines that rely heavily on electricity to operate.",
    },
    {
      q: "In which field are surgical robots most commonly used?",
      o: ["Dermatology with skin creams", "Dentistry for teeth cleaning", "Physical therapy with exercise", "Urology for prostate operations"],
      c: 3,
      h: "Reflect on areas of surgery where precision and access to difficult areas are particularly beneficial.",
      e: "The correct option is 'Urology for prostate operations' because robotic surgery is extensively used in urological procedures, particularly for prostatectomies, due to the precision and access it offers in a confined space. 'Dermatology with skin creams' is incorrect, as dermatology focuses on skin conditions and rarely involves complex internal surgery. 'Dentistry for teeth cleaning' is incorrect, as dentistry is a distinct field and teeth cleaning is a routine procedure not requiring robotic surgery. 'Physical therapy with exercise' is incorrect, as physical therapy is a rehabilitative field, not surgical.",
    },
    {
      q: "How is AI currently used alongside surgical robots?",
      o: ["AI performs complex operations.", "AI aids surgeons with data.", "AI selects patients for surgery.", "AI replaces some medical staff."],
      c: 1,
      h: "Consider AI's primary role in assisting human experts, rather than fully autonomous actions, in complex fields like surgery.",
      e: "The correct option is 'AI aids surgeons with data.' AI is currently used to process vast amounts of medical data, analyze images, and provide insights that assist surgeons in making more informed decisions and planning procedures. 'AI performs complex operations' is incorrect because AI systems do not independently perform complex surgeries, they assist human surgeons. 'AI selects patients for surgery' is incorrect, as patient selection is a complex medical decision made by human healthcare professionals, not autonomously by AI. 'AI replaces some medical staff' is also incorrect, as AI's role is to augment and support medical staff, not to replace them in a direct capacity.",
    },
    {
      q: "What is haptic feedback in surgical robotics?",
      o: ["Robot shows power status.", "Robot cleans surgical tools.", "Robot offers touch sensation.", "Robot regulates its temperature."],
      c: 2,
      h: "Think about how technology can mimic human sensory experiences, especially regarding touch.",
      e: "The correct option is 'Robot offers touch sensation.' Haptic feedback in surgical robotics allows the surgeon to 'feel' tissues and instruments through the robotic system, providing a sense of touch and resistance during the operation. 'Robot shows power status' is incorrect, as this describes an indicator function, not touch sensation. 'Robot cleans surgical tools' is incorrect, as this refers to sterilization, not feedback. 'Robot regulates its temperature' is incorrect, as this is a functional aspect of the robot's operation, unrelated to a surgeon's sensory experience.",
    },
  ],
  synthetic: [
    {
      q: "What are synthetic organs?",
      o: ["Lab grown replacement organs.", "Organs from other donors.", "Machines, not living tissue.", "Computer simulations only."],
      c: 0,
      h: "Think about advancements in biotechnology where scientists create biological structures in a controlled environment.",
      e: "The correct option is 'Lab grown replacement organs.' Synthetic organs, in the biomedical context, refer to organs that are engineered or grown in a laboratory setting to replace damaged or diseased organs. 'Organs from other donors' are known as transplanted organs, not synthetic. 'Machines, not living tissue' describes artificial organs or prosthetics, which are different from synthetic organs made of biological material. 'Computer simulations only' are models or virtual representations, not physical organs.",
    },
    {
      q: "What is decellularization?",
      o: ["Freezing an organ for storage.", "Adding new cells to a scaffold.", "Printing an organ from plastic.", "Removing cells from a donor organ."],
      c: 3,
      h: "Consider a process where a biological structure is prepared to serve as a framework.",
      e: "The correct option is 'Removing cells from a donor organ.' Decellularization is the process of stripping away the cells from a donor organ or tissue, leaving behind only the extracellular matrix, which can then serve as a scaffold for new cells. 'Freezing an organ for storage' is cryopreservation, which is a different process. 'Adding new cells to a scaffold' is recellularization, the opposite of decellularization. 'Printing an organ from plastic' describes 3D bioprinting, but typically uses biocompatible materials, not just plastic, and is a different technique.",
    },
    {
      q: "What is recellularization?",
      o: ["Removing cells from tissue.", "Cutting an organ into pieces.", "Adding cells to an organ scaffold.", "Sterilizing surgical tools."],
      c: 2,
      h: "Consider the complementary process to decellularization, where a biological framework is repopulated.",
      e: "The correct option is 'Adding cells to an organ scaffold.' Recellularization is the process where cells, often from the patient, are introduced into a decellularized organ scaffold to grow a new, functional organ. 'Removing cells from tissue' is decellularization, the opposite process. 'Cutting an organ into pieces' is dissection, not recellularization. 'Sterilizing surgical tools' refers to disinfection practices, unrelated to tissue engineering.",
    },
    {
      q: "What is an organoid?",
      o: ["Full sized transplant organ.", "Robotic organ replacement.", "Small organ grown from cells.", "A powerful type of antibiotic."],
      c: 2,
      h: "Think about what 'oid' implies when added to a word like 'organ,' suggesting a miniature or simplified version.",
      e: "The correct option is 'Small organ grown from cells.' An organoid is a miniature, simplified version of an organ produced in vitro, often from stem cells, which mimics the structure and function of the actual organ. 'Full sized transplant organ' refers to a complete organ for transplantation. 'Robotic organ replacement' describes an artificial or mechanical device. 'A powerful type of antibiotic' is a medication used to treat bacterial infections, unrelated to organs.",
    },
    {
      q: "Why are stem cells valuable in building synthetic organs?",
      o: ["They become many cell types", "They avoid immune rejection", "They remain undifferentiated always.", "They only replace damaged cells"],
      c: 0,
      h: "Consider the unique property of stem cells that allows them to specialize into various cell types.",
      e: "The correct option is 'They become many cell types' because stem cells have the remarkable ability to differentiate into a wide range of specialized cells, making them ideal for constructing diverse tissues in synthetic organs. 'They avoid immune rejection' is incorrect because while some stem cells like induced pluripotent stem cells can reduce rejection, it is not their primary value in building organs, and other stem cell types still face immune challenges. 'They remain undifferentiated always' is incorrect because their value lies precisely in their ability to differentiate, not to stay perpetually undifferentiated. 'They only replace damaged cells' is incorrect because their utility extends beyond just replacement, encompassing the creation of entirely new tissues and organs.",
    },
    {
      q: "Which engineered tissue is already used routinely in patients?",
      o: ["Lab grown heart tissue", "Engineered bone grafts", "Skin substitutes for burns", "Replacement blood vessels"],
      c: 2,
      h: "Think about common medical procedures that involve replacing external tissues.",
      e: "The correct option is 'Skin substitutes for burns' because engineered skin is a well established and routinely used medical product for treating severe burns and other skin injuries. 'Lab grown heart tissue' is incorrect because while promising, it is still largely in research and clinical trials, not routine use. 'Engineered bone grafts' is incorrect because while bone grafts are common, truly 'engineered' bone tissue for routine clinical application is still developing. 'Replacement blood vessels' is incorrect because synthetic or engineered blood vessels are used, but routine application for lab grown vessels is still less widespread than skin substitutes.",
    },
    {
      q: "Why is nerve integration important for a synthetic organ?",
      o: ["Organs need nerve signals to work", "Nerves prevent organ damage", "Nerves improve blood flow", "Nerves give structural support"],
      c: 0,
      h: "Consider what signals an organ needs to function properly within a living system.",
      e: "The correct option is 'Organs need nerve signals to work' because proper nerve integration allows a synthetic organ to receive commands from the brain and nervous system, regulating its functions like contractions, secretions, and sensory feedback, which are crucial for its successful operation within the body. 'Nerves prevent organ damage' is incorrect because while nerves can contribute to reflex actions that protect organs, their primary role in integration is not damage prevention. 'Nerves improve blood flow' is incorrect because while the nervous system can influence blood vessel diameter, the direct purpose of nerve integration in an organ is not solely to improve blood flow. 'Nerves give structural support' is incorrect because nerves are primarily for communication and control, not structural support.",
    },
    {
      q: "What is a smart biomaterial scaffold?",
      o: ["A scaffold holding simple cells", "A framework made of strong plastic", "A material responding to body", "A template for complex structures"],
      c: 2,
      h: "Focus on the term 'smart' and what it implies about the material's behavior.",
      e: "The correct option is 'A material responding to body' because a smart biomaterial scaffold is designed to interact dynamically with the physiological environment, changing its properties or releasing substances in response to biological signals, thus actively guiding tissue regeneration. 'A scaffold holding simple cells' is incorrect because smart scaffolds are more sophisticated than just passive cell holders. 'A framework made of strong plastic' is incorrect because smart scaffolds are often made from biodegradable or biocompatible materials, not just strong plastic, and their 'smart' aspect goes beyond mere strength. 'A template for complex structures' is incorrect because while they do act as templates, the 'smart' aspect specifically refers to their interactive and responsive capabilities.",
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

