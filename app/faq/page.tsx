import type { ReactNode } from "react";

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Do colleges care about Regents exam scores?",
    a: (
      <p>
        They do. While Regents exams are only offered in NY state, every state
        has their own version of state-wide high school subject tests. College
        admissions offices nationwide are familiar with these tests. Your
        Regents scores are also featured on the transcript your high school
        sends to colleges.
      </p>
    ),
  },
  {
    q: "How long does it take to finish this course?",
    a: (
      <p>
        This course can be completed, in as little as 3 to 5 days. The
        student&apos;s skill level before starting will ultimately determine how
        many question types need to be studied in-depth, and for how long. A
        student with higher subject proficiency will need less time prepping.
      </p>
    ),
  },
  {
    q: "For how long do I have access to this course?",
    a: (
      <p>
        Unlimited. You&apos;ll have continuous access to the course you
        purchase.
      </p>
    ),
  },
  {
    q: "Who is this course for?",
    a: (
      <p>
        This regents course is primarily for NYS high school students, and 8th
        graders, preparing to take Regents exams. Younger students that find
        their current curriculums too easy would also benefit from our courses.
      </p>
    ),
  },
  {
    q: "What are the minimum requirements to take these courses?",
    a: (
      <p>
        The only prerequisite for the math courses is that students know how to
        multiply and divide. So realistically, anyone in third grade or older
        can learn through these courses.
      </p>
    ),
  },
  {
    q: "Can this Regents Exam Tutor course help if my child has an IEP?",
    a: (
      <p>
        Yes. Questions from recently administered exams are answered in
        multiple ways so that students with different learning styles and
        backgrounds can chose a method with which they&apos;re most comfortable.
        It&apos;s clearly better for all students to have access to colorful, fun
        video lessons as opposed to plain black-and-white text in an old-school
        Barron&apos;s prep book.
      </p>
    ),
  },
  {
    q: "How is this course better than studying the Barron’s red and blue books?",
    a: (
      <>
        <p>
          It&apos;s way better! Those colorless prep books were the best we had
          when we were in high school, but they literally haven&apos;t changed in
          over a generation. They only offer a short, sentence-long answer
          explanation to the questions on a Regents exam from the previous year
          or two, while this course offers students a colorful step-by-step
          video explanation to every question on the most recent Regents exams.
          If a student reads a sentence in a prep book explaining to use sin, for
          example, to find a side length, it&apos;s not going to make sense if
          the student doesn&apos;t know the basic differences between trig
          functions, what they are, and how to use them. That&apos;s why Regents
          Exam Tutor video explanations first show the most effective test
          strategy for finding the right answer choice to each question, then
          they explain why it works by going back to the fundamentals for a more
          comprehensive understanding, and there&apos;s a custom follow-up
          question that we work through as well. Instead of just showing the
          formulas on the reference sheet, like the test prep books do, I have a
          video that explains the elements of every formula in a lively,
          memorable way with example problems so that students will know when
          and how to apply them on the test.
        </p>
        <p>
          I took the lessons I have been refining over the last two decades of
          one-on-one Regents tutoring sessions and codified them in this course
          with the intention of designing the best Regents prep resource.
        </p>
      </>
    ),
  },
  {
    q: "What should I do if I’m concerned about passing the Regents?",
    a: (
      <p>
        Doing well on these tests is very different than doing well in your
        teacher&apos;s class. In class, you need to show your work and have more
        of an understanding of the material in the style of your particular
        teacher&apos;s assessments. On the Regents, however, questions are so
        standardized you can apply calculator-centric test-taking strategies and
        get multiple-choice questions right without doing much work. The answer
        to every practice question in our courses is explained as both a
        test-taking technique and for understanding. You can pass the Regents
        exam. Sam&apos;s experience taking and then tutoring students for the last
        16 years for the Regents will help you do it.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="page-hero-section faq-hero-section">
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Frequently Asked Questions</h1>
        </div>
      </section>
      <main>
        <section className="hero-section faq-hero-section">
          <div className="hero-content">
            <div className="faq-container">
              {FAQ_ITEMS.map((item) => (
                <div className="faq-item" key={item.q}>
                  <details>
                    <summary>{item.q}</summary>
                    {item.a}
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
