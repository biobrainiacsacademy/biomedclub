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
      h: "Consider the primary objective when performing this laboratory procedure.",
      e: "The correct option is 'Isolate DNA from cell parts' because the fundamental purpose of DNA extraction is to separate DNA from other cellular components, making it available for further study. 'Copy DNA to make more' describes DNA replication, which is a separate process. 'Sequence DNA base pairs' is a subsequent analysis performed after extraction, not the extraction itself. 'Convert DNA into protein' describes gene expression, which is a different biological process.",
    },
    {
      q: "Why is dish soap used in a DNA extraction?",
      o: ["Breaks DNA into pieces", "Makes DNA appear brighter", "Kills bacteria in sample", "Dissolves cell membranes"],
      c: 3,
      h: "Think about the structure of cells and what surrounds their internal components.",
      e: "The correct option is 'Dissolves cell membranes' because dish soap, a detergent, is used to break down the lipid bilayers of cell and nuclear membranes, releasing the DNA. 'Breaks DNA into pieces' is incorrect, as the goal is to keep DNA intact. 'Makes DNA appear brighter' is unrelated to the chemical function of soap. 'Kills bacteria in sample' might be a secondary effect but is not the primary reason for using dish soap in DNA extraction.",
    },
    {
      q: "Why is cold alcohol added at the end of the extraction?",
      o: ["DNA won't dissolve, it clumps", "Alcohol dissolves DNA fully", "Alcohol causes DNA replication", "Alcohol converts DNA to RNA"],
      c: 0,
      h: "Consider how DNA behaves in different solutions, especially when it comes to solubility.",
      e: "The correct option is 'DNA won't dissolve, it clumps' because DNA is insoluble in cold alcohol. Adding alcohol causes the DNA to precipitate out of the solution, making it visible as white strands or clumps that can be collected. 'Alcohol dissolves DNA fully' is incorrect, as DNA precipitates in alcohol. 'Alcohol causes DNA replication' is wrong, as replication is a biological process, not a chemical effect of alcohol. 'Alcohol converts DNA to RNA' is also incorrect, as these are distinct nucleic acids and alcohol does not cause such a conversion.",
    },
    {
      q: "What is added to break down proteins that stick to DNA?",
      o: ["Meat tenderizer, a protease enzyme", "Table sugar, a sweet molecule", "Vinegar, an acidic solution", "Baking soda, a basic compound"],
      c: 0,
      h: "Consider what type of molecule helps break down large protein structures.",
      e: "The correct option is 'Meat tenderizer, a protease enzyme' because meat tenderizer contains enzymes called proteases, which break down proteins, including histone proteins that DNA is tightly wrapped around, thus helping to release the DNA. 'Table sugar, a sweet molecule' is incorrect as sugar does not break down proteins. 'Vinegar, an acidic solution' might denature proteins but is not typically used for targeted protein breakdown in DNA extraction. 'Baking soda, a basic compound' is also not used for this purpose.",
    },
    {
      q: "Salt is added during extraction mainly to do what?",
      o: ["Give DNA a positive charge", "Break the sugar backbone apart", "Neutralize DNA allowing clumps", "Dye the DNA a blue color"],
      c: 2,
      h: "Think about the charge of DNA and how ions might affect its interactions in a solution.",
      e: "The correct option is 'Neutralize DNA allowing clumps' because DNA has a negative charge due to its phosphate backbone. Salt provides positive ions (like Na+) that neutralize these negative charges, reducing repulsion between DNA molecules and allowing them to come together and clump, aiding in precipitation. 'Give DNA a positive charge' is incorrect, as salt neutralizes, not makes DNA positive. 'Break the sugar backbone apart' is wrong, as salt does not break covalent bonds in the DNA backbone. 'Dye the DNA a blue color' is incorrect; salt does not dye DNA.",
    },
    {
      q: "Where is most of a human cell's DNA stored?",
      o: ["In the cell's nucleus", "In the cell's ribosome", "In the cell's membrane", "In the Golgi apparatus"],
      c: 0,
      h: "Recall the main control center of a eukaryotic cell.",
      e: "The correct option is 'In the cell's nucleus' because in eukaryotic cells, the vast majority of the DNA is housed within the nucleus, organized into chromosomes. 'In the cell's ribosome' is incorrect; ribosomes are responsible for protein synthesis, not DNA storage. 'In the cell's membrane' is also incorrect; the cell membrane encloses the cell. 'In the Golgi apparatus' is wrong; the Golgi apparatus modifies, sorts, and packages proteins and lipids, it does not store DNA.",
    },
    {
      q: "What are the four bases found in DNA?",
      o: ["Adenine, Uracil, Cytosine, Guanine", "Adenine, Thymine, Cytosine, Uracil", "Guanine, Cytosine, Uracil, Phosphate", "Adenine, Thymine, Cytosine, Guanine"],
      c: 3,
      h: "Consider the specific nucleotides that make up the genetic code in deoxyribonucleic acid.",
      e: "The correct answer is Adenine, Thymine, Cytosine, Guanine. These are the four nitrogenous bases that form the rungs of the DNA ladder. Adenine, Uracil, Cytosine, Guanine is incorrect because Uracil replaces Thymine in RNA, not DNA. Adenine, Thymine, Cytosine, Uracil is incorrect because Uracil is found in RNA, not DNA, and Thymine is found in DNA. Guanine, Cytosine, Uracil, Phosphate is incorrect because Uracil is a base found in RNA, not DNA, and Phosphate is part of the DNA backbone, not one of the four bases.",
    },
    {
      q: "In the DNA double helix, adenine always pairs with which base?",
      o: ["Adenine pairs with Guanine", "Adenine pairs with Thymine", "Adenine pairs with Cytosine", "Adenine pairs with Uracil"],
      c: 1,
      h: "Recall the base pairing rules, often referred to as Chargaff's rules, that dictate how DNA strands connect.",
      e: "The correct answer is Adenine pairs with Thymine. In the DNA double helix, Adenine (A) always forms a specific pair with Thymine (T) through hydrogen bonds. Adenine pairs with Guanine is incorrect because Adenine always pairs with Thymine, and Guanine always pairs with Cytosine. Adenine pairs with Cytosine is incorrect because Adenine always pairs with Thymine, and Cytosine always pairs with Guanine. Adenine pairs with Uracil is incorrect because Uracil is found in RNA, where it pairs with Adenine, but in DNA, Adenine pairs with Thymine.",
    },
  ],
  microbiome: [
    {
      q: "What is the human microbiome?",
      o: ["All microbes in or on body", "One organ by the stomach", "A specific type of cell", "A key vitamin from liver"],
      c: 0,
      h: "Think broadly about all microscopic life forms that coexist with the human body.",
      e: "The correct answer is All microbes in or on body. The human microbiome refers to the collective genetic material of all microorganisms, such as bacteria, fungi, viruses, and their genes, that live in and on the human body. One organ by the stomach is incorrect because the microbiome is not a single organ. A specific type of cell is incorrect because the microbiome is made up of many different types of microbial cells, not just one specific type, and it's distinct from human cells. A key vitamin from liver is incorrect because the microbiome is a collection of microorganisms, not a vitamin.",
    },
    {
      q: "Where do most of the body's microbes live?",
      o: ["Most microbes in the brain", "Most microbes in bloodstream", "Most microbes in large intestine", "Most microbes in bone marrow"],
      c: 2,
      h: "Consider which internal environment provides the most diverse and nutrient rich habitat for microbial communities.",
      e: "The correct answer is Most microbes in large intestine. The large intestine provides a warm, moist, and nutrient rich environment, making it the most densely populated site for microbes in the human body. Most microbes in the brain is incorrect because the brain is protected by the blood brain barrier and is generally considered sterile. Most microbes in bloodstream is incorrect because while some transient microbes may enter the bloodstream, it is generally kept sterile by the immune system. Most microbes in bone marrow is incorrect because the bone marrow is also generally sterile and is primarily involved in blood cell production, not microbial habitation.",
    },
    {
      q: "Which of these is a real job the gut microbiome does?",
      o: ["Pumps blood through body", "Filters waste from urine", "Helps digest fiber in gut", "Produces insulin in pancreas"],
      c: 2,
      h: "Focus on the digestive processes and how microorganisms contribute to nutrient breakdown.",
      e: "The correct answer is Helps digest fiber in gut. Gut microbes play a crucial role in breaking down complex carbohydrates and fibers that human enzymes cannot digest, converting them into beneficial compounds. Pumps blood through body is incorrect because the heart is responsible for pumping blood. Filters waste from urine is incorrect because the kidneys are responsible for filtering waste from urine. Produces insulin in pancreas is incorrect because the pancreas is responsible for producing insulin.",
    },
    {
      q: "Why is the microbiome sometimes called a hidden organ?",
      o: ["Performs organ like functions", "A solid structure near liver", "Can be surgically removed easily", "Visible clearly on an X ray"],
      c: 0,
      h: "Consider the significant functional roles these microbial communities perform, similar to what vital bodily structures do.",
      e: "The correct answer is Performs organ like functions. The microbiome is sometimes called a hidden organ because its collective metabolic activities and contributions to host health, such as nutrient absorption, immune regulation, and vitamin synthesis, are comparable to those of a traditional organ. A solid structure near liver is incorrect because the microbiome is a diverse community of microorganisms, not a single solid structure. Can be surgically removed easily is incorrect because the microbiome is dispersed throughout the body, particularly in the gut, and cannot be easily or entirely removed like a discrete organ. Visible clearly on an X ray is incorrect because individual microbes and microbial communities are not typically visible on standard X rays.",
    },
    {
      q: "What are probiotics?",
      o: ["Dietary fibers for bacteria", "Beneficial gut bacteria", "Medicines that kill all germs", "Sugars from red meat only"],
      c: 1,
      h: "Consider what kind of organisms are often associated with the term 'probiotic' in the context of health.",
      e: "The correct option is 'Beneficial gut bacteria'. Probiotics are live microorganisms, typically bacteria, that provide health benefits when consumed, especially by improving or restoring the gut flora. 'Dietary fibers for bacteria' describes prebiotics, not probiotics. 'Medicines that kill all germs' describes broad spectrum antibiotics, not probiotics. 'Sugars from red meat only' is unrelated to probiotics.",
    },
    {
      q: "How can antibiotics affect the microbiome?",
      o: ["Only destroy harmful viruses", "Kill good and bad bacteria", "Permanently sterilize the gut", "Do not affect gut microbes"],
      c: 1,
      h: "Think about the primary function of antibiotics and what kind of microscopic life they target.",
      e: "The correct option is 'Kill good and bad bacteria'. Antibiotics are designed to kill or inhibit the growth of bacteria, but they often cannot differentiate between harmful pathogenic bacteria and beneficial bacteria that are part of the normal microbiome. 'Only destroy harmful viruses' is incorrect because antibiotics target bacteria, not viruses. 'Permanently sterilize the gut' is an overstatement, as the gut microbiome usually recovers, though it can be significantly altered. 'Do not affect gut microbes' is incorrect, as antibiotics have a well documented impact on gut bacteria.",
    },
    {
      q: "Which factor most shapes a baby's first microbiome?",
      o: ["Inherited eye color genetics", "Blood type alone matters", "The season of the year", "Birth method and early diet"],
      c: 3,
      h: "Reflect on a baby's initial journey into the world and their very first sources of nourishment.",
      e: "The correct option is 'Birth method and early diet'. A baby's first exposure to microbes occurs during birth, whether vaginally or via C section, and their initial diet, such as breastfeeding or formula feeding, significantly shapes their developing microbiome. 'Inherited eye color genetics' and 'Blood type alone matters' are genetic traits and do not directly influence the microbiome. 'The season of the year' has less direct and significant impact on a baby's initial microbiome compared to birth method and early diet.",
    },
    {
      q: "What is a short chain fatty acid such as butyrate?",
      o: ["Brain's own human hormone", "Vitamin from citrus fruits", "Molecule made by gut microbes", "Protein carrying oxygen"],
      c: 2,
      h: "Consider the origin of these specific molecules in the digestive system.",
      e: "The correct option is 'Molecule made by gut microbes'. Short chain fatty acids, such as butyrate, are primarily produced when beneficial gut bacteria ferment dietary fibers in the colon. These molecules play crucial roles in gut health and beyond. 'Brain's own human hormone' is incorrect, as butyrate is not a hormone produced by the brain. 'Vitamin from citrus fruits' is incorrect, as vitamins from citrus fruits are different compounds like Vitamin C. 'Protein carrying oxygen' describes molecules like hemoglobin, which is unrelated to short chain fatty acids.",
    },
  ],
  epigenetics: [
    {
      q: "What does epigenetics study?",
      o: ["Random DNA base changes", "How bones grow over time", "Cell membrane structure", "Gene activity, no DNA change"],
      c: 3,
      h: "Think about how gene expression can be influenced without altering the fundamental genetic code.",
      e: "The correct option is 'Gene activity, no DNA change'. Epigenetics studies heritable changes in gene expression that occur without altering the underlying DNA sequence itself. These changes can affect how cells read genes. 'Random DNA base changes' describes mutations. 'How bones grow over time' is a developmental process. 'Cell membrane structure' refers to the physical composition of cell boundaries, none of which are the primary focus of epigenetics.",
    },
    {
      q: "Which chemical mark most commonly silences a gene?",
      o: ["Phosphate removal from ATP", "Adding oxygen to hemoglobin", "Salt binding onto DNA", "Adding methyl to DNA"],
      c: 3,
      h: "Consider a common chemical modification that is known to influence gene expression by compacting DNA.",
      e: "The correct option is 'Adding methyl to DNA'. Methylation, specifically the addition of a methyl group to cytosine bases in DNA, is a common epigenetic mark that typically leads to gene silencing by making the DNA less accessible for transcription. 'Phosphate removal from ATP' is involved in energy transfer, not gene silencing. 'Adding oxygen to hemoglobin' is crucial for oxygen transport in blood. 'Salt binding onto DNA' does not specifically describe a common mechanism for gene silencing.",
    },
    {
      q: "Histone proteins matter in epigenetics because they do what?",
      o: ["They package DNA into chromosomes.", "They make copies of DNA.", "They chop DNA into fragments.", "They change RNA to DNA."],
      c: 0,
      h: "Consider the primary role of histones in organizing the genetic material within a cell.",
      e: "The correct answer is They package DNA into chromosomes. Histone proteins act as spools around which DNA winds, forming structures called nucleosomes, which then condense to form chromosomes. This packaging is crucial for DNA's organization and regulation. They make copies of DNA is incorrect, as DNA replication is carried out by DNA polymerase enzymes. They chop DNA into fragments is incorrect, as DNA is typically chopped by restriction enzymes, not histones. They change RNA to DNA is incorrect, as this process, reverse transcription, is carried out by reverse transcriptase enzymes, not histones.",
    },
    {
      q: "Why can identical twins look and behave differently over time?",
      o: ["Environment changes gene activity.", "DNA sequences always swap.", "One twin loses its chromosomes.", "Twins do not share genes."],
      c: 0,
      h: "Think about how external factors can influence gene activity, even in individuals with identical genetic codes.",
      e: "The correct answer is Environment changes gene activity. Even though identical twins share the same DNA sequence, their environments, lifestyles, and experiences can lead to different epigenetic modifications over time, affecting how their genes are expressed and thus influencing their appearance and behavior. DNA sequences always swap is incorrect, as DNA sequences are generally stable, though mutations can occur. One twin loses its chromosomes is incorrect, as losing chromosomes would be a severe genetic abnormality and not a common explanation for differences between healthy twins. Twins do not share genes is incorrect, as identical twins by definition share nearly 100% of their genes.",
    },
    {
      q: "Which of these can influence a person's epigenetic marks?",
      o: ["Only inherited DNA matters.", "Diet, stress, and toxins.", "Epigenetics fixed at birth.", "Your height alone affects."],
      c: 1,
      h: "Consider what external and internal factors, beyond the basic genetic code, can leave a lasting impact on how genes are expressed.",
      e: "The correct answer is Diet, stress, and toxins. These environmental and lifestyle factors can directly influence the epigenetic machinery, leading to changes in DNA methylation or histone modification patterns, which in turn alter gene expression. Only inherited DNA matters is incorrect, as epigenetics specifically addresses modifications beyond the DNA sequence itself. Epigenetics fixed at birth is incorrect, as epigenetic marks are dynamic and can change throughout a person's life in response to various inputs. Your height alone affects is incorrect, as height is a complex trait influenced by many genes and environmental factors, but it is not a direct influencer of epigenetic marks in this general sense.",
    },
    {
      q: "How do stem cells become different cell types with the same DNA?",
      o: ["Cells delete unneeded genes.", "Cells gain new chromosomes.", "They copy nearby DNA.", "Genes switch on and off."],
      c: 3,
      h: "Consider what happens to the genetic instructions when a stem cell differentiates into a specialized cell, without altering the fundamental genetic code.",
      e: "The correct answer is Genes switch on and off. During differentiation, stem cells activate specific genes and silence others, leading to the production of different proteins and the development of specialized cell structures and functions, all while maintaining the same underlying DNA sequence. Cells delete unneeded genes is incorrect, as cells generally retain all their genes, even if they are not expressed. Cells gain new chromosomes is incorrect, as differentiation does not typically involve acquiring new chromosomes. They copy nearby DNA is incorrect, as copying DNA is part of replication, not the primary mechanism of cell differentiation.",
    },
    {
      q: "Can some epigenetic changes be reversed?",
      o: ["No, marks are permanent.", "Only through surgery works.", "Only plants show reversal.", "Yes, enzymes alter marks."],
      c: 3,
      h: "Think about the dynamic nature of epigenetic marks and the biological processes that can actively modify them.",
      e: "The correct answer is Yes, enzymes alter marks. Epigenetic marks, such as DNA methylation and histone modifications, are dynamic and can be added, removed, or modified by specific enzymes, making some epigenetic changes reversible. No, marks are permanent is incorrect, as research shows the plasticity of epigenetic marks. Only through surgery works is incorrect, as surgery is not a mechanism for reversing epigenetic changes at the molecular level. Only plants show reversal is incorrect, as epigenetic reversal mechanisms are observed in various organisms, including animals.",
    },
    {
      q: "Which statement best fits the phrase your DNA is not your destiny?",
      o: ["Genes have no health effect.", "Environment shapes gene expression.", "You can rewrite your DNA.", "Only twins show genetics."],
      c: 1,
      h: "Consider how factors beyond the inherited genetic code can influence an individual's health and characteristics.",
      e: "The correct answer is Environment shapes gene expression. This statement emphasizes that while DNA provides the blueprint, how those genes are actually utilized and expressed is heavily influenced by external factors like diet, lifestyle, and exposure, rather than being solely determined by the genetic sequence. Genes have no health effect is incorrect, as genes fundamentally contribute to health and disease susceptibility. You can rewrite your DNA is incorrect, as naturally, individuals cannot simply rewrite their DNA sequence. Only twins show genetics is incorrect, as genetics apply to all individuals, not just twins.",
    },
  ],
  organs: [
    {
      q: "What is the biggest problem artificial organs aim to solve?",
      o: ["Organ donation shortage", "Surgery costs too high", "Doctors lack training skills", "Recovery time is very slow"],
      c: 0,
      h: "Consider the primary challenge that artificial organs are designed to overcome regarding organ availability.",
      e: "The correct answer is Organ donation shortage. Artificial organs are developed to provide alternatives when there are not enough donated human organs available for transplant patients. Surgery costs too high, while a concern, is not the main problem artificial organs primarily aim to solve. Doctors lack training skills is incorrect because the development of artificial organs is not directly aimed at improving doctor training. Recovery time is very slow is also not the main problem addressed, though new procedures might aim to improve recovery.",
    },
    {
      q: "What is a scaffold in tissue engineering?",
      o: ["A fluid pump machine", "A structure for cell growth", "A drug for infection", "A living cell culture"],
      c: 1,
      h: "Think about what scaffolds provide in construction or engineering, and apply that concept to cells.",
      e: "The correct answer is A structure for cell growth. In tissue engineering, a scaffold acts as a temporary framework or support, much like a skeleton, allowing cells to attach, proliferate, and differentiate to form new tissues. A fluid pump machine is incorrect, as this describes a device for moving liquids, not supporting cell growth. A drug for infection is incorrect, as scaffolds are structural, not pharmaceutical. A living cell culture describes cells growing in a controlled environment, but the scaffold is the physical support within that environment, not the culture itself.",
    },
    {
      q: "What does a bioreactor do?",
      o: ["Prints tissues layer by layer", "Grows tissues in control", "Analyzes genetic patient data", "Removes donor cells only"],
      c: 1,
      h: "Consider the environment required for complex biological processes to occur outside of a living organism.",
      e: "The correct answer is Grows tissues in control. A bioreactor is an apparatus designed to create a controlled environment that mimics the physiological conditions necessary for the growth and development of cells or tissues. Prints tissues layer by layer describes 3D bioprinting, which is a method, not the general function of a bioreactor. Analyzes genetic patient data is incorrect, as this is the function of genetic analysis tools, not a bioreactor. Removes donor cells only is incorrect; while some bioreactor processes might involve cell manipulation, this is not its primary function.",
    },
    {
      q: "Which organ has been successfully lab grown and implanted in patients?",
      o: ["The urinary bladder", "The human heart", "The complex human brain", "A working pancreas"],
      c: 0,
      h: "Recall which human organ, among those listed, has a relatively simpler structure and function that has allowed for successful laboratory construction and implantation.",
      e: "The correct answer is The urinary bladder. The urinary bladder is one of the organs that has been successfully grown in the lab using a patient's own cells and implanted, primarily due to its relatively simpler structure and function compared to other complex organs. The human heart is a complex organ with intricate pumping mechanisms that have not yet been fully lab grown and successfully implanted. The complex human brain is far too complex to be grown and implanted in patients. A working pancreas, with its dual exocrine and endocrine functions, also presents significant challenges not yet overcome for full lab grown implantation.",
    },
    {
      q: "Why is vascularization such a hard problem for engineered organs?",
      o: ["Vessels make organs heavy", "Vessels block immunity", "Inner cells starve without vessels", "Vessels stop cell division"],
      c: 2,
      h: "Focus on what cells inside a growing organ need to survive and function.",
      e: "The correct answer is Inner cells starve without vessels. Vascularization is the process of forming blood vessels, which are crucial for supplying oxygen and nutrients and removing waste products from cells. Without proper vascularization, cells in the interior of engineered organs cannot receive these vital supplies and will die. Vessels make organs heavy is incorrect, as the weight of vessels is not the primary challenge. Vessels block immunity is incorrect; while immune response is a concern in transplantation, the primary vascularization challenge relates to cell survival. Vessels stop cell division is incorrect; blood vessels are essential for cell proliferation and overall tissue health, not an impediment to it.",
    },
    {
      q: "Using a patient's own cells to build an organ mainly helps by doing what?",
      o: ["Makes organs grow quickly", "Eliminates need for surgery", "Guarantees organs never fail", "Lowers immune rejection risk"],
      c: 3,
      h: "Think about one of the most significant challenges in organ transplantation using donor organs.",
      e: "The correct answer is Lowers immune rejection risk. When an organ is built using a patient's own cells, the body recognizes these cells as 'self,' significantly reducing the chance of the immune system attacking and rejecting the new organ, which is a major problem with donor organs. Makes organs grow quickly is incorrect; while some methods aim for faster growth, using a patient's own cells doesn't inherently guarantee quick growth. Eliminates need for surgery is incorrect; implantation of an engineered organ still requires surgical procedures. Guarantees organs never fail is incorrect; no organ, artificial or natural, can be guaranteed never to fail, though rejection risk is lowered.",
    },
    {
      q: "What is 3D bioprinting?",
      o: ["Creating plastic practice models", "Building tissues using bio ink", "Designing prosthetics from plastic", "Developing medical devices digitally"],
      c: 1,
      h: "Consider the meaning of 'bio' in bioprinting and what the technology aims to create.",
      e: "The correct option is 'Building tissues using bio ink' because 3D bioprinting specifically uses biological materials or 'bio inks' to construct living tissues and organs layer by layer. 'Creating plastic practice models' is incorrect because while 3D printing can create plastic models, bioprinting focuses on biological structures. 'Designing prosthetics from plastic' is incorrect as this describes conventional 3D printing of medical devices, not bioprinting. 'Developing medical devices digitally' is incorrect, as bioprinting involves physical creation, not just digital development.",
    },
    {
      q: "Which is a major ethical concern with lab grown organs?",
      o: ["Changes in human identity", "Impact on human population", "Risk of organ rejection", "Unequal access due to cost"],
      c: 3,
      h: "Ask who would be able to afford it.",
      e: "Advanced organ engineering is expensive, raising real concerns about who gets access. The other options describe advantages or non-problems rather than ethical dilemmas.",
    },
  ],
  pandemic: [
    {
      q: "What is a pandemic?",
      o: ["Severe seasonal flu outbreak", "Widespread disease over continents", "New disease in one country", "Epidemic contained regionally"],
      c: 1,
      h: "Think about scale and geography.",
      e: "A pandemic spreads across multiple countries or continents and affects large numbers of people. An outbreak in one hospital is local, animal-only diseases are epizootics, and allergies are not infectious at all.",
    },
    {
      q: "What is a zoonotic disease?",
      o: ["Disease by insect vectors", "Genetic disease in animals", "Disease from animals to humans", "Illness only in wild animals"],
      c: 2,
      h: "The root zoo means animal.",
      e: "Zoonotic diseases jump from animals to people through spillover events, as with many flu strains. Zoos are not required, allergies are immune overreactions, and inherited conditions are genetic rather than infectious.",
    },
    {
      q: "Which lab test detects a virus's genetic material?",
      o: ["Detects virus antibodies", "Detects viral genetic material", "Identifies viral proteins", "Measures immune response"],
      c: 1,
      h: "Three of these are imaging tools.",
      e: "PCR amplifies and detects a pathogen's genetic material, making it highly sensitive. MRI, X-ray, and ultrasound produce pictures of the body and cannot identify a virus's genome.",
    },
    {
      q: "What do epidemiologists mainly do during an outbreak?",
      o: ["Investigate outbreak patterns", "Treat infected patients", "Develop new vaccines", "Manage hospital resources"],
      c: 0,
      h: "They are the detectives of public health.",
      e: "Epidemiologists interview patients, trace infections, and analyze data to understand spread. Surgery is for surgeons, buildings are for architects, and vaccine manufacturing is a separate industrial process.",
    },
    {
      q: "What is contact tracing?",
      o: ["Tracking viral spread in a population", "Assessing risk factors for exposure", "Counting disease related hospital visits", "Finding those exposed to a disease"],
      c: 3,
      h: "Think about the primary goal of this public health intervention regarding exposure to an infectious agent.",
      e: "Contact tracing is a public health strategy aimed at finding individuals who have been exposed to a person with an infectious disease. Finding those exposed to a disease is correct because it directly addresses this goal. Tracking viral spread in a population is too broad, as contact tracing is a specific method within that effort. Assessing risk factors for exposure is part of the process but not the definition of contact tracing itself. Counting disease related hospital visits focuses on outcomes rather than the proactive identification of exposed individuals.",
    },
    {
      q: "Why is genome sequencing useful during an outbreak?",
      o: ["Directly treats patients in hospitals", "Measures blood pressure of infected", "Monitors changes and finds mutations", "Replaces need for all vaccinations"],
      c: 2,
      h: "Consider how studying the genetic material of a pathogen can inform our understanding of its evolution during an outbreak.",
      e: "Genome sequencing involves reading the genetic code of an organism, which is crucial for understanding how a pathogen changes over time. Monitors changes and finds mutations is correct because this technology allows scientists to track genetic variations, understand transmission chains, and predict how a virus might evolve. Directly treats patients in hospitals is incorrect as sequencing is a diagnostic and surveillance tool, not a treatment. Measures blood pressure of infected is a clinical measurement unrelated to genome sequencing. Replaces need for all vaccinations is incorrect, as sequencing provides information but does not replace preventative measures like vaccines.",
    },
    {
      q: "Which organizations coordinate global outbreak response?",
      o: ["UN and NATO health regulations", "WHO and CDC work globally", "NIH and FDA fund medical studies", "WMO and UNEP climate monitoring"],
      c: 1,
      h: "Think about the major international organizations responsible for global health and disease control.",
      e: "Global outbreaks require coordinated efforts from international health organizations. WHO and CDC work globally is correct because the World Health Organization (WHO) is a specialized agency of the United Nations that is concerned with international public health, and while the CDC is primarily US based, it collaborates internationally and often advises on global responses. UN and NATO health regulations is incorrect because while the UN has a role, NATO is a military alliance and not a primary global health body. NIH and FDA fund medical studies focuses on national research and regulatory bodies, not global coordination. WMO and UNEP climate monitoring refers to organizations focused on meteorology and environment, not directly on disease outbreak response.",
    },
    {
      q: "What is wastewater surveillance used for?",
      o: ["Early pathogen detection in communities", "Purifies contaminated drinking supply", "Measures rainfall and water levels", "Tests soil for essential nutrients"],
      c: 0,
      h: "Consider how analyzing community waste could offer an early warning system for public health.",
      e: "Wastewater surveillance is a tool used to detect the presence of pathogens in a community's wastewater, providing an early indication of disease trends. Early pathogen detection in communities is correct because individuals shed viruses or bacteria in their waste, allowing for population level monitoring before clinical cases surge. Purifies contaminated drinking supply is incorrect, as surveillance is for detection, not purification. Measures rainfall and water levels relates to hydrology, not pathogen detection. Tests soil for essential nutrients is an agricultural or environmental soil analysis, unrelated to public health pathogen detection in wastewater.",
    },
  ],
  trials: [
    {
      q: "What is a clinical trial?",
      o: ["Studies treatment safety in volunteers", "A doctor's medical examination", "An audit of hospital finances", "Computer simulation of diseases"],
      c: 0,
      h: "Think about the process by which new medical treatments are rigorously tested for safety and effectiveness.",
      e: "A clinical trial is a research study conducted in human volunteers to evaluate a medical, surgical, or behavioral intervention. Studies treatment safety in volunteers is correct because this is the primary purpose of clinical trials. A doctor's medical examination is routine patient care, not a research study. An audit of hospital finances involves financial review, not medical research. Computer simulation of diseases can be part of preclinical research but is not a clinical trial itself, which involves human participants.",
    },
    {
      q: "What happens before a medicine is tested in humans?",
      o: ["Widespread public advertisements begin", "FDA grants final approval now", "Lab and preclinical studies occur", "Phase III human trials start first"],
      c: 2,
      h: "Before a new medicine reaches humans, what crucial preliminary research stages must it undergo?",
      e: "Before any new medicine can be tested in humans, it undergoes extensive preliminary research. Lab and preclinical studies occur is correct because this phase involves testing in vitro (in test tubes or cell cultures) and in vivo (in animals) to assess safety and efficacy before human trials. Widespread public advertisements begin is incorrect as this happens much later, usually after approval. FDA grants final approval now is incorrect, as final approval is the very last step after successful clinical trials. Phase III human trials start first is incorrect, as Phase I and Phase II trials precede Phase III, and all human trials come after preclinical studies.",
    },
    {
      q: "What is the main focus of a Phase I trial?",
      o: ["Confirm drug effectiveness now", "Prepare drug for market entry", "Evaluate drug safety, find dose", "Assess drug in all patients"],
      c: 2,
      h: "Think about the very first steps in human testing for a new drug.",
      e: "The correct option is 'Evaluate drug safety, find dose'. Phase I trials are the first time a drug is tested in humans, primarily to assess its safety, identify potential side effects, and determine the optimal dosage. 'Confirm drug effectiveness now' is incorrect because effectiveness is usually assessed in later phases. 'Prepare drug for market entry' is incorrect because market entry occurs much later, after all trial phases are complete and regulatory approval is obtained. 'Assess drug in all patients' is incorrect as Phase I trials involve a small number of healthy volunteers or patients.",
    },
    {
      q: "Which phase usually involves the most participants?",
      o: ["Phase I, few volunteers", "Preclinical, animal studies", "Phase III has most patients", "Phase 0, initial testing"],
      c: 2,
      h: "Consider which phase requires a large and diverse group of people to confirm efficacy and monitor for less common side effects.",
      e: "The correct option is 'Phase III has most patients'. Phase III trials involve a large number of participants, often hundreds to thousands, to confirm the drug's effectiveness, monitor side effects, and compare it with existing treatments. 'Phase I, few volunteers' is incorrect because Phase I trials involve a small number of participants. 'Preclinical, animal studies' is incorrect because preclinical studies are done in animals, not humans, and do not involve human participants. 'Phase 0, initial testing' is incorrect because Phase 0 trials involve a very small number of participants to explore how the drug behaves in the body.",
    },
    {
      q: "Why are placebos used in trials?",
      o: ["Reduce overall trial costs", "Accelerate study progress", "Compare fairly, reduce bias", "Provide treatment to control"],
      c: 2,
      h: "Consider the scientific principle of comparing an active treatment to a control when conducting research.",
      e: "The correct option is 'Compare fairly, reduce bias'. Placebos are used in clinical trials to ensure that the perceived effects of a new treatment are truly due to the drug itself and not other factors, such as the patient's expectation, thereby reducing bias. 'Reduce overall trial costs' is incorrect as placebos do not inherently reduce costs. 'Accelerate study progress' is incorrect as placebos are about scientific rigor, not speed. 'Provide treatment to control' is incorrect because a placebo by definition does not provide an active treatment.",
    },
    {
      q: "What does double blind mean?",
      o: ["Patients cannot see dosing", "Neither knows treatment assignment", "Study performed two times", "Only pharmacist is informed"],
      c: 1,
      h: "Think about how information is withheld from key participants in a study to maintain objectivity.",
      e: "The correct option is 'Neither knows treatment assignment'. In a double blind study, neither the participants nor the researchers (or healthcare providers) involved in administering the treatment know who is receiving the active drug and who is receiving the placebo, which helps prevent bias. 'Patients cannot see dosing' is incorrect as double blinding is about knowledge of the treatment type, not observation of dosing. 'Study performed two times' is incorrect as double blind refers to who knows the treatment assignment, not the number of times a study is conducted. 'Only pharmacist is informed' is incorrect because the information is typically sealed, and even the pharmacist might only know coded assignments, not directly what is being administered to a specific patient without breaking the code.",
    },
    {
      q: "What is informed consent?",
      o: ["Volunteers understand risks, then agree", "Doctor signs for patient", "Agreeing to pay treatment", "Government approval form"],
      c: 0,
      h: "Consider the ethical principle of ensuring participants understand what they are agreeing to in a medical study.",
      e: "The correct option is 'Volunteers understand risks, then agree'. Informed consent is a process where a potential participant receives comprehensive information about a clinical trial, including its purpose, procedures, risks, and benefits, and then voluntarily agrees to participate. 'Doctor signs for patient' is incorrect as consent must come from the patient or their legal representative. 'Agreeing to pay treatment' is incorrect as informed consent is about participation, not payment for treatment. 'Government approval form' is incorrect as it is a process for individual participants, not a government approval document.",
    },
    {
      q: "What is the purpose of Phase IV studies?",
      o: ["Monitor long term safety, post approval", "Test drug in animals", "Determine initial human dose", "Create trial protocol early"],
      c: 0,
      h: "Consider what happens after a drug has been approved and is available to the general public.",
      e: "The correct option is 'Monitor long term safety, post approval'. Phase IV studies, also known as post marketing surveillance studies, are conducted after a drug has been approved and launched to monitor its long term safety, effectiveness in diverse populations, and identify any rare side effects not observed in earlier, smaller trials. 'Test drug in animals' is incorrect as this happens in preclinical studies, before human trials. 'Determine initial human dose' is incorrect as this is the primary goal of Phase I trials. 'Create trial protocol early' is incorrect as protocol creation is an early step in designing any clinical trial, not a specific phase of study itself.",
    },
  ],
  robots: [
    {
      q: "In most robotic surgery today, who controls the instruments?",
      o: ["Robot's AI makes decisions", "Nurse directs robot's movements", "Patient operates controls personally", "Surgeon controls instruments directly"],
      c: 3,
      h: "Consider the role of the human expert in cutting edge medical procedures involving robots.",
      e: "The correct option is 'Surgeon controls instruments directly'. In most robotic surgery today, the robot is a sophisticated tool that enhances the surgeon's capabilities, but the surgeon maintains direct control over the instruments. 'Robot's AI makes decisions' is incorrect because the AI does not independently make surgical decisions. 'Nurse directs robot's movements' is incorrect as the primary surgeon, not a nurse, controls the surgical instruments. 'Patient operates controls personally' is incorrect because patients are under anesthesia and are not involved in operating the surgical controls.",
    },
    {
      q: "Which is a real benefit of robotic surgery?",
      o: ["Filters hand tremor, steadies motions", "Removes anesthesia requirements", "Eliminates all surgical dangers", "Makes surgery completely free now"],
      c: 0,
      h: "Think about how technology can improve precision and stability in delicate tasks.",
      e: "The correct option is 'Filters hand tremor, steadies motions'. Robotic surgical systems are designed to enhance a surgeon's precision by filtering out natural hand tremors and providing steadier movements. 'Removes anesthesia requirements' is incorrect because anesthesia is still necessary for most robotic surgical procedures. 'Eliminates all surgical dangers' is incorrect as surgery, regardless of method, always carries inherent risks and dangers. 'Makes surgery completely free now' is incorrect as robotic surgery is typically an expensive procedure, not a free one.",
    },
    {
      q: "Why do robotic systems use 3D high definition cameras?",
      o: ["Records videos for education", "Magnified depth, clearer view", "Replaces need for bright lights", "Scans for patient sensitivities"],
      c: 1,
      h: "Consider how improved visualization can benefit a surgeon performing a complex procedure.",
      e: "The correct option is 'Magnified depth, clearer view'. Robotic systems use 3D high definition cameras to provide surgeons with a magnified, three dimensional, and clearer view of the surgical site, which is crucial for precision. 'Records videos for education' is a secondary benefit, not the primary reason for their high definition and 3D capabilities during surgery. 'Replaces need for bright lights' is incorrect as adequate lighting is still essential, even with advanced cameras. 'Scans for patient sensitivities' is incorrect as this is not the primary function of the 3D high definition cameras during surgery.",
    },
    {
      q: "Robotic surgery is often described as minimally invasive because it uses what?",
      o: ["Small incisions, thin instruments", "No incisions, completely external", "Requires large access openings", "Only external lasers are used"],
      c: 0,
      h: "Think about the meaning of 'minimally invasive' in medical terms.",
      e: "The correct option is 'Small incisions, thin instruments'. Minimally invasive surgery, including robotic surgery, is characterized by using small incisions through which thin, specialized instruments are inserted. 'No incisions, completely external' is incorrect as robotic surgery typically still requires incisions, though smaller ones. 'Requires large access openings' is incorrect, as this describes open surgery, not minimally invasive. 'Only external lasers are used' is incorrect; while lasers can be used in some procedures, robotic surgery primarily involves instruments inserted through small incisions.",
    },
    {
      q: "Which is a genuine limitation of robotic surgery?",
      o: ["Cannot be used in many hospitals", "Always faster than open methods", "High cost, special training", "Functions without any electricity"],
      c: 2,
      h: "Consider the practical challenges and resources needed to implement advanced medical technology.",
      e: "The correct option is 'High cost, special training'. A genuine limitation of robotic surgery is its high initial cost for the equipment and the specialized training required for surgical teams. 'Cannot be used in many hospitals' is incorrect because its use is expanding, though limited by cost. 'Always faster than open methods' is incorrect, as robotic surgery can sometimes take longer than traditional open surgery. 'Functions without any electricity' is incorrect as robotic systems are complex machines that require significant electrical power to operate.",
    },
    {
      q: "In which field are surgical robots most commonly used?",
      o: ["Dermatology, with skin creams", "Dentistry, for teeth cleaning", "Physical therapy, with exercise", "Urology, prostate operations"],
      c: 3,
      h: "Consider areas of surgery where high precision and access to confined spaces are particularly beneficial.",
      e: "The correct option is 'Urology, prostate operations'. Surgical robots are most commonly used in urology, particularly for prostatectomies, due to the need for precise dissection in a confined space. 'Dermatology, with skin creams' is incorrect as dermatology primarily focuses on skin conditions and often involves less invasive treatments. 'Dentistry, for teeth cleaning' is incorrect as dentistry involves different procedures and tools, and robots are not standard for teeth cleaning. 'Physical therapy, with exercise' is incorrect as physical therapy is focused on rehabilitation and movement, not surgical intervention.",
    },
    {
      q: "How is AI currently used alongside surgical robots?",
      o: ["AI performs complex operations.", "AI aids surgeons with data.", "AI selects patients for surgery.", "AI replaces some medical staff."],
      c: 1,
      h: "Consider AI's strengths in processing information and assisting human experts.",
      e: "The correct option is 'AI aids surgeons with data.' AI systems excel at analyzing vast amounts of data quickly, providing surgeons with real time insights during operations, such as identifying anatomical structures or predicting complications. 'AI performs complex operations' is incorrect because AI currently assists, it does not autonomously perform entire complex surgeries. 'AI selects patients for surgery' is not the primary current use of AI with surgical robots, although AI can be used in patient selection processes more broadly. 'AI replaces some medical staff' is incorrect, as AI's role is to augment and assist, not to directly replace staff in the surgical suite during robot assisted procedures.",
    },
    {
      q: "What is haptic feedback in surgical robotics?",
      o: ["Robot shows power status.", "Robot cleans surgical tools.", "Robot offers touch sensation.", "Robot regulates its temperature."],
      c: 2,
      h: "Think about how robots can provide sensory information to a human operator.",
      e: "The correct option is 'Robot offers touch sensation.' Haptic feedback refers to technology that creates an experience of touch by applying forces, vibrations, or motions to the user. In surgical robotics, this allows surgeons to feel tissues or organs through the robotic instruments. 'Robot shows power status' describes an indicator, not a touch sensation. 'Robot cleans surgical tools' is a function of sterilization, not haptic feedback. 'Robot regulates its temperature' is about internal robot maintenance, not sensory feedback to the user.",
    },
  ],
  synthetic: [
    {
      q: "What are synthetic organs?",
      o: ["Lab grown replacement organs.", "Organs from other donors.", "Machines, not living tissue.", "Computer simulations only."],
      c: 0,
      h: "Consider the goal of creating biological replacements in a laboratory setting.",
      e: "The correct option is 'Lab grown replacement organs.' Synthetic organs, in the context of regenerative medicine, are biological organs created or grown in a laboratory to replace diseased or damaged organs in the body. 'Organs from other donors' are natural organs, not synthetic ones. 'Machines, not living tissue' refers to artificial organs or prosthetics, not biological synthetic organs. 'Computer simulations only' are models, not physical organs designed for transplantation.",
    },
    {
      q: "What is decellularization?",
      o: ["Freezing an organ for storage.", "Adding new cells to a scaffold.", "Printing an organ from plastic.", "Removing cells from a donor organ."],
      c: 3,
      h: "Think about a process that prepares a donor organ to be rebuilt with new cells.",
      e: "The correct option is 'Removing cells from a donor organ.' Decellularization is a biomedical engineering technique that involves stripping cells from a donor organ, leaving behind only the extracellular matrix, which can then be repopulated with a patient's own cells. 'Freezing an organ for storage' is cryopreservation, not decellularization. 'Adding new cells to a scaffold' describes recellularization, the next step after decellularization. 'Printing an organ from plastic' describes 3D bioprinting, often using synthetic materials, not the removal of cells from a biological organ.",
    },
    {
      q: "What is recellularization?",
      o: ["Removing cells from tissue.", "Cutting an organ into pieces.", "Adding cells to an organ scaffold.", "Sterilizing surgical tools."],
      c: 2,
      h: "Consider the step that follows decellularization in creating a bioengineered organ.",
      e: "The correct option is 'Adding cells to an organ scaffold.' Recellularization is the process of seeding a decellularized organ scaffold, which is the remaining extracellular matrix, with new cells, often from the recipient, to create a functional organ. 'Removing cells from tissue' describes decellularization, the opposite process. 'Cutting an organ into pieces' is disaggregation, not recellularization. 'Sterilizing surgical tools' is a hygiene practice, unrelated to bioengineering organs.",
    },
    {
      q: "What is an organoid?",
      o: ["Full sized transplant organ.", "Robotic organ replacement.", "Small organ grown from cells.", "A powerful type of antibiotic."],
      c: 2,
      h: "Consider the scale and purpose of these biological structures grown in a lab.",
      e: "The correct option is 'Small organ grown from cells.' An organoid is a miniature, simplified version of an organ produced in vitro from stem cells. It mimics the structure and function of the corresponding full sized organ, used for research. 'Full sized transplant organ' refers to an entire organ intended for transplantation, which an organoid is not. 'Robotic organ replacement' describes an artificial or mechanical device, not a biological structure. 'A powerful type of antibiotic' is a medication, unrelated to biological organ structures.",
    },
    {
      q: "Why are stem cells so valuable in building synthetic organs?",
      o: ["They become many cell types", "They avoid immune rejection", "They remain undifferentiated forever", "They only replace damaged cells"],
      c: 0,
      h: "Consider the unique ability of these cells regarding specialization.",
      e: "The correct answer is They become many cell types. Stem cells are valuable because they possess pluripotency or multipotency, meaning they can differentiate into various specialized cell types needed for building complex organs. They avoid immune rejection is incorrect because while some stem cells (like iPSCs) can reduce rejection, it's not their primary value in *building* synthetic organs, and many stem cells can still be rejected. They remain undifferentiated forever is incorrect because stem cells must differentiate to form tissues and organs. They only replace damaged cells is incorrect because stem cells are used for growth and development, not solely for repair, and in synthetic organ building, they are used to create entirely new structures, not just replace damaged parts.",
    },
    {
      q: "Which engineered tissue is already used routinely in patients?",
      o: ["Lab grown heart tissue", "Engineered bone grafts", "Skin substitutes for burns", "Replacement blood vessels"],
      c: 2,
      h: "Think about tissues that are commonly used for wound healing or repair in external areas.",
      e: "The correct answer is Skin substitutes for burns. Engineered skin substitutes have been routinely used in patients for many years, especially in treating severe burns, as they can accelerate healing and reduce complications. Lab grown heart tissue is incorrect because while promising, it is not yet routinely used in patients. Engineered bone grafts are incorrect as while bone tissue engineering is an active field, routine use for complex grafts in patients is still developing compared to skin substitutes. Replacement blood vessels is incorrect because while some synthetic or decellularized blood vessels are used, the routine use of fully engineered, living blood vessels is still largely in research or limited clinical trials.",
    },
    {
      q: "Why is nerve integration important for a synthetic organ?",
      o: ["Organs need nerve signals to work", "Nerves prevent organ damage", "Nerves improve blood flow", "Nerves give structural support"],
      c: 0,
      h: "Reflect on how your body's control system communicates with your internal organs.",
      e: "The correct answer is Organs need nerve signals to work. For a synthetic organ to function properly and integrate with the body, it must receive and transmit nerve signals, allowing communication with the brain and nervous system for regulation and sensation. Nerves prevent organ damage is incorrect, as while nerves can signal pain or dysfunction, their primary role in an organ's function is not prevention of damage itself. Nerves improve blood flow is incorrect, as while the nervous system can influence blood vessel diameter, this is a secondary effect and not the primary reason for nerve integration in an organ. Nerves give structural support is incorrect, as the primary structural support for organs comes from connective tissues, not nerves.",
    },
    {
      q: "What is a smart biomaterial scaffold?",
      o: ["A scaffold holding simple cells", "A framework made of strong plastic", "A material responding to body", "A template for complex structures"],
      c: 2,
      h: "Consider what makes something 'smart' in a biological context, especially regarding its interaction with the environment.",
      e: "The correct answer is A material responding to body. A smart biomaterial scaffold is designed to react to its biological environment, such as changes in pH, temperature, or the presence of specific biomolecules, allowing for controlled drug release or guiding cell behavior. A scaffold holding simple cells is incorrect because 'smartness' implies responsiveness, not just holding cells. A framework made of strong plastic is incorrect, as while some scaffolds use plastics, the 'smart' aspect refers to dynamic properties, not just material strength. A template for complex structures is incorrect because while scaffolds do provide a template, the 'smart' part refers to their active and responsive nature, not just their templating ability.",
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

