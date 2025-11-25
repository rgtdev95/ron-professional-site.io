import { Button } from "@/components/ui/button";
const faqs = [{
  question: "🔧 What really drives me?",
  answer: "I love turning chaos into clarity — taking complicated problems and turning them into solutions that feel clean, useful, and meaningful. For me, building isn't just about writing code — it's about making a real impact."
}, {
  question: "🧩 How do I solve problems?",
  answer: "I start by digging into what's really going on, not just what's on the surface. Then I break things down into logical pieces until the way forward becomes obvious. There's a certain fun in turning a jumbled mess into something that flows."
}, {
  question: "💡 My favorite part of building things?",
  answer: "That \"aha\" moment when everything clicks — when a messy idea becomes a working, clean system. It's the mix of creativity, logic, and discovery that drives me."
}, {
  question: "⚙️ Why my work feels different",
  answer: "I care about the little things — not just about how things look, but how they feel and work. My goal is to build stuff people actually enjoy using, not just stuff that works."
}, {
  question: "🚀 How I keep learning",
  answer: "Curiosity keeps me going. I experiment, I break things, I rebuild, and I learn with every try. Tech changes fast, and I love being hands-on instead of just watching from the sidelines."
}, {
  question: "🤝 Working with me?",
  answer: "I keep things clear and calm. I'm big on honest communication and shared problem-solving. I want everyone on the team to feel confident and heard — and to know where we're headed."
}];
const FAQ = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="faq" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-12 gap-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl font-bold">Get to Know How I Work</h2>
              <p className="text-muted-foreground text-lg">I've put together a few questions people usually ask about what drives me and how I go about things. If you've got anything else on your mind, just reach out — I'd love to chat.</p>
            </div>
            <Button onClick={scrollToContact} variant="secondary" className="flex-shrink-0">
              Contact me
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {faqs.map((faq, index) => <div key={index} className="space-y-3">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default FAQ;