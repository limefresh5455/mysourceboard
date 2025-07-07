import React, { useState, useEffect } from "react";
import 'react-multi-carousel/lib/styles.css';

const query = `
  query {
    pricingPageCollection(limit: 1) {
      items {
        subscription
        content { json }
        monthlyToggleLabel
        yearlyToggleLabel
        plansCollection {
          items {
            title
            order
            description { json }
            slug
            monthlyPrice
            yearlyPrice
            features
            badgeLabel
            buttonLabel
            buttonLink
            isCurrentPlan
            isFeatured
            billingType
          }
        }
      }
    }
  }
`;

function Pricing() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [pageSettings, setPageSettings] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/gfyoujh3w11e/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer xvFTXrIOQPEagwibliI1vnRX5L-D2-7Tz_gahuuj1Hc",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        } else {
          const pricingPage = data.pricingPageCollection?.items?.[0];
          setPricingPlans(pricingPage?.plansCollection?.items || []);
          setPageSettings({
            pageTitle: pricingPage?.subscription || "Subscription",
            pageIntro: pricingPage?.content?.json?.content
              ?.map(node => node.content?.map(textNode => textNode.value).join(" "))
              .join(" ") || "",
            monthlyToggleLabel: pricingPage?.monthlyToggleLabel || "Monthly Billing",
            yearlyToggleLabel: pricingPage?.yearlyToggleLabel || "Yearly (Save up to 20%)",
          });
          console.log("Pricing Page Data:", pricingPage);
        }
      });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-start mb-0">
        {pageSettings?.pageTitle}
      </h2>
      <p className="text-start text-gray-600 mb-8 py-4" style={{ maxWidth: "100%" }}>
        {pageSettings?.pageIntro ||
          "Choose from one of our tailored subscription options. From the Free Explorer Plan for beginners to the Premium Unlimited Access Plan for teams ready to unlock their full potential with powerful features, resources and enhanced collaboration."
        }
      </p>

      <div className="text-start">
        <div style={{ backgroundColor: "#0D2235", borderRadius: "4px", padding: "5px", display: "inline-block" }}>
          <button
            style={{ borderRadius: "4px" }}
            className={`px-4 py-2 border-0 ${billingPeriod === "monthly" ? "bg-white text-black" : "bg-transparent text-white"}`}
            onClick={() => setBillingPeriod("monthly")}
          >
            {pageSettings?.monthlyToggleLabel}
          </button>
          <button
            style={{ borderRadius: "4px" }}
            className={`px-4 py-2 rounded-r-lg border-0 ${billingPeriod === "yearly" ? "bg-white text-black" : "bg-transparent text-white"}`}
            onClick={() => setBillingPeriod("yearly")}
          >
            {pageSettings?.yearlyToggleLabel}
          </button>
        </div>
      </div>

      <div className="row mt-4">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="border col-4 py-5 px-4 position-relative" style={{ borderRadius:"10px", width:"32%", marginRight:"10px", marginBottom:"20px" }}>
            {plan.isCurrentPlan && (
              <span className="absolute -top-4 right-4 text-xs font-semibold py-1 px-2 rounded bg-gray-200 text-gray-800">
                <span className="px-2 position-absolute" style={{ backgroundColor: "#DBEAFF", borderRadius: "4px", right:"20px", top:"20px" }}>Current</span>
              </span>
            )}
            <div>
              {plan.badgeLabel && (
                <span className="position-absolute top-0 translate-middle badge rounded-pill px-4 py-2 pl-5" style={{ backgroundColor:"#5046E5" }}>
                  {plan.badgeLabel}
                </span>
              )}
              <h3 className="font-semibold mb-4 text-black fw-bold text-start" style={{ fontSize:"18px" }}>{plan.title}</h3>
              <div className="mb-4">
                {plan.description?.json && (
                  <p className="text-gray-600 text-start">
                    {plan.description.json.content
                      ?.map(node => node.content?.map(n => n.value).join(" "))
                      .join(" ")}
                  </p>
                )}
              </div>
              <div className="mt-6 text-start">
                <p className="text-lg fw-bold mb-2">
                  {billingPeriod === "monthly"
                    ? (plan.monthlyPrice || "")
                    : (plan.yearlyPrice || "")}
                </p>
              </div>
              <ul className="mb-4 list-disc list-inside text-gray-700 text-start">
                {plan.features?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              {plan.buttonLink ? (
                <a
                  href={plan.buttonLink}
                  className="inline-block"
                  style={{
                    width: "100%",
                    backgroundColor: "#0D2235",
                    padding: "0px 10px",
                    display: "block",
                    color: "#fff",
                    lineHeight: "2.5",
                    textDecoration: "none",
                    borderRadius: "3px",
                  }}
                >
                  {plan.buttonLabel || ""}
                </a>
              ) : (
                <button type="button" className="btn btn-primary">
                  {plan.buttonLabel || ""}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
