import BriefGenerator from "@/components/BriefGenerator";

export default function BriefPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Generate Brief</h1>
        <p className="text-lg text-center text-muted-foreground mb-10">
          Fill in the details below and let AI generate a polished brief for
          your client.
        </p>
        <BriefGenerator />
      </div>
    </div>
  );
}
