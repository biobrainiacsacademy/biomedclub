import { UserPlus } from "lucide-react";

interface BecomeMemberProps {
  onJoinClick: () => void;
}

const BecomeMember = ({ onJoinClick }: BecomeMemberProps) => {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Join Our Community
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Become a member of BioBrainiacs and unlock access to all our sessions, resources, and exclusive content.
        </p>
        <button
          onClick={onJoinClick}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-xl hover:bg-primary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          <UserPlus className="w-6 h-6" />
          Become A Member
        </button>
      </div>
    </section>
  );
};

export default BecomeMember;
