import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { useEffect } from "react";
import biobrainiacsLogo from "@/assets/biobrainiacs-logo-new.png";

const CrisprResearchPaper = () => {
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
          <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Genetics
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          CRISPR-Cas9 in Treating Genetic Disorders: Promise and Limitations
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>Ali Yazdi</span>
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
              CRISPR-Cas9 is a revolutionary gene-editing technology that allows scientists to make precise changes in DNA. It has shown promise for treating genetic diseases that were previously considered untreatable. This review summarizes current research on the use of CRISPR-Cas9 for several major genetic disorders, including sickle cell disease, beta-thalassemia, muscular dystrophy, cystic fibrosis, and inherited eye diseases. The system works by targeting faulty genes and allowing cells to repair the DNA in ways that restore normal function. While results are promising, there are still significant challenges, including safety risks, delivery problems, ethical concerns, and long-term unknown effects. Ongoing research, technological improvements, and careful regulation are needed before CRISPR-Cas9 can be safely used as a standard medical treatment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              CRISPR-Cas9 is a gene-editing tool that has generated excitement because of its potential to cure genetic diseases that were previously impossible to treat. According to Nikhil Deep Kolanu et al., 2024, "CRISPR–Cas9 enables precise gene editing, correcting disease-causing mutations and offering hope for previously incurable genetic conditions." This review examines how this technology works across different genetic disorders and assesses its effectiveness, challenges, and future directions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Targeted Diseases</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The review analyzed CRISPR applications for six major genetic conditions (Nikhil Deep Kolanu et al., 2024):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Sickle cell disease</strong> – a blood disorder caused by mutations in the beta-globin gene</li>
              <li><strong>Muscular dystrophy</strong> – a condition causing progressive muscle breakdown</li>
              <li><strong>Cystic fibrosis</strong> – affects the lungs and digestive system due to CFTR gene mutations</li>
              <li><strong>Retinitis pigmentosa</strong> – a degenerative eye disease leading to vision loss</li>
              <li><strong>Leber Congenital Amaurosis</strong> – severe inherited blindness</li>
              <li><strong>Beta-thalassemia</strong> – a serious blood disorder affecting hemoglobin production</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Mechanism of Action</h2>
            <p className="text-muted-foreground leading-relaxed">
              CRISPR-Cas9 primarily works through gene correction. Scientists target specific genes, such as β-globin, CFTR, dystrophin, and rhodopsin, and use viral vectors to deliver the CRISPR components into various cell types, including stem cells and specialized cells (Nikhil Deep Kolanu et al., 2024). The focus is on somatic editing, which fixes genes in normal body cells, rather than germline editing, which could pass changes to future generations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Therapeutic Outcomes</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The reported results of CRISPR-Cas9 therapy are encouraging (Nikhil Deep Kolanu et al., 2024):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Sickle cell disease:</strong> Hemoglobin function was restored, and some patients showed reduced symptoms and complications.</li>
              <li><strong>Cystic fibrosis:</strong> CFTR function was restored in intestinal stem cells.</li>
              <li><strong>Muscular dystrophy:</strong> Dystrophin protein expression was partially recovered.</li>
              <li><strong>Eye diseases:</strong> Patients with Leber Congenital Amaurosis experienced visual improvement, and functional retinal organoids were generated for retinitis pigmentosa.</li>
              <li><strong>Beta-thalassemia:</strong> Clinical trials indicated normal hemoglobin production was restored.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Safety Concerns</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Despite promising outcomes, there are several safety issues that remain unresolved (Nikhil Deep Kolanu et al., 2024):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Off-target effects:</strong> CRISPR may accidentally edit unintended DNA regions, which could disrupt other genes. It is "not entirely free of errors."</li>
              <li><strong>Immune responses:</strong> The body may recognize the Cas9 protein as foreign, generating "neutralizing antibodies and T-cell responses that can limit the efficacy and safety of the treatment."</li>
              <li><strong>Long-term unknowns:</strong> Scientists are concerned about "unforeseen long-term effects on gene regulation and cellular function."</li>
              <li><strong>Germline concerns:</strong> Editing reproductive cells could permanently affect future generations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Major Challenges</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Delivery Problems</h3>
            <p className="text-muted-foreground leading-relaxed">
              Delivering CRISPR-Cas9 into the correct cells remains a technical hurdle. "Many cell types are resistant to the uptake of these molecules," so researchers are testing new delivery methods like nanoparticles and liposomes to "improve safety and minimize immune responses" (Nikhil Deep Kolanu et al., 2024).
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Ethical Issues</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ethical concerns are significant, especially with germline editing. Because these changes are "permanent and inheritable, impacting not only the individual undergoing editing but also their descendants" (Nikhil Deep Kolanu et al., 2024), there is widespread debate about its use. Concerns also include biosecurity and the creation of enhanced or designer organisms.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">Study Quality Issues</h3>
            <p className="text-muted-foreground leading-relaxed">
              The research itself has limitations. The review found "moderate to high risk of bias due to limitations in study designs," and there was too much variation between studies to perform robust statistical analysis (Nikhil Deep Kolanu et al., 2024).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Future Directions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Researchers are working on ways to improve CRISPR-Cas9 (Nikhil Deep Kolanu et al., 2024):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Better Cas9 versions:</strong> Developing smaller Cas9 proteins that may be more precise.</li>
              <li><strong>Improved accuracy:</strong> Creating base editors and exploring prime editing to reduce errors.</li>
              <li><strong>Better delivery methods:</strong> Working on nonviral delivery systems that are safer and more efficient.</li>
              <li><strong>Ongoing research:</strong> Continued studies, collaboration, and regulatory oversight are needed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              CRISPR-Cas9 is a promising tool with real potential to treat genetic diseases that were previously untreatable. Therapeutic outcomes show the ability to restore normal gene function and improve patient health. However, significant safety risks, delivery challenges, and ethical concerns remain. According to Nikhil Deep Kolanu et al., 2024, "thorough research and rigorous testing are necessary to minimize potential risks and ensure the safety and efficacy of this technology" before it can be "widely and safely used in medical practice." The field is developing quickly, but careful study and regulation are essential to make sure CRISPR-Cas9 is safe, effective, and ethically responsible for future use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Sources</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>Nikhil Deep Kolanu et al. (2024). CRISPR-Cas9 in treating genetic disorders: A systematic review of clinical applications and therapeutic outcomes.</li>
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

export default CrisprResearchPaper;
