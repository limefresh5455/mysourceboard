import React, { useState, useEffect } from "react";
import 'react-multi-carousel/lib/styles.css';

const query = `
  query {
    cardCollection(limit: 0) {
      items {
        sys { id }
        title
        description
      }
    }
  }
`;

function Source() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/s20sybmdo7el/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 7VkOj5fISrBLvmP7iinBcQ_AOVyUjLqZ7MtQzvO1C4U",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        } else {
          setCards(data.cardCollection.items);
          console.log("Cards:", data.cardCollection.items);
        }
      });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-start mb-8">Title and Description (mysourceboard)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg">{card.title}</h3>
             {card.description && (
              <p className="text-gray-600">{card.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Source;
