import React, { useState, useEffect } from "react";
import 'react-multi-carousel/lib/styles.css';

const query = `
  query {
    subscriptionCollection(limit: 1) {
      items {
        title
        description { json }
        monthlyToggleLabel
        yearlyToggleLabel
      }
    }
    pricingPlanCollection(order: order_ASC) {
      items {
        title
        order
        description { json }
        slug
        monthlyPrice
        yearlyPrice
        featuresMonthly
        featuresYearly
        badgeLabel
        buttonLabel
        buttonLink
        isCurrentPlan
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
          const subscription = data.subscriptionCollection?.items?.[0];
          const plans = data.pricingPlanCollection?.items || [];

          setPricingPlans(plans);
          setPageSettings({
            pageTitle: subscription?.title || "Subscription",
            pageIntro: extractRichText(subscription?.description),
            monthlyToggleLabel: subscription?.monthlyToggleLabel || "Monthly Billing",
            yearlyToggleLabel: subscription?.yearlyToggleLabel || "Yearly (Save up to 20%)",
          });
        }
      });
  }, []);

  function extractRichText(richText) {
    if (!richText?.json?.content) return "";
    return richText.json.content
      .map((node) => node.content?.map((n) => n.value).filter(Boolean).join(" "))
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-start mb-0" style={{textTransform:"capitalize"}}>
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

      <div className="row mt-4 flex flex-wrap">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="border py-5 px-4 relative"
            style={{
              borderRadius: "10px",
              width: "32%",
              marginRight: "10px",
              marginBottom: "20px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {plan.isCurrentPlan && (
              <span style={{
                backgroundColor: "#DBEAFF",
                borderRadius: "4px",
                position: "absolute",
                right: "20px",
                top: "20px",
                padding: "5px 10px",
                fontWeight: "bold",
                fontSize: "12px",
                zIndex: 10,
              }}>
                Current
              </span>
            )}

            {plan.badgeLabel && plan.badgeLabel.toLowerCase() !== "current" && (
              <span style={{
                backgroundColor: "#5046E5",
                color: "#fff",
                borderRadius: "12px",
                position: "absolute",
                left: "25%",
                right: "25%",
                top: "-15px",
                padding: "5px 10px",
                fontWeight: "bold",
                fontSize: "12px",
                zIndex: 10,
              }}>
                {plan.badgeLabel}
              </span>
            )}

            <h3 className="font-semibold mb-4 text-black fw-bold text-start" style={{ fontSize: "18px", textTransform:"capitalize" }}>
              {plan.title}
            </h3>

            <div className="mb-4">
              {plan.description?.json && (
                <p className="text-gray-600 text-start">
                  {extractRichText(plan.description)}
                </p>
              )}
            </div>

            <div className="mt-6 text-start">
              <p className="text-lg fw-bold mb-2">
                {billingPeriod === "monthly"
                  ? plan.monthlyPrice || ""
                  : plan.yearlyPrice || ""}
              </p>
            </div>

            <ul className="mb-4 list-disc list-inside text-gray-700 text-start">
              {(billingPeriod === "monthly" ? plan.featuresMonthly : plan.featuresYearly)?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

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
                <button type="button" className="btn btn-white" style={{padding: "0", lineHeight: "0", backgroundColor: "#ff6",}}>
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
