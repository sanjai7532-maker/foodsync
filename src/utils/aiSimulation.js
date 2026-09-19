// AI Prediction, Optimization & Physics Simulation Engine for FoodSync AI

/**
 * Predicts institutional meal demand, recommended production batches,
 * and surplus probability based on multi-variate factors.
 */
export function calculateDemandForecast({
  registeredHeadcount = 2400,
  historicalTurnoutRate = 0.88, // 88% typical turnout
  dayOfWeek = "Friday",
  weather = "Rainy",
  eventFactor = "Regular Day",
  mealType = "Lunch"
}) {
  // Day of week turnout modifier
  const dayModifiers = {
    Monday: 0.96,
    Tuesday: 1.02,
    Wednesday: 1.05,
    Thursday: 1.03,
    Friday: 0.82, // work-from-home or early departures
    Saturday: 0.45,
    Sunday: 0.35
  };

  // Weather modifier (rainy days increase cafeteria attendance vs external dining)
  const weatherModifiers = {
    Sunny: 0.95,
    Rainy: 1.12, // stays on campus
    Cold: 1.04,
    Hot: 0.92
  };

  // Event modifier
  const eventModifiers = {
    "Regular Day": 1.0,
    "Executive Summit / VIPs": 1.22,
    "Hybrid / Remote Shift": 0.76,
    "Pre-Holiday Slump": 0.70,
    "Sports / Fest Day": 1.35
  };

  // Meal type multiplier
  const mealModifiers = {
    Breakfast: 0.55,
    Lunch: 1.0,
    Dinner: 0.65,
    "Midnight Snack": 0.25
  };

  const dayMod = dayModifiers[dayOfWeek] || 1.0;
  const weatherMod = weatherModifiers[weather] || 1.0;
  const eventMod = eventModifiers[eventFactor] || 1.0;
  const mealMod = mealModifiers[mealType] || 1.0;

  // Base predicted actual turnout
  const expectedTurnout = Math.round(
    registeredHeadcount * historicalTurnoutRate * dayMod * weatherMod * eventMod * mealMod
  );

  // Standard un-optimized legacy production buffer is usually +18% to avoid running out
  const traditionalCookServings = Math.round(expectedTurnout * 1.18);

  // FoodSync AI dynamic precision buffer (only +4% safety stock with dynamic staging)
  const aiRecommendedServings = Math.round(expectedTurnout * 1.04);
  const servingsSavedFromOvercooking = Math.max(0, traditionalCookServings - aiRecommendedServings);

  // Total weight estimate (~420 grams per full institutional meal serving)
  const predictedWeightKg = Math.round((aiRecommendedServings * 0.42));
  const savedFoodWeightKg = Math.round((servingsSavedFromOvercooking * 0.42));

  // Risk of surplus calculation (0-100%)
  // High if Friday, remote shift, or Sunny (people eat out)
  let surplusRiskScore = 15;
  if (dayOfWeek === "Friday") surplusRiskScore += 25;
  if (eventFactor === "Hybrid / Remote Shift" || eventFactor === "Pre-Holiday Slump") surplusRiskScore += 35;
  if (weather === "Sunny") surplusRiskScore += 10;
  surplusRiskScore = Math.min(95, Math.max(8, surplusRiskScore));

  let surplusRiskTier = "Low Risk";
  if (surplusRiskScore > 65) surplusRiskTier = "High Surplus Risk";
  else if (surplusRiskScore > 35) surplusRiskTier = "Moderate Surplus Risk";

  // Detailed dish component breakdown
  const dishes = [
    {
      name: "Staple Grain (Jeera Rice / Pulao)",
      recommendedKg: Math.round(predictedWeightKg * 0.38),
      traditionalKg: Math.round((traditionalCookServings * 0.42) * 0.38),
      prepStage: "Cook 75% in Batch 1 (11:00 AM), 25% on-demand (12:45 PM)"
    },
    {
      name: "Protein & Legume Curry (Dal Tadka / Paneer)",
      recommendedKg: Math.round(predictedWeightKg * 0.32),
      traditionalKg: Math.round((traditionalCookServings * 0.42) * 0.32),
      prepStage: "Simmer base gravy in advance; add fresh paneer in staged batches"
    },
    {
      name: "Seasonal Vegetable Subzi",
      recommendedKg: Math.round(predictedWeightKg * 0.20),
      traditionalKg: Math.round((traditionalCookServings * 0.42) * 0.20),
      prepStage: "Blanch vegetables, sauté in 20kg rapid kettle cycles"
    },
    {
      name: "Breads / Roti & Accompaniments",
      recommendedKg: Math.round(predictedWeightKg * 0.10),
      traditionalKg: Math.round((traditionalCookServings * 0.42) * 0.10),
      prepStage: "Continuous live tandoor/flat-griddle based on live queue sensors"
    }
  ];

  return {
    expectedTurnout,
    traditionalCookServings,
    aiRecommendedServings,
    servingsSavedFromOvercooking,
    predictedWeightKg,
    savedFoodWeightKg,
    costSavedInr: Math.round(savedFoodWeightKg * 110), // ₹110/kg avg
    co2SavedKg: Math.round(savedFoodWeightKg * 2.5),
    waterSavedLitres: Math.round(savedFoodWeightKg * 1200),
    surplusRiskScore,
    surplusRiskTier,
    dishes
  };
}

