import React, { useState } from "react";

const TMRDecisionAlgorithm = () => {
  const [amputationLevel, setAmputationLevel] = useState("");
  const [specificAmputationType, setSpecificAmputationType] = useState("");
  const [painStatus, setPainStatus] = useState("");
  const [prostheticNeeds, setProstheticNeeds] = useState("");
  const [comorbidities, setComorbidities] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Process selections to generate recommendations
  const generateRecommendations = () => {
    // Always return empty recommendations if required fields aren't filled
    if (!amputationLevel) {
      return null;
    }

    // Start building recommendations
    let recommendations = {
      donorNerves: [],
      targetMotorNerves: [],
      surgicalApproach: "",
      considerations: [],
      preserveFunctions: [],
      alternativeOptions: [],
    };

    // DIP amputation recommendations
    if (amputationLevel === "dip") {
      recommendations.surgicalApproach =
        "Volar incision extending into palm for proper exposure";
      recommendations.donorNerves.push("Proper digital nerve(s)");
      recommendations.targetMotorNerves.push(
        "Lumbrical motor branch (primary choice)",
        "Adjacent volar interosseous motor branch (secondary choice)"
      );

      recommendations.considerations.push(
        "Limited space and small nerve diameter (0.5-0.8mm)",
        "Consider RPNI if motor targets are limited",
        "May not require TMR if nerve retraction is adequate",
        "Higher success rate with TMR than neurectomy (82% vs 60%)"
      );

      recommendations.alternativeOptions.push(
        "RPNI - When no suitable motor targets exist",
        "Standard neuroma burial - Only if TMR or RPNI not feasible"
      );
    }

    // PIP amputation recommendations
    else if (amputationLevel === "pip") {
      recommendations.surgicalApproach =
        "Extended volar approach with carpal tunnel-type incision";
      recommendations.donorNerves.push(
        "Proper digital nerve(s)",
        "Common digital nerve branches if needed"
      );
      recommendations.targetMotorNerves.push(
        "Lumbrical motor nerve (primary choice)",
        "Volar interosseous motor branch (secondary choice)",
        "For radial/ulnar proper digital nerves, consider adjacent lumbrical"
      );

      recommendations.considerations.push(
        "MEPs for palmar interossei found in central third of metacarpal",
        "Digital nerves typically 1-3mm while target motor nerves average 0.85-0.97mm",
        "Nerve length between MEP and DBUN: 6.5mm (1st PI) to 10.5mm (2nd PI)",
        "Consider separate dorsal approach if using DI motor branches"
      );
    }

    // Ray amputation recommendations
    else if (amputationLevel === "ray") {
      recommendations.surgicalApproach =
        "Extended volar approach with extended carpal tunnel incision";

      if (specificAmputationType === "thumb") {
        recommendations.donorNerves.push("Proper digital nerves of the thumb");
        recommendations.targetMotorNerves.push(
          "Adductor pollicis motor nerve",
          "Flexor pollicis brevis motor nerve"
        );
        recommendations.considerations.push(
          "Consider preservation of thenar function if partial thumb remains"
        );
      } else if (specificAmputationType === "index") {
        recommendations.donorNerves.push(
          "Proper digital nerves of the index finger"
        );
        recommendations.targetMotorNerves.push(
          "1st lumbrical motor nerve",
          "1st dorsal interosseous motor nerve"
        );
        recommendations.considerations.push(
          "Access to 1st dorsal interosseous may require dorsal approach"
        );
      } else if (specificAmputationType === "middle") {
        recommendations.donorNerves.push(
          "Proper digital nerves of the middle finger"
        );
        recommendations.targetMotorNerves.push(
          "2nd lumbrical motor nerve",
          "2nd volar interosseous motor nerve"
        );
      } else if (specificAmputationType === "ring") {
        recommendations.donorNerves.push(
          "Proper digital nerves of the ring finger"
        );
        recommendations.targetMotorNerves.push(
          "3rd lumbrical motor nerve",
          "3rd volar interosseous motor nerve"
        );
      } else if (specificAmputationType === "small") {
        recommendations.donorNerves.push(
          "Proper digital nerves of the small finger"
        );
        recommendations.targetMotorNerves.push(
          "4th lumbrical motor nerve",
          "Hypothenar motor branches"
        );
      }

      recommendations.considerations.push(
        "Perform neurorrhaphy close to motor entry point (MEP) to minimize reinnervation time",
        "Protect neurorrhaphy site with local muscle cuff",
        "Expect size mismatch between proper digital nerve and motor branch"
      );

      if (prostheticNeeds === "yes") {
        recommendations.preserveFunctions.push(
          "Preserve 2nd dorsal interosseous for 'hand open' myoelectric signal",
          "Preserve hypothenar muscles for 'hand close' myoelectric signal"
        );
      }
    }

    // Transmetacarpal recommendations
    else if (amputationLevel === "transmetacarpal") {
      recommendations.surgicalApproach =
        "Combined volar and dorsal approaches may be necessary";
      recommendations.donorNerves.push(
        "Common digital nerves",
        "Radial sensory nerve if involved",
        "Proper digital nerves"
      );
      recommendations.targetMotorNerves.push(
        "Volar/dorsal interossei motor nerves",
        "Lumbrical motor nerves",
        "Anterior interosseous nerve to pronator quadratus"
      );

      if (specificAmputationType === "radial") {
        recommendations.targetMotorNerves.push(
          "Ulnar innervated muscles (interossei 3/4)"
        );
        recommendations.considerations.push(
          "Transfer sensory nerve stumps to ulnar side (away from prosthetic docking)"
        );
      } else if (specificAmputationType === "ulnar") {
        recommendations.targetMotorNerves.push(
          "Median/radial innervated muscles (interossei 1/2)"
        );
        recommendations.considerations.push(
          "Transfer sensory nerve stumps to radial side (away from prosthetic docking)"
        );
      } else if (specificAmputationType === "complete") {
        recommendations.targetMotorNerves.push(
          "Any available intrinsic muscle targets"
        );
      }

      recommendations.considerations.push(
        "Consider both volar and dorsal interossei as targets",
        "Deep motor branch of ulnar nerve may provide multiple target options",
        "MEPs for palmar interossei found in central third of metacarpal"
      );

      if (prostheticNeeds === "yes") {
        recommendations.preserveFunctions.push(
          "Preserve key muscle groups for myoelectric signaling",
          "Consider future prosthetic interface locations when choosing nerve transfer sites"
        );
      }
    }

    // Carpometacarpal recommendations
    else if (amputationLevel === "carpometacarpal") {
      recommendations.surgicalApproach =
        "Combined volar (carpal tunnel) and dorsal wrist approaches";
      recommendations.donorNerves.push(
        "Median nerve",
        "Ulnar nerve",
        "Superficial radial nerve",
        "Posterior interosseous nerve"
      );
      recommendations.targetMotorNerves.push(
        "Pronator quadratus (AIN)",
        "Wrist flexors (FCR, FCU)",
        "Extensor digitorum communis branches",
        "Remaining thenar muscles if available"
      );

      recommendations.considerations.push(
        "Consider TMR and RPNI combination when nerve caliber mismatch is significant",
        "More proximal nerve transfers provide better size match",
        "Address all major sensory and mixed nerves to avoid unmasking",
        "Consider preserving some muscle groups for myoelectric control"
      );

      if (prostheticNeeds === "yes") {
        recommendations.preserveFunctions.push(
          "Preserve pronator teres if possible for future myoelectric signal",
          "Consider preserving wrist extensors/flexors for separate control channels"
        );
      }
    }

    // Handle existing pain considerations
    if (painStatus === "existing") {
      recommendations.considerations.push(
        "Secondary TMR requires more extensive neurolysis",
        "Identify and resect neuromas back to healthy fascicles",
        "Consider adjunctive pain management (medications, therapy)",
        "Address all symptomatic nerves to avoid unmasking"
      );
    }

    // Handle comorbidity considerations
    if (comorbidities.includes("diabetes")) {
      recommendations.considerations.push(
        "Higher risk of wound complications, consider enhanced monitoring"
      );
    }
    if (comorbidities.includes("smoking")) {
      recommendations.considerations.push(
        "Increased risk of wound complications and potentially diminished nerve regeneration"
      );
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const motorEntryPointData = [
    {
      muscle: "1st Palmar Interosseous",
      location:
        "40.0mm from MCP joint (index), 23.5mm radial from median nerve",
      diameter: "0.88mm",
      approach: "Volar (requires release of adductor pollicis)",
    },
    {
      muscle: "2nd Palmar Interosseous",
      location: "32.2mm from MCP joint (ring), 23.3mm ulnar from median nerve",
      diameter: "0.97mm",
      approach: "Volar",
    },
    {
      muscle: "3rd Palmar Interosseous",
      location:
        "32.4mm from MCP joint (little), 24.7mm ulnar from median nerve",
      diameter: "0.85mm",
      approach: "Volar",
    },
    {
      muscle: "2nd Dorsal Interosseous",
      location: "31.9mm from CMC joint (middle)",
      diameter: "-",
      approach: "Dorsal",
    },
    {
      muscle: "3rd Dorsal Interosseous",
      location: "28.9mm from CMC joint (middle)",
      diameter: "-",
      approach: "Dorsal",
    },
    {
      muscle: "4th Dorsal Interosseous",
      location: "25.4mm from CMC joint (ring)",
      diameter: "-",
      approach: "Dorsal",
    },
    {
      muscle: "Lumbrical 1",
      location: "Common digital nerve to index finger",
      diameter: "0.6-0.8mm",
      approach: "Volar",
    },
    {
      muscle: "Lumbrical 2",
      location: "Common digital nerve to middle finger",
      diameter: "0.6-0.8mm",
      approach: "Volar",
    },
    {
      muscle: "Lumbrical 3",
      location: "Common digital nerve to ring finger",
      diameter: "0.6-0.8mm",
      approach: "Volar",
    },
    {
      muscle: "Lumbrical 4",
      location: "Common digital nerve to small finger",
      diameter: "0.6-0.8mm",
      approach: "Volar",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white p-6 mb-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">
          TMR Decision Algorithm for Hand Amputations
        </h1>
        <p className="text-gray-600">
          An evidence-based clinical decision support tool for surgical planning
          of Targeted Muscle Reinnervation in partial hand amputations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              Patient & Amputation Assessment
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amputation Level
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={amputationLevel}
                  onChange={(e) => {
                    setAmputationLevel(e.target.value);
                    setSpecificAmputationType("");
                  }}
                >
                  <option value="">Select...</option>
                  <option value="dip">DIP Amputation</option>
                  <option value="pip">PIP Amputation</option>
                  <option value="ray">Ray Amputation</option>
                  <option value="transmetacarpal">
                    Transmetacarpal Amputation
                  </option>
                  <option value="carpometacarpal">
                    Carpometacarpal Amputation
                  </option>
                </select>
              </div>

              {amputationLevel === "ray" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Which Digit
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={specificAmputationType}
                    onChange={(e) => setSpecificAmputationType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="thumb">Thumb</option>
                    <option value="index">Index</option>
                    <option value="middle">Middle</option>
                    <option value="ring">Ring</option>
                    <option value="small">Small</option>
                  </select>
                </div>
              )}

              {amputationLevel === "transmetacarpal" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Specific Type
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={specificAmputationType}
                    onChange={(e) => setSpecificAmputationType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="radial">Radial-sided</option>
                    <option value="ulnar">Ulnar-sided</option>
                    <option value="complete">Complete Transmetacarpal</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pain Status
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={painStatus}
                  onChange={(e) => setPainStatus(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="preventive">Preventive (Primary TMR)</option>
                  <option value="existing">
                    Existing Neuroma Pain (Secondary TMR)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Prosthetic Needs
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={prostheticNeeds}
                  onChange={(e) => setProstheticNeeds(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Will use myoelectric prosthesis</option>
                  <option value="no">No prosthesis planned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Comorbidities
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="diabetes"
                      checked={comorbidities.includes("diabetes")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setComorbidities([...comorbidities, "diabetes"]);
                        } else {
                          setComorbidities(
                            comorbidities.filter((c) => c !== "diabetes")
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="diabetes">Diabetes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smoking"
                      checked={comorbidities.includes("smoking")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setComorbidities([...comorbidities, "smoking"]);
                        } else {
                          setComorbidities(
                            comorbidities.filter((c) => c !== "smoking")
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="smoking">Smoking</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {recommendations ||
          amputationLevel === "dip" ||
          amputationLevel === "pip" ||
          amputationLevel === "carpometacarpal" ? (
            <div className="bg-white p-6 rounded shadow">
              <div className="mb-4">
                <div className="flex space-x-2 border-b">
                  <button
                    className={`px-3 py-2 ${
                      activeTab === "overview"
                        ? "border-b-2 border-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-3 py-2 ${
                      activeTab === "nerves"
                        ? "border-b-2 border-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => setActiveTab("nerves")}
                  >
                    Nerve Selection
                  </button>
                  <button
                    className={`px-3 py-2 ${
                      activeTab === "technical"
                        ? "border-b-2 border-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => setActiveTab("technical")}
                  >
                    Technical Notes
                  </button>
                  <button
                    className={`px-3 py-2 ${
                      activeTab === "anatomical"
                        ? "border-b-2 border-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => setActiveTab("anatomical")}
                  >
                    Anatomical Reference
                  </button>
                </div>
              </div>

              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-2">TMR Surgical Plan</h2>
                  <p className="text-gray-600 mb-4">
                    {amputationLevel
                      ? `Recommendations for ${
                          specificAmputationType
                            ? specificAmputationType + " "
                            : ""
                        }${amputationLevel} amputation`
                      : "Complete the assessment to see recommendations"}
                  </p>

                  <div className="space-y-4">
                    {recommendations && (
                      <>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Recommended Approach
                          </h3>
                          <p>{recommendations.surgicalApproach}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            Key Considerations
                          </h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {recommendations.considerations.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              )
                            )}
                          </ul>
                        </div>

                        {recommendations.preserveFunctions.length > 0 && (
                          <div className="bg-blue-50 p-4 rounded border border-blue-200">
                            <h4 className="font-semibold flex items-center">
                              <span className="mr-2">ℹ️</span>
                              Functional Preservation Notes
                            </h4>
                            <ul className="list-disc pl-5 mt-2">
                              {recommendations.preserveFunctions.map(
                                (item, index) => (
                                  <li key={index}>{item}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {recommendations.alternativeOptions &&
                          recommendations.alternativeOptions.length > 0 && (
                            <div className="bg-purple-50 p-4 rounded border border-purple-200">
                              <h4 className="font-semibold flex items-center">
                                <span className="mr-2">🔄</span>
                                Alternative Options
                              </h4>
                              <ul className="list-disc pl-5 mt-2">
                                {recommendations.alternativeOptions.map(
                                  (item, index) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "nerves" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Nerve Transfer Recommendations
                  </h2>
                  {recommendations && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Donor Nerves</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {recommendations.donorNerves.map((nerve, index) => (
                            <li key={index}>{nerve}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">Target Motor Nerves</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {recommendations.targetMotorNerves.map(
                            (nerve, index) => (
                              <li key={index}>{nerve}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded border border-amber-200">
                        <h4 className="font-semibold flex items-center">
                          <span className="mr-2">⚠️</span>
                          Important Consideration
                        </h4>
                        <p className="mt-2">
                          Motor branches must be transected as close as possible
                          to motor entry point (MEP) to minimize reinnervation
                          time.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "technical" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Technical Considerations
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Nerve Preparation</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Transect recipient target motor nerves proximally
                        </li>
                        <li>
                          Transect the transferred nerve stumps distally with
                          neurorrhaphies
                        </li>
                        <li>
                          Perform hand-sewn interrupted epineurial technique
                          using 8-0 nylon sutures
                        </li>
                        <li>
                          Shorten distal target motor nerve stump as much as
                          possible
                        </li>
                        <li>Maintain tension-free nerve coaptation</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Size Mismatch Management
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Digital nerves typically 1-3mm in diameter</li>
                        <li>
                          Target motor nerves average 0.85-0.97mm in diameter
                        </li>
                        <li>
                          Reinforce coaptation site with local denervated muscle
                          cuff
                        </li>
                        <li>
                          Secure muscle cuff with interrupted 4-0 Vicryl suture
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded border border-green-200">
                      <h4 className="font-semibold flex items-center">
                        <span className="mr-2">✓</span>
                        Best Practices
                      </h4>
                      <ul className="list-disc pl-5 mt-2">
                        <li>
                          Avoid paralytic or local nerve blockade during
                          procedure
                        </li>
                        <li>
                          Use nerve stimulator (0.5-2mA, 50-100V) to identify
                          target branches
                        </li>
                        <li>
                          Perform neurorrhaphy near motor entry point for faster
                          reinnervation
                        </li>
                        <li>
                          Position joints under maximal stress during coaptation
                          to ensure tension-free repair
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "anatomical" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Anatomical Reference
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Target Muscle
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Motor Entry Point Location
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nerve Diameter
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Approach
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {motorEntryPointData.map((item, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="px-4 py-2">{item.muscle}</td>
                            <td className="px-4 py-2">{item.location}</td>
                            <td className="px-4 py-2">{item.diameter}</td>
                            <td className="px-4 py-2">{item.approach}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold">Key Anatomical Notes</h3>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>
                        MEPs for the Palmar Interossei found in central third of
                        metacarpal
                      </li>
                      <li>
                        First Palmar Interosseous covered by adductor pollicis
                        (transverse head)
                      </li>
                      <li>
                        Branches to Dorsal Interossei take direct routes into
                        muscle - best approached dorsally
                      </li>
                      <li>
                        Nerve length between MEP and DBUN: 6.5mm (1st PI) to
                        10.5mm (2nd PI)
                      </li>
                      <li>
                        Digital nerve must be brought nearly to interosseous
                        muscle MEP for neurorrhaphy
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                Surgical Recommendations
              </h2>
              <div className="flex items-center justify-center py-12 text-center text-gray-500">
                <div>
                  <div className="text-4xl mb-4">ℹ️</div>
                  <p className="text-lg font-medium">
                    Complete the assessment to generate personalized TMR
                    recommendations
                  </p>
                  <p className="mt-2">
                    Include amputation level, specific type, and clinical
                    factors
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TMRDecisionAlgorithm;
