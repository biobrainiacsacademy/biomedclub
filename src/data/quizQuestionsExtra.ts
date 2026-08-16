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
      o: ["A gel that holds nutrients for bacteria to grow on", "A chemical that kills bacteria", "A dye that stains bacteria", "A tool for counting cells"],
      c: 0,
      h: "Think of it as the food and the floor at the same time.",
      e: "Agar is a jelly made from seaweed that stays solid at body temperature and carries nutrients, so colonies can grow on its surface. It does not kill bacteria, it is not a stain, and counting is done by eye or by imaging after growth.",
    },
    {
      q: "What is a bacterial colony?",
      o: ["A visible pile of millions of cells from one original cell", "A single bacterium you can see", "A group of different species mixed together", "A virus growing on a plate"],
      c: 0,
      h: "One cell divides again and again in the same spot.",
      e: "One cell lands on the plate and divides repeatedly, so the visible dot is millions of clones. A single bacterium is far too small to see without a microscope, colonies are usually one species, and viruses need host cells rather than agar.",
    },
    {
      q: "Why are plates incubated around 37 degrees Celsius?",
      o: ["It matches human body temperature, where many bacteria grow best", "It sterilizes the plate", "It freezes contaminants", "It makes agar melt"],
      c: 0,
      h: "Think about where these microbes usually live.",
      e: "Many bacteria studied in labs live in or on humans, so body temperature gives fast, realistic growth. Sterilizing requires much higher heat, freezing is the opposite direction, and agar stays solid at this temperature.",
    },
    {
      q: "Why should you work near a flame or in a clean hood?",
      o: ["To reduce airborne contaminants landing on the plate", "To warm the bacteria", "To make colonies bigger", "To sterilize the agar after pouring"],
      c: 0,
      h: "It is about what falls out of the air.",
      e: "Aseptic technique keeps stray microbes from the air and your hands off the plate so your results show what you actually inoculated. Warming, colony size, and post pour sterilization are not the purpose of that step.",
    },
  ],
  blood: [
    {
      q: "What determines your ABO blood type?",
      o: ["Antigens on the surface of red blood cells", "The color of your plasma", "The number of white blood cells", "The size of your red blood cells"],
      c: 0,
      h: "Look at the outside of the red cell.",
      e: "A and B antigens are sugar markers on red cell surfaces, and which ones you carry defines your ABO type. Plasma color, white cell counts, and red cell size vary for other reasons and do not set your type.",
    },
    {
      q: "Which blood type is the universal red cell donor?",
      o: ["O negative", "AB positive", "A positive", "B negative"],
      c: 0,
      h: "Fewest markers on the cell means fewest ways to trigger an attack.",
      e: "O negative red cells carry no A, B, or Rh D antigens, so almost any recipient's immune system leaves them alone. AB positive is the universal recipient rather than donor, and A and B types carry antigens that can cause reactions.",
    },
    {
      q: "What does the positive or negative in a blood type refer to?",
      o: ["Presence or absence of the Rh D antigen", "How acidic the blood is", "Whether the blood clots", "Iron levels in the blood"],
      c: 0,
      h: "It is one more surface marker.",
      e: "Rh positive means the D antigen is present and Rh negative means it is absent, which matters in transfusions and pregnancy. Acidity, clotting, and iron are separate measurements.",
    },
    {
      q: "Why can a mismatched transfusion be dangerous?",
      o: ["Antibodies attack the donor cells and cause them to clump and burst", "The blood is too cold", "Donor blood carries no oxygen", "The recipient runs out of plasma"],
      c: 0,
      h: "Think about the immune system meeting an unfamiliar marker.",
      e: "Pre existing antibodies bind foreign A or B antigens, causing agglutination and hemolysis that can damage the kidneys and be fatal. Temperature is controlled during transfusion, donor blood does carry oxygen, and plasma volume is not the core problem.",
    },
  ],
  aidrug: [
    {
      q: "Why is traditional drug discovery so slow?",
      o: ["Millions of possible compounds must be tested over many years", "Chemists refuse to use computers", "There are too few diseases to study", "Drugs are illegal to test"],
      c: 0,
      h: "Think about the size of the search space.",
      e: "The space of possible drug like molecules is astronomically large, so screening, optimizing, and trialing candidates takes a decade or more and billions of dollars. Computers are widely used, diseases are plentiful, and testing is legal under strict regulation.",
    },
    {
      q: "How does machine learning speed up early drug discovery?",
      o: ["It predicts which molecules are likely to bind a target before lab testing", "It replaces clinical trials entirely", "It manufactures the pills", "It writes prescriptions for patients"],
      c: 0,
      h: "Its job is to shrink the list before anyone touches a pipette.",
      e: "Models trained on chemical and biological data rank candidates so labs test the most promising few. Human trials are still required, manufacturing is a separate process, and prescribing is a clinical decision.",
    },
    {
      q: "What did AlphaFold change for biology?",
      o: ["It predicted protein 3D structures from amino acid sequences with high accuracy", "It cured cancer", "It sequenced the first human genome", "It invented antibiotics"],
      c: 0,
      h: "Shape from sequence.",
      e: "Knowing a protein's folded shape helps researchers design molecules that fit its pockets, and AlphaFold made those predictions fast and accurate. It is not a cure, the genome project was completed by sequencing, and antibiotics predate it by decades.",
    },
    {
      q: "What is a major limitation of AI in medicine?",
      o: ["Models are only as good as the data they are trained on", "Computers cannot store chemistry data", "AI cannot do math", "Predictions are always perfect"],
      c: 0,
      h: "Garbage in, garbage out.",
      e: "Biased, sparse, or noisy training data leads to unreliable predictions, which is why lab and clinical validation still matter. Storage and math are trivial for computers, and no model is perfect.",
    },
  ],
  bioelectronics: [
    {
      q: "What is bioelectronics?",
      o: ["Devices that connect electronic circuits with living tissue", "The study of electricity in storms", "A branch of plant biology", "A method for extracting DNA"],
      c: 0,
      h: "The name joins two fields.",
      e: "Bioelectronics builds interfaces where electronics sense or stimulate biological signals, such as pacemakers and neural implants. Weather electricity, plant biology, and DNA extraction are unrelated fields.",
    },
    {
      q: "Which is a widely used bioelectronic implant?",
      o: ["A cardiac pacemaker", "A plaster cast", "A pair of eyeglasses", "A cotton bandage"],
      c: 0,
      h: "It sends timed electrical pulses.",
      e: "A pacemaker senses heart rhythm and delivers electrical pulses to keep it regular, making it a classic bioelectronic device. Casts, glasses, and bandages are purely mechanical or optical.",
    },
    {
      q: "Why must bioelectronic materials be biocompatible?",
      o: ["To avoid immune rejection, inflammation, and scar tissue", "To make them cheaper", "To make them conduct heat", "To help them dissolve instantly"],
      c: 0,
      h: "Think about how the body reacts to a foreign object.",
      e: "Scar tissue around an implant blocks signals and the immune response can damage tissue, so materials are chosen to be tolerated long term. Cost, heat conduction, and dissolving are not the reason.",
    },
    {
      q: "What does a neural interface do?",
      o: ["Reads or stimulates electrical activity in nerve cells", "Replaces the skull with metal", "Turns thoughts into DNA", "Powers the brain with fuel"],
      c: 0,
      h: "Neurons already speak in electrical spikes.",
      e: "Neurons fire electrical signals, and neural interfaces record or stimulate those signals for prosthetics and therapies. They do not replace bone, encode thoughts as DNA, or fuel the brain, which runs on glucose and oxygen.",
    },
  ],
  imaging: [
    {
      q: "What do X rays image best?",
      o: ["Dense structures like bone", "Individual brain cells", "Blood chemistry", "DNA sequences"],
      c: 0,
      h: "Dense tissue blocks the beam.",
      e: "X rays pass easily through soft tissue but are absorbed by dense bone, creating high contrast skeletal images. Single cells, blood chemistry, and DNA require microscopes and lab tests instead.",
    },
    {
      q: "What does MRI primarily use to build an image?",
      o: ["Strong magnetic fields and radio waves interacting with water in tissue", "Ionizing radiation", "High frequency sound waves", "Injected radioactive sugar"],
      c: 0,
      h: "The M stands for magnetic.",
      e: "MRI aligns hydrogen nuclei with a strong magnet and reads radio signals as they relax, giving excellent soft tissue detail without radiation. Radiation is used by CT, sound by ultrasound, and radioactive sugar by PET.",
    },
    {
      q: "Which imaging method is safest for viewing a fetus?",
      o: ["Ultrasound", "CT scan", "PET scan", "X ray"],
      c: 0,
      h: "It uses sound, not radiation.",
      e: "Ultrasound uses high frequency sound waves with no ionizing radiation, so it is the standard for pregnancy. CT, PET, and X ray all involve radiation exposure that is avoided when possible.",
    },
    {
      q: "What makes a PET scan different from a CT scan?",
      o: ["PET shows metabolic activity, CT shows detailed anatomy", "PET uses magnets, CT uses sound", "PET only images bone", "CT cannot show organs"],
      c: 0,
      h: "One shows what tissue is doing, the other what it looks like.",
      e: "PET tracks a radioactive tracer to reveal which tissues are metabolically active, which is useful for finding tumors, while CT stacks X ray slices into detailed structure. Magnets belong to MRI and sound to ultrasound.",
    },
  ],
  nanomedicine: [
    {
      q: "How small is a nanometer?",
      o: ["One billionth of a meter", "One thousandth of a meter", "One millionth of a centimeter", "One hundredth of a millimeter"],
      c: 0,
      h: "Nano means billionth.",
      e: "A nanometer is 10 to the power of negative 9 meters, roughly the width of a few atoms side by side. The other options describe millimeter and micrometer scales, which are thousands of times larger.",
    },
    {
      q: "What is a key advantage of nanoparticle drug delivery?",
      o: ["Drugs can be targeted to diseased cells, reducing side effects", "Drugs become free to produce", "Patients never need a second dose", "Drugs no longer need testing"],
      c: 0,
      h: "Think about hitting the target instead of the whole body.",
      e: "Surface targeting molecules let nanoparticles concentrate the drug where it is needed, sparing healthy tissue. Cost, dosing schedules, and regulatory testing are unchanged by the technology.",
    },
    {
      q: "How were mRNA COVID vaccines delivered into cells?",
      o: ["Inside lipid nanoparticles", "Inside metal capsules", "As a plain injection of naked mRNA", "Through a nasal spray only"],
      c: 0,
      h: "Fatty bubbles protect fragile cargo.",
      e: "Lipid nanoparticles shield the fragile mRNA from enzymes and help it enter cells, which made the vaccines possible. Naked mRNA degrades quickly, metal capsules are not used, and those vaccines were injected rather than sprayed.",
    },
    {
      q: "What is a theranostic nanoparticle?",
      o: ["One that both diagnoses and treats disease", "One that only takes pictures", "One made entirely of gold", "One that dissolves the immune system"],
      c: 0,
      h: "The word blends therapy and diagnostics.",
      e: "Theranostic particles carry both an imaging agent and a therapy, so doctors can see and treat a target with one platform. Imaging only particles are diagnostics, material choice varies, and destroying the immune system would be harmful.",
    },
  ],
  bioelectricity: [
    {
      q: "What creates the electrical signal in a neuron?",
      o: ["Charged ions moving across the cell membrane", "Tiny batteries inside the cell", "Friction between cells", "Light absorbed by the cell"],
      c: 0,
      h: "Think sodium and potassium.",
      e: "Ion channels let sodium and potassium flow, flipping the membrane voltage and producing an action potential. There are no batteries, friction, or light sources involved in normal neural firing.",
    },
    {
      q: "What does an EKG or ECG measure?",
      o: ["Electrical activity of the heart", "Oxygen in the blood", "Brain wave patterns", "Blood sugar levels"],
      c: 0,
      h: "Cardio means heart.",
      e: "An electrocardiogram records the heart's electrical cycle from skin electrodes, revealing rhythm and conduction problems. Oxygen uses a pulse oximeter, brain waves use EEG, and blood sugar uses a glucose meter.",
    },
    {
      q: "What is the resting membrane potential?",
      o: ["The stable negative voltage inside a cell at rest", "The maximum voltage during a spike", "The voltage of the whole body", "The charge on the skin surface"],
      c: 0,
      h: "It is the baseline before anything fires.",
      e: "Most neurons sit near negative 70 millivolts inside relative to outside, which is the starting point for firing. The peak spike voltage is different, and whole body or skin charge is not what the term describes.",
    },
    {
      q: "How does a defibrillator help a heart in a dangerous rhythm?",
      o: ["It resets the electrical activity so a normal rhythm can restart", "It pumps blood mechanically", "It adds oxygen to the blood", "It cools the heart down"],
      c: 0,
      h: "Think of restarting a scrambled signal.",
      e: "A shock depolarizes the heart muscle at once, stopping chaotic activity so the natural pacemaker can take over. Mechanical pumping is CPR, oxygenation comes from the lungs or a machine, and cooling is a separate therapy.",
    },
  ],
  sleep: [
    {
      q: "What happens during REM sleep?",
      o: ["Brain activity rises and most vivid dreaming occurs", "The brain shuts down completely", "Body temperature spikes to a fever", "Muscles work harder than when awake"],
      c: 0,
      h: "REM stands for rapid eye movement.",
      e: "REM features fast brain activity, darting eyes, and temporary muscle paralysis, and it is when most vivid dreams happen. The brain is very active, temperature regulation dips, and skeletal muscles are largely switched off.",
    },
    {
      q: "Which hormone signals the body that it is time to sleep?",
      o: ["Melatonin", "Insulin", "Adrenaline", "Testosterone"],
      c: 0,
      h: "Darkness triggers its release.",
      e: "The pineal gland releases melatonin as light fades, shifting the body toward sleep. Insulin handles blood sugar, adrenaline drives alertness, and testosterone is a sex hormone.",
    },
    {
      q: "Why is deep slow wave sleep important for learning?",
      o: ["Memories are consolidated and moved into long term storage", "It burns the most calories", "It builds muscle only", "It stops all brain activity"],
      c: 0,
      h: "Think about filing the day's information.",
      e: "During slow wave sleep the hippocampus replays the day's experiences and the cortex stores them, which strengthens memory. Calorie burn is low, muscle repair is only part of the story, and the brain remains active.",
    },
    {
      q: "What is the circadian rhythm?",
      o: ["An internal roughly 24 hour clock that regulates sleep and wake", "A heartbeat pattern", "A breathing exercise", "A type of brain wave"],
      c: 0,
      h: "Circa diem means about a day.",
      e: "A brain region called the suprachiasmatic nucleus keeps a near 24 hour cycle synced by light, driving sleep timing, hormones, and temperature. It is not a heartbeat, a breathing technique, or a single brain wave.",
    },
  ],
  aging: [
    {
      q: "What are telomeres?",
      o: ["Protective caps at the ends of chromosomes that shorten with division", "Energy factories in the cell", "Proteins that digest food", "Signals that start puberty"],
      c: 0,
      h: "Think of the plastic tips on shoelaces.",
      e: "Telomeres protect chromosome ends and get shorter each division until the cell stops dividing, which is one hallmark of aging. Mitochondria make energy, enzymes digest food, and hormones drive puberty.",
    },
    {
      q: "What is cellular senescence?",
      o: ["Cells stop dividing but stay alive and release inflammatory signals", "Cells divide uncontrollably", "Cells turn into stem cells", "Cells become viruses"],
      c: 0,
      h: "They are sometimes called zombie cells.",
      e: "Senescent cells accumulate with age and leak inflammatory molecules that damage nearby tissue. Uncontrolled division describes cancer, reverting to stem cells is reprogramming, and cells never become viruses.",
    },
    {
      q: "Why is caloric restriction studied in aging research?",
      o: ["It extends lifespan in several animal models", "It causes rapid weight gain", "It shortens telomeres quickly", "It removes the need for sleep"],
      c: 0,
      h: "Less food, longer life, at least in the lab.",
      e: "Reduced calorie intake without malnutrition extends lifespan in yeast, worms, flies, and rodents by shifting cells toward repair pathways. It does not cause weight gain, shorten telomeres, or replace sleep.",
    },
    {
      q: "What do mitochondria have to do with aging?",
      o: ["Damage to them reduces energy output and increases harmful byproducts", "They store all your DNA", "They control blood type", "They make antibodies"],
      c: 0,
      h: "They are the power plants.",
      e: "As mitochondria accumulate damage, cells make less ATP and more reactive oxygen species, contributing to tissue decline. Most DNA sits in the nucleus, blood type is set by surface antigens, and antibodies come from B cells.",
    },
  ],
  biometrics: [
    {
      q: "What are biometrics?",
      o: ["Measurements of unique body traits or behaviors used to identify people", "A way to measure air quality", "The study of body temperature only", "A method of cloning"],
      c: 0,
      h: "Bio plus measurement.",
      e: "Fingerprints, iris patterns, face geometry, voice, and gait are all biometric identifiers. Air quality, temperature alone, and cloning are unrelated.",
    },
    {
      q: "Why are fingerprints useful for identification?",
      o: ["Ridge patterns are unique and stay stable through life", "They change every year", "Everyone in a family shares one", "They can be seen from far away"],
      c: 0,
      h: "Even identical twins differ here.",
      e: "Friction ridge patterns form before birth and remain unchanged barring deep injury, and even identical twins have different prints. They do not change yearly, are not shared by families, and require close contact to capture.",
    },
    {
      q: "What is a false acceptance in a biometric system?",
      o: ["The system wrongly matches an unauthorized person", "The system rejects the right person", "The scanner loses power", "The database is deleted"],
      c: 0,
      h: "Accepting someone it should not.",
      e: "A false acceptance is a security failure where an impostor is matched to a stored identity, while wrongly rejecting the correct person is a false rejection. Power loss and data deletion are different failures.",
    },
    {
      q: "What is a main privacy concern with biometrics?",
      o: ["You cannot change your fingerprint if the data is stolen", "Biometric data takes too much storage", "Scanners are too slow to be useful", "Biometrics only work outdoors"],
      c: 0,
      h: "Passwords can be reset, bodies cannot.",
      e: "A leaked biometric template is permanent because you cannot reissue your iris or fingerprint, which is why templates are encrypted rather than stored raw. Storage, speed, and lighting are engineering issues rather than the central privacy risk.",
    },
  ],
  dnaforensics: [
    {
      q: "What part of DNA is compared in a standard forensic profile?",
      o: ["Short tandem repeats, which vary a lot between people", "The entire genome", "Only mitochondrial DNA", "Protein sequences"],
      c: 0,
      h: "Investigators count repeating chunks.",
      e: "STR analysis counts repeats at around 20 locations, which is fast, cheap, and extremely discriminating. Whole genome sequencing is unnecessary, mitochondrial DNA is a backup for degraded samples, and proteins are not the standard profile.",
    },
    {
      q: "Why is PCR essential in forensic DNA work?",
      o: ["It copies tiny amounts of DNA into enough material to test", "It cleans blood off evidence", "It photographs fingerprints", "It reads handwriting"],
      c: 0,
      h: "Crime scene samples are usually very small.",
      e: "Polymerase chain reaction amplifies trace DNA from a hair root or a swab into billions of copies so a profile can be read. It does not clean evidence, photograph prints, or analyze writing.",
    },
    {
      q: "What is genetic genealogy in criminal cases?",
      o: ["Using public relative databases to narrow down who a sample belongs to", "Copying DNA into a computer", "Testing DNA from animals only", "Erasing DNA evidence"],
      c: 0,
      h: "Relatives share DNA.",
      e: "Investigators compare a crime scene profile to public ancestry databases, build family trees from partial matches, and narrow the pool to a suspect, which is how several cold cases were solved. It is not digitization, animal testing, or evidence removal.",
    },
    {
      q: "Why is contamination a serious risk in DNA evidence?",
      o: ["Even a few stray cells can produce a misleading profile", "DNA turns into RNA when touched", "Contamination makes DNA glow", "It changes a person's blood type"],
      c: 0,
      h: "PCR amplifies whatever is there, including mistakes.",
      e: "Amplification is so sensitive that a technician's skin cells can appear in the result, so gloves, masks, and controls are mandatory. Touching does not convert DNA to RNA, cause glowing, or alter blood type.",
    },
  ],
  forensics: [
    {
      q: "What is forensic entomology used for?",
      o: ["Estimating time since death from insect activity", "Identifying blood types", "Reading fingerprints", "Testing for poisons"],
      c: 0,
      h: "Entomology is the study of insects.",
      e: "Insects colonize remains in a predictable sequence, so their species and life stage help estimate the postmortem interval. Blood typing, fingerprinting, and toxicology are separate forensic disciplines.",
    },
    {
      q: "What does luminol reveal at a crime scene?",
      o: ["Traces of blood, even after cleaning", "Hidden fingerprints in dust", "Gunpowder residue color", "The age of a document"],
      c: 0,
      h: "It glows blue in the dark.",
      e: "Luminol reacts with iron in hemoglobin and emits a blue glow, exposing blood that has been wiped away. Prints, gunshot residue, and document dating use other tests.",
    },
    {
      q: "What is the chain of custody?",
      o: ["A documented record of everyone who handled a piece of evidence", "The order of suspects questioned", "A line of officers at a scene", "A DNA sequencing method"],
      c: 0,
      h: "It is about paperwork and trust.",
      e: "Every transfer of evidence is logged so a court can confirm nothing was altered or swapped, and gaps can make evidence inadmissible. It is not about suspects, officers, or sequencing.",
    },
    {
      q: "Why is forensic toxicology important?",
      o: ["It detects drugs, alcohol, and poisons in body fluids and tissue", "It measures bone density", "It identifies fabric fibers", "It matches shoe prints"],
      c: 0,
      h: "Think about what is inside the body.",
      e: "Toxicologists analyze blood, urine, and tissue to find substances that may explain a death or impairment. Bone analysis is anthropology, and fibers and shoe prints are trace and impression evidence.",
    },
  ],
  stemcells: [
    {
      q: "What makes stem cells special?",
      o: ["They can self renew and become other cell types", "They never die", "They contain extra chromosomes", "They live only in the brain"],
      c: 0,
      h: "Two abilities define them.",
      e: "Stem cells divide to make more of themselves and can differentiate into specialized cells, which is the basis of regeneration. They are not immortal, have normal chromosome counts, and exist in many tissues.",
    },
    {
      q: "What does pluripotent mean?",
      o: ["Able to become nearly any cell type in the body", "Able to become only blood cells", "Able to divide only once", "Able to survive without nutrients"],
      c: 0,
      h: "Pluri means many.",
      e: "Pluripotent cells such as embryonic stem cells can form cells of all three germ layers. Blood only describes multipotent hematopoietic cells, and the other options are simply false.",
    },
    {
      q: "What are induced pluripotent stem cells?",
      o: ["Adult cells reprogrammed back into a stem like state", "Cells taken from embryos", "Cells grown from bacteria", "Cells found only in bone marrow"],
      c: 0,
      h: "You can rewind an adult skin cell.",
      e: "Adding specific transcription factors turns an adult cell such as a skin fibroblast into an iPSC, which sidesteps many ethical concerns of embryonic sources. They are not embryonic, bacterial, or marrow limited.",
    },
    {
      q: "Which stem cell therapy is already standard clinical care?",
      o: ["Bone marrow transplants for blood cancers", "Lab grown hearts", "Regrown limbs", "Reversal of aging"],
      c: 0,
      h: "It has been used for decades.",
      e: "Hematopoietic stem cell transplants rebuild a patient's blood and immune system and are routine for leukemia and lymphoma. Whole hearts, limb regrowth, and age reversal remain research goals.",
    },
  ],
  superbugs: [
    {
      q: "What is antibiotic resistance?",
      o: ["Bacteria evolve so antibiotics no longer kill them", "Humans become allergic to antibiotics", "Antibiotics expire on the shelf", "Viruses block antibiotics"],
      c: 0,
      h: "The change happens in the bacteria, not in you.",
      e: "Mutations and shared resistance genes let bacteria survive drugs that once worked, so infections become hard to treat. Allergies are a human immune reaction, expiration is a storage issue, and viruses are unaffected by antibiotics anyway.",
    },
    {
      q: "Why does finishing a prescribed antibiotic course matter?",
      o: ["Stopping early can leave the hardiest bacteria alive to multiply", "The pills stop working if stored", "It prevents allergies", "It makes bacteria grow faster"],
      c: 0,
      h: "Which bacteria survive the longest?",
      e: "Partial treatment kills the weakest cells first and can leave tougher survivors to rebuild a more resistant population, which is why doctors specify a full course. Storage, allergy, and growth speed are not the reason.",
    },
    {
      q: "Why do antibiotics not work on the flu or a cold?",
      o: ["Those illnesses are caused by viruses, not bacteria", "The doses are too small", "Colds are caused by fungi", "Antibiotics only work in hospitals"],
      c: 0,
      h: "Antibiotics target bacterial machinery.",
      e: "Antibiotics attack structures like bacterial cell walls and ribosomes that viruses do not have, so they cannot treat viral illnesses and unnecessary use drives resistance. Dose, fungi, and setting are not the issue.",
    },
    {
      q: "What is MRSA?",
      o: ["A staph bacterium resistant to many common antibiotics", "A virus that causes rashes", "A vaccine for superbugs", "A type of white blood cell"],
      c: 0,
      h: "The R stands for resistant.",
      e: "Methicillin resistant Staphylococcus aureus shrugs off several standard antibiotics and causes serious hospital and community infections. It is not a virus, a vaccine, or a blood cell.",
    },
  ],
  neurotech: [
    {
      q: "What does a brain computer interface do?",
      o: ["Translates brain signals into commands for a device", "Uploads memories to the internet", "Replaces neurons with wires", "Increases IQ automatically"],
      c: 0,
      h: "Signals in, control out.",
      e: "A BCI records neural activity and decodes it so a user can move a cursor, robotic arm, or speech synthesizer. Memory uploading, wholesale neuron replacement, and instant intelligence gains are science fiction.",
    },
    {
      q: "What does an EEG record?",
      o: ["Electrical activity of the brain through scalp electrodes", "Blood flow in the brain", "Chemical levels in the spinal fluid", "Bone density of the skull"],
      c: 0,
      h: "It is the brain version of an EKG.",
      e: "EEG picks up the summed electrical activity of large groups of neurons from the scalp, giving excellent timing information. Blood flow is fMRI, spinal fluid needs a lab test, and bone density uses a DEXA scan.",
    },
    {
      q: "How does deep brain stimulation help Parkinson's patients?",
      o: ["Implanted electrodes deliver pulses that regulate abnormal circuit activity", "It removes damaged brain tissue", "It replaces dopamine neurons", "It cools the brain"],
      c: 0,
      h: "Think of retuning a misfiring circuit.",
      e: "Electrodes in targets such as the subthalamic nucleus deliver steady pulses that reduce tremor and stiffness by normalizing circuit firing. It is not tissue removal, cell replacement, or cooling.",
    },
    {
      q: "What is neuroplasticity?",
      o: ["The brain's ability to rewire connections through experience", "The plastic coating on implants", "The number of neurons at birth", "A disease of the nerves"],
      c: 0,
      h: "Plastic here means changeable.",
      e: "Synapses strengthen, weaken, and reroute in response to learning and injury, which is why rehabilitation and neurotech training work. It is not a material, a fixed count, or an illness.",
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
