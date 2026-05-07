import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, BookOpen, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PRIORITIES = [
  {
    icon: Award,
    number: "1",
    title: "Excellence Through Merit",
    body: "I believe that every child deserves the highest quality of instruction. I will advocate to hire all teachers based on merit, ensuring that the most qualified, capable, and passionate educators are at the front of our classrooms. Our focus should always be on professional excellence to drive student success.",
  },
  {
    icon: Users,
    number: "2",
    title: "Unity and Equality for All",
    body: "Our schools should be places that bring us together, not pull us apart. I will work to promote unity and oppose all forms of discrimination, division, and segregation. Every student must be treated as an individual with unique potential, ensuring a school environment that is genuinely inclusive and respectful of all backgrounds without creating new barriers.",
  },
  {
    icon: BookOpen,
    number: "3",
    title: "Neutral Learning Environments",
    body: "The classroom should be a sanctuary for academic growth, skill-building, and critical thinking. I promise to keep politics out of schools, ensuring that the curriculum remains focused on core academic subjects. By removing political activism from the learning environment, we allow students to focus on what matters most: their education and their future.",
  },
  {
    icon: Heart,
    number: "4",
    title: "Enhancing Special Education and Individualized Support",
    body: "I am committed to ensuring that every exceptional student in our region has the resources necessary to reach their full potential. I will advocate for increased funding and targeted resources for Special Education.",
    bullets: [
      {
        label: "Targeted Interventions",
        text: "Expanding access to specialized staff and smaller, focused learning groups to provide the intensive support students with learning challenges require.",
      },
      {
        label: "Resource Alignment",
        text: "Ensuring that Individual Education Plans (IEPs) are backed by the actual personnel and specialists needed to drive measurable developmental progress.",
      },
      {
        label: "Early & Consistent Support",
        text: "Working to reduce wait times for assessments so that students receive early, expert intervention that sets them up for lifelong success.",
      },
    ],
  },
] as const;

const WHY_MATTERS = [
  {
    label: "Academic Integrity",
    text: "Putting the focus back on learning.",
  },
  {
    label: "True Inclusivity",
    text: "Treating everyone fairly without forced categorization.",
  },
  {
    label: "Professional Standards",
    text: "Ensuring our tax dollars go toward the best possible educators.",
  },
  {
    label: "Ensuring No Child is Left Behind",
    text: "Proper funding for Special Education means students with learning challenges get the expert, small-group attention they need to actually progress.",
  },
];

export const Route = createFileRoute("/priorities")({
  head: () => ({
    meta: [
      { title: "My Priorities — Dorit Smali for YRDSB Trustee 2026" },
      {
        name: "description",
        content:
          "Priorities for our schools: Excellence Through Merit, Unity and Equality, Neutral Learning Environments, and Enhancing Special Education.",
      },
      { property: "og:title", content: "Priorities for Our Schools" },
      {
        property: "og:description",
        content:
          "A back to basics approach that prioritizes student achievement and community harmony.",
      },
    ],
  }),
  component: PrioritiesPage,
});

function PrioritiesPage() {
  return (
    <div className="page">
      <Header variant="solid" />
      <main>
        <section className="priorities">
          <div className="container">
            <div className="priorities__head">
              <p className="t-eyebrow">Priorities for Our Schools</p>
              <h1 className="section-heading">
                A &ldquo;Back to Basics&rdquo; Approach
                <span
                  className="accent-bar"
                  aria-hidden="true"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </h1>
              <p className="priorities__lede">
                As your future trustee, I am committed to a &ldquo;back to basics&rdquo; approach
                that prioritizes student achievement and community harmony. My platform is built on
                the following core promises:
              </p>
            </div>

            <ol className="priorities__list priorities__list--four">
              {PRIORITIES.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="priority-card">
                    <div className="priority-card__top">
                      <span className="priority-card__num">{p.number}</span>
                      <span className="priority-card__icon">
                        <Icon size={26} strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="priority-card__title">{p.title}</h3>
                    <p className="priority-card__body">{p.body}</p>
                    {"bullets" in p && p.bullets && (
                      <ul className="priority-card__bullets">
                        {p.bullets.map((b) => (
                          <li key={b.label}>
                            <strong>{b.label}:</strong> {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="priorities__why">
              <h2 className="section-heading section-heading--sm">Why This Matters</h2>
              <p className="priorities__why-lede">
                By reframing these issues, we move the conversation away from divisive labels and
                back to the fundamental values that most parents share:
              </p>
              <ul className="priorities__why-list">
                {WHY_MATTERS.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
