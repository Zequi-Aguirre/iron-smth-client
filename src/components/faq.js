import React, { useState, useEffect } from "react";

const faqsExamples = [
  {
    question: "question1",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae assumenda eveniet necessitatibus adipisci odit quaerat quasi nihil nisi debitis. Consectetur.",
    display: false,
  },
  {
    question: "question2",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sapiente quo provident tempora quidem, laudantium aspernatur dicta debitis doloribus aut.",
    display: false,
  },
  {
    question: "question3",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eveniet tenetur excepturi iusto soluta molestiae architecto id saepe voluptatem ullam.",
    display: false,
  },
  {
    question: "question4",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel rem ipsam fugiat quaerat. Ipsa cum illum quaerat eos accusantium fugit.",
    display: false,
  },
];

export default function Faq() {
  const [faqs, setFaqs] = useState(faqsExamples);

  const displayHide = (clickedFaq) => {
    // console.log("you just clicked");

    const displayFaqs = faqs.map((faq) => {
      // console.log(faq);
      if (clickedFaq === faq.question) {
        if (faq.display === true) {
          faq.display = false;
        } else if (faq.display === false) {
          faq.display = true;
        }
      }
      return faq;
    });

    // console.log({ displayFaqs });

    setFaqs(displayFaqs);
  };

  const faqsHTML = faqs.map((faq) => {
    // console.log(faq);
    if (faq.display === true) {
      return (
        <div
          onClick={() => {
            displayHide(faq.question);
          }}
          key={faq.question}
        >
          <h1>{faq.question}</h1>
          <p>{faq.answer}</p>
        </div>
      );
    } else if (faq.display === false) {
      return (
        <div
          onClick={() => {
            displayHide(faq.question);
          }}
          key={faq.question}
        >
          <h1>{faq.question}</h1>
        </div>
      );
    }
  });

  useEffect(() => {
    setFaqs(faqsExamples);
  }, []);

  return (
    <div>
      <h1>faqs</h1>
      {faqsHTML}
    </div>
  );
}