/**
 * Multi-criteria ranking algorithm matching surplus batches to verified NGOs.
 */
export function rankNgoMatches(batch, ngos) {
  return ngos
    .map((ngo) => {
      let score = 100;
      const reasons = [];

      // 1. Distance penalty (5 points per km past 2km)
      const distancePenalty = Math.max(0, (ngo.distanceKm - 2) * 4);
      score -= distancePenalty;
      if (ngo.distanceKm <= 3) {
        reasons.push("Very close proximity (<3km)");
      } else {
        reasons.push(`${ngo.distanceKm} km transit distance`);
      }

      // 2. Capacity check
      if (ngo.currentAvailableCapacity >= batch.servings) {
        score += 10;
        reasons.push(`Can easily accommodate all ${batch.servings} servings`);
      } else {
        const capacityRatio = ngo.currentAvailableCapacity / batch.servings;
        score -= (1 - capacityRatio) * 40;
        reasons.push(`Partial capacity (${ngo.currentAvailableCapacity}/${batch.servings})`);
      }

      // 3. Dietary / Type match
      const acceptsCategory = ngo.acceptedTypes.some(
        (t) => t.toLowerCase() === batch.category.toLowerCase() || t === "Spoiled Food"
      );
      if (!acceptsCategory) {
        score -= 50;
        reasons.push(`Does not typically handle ${batch.category}`);
      } else {
        reasons.push(`Certified to handle ${batch.category}`);
      }

      // 4. Cold Chain Requirement
      const isPerishable = batch.category === "Cooked Hot Meals" || batch.category === "Dairy";
      if (isPerishable && ngo.hasColdChainFleet) {
        score += 15;
        reasons.push("Equipped with insulated/cold-chain transport fleet");
      }

      // 5. Verification status
      if (ngo.verificationTier.includes("Tier 1")) {
        score += 5;
      }

      const finalScore = Math.max(12, Math.min(99, Math.round(score)));

      return {
        ngo,
        matchScore: finalScore,
        reasons,
        estimatedArrivalTime: `${ngo.etaMinutes} mins`,
        recommendedPriority: finalScore >= 85 ? "Optimal Match" : finalScore >= 70 ? "Suitable" : "Alternative"
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Arrhenius cold-chain shelf-life acceleration model.
 * Q10 = 2.0 (rate doubles every 10°C over nominal).
 */
export function estimateShelfLifeUnderThermalStrain(currentTemp, targetTemp, nominalShelfLifeHours) {
  const deltaT = Math.max(0, currentTemp - targetTemp);
  const accelerationFactor = Math.pow(2.0, deltaT / 10.0);
  const degradedHours = nominalShelfLifeHours / accelerationFactor;
  return {
    accelerationFactor: accelerationFactor.toFixed(2),
    remainingHours: Math.max(0.5, degradedHours).toFixed(1),
    degradationPercentage: Math.min(95, Math.round((1 - degradedHours / nominalShelfLifeHours) * 100))
  };
}
