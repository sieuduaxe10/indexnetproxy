export const FAQs = () => {
  const FAQsData = [
    {
      question: "What types of proxies does NetProxy.io offer?",
      answer:
        "NetProxy.io offers a variety of proxy types, including residential proxies, datacenter proxies, and mobile proxies. Each proxy type is designed to meet different needs, such as scraping, ad verification, or managing multiple accounts.",
    },
    {
      question: "What is proxy and how does it work?",
      answer:
        "A proxy is an intermediary server between your device and the internet, helping to forward your web requests and return responses from the server. NetProxy offers continuous IP rotation proxy packages, such as 1-minute or 2-minute IP rotation plans, which help protect your identity and enhance online security.",
    },
    {
      question:
        "Is NetProxy.io suitable for large-scale tasks like web scraping?",
      answer:
        "Absolutely! NetProxy.io is ideal for large-scale tasks like web scraping. Our proxies are designed to bypass detection, ensuring stable and uninterrupted connections, which are perfect for gathering data without risking bans.",
    },
    {
      question: "How can I get started with NetProxy.io?",
      answer:
        "Getting started is simple! Just sign up on our website, choose a proxy plan that fits your needs, and follow the step-by-step setup guide. If you encounter any issues, our support team is available 24/7 to assist you.",
    },
  ];
  return (
    <section>
      <div>FAQs</div>
      <h3>All your Questions, Answered</h3>
      <div>
        {FAQsData.map((faq, index) => (
          <div key={index}>
            <details>
              <summary>{faq.question}</summary>
              {faq.answer}
            </details>
          </div>
        ))}
      </div>
    </section>
  );
};
