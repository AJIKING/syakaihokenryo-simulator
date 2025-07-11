import { SocialInsuranceCalculator } from "../components/SocialInsuranceCalculator";
import { Footer } from "../components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <SocialInsuranceCalculator />
      </main>
      <Footer />
    </div>
  );
}