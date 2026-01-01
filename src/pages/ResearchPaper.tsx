import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { useEffect } from "react";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const ResearchPaper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          to="/bioglance"
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to BioGlance</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <img src={biobrainiacsLogo} alt="BioBrainiacs" className="w-8 h-8" />
          <span className="font-semibold">
            <span className="text-primary">Bio</span>
            <span className="text-foreground">Brainiacs</span>
          </span>
        </div>
      </header>

      {/* Paper Content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Nanomedicine
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nanoparticle-Based Targeted Cancer Therapy: Engineering Precision Drug Delivery to Tumors
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>David Choi</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span>January 2026</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Abstract</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nanoparticle-based drug delivery systems are showing real promise for making cancer treatments work better and cause fewer side effects. Instead of spreading drugs everywhere, these tiny carriers use special traits of tumors to reach malignant cells more precisely thanks to smart design tweaks. We'll walk through how this targeting works, what's new in tech upgrades, and highlight some lab tests plus human trials that stand out. Results so far say certain types - like those coated with target-seeking molecules, ones that react to tumor surroundings, or built from flexible plastics - do much better than old-school chemo. Still, hurdles pop up when it comes to getting particles where they need to go, staying safe in the body, or producing them in bulk. But progress keeps moving toward actual hospital use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Chemotherapy spreads through the body, hitting fast-growing cells without much precision - this often causes side effects like weak immunity, stomach issues, or harm to organs. The main aim in treating cancer is getting medicine right into tumors but leaving normal tissue alone. One promising way uses tiny particles that deliver drugs more directly. This method focuses treatment where it's needed most.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nanoparticles between 10 and 200 nanometers can be built to deliver medicines, react to signals near tumors, or gather mostly in diseased areas. Instead of just drifting into cells, some designs use loose trapping methods, others rely on sticky molecules or triggers from the surroundings - each boosting how well drugs reach their target. Lately, lab work plus human tests suggest these smart carriers might change how we treat cancer, packing a stronger punch against tumors but causing fewer side issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Engineering Principles of Nanoparticle-Based Targeting</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Passive Targeting: Enhanced Permeability and Retention (EPR)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Solid tumors have messy blood vessels that leak fluid while struggling to drain it properly. This creates a situation called the EPR effect. Because of this, tiny particles under about 150 nanometers tend to build up more in tumor areas. Things like liposomes or polymer clusters take advantage of this quirk quite often instead of relying on active targeting. Even fat-like nanoparticle types use this passive buildup trick regularly. A big plus: medicine builds up more in tumors compared to normal cells.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Active Targeting Through Ligand Functionalization</h3>
            <p className="text-muted-foreground leading-relaxed">
              Active targeting works better because it adds special molecules to nanoparticles - they stick only to cancer cell markers. Examples of these guiding parts are:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Peptides - like iRGD - that target integrins found in high amounts on tumor blood vessels</li>
              <li>Antibodies that focus on cancer markers</li>
              <li>Aptamers targeting proteins on cell surfaces</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              A new study made a tiny particle using doxorubicin, an iRGD peptide that gets into tumors, along with a special link activated by MMP-2. This combo helps target cancer cells more precisely while releasing medicine on demand (Zhang et al., 2025).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Microenvironment-Responsive Nanoparticles</h3>
            <p className="text-muted-foreground leading-relaxed">
              Besides tumors having special chemical traits, tiny particles might be set up to react when they sense those changes: Low pH, lots of lactate hanging around - thanks to what's called the Warburg effect, overexpressed enzymes (e.g., MMP-2), and reactive oxygen species.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Take the University of Chicago team - they built a tiny particle that reacts to lactate. When it hits the acidic tumor zone, it pops open. That's where it dumps medicine right inside cancer cells. Because of this trick, tumors get ten times the dose versus regular shots.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Recent Preclinical Advances</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Carrier-Free Chemo-Immunotherapy Nanoparticles</h3>
            <p className="text-muted-foreground leading-relaxed">
              A new kind of tiny particle builds itself and carries medicine while waking up the body's defenses using doxorubicin plus iRGD, a special link that breaks when enzymes act on it, along with MPLA. These particles mix treatment types into one smart package that targets tumors more effectively than separate parts could alone. Demonstrated solid control over tumor growth, inhibited metastasis, and activated antitumor immunity (Journal of Nano Research, 2025).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Nanoparticle Delivery for Brain Tumors</h3>
            <p className="text-muted-foreground leading-relaxed">
              Scientists tried PARP-inhibitor nanoparticles in mice with medulloblastoma, using spinal fluid shots to get them into the body. Results included: Reduced metastasis, improved survival, and higher levels of medicine found in brain cells (Phys.org, 2023).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Clinical Trial Progress</h2>
            <p className="text-muted-foreground leading-relaxed">
              Even though lots of NDDSs are still in early stages, a few have moved on to trials with people.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">CRLX101 (Cyclodextrin–Camptothecin Nanoparticle)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Early tests revealed: sustained drug release, tumor accumulation, lower body-wide side effects when compared to unbound camptothecin (NEJM; ClinicalTrials.gov).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Lipoplatin (Liposomal Cisplatin)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tested in Phase I–III clinical trials, Lipoplatin showed significantly lower nephrotoxicity, improved tolerability, similar or better results against tumors in some types of cancer (Oncology Reports, 2018; Wikipedia review).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Nanoparticle-Enhanced Immunotherapy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Initial trials in humans are checking tiny particle transporters for: immune blockers like pembrolizumab, nanoparticle-delivered cancer vaccines, and preliminary findings suggest stronger immune responses, though with less discomfort (Biomed Research International, 2024).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Discussion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nanoparticles that target specific areas bring clear benefits:
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Increased Efficacy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tiny particles aim straight at cancer spots, so more medicine gets where it's needed - this boosts results while using less overall medication because they focus exactly on the problem area.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Reduced Toxicity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Shielding normal cells helps NDDSs lower chemo issues like liver harm, kidney stress, or gut problems - since they keep meds away where they shouldn't go.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Controlled and Stimuli-Responsive Release</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tiny particles react to surroundings, boosting accuracy while cutting unwanted spread.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Major Challenges Remaining</h3>
            <p className="text-muted-foreground leading-relaxed">
              Biocompatibility plus lasting safety need thorough testing, biodistribution problems - like buildup in the liver or spleen - still get in the way, fabricating tricky nanomaterials at large volumes isn't straightforward - scaling them up brings real challenges, fewer rules make things tough since NDDSs count as medicines along with man-made stuff, even with these hurdles, new tech tweaks keep pushing nano-particles nearer to real-world medical use - thanks to steady progress in design fixes that slowly clear the path.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nanoparticle treatments for cancer are mixing bioengineering with real-world medicine in smart ways. They deliver meds exactly where needed, cut side effects, while also helping spot tumors - thanks to built-in imaging tricks. Scientists keep tweaking tiny carriers that react to body conditions, adding targeting molecules, plus blending healing and scanning tools into one package. With ongoing human tests moving forward, these nano-tools could soon play a big role in personalized cancer care.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Sources</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>Zhang, J., et al. (2025). Carrier-free nanoparticle system for tumor-targeted chemoimmunotherapy. Journal of Nanobiotechnology.</li>
              <li>University of Chicago Medicine. (2025). Nanoparticle-based targeted delivery unleashes the full power of anti-cancer drugs.</li>
              <li>Frangoul, H., et al. (2021). CRLX101 clinical trial results. New England Journal of Medicine.</li>
              <li>Si, J.-X., Liu, Z.-C., Gu, F. (2025). Nanoparticle-based drug delivery for targeted brain tumor therapy. International Journal of Oncology.</li>
              <li>Blanco, E., et al. (2023). Nanoparticles in clinical development for lung cancer. Cancer Nanotechnology.</li>
              <li>Biomed Research International. (2024). Nanoparticle-mediated immunotherapy strategies in oncology.</li>
              <li>Wikipedia. Lipoplatin — summary of Phase I–III trials.</li>
              <li>Phys.org. (2023). Nanoparticles extend survival in medulloblastoma models.</li>
            </ul>
          </section>
        </div>
      </article>

      <footer className="py-6 px-4 flex flex-col items-center justify-center gap-3">
        <img src={biobrainiacsLogo} alt="BioBrainiacs Academy" className="w-12 h-12" />
        <p className="text-muted-foreground text-sm">© 2026 BioBrainiacs Academy</p>
      </footer>
    </div>
  );
};

export default ResearchPaper;