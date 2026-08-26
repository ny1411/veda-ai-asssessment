import { AssessmentResult, QuestionEntry } from "@/types/assessment";

// Generate realistic SVG handwritten student answer sheet pages with lined notebook styling
export function generateMockAnswerSheetPage1(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
    <defs>
      <pattern id="page-lines" width="100%" height="32" patternUnits="userSpaceOnUse">
        <line x1="0" y1="31" x2="800" y2="31" stroke="#BFDBFE" stroke-width="1" opacity="0.6"/>
      </pattern>
      <filter id="pencil" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>

    <!-- Notebook Paper Background -->
    <rect width="800" height="1100" fill="#F8FAFC"/>
    <!-- Lined Paper Pattern -->
    <rect width="800" height="1100" fill="url(#page-lines)"/>
    <!-- Red Left Margin Line -->
    <line x1="120" y1="0" x2="120" y2="1100" stroke="#FCA5A5" stroke-width="1.5" opacity="0.85"/>
    <line x1="124" y1="0" x2="124" y2="1100" stroke="#FCA5A5" stroke-width="0.5" opacity="0.5"/>

    <!-- Content Group with Handwriting Font / Style -->
    <g font-family="'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" fill="#1E3A8A" font-size="20">
      
      <!-- QUESTION 1 ANSWER -->
      <text x="45" y="125" font-size="22" font-weight="bold" fill="#1E293B">Q1.</text>
      <text x="145" y="125">Photosynthesis is the process used by</text>
      <text x="145" y="157">green plants and some other organisms</text>
      <text x="145" y="189">to convert light energy into chemical</text>
      <text x="145" y="221">energy.</text>

      <!-- Chemical Equation Box -->
      <rect x="140" y="250" width="580" height="52" fill="none" stroke="#1E3A8A" stroke-width="1.8" rx="4"/>
      <text x="155" y="284" font-size="21" font-weight="600">6CO₂  +  6H₂O</text>
      <!-- Reaction Arrow with Catalyst -->
      <line x1="330" y1="276" x2="430" y2="276" stroke="#1E3A8A" stroke-width="2"/>
      <polygon points="430,272 442,276 430,280" fill="#1E3A8A"/>
      <text x="355" y="265" font-size="14" fill="#1E3A8A">Light</text>
      <text x="340" y="294" font-size="14" fill="#1E3A8A">Chlorophyll</text>
      <text x="455" y="284" font-size="21" font-weight="600">C₆H₁₂O₆  +  6O₂</text>

      <!-- Photosynthesis Diagram -->
      <!-- Sun -->
      <g transform="translate(390, 345)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#1E3A8A" stroke-width="2"/>
        <line x1="0" y1="-25" x2="0" y2="-18" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="0" y1="18" x2="0" y2="25" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="-25" y1="0" x2="-18" y2="0" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="18" y1="0" x2="25" y2="0" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="-18" y1="-18" x2="-12" y2="-12" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="12" y1="12" x2="18" y2="18" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="18" y1="-18" x2="12" y2="-12" stroke="#1E3A8A" stroke-width="1.8"/>
        <line x1="-12" y1="12" x2="-18" y2="18" stroke="#1E3A8A" stroke-width="1.8"/>
        <text x="35" y="6" font-size="19" fill="#1E3A8A">Sunlight</text>
      </g>
      <!-- Sunlight Ray Arrow Down -->
      <line x1="390" y1="368" x2="390" y2="400" stroke="#1E3A8A" stroke-width="1.8"/>
      <polygon points="386,396 390,405 394,396" fill="#1E3A8A"/>

      <!-- Plant Sketch -->
      <!-- Stem -->
      <line x1="390" y1="405" x2="390" y2="480" stroke="#1E3A8A" stroke-width="2.5"/>
      <!-- Top Leaves -->
      <path d="M 390 420 C 360 400, 335 415, 345 435 C 355 450, 385 435, 390 435" fill="none" stroke="#1E3A8A" stroke-width="2"/>
      <line x1="390" y1="435" x2="350" y2="422" stroke="#1E3A8A" stroke-width="1.2"/>
      <path d="M 390 420 C 420 400, 445 415, 435 435 C 425 450, 395 435, 390 435" fill="none" stroke="#1E3A8A" stroke-width="2"/>
      <line x1="390" y1="435" x2="430" y2="422" stroke="#1E3A8A" stroke-width="1.2"/>
      
      <!-- Side Leaves -->
      <path d="M 390 450 C 350 430, 320 450, 330 470 C 345 485, 380 465, 390 465" fill="none" stroke="#1E3A8A" stroke-width="2"/>
      <line x1="390" y1="465" x2="335" y2="455" stroke="#1E3A8A" stroke-width="1.2"/>
      <path d="M 390 450 C 430 430, 460 450, 450 470 C 435 485, 400 465, 390 465" fill="none" stroke="#1E3A8A" stroke-width="2"/>
      <line x1="390" y1="465" x2="445" y2="455" stroke="#1E3A8A" stroke-width="1.2"/>

      <!-- Soil line & Roots -->
      <line x1="330" y1="480" x2="450" y2="480" stroke="#1E3A8A" stroke-width="1.5"/>
      <path d="M 390 480 Q 375 505 365 525 M 390 480 Q 390 510 388 535 M 390 480 Q 405 505 420 525 M 380 495 L 360 510 M 400 495 L 425 508" fill="none" stroke="#1E3A8A" stroke-width="1.6"/>

      <!-- Labels with Arrows -->
      <text x="180" y="440" font-size="19">Carbon</text>
      <text x="180" y="465" font-size="19">dioxide</text>
      <line x1="260" y1="455" x2="310" y2="455" stroke="#1E3A8A" stroke-width="1.5"/>
      <polygon points="305,451 316,455 305,459" fill="#1E3A8A"/>

      <line x1="475" y1="455" x2="525" y2="455" stroke="#1E3A8A" stroke-width="1.5"/>
      <polygon points="480,451 470,455 480,459" fill="#1E3A8A"/>
      <polygon points="520,451 530,455 520,459" fill="#1E3A8A"/>
      <text x="545" y="460" font-size="19">Oxygen</text>

      <line x1="425" y1="510" x2="475" y2="510" stroke="#1E3A8A" stroke-width="1.5"/>
      <polygon points="432,506 422,510 432,514" fill="#1E3A8A"/>
      <text x="490" y="515" font-size="19">Water</text>


      <!-- QUESTION 2 ANSWER (Chloroplast & Stages) -->
      <text x="45" y="605" font-size="22" font-weight="bold" fill="#1E293B">Q2.</text>
      <text x="145" y="605">The process mainly occurs in the</text>
      <text x="145" y="637">chloroplast of the plant cell. It has</text>
      <text x="145" y="669">two main stages:</text>
      <text x="145" y="701">1. Light reaction – Captures light energy.</text>
      <text x="145" y="733">2. Dark reaction – Uses energy to</text>
      <text x="145" y="765">   make glucose.</text>


      <!-- QUESTION 3 ANSWER (Role of Chloroplasts & Pigments) -->
      <text x="45" y="835" font-size="22" font-weight="bold" fill="#1E293B">Q3.</text>
      <text x="145" y="835">Chloroplasts contain chlorophyll (main pigment</text>
      <text x="145" y="867">absorbing blue/red light) and accessory pigments</text>
      <text x="145" y="899">like carotenoids. They convert solar photons into ATP</text>
      <text x="145" y="931">&amp; NADPH in thylakoid membranes, which powers</text>
      <text x="145" y="963">the Calvin cycle in the stroma to synthesize sugars.</text>

      <!-- Page Number Footer -->
      <text x="710" y="1075" font-size="16" fill="#94A3B8">Page 1</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateMockAnswerSheetPage2(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
    <defs>
      <pattern id="page-lines-2" width="100%" height="32" patternUnits="userSpaceOnUse">
        <line x1="0" y1="31" x2="800" y2="31" stroke="#BFDBFE" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>

    <rect width="800" height="1100" fill="#F8FAFC"/>
    <rect width="800" height="1100" fill="url(#page-lines-2)"/>
    <line x1="120" y1="0" x2="120" y2="1100" stroke="#FCA5A5" stroke-width="1.5" opacity="0.85"/>
    <line x1="124" y1="0" x2="124" y2="1100" stroke="#FCA5A5" stroke-width="0.5" opacity="0.5"/>

    <g font-family="'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" fill="#1E3A8A" font-size="20">
      
      <!-- QUESTION 5 ANSWER (Alveolus Diagram) -->
      <text x="45" y="95" font-size="22" font-weight="bold" fill="#1E293B">Q5.</text>
      <text x="145" y="95">Alveolus Gas Exchange Diagram:</text>
      
      <!-- Alveolus Sac Drawing -->
      <g transform="translate(360, 200)">
        <path d="M -80 -40 C -120 0, -120 70, -60 100 C 0 120, 80 110, 110 50 C 130 -10, 80 -60, 0 -60 C -40 -60, -60 -50, -80 -40" fill="#EFF6FF" stroke="#1E3A8A" stroke-width="2"/>
        <!-- Capillary surrounding it -->
        <path d="M -130 -30 C -140 40, -100 120, -20 135 C 60 145, 130 110, 140 30" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="6,2"/>
        <text x="15" y="25" font-size="16" fill="#1E3A8A">Alveolar Sac</text>
        
        <!-- Gas Exchange arrows -->
        <!-- O2 into blood -->
        <line x1="20" y1="50" x2="50" y2="85" stroke="#2563EB" stroke-width="2"/>
        <polygon points="45,86 54,90 52,80" fill="#2563EB"/>
        <text x="58" y="85" font-size="15" fill="#2563EB">O₂</text>

        <!-- CO2 into sac -->
        <line x1="-30" y1="85" x2="-10" y2="50" stroke="#DC2626" stroke-width="2"/>
        <polygon points="-12,46 -8,56 -18,52" fill="#DC2626"/>
        <text x="-55" y="80" font-size="15" fill="#DC2626">CO₂</text>

        <line x1="80" y1="120" x2="130" y2="150" stroke="#1E3A8A" stroke-width="1.2"/>
        <text x="135" y="155" font-size="16" fill="#1E3A8A">Capillary Wall</text>
      </g>

      <!-- QUESTION 6 ANSWER (Digestive System - Starts on Page 2) -->
      <text x="45" y="440" font-size="22" font-weight="bold" fill="#1E293B">Q6.</text>
      <text x="145" y="440">Human Digestive System Diagram:</text>
      <g transform="translate(360, 560)">
        <!-- Esophagus, Stomach, Liver, Intestines -->
        <path d="M 0 -70 L 0 -20" stroke="#1E3A8A" stroke-width="3"/>
        <!-- Stomach J-shape -->
        <path d="M 0 -20 C 30 -20, 60 10, 30 50 C 10 70, -20 60, -20 40 C -20 10, -10 -20, 0 -20" fill="none" stroke="#1E3A8A" stroke-width="2"/>
        <text x="65" y="20" font-size="16">Stomach</text>
        
        <!-- Liver triangular lobe -->
        <path d="M -70 -25 L -20 -25 L -45 25 Z" fill="#FEF3C7" stroke="#1E3A8A" stroke-width="1.8"/>
        <text x="-120" y="5" font-size="16">Liver</text>

        <!-- Small Intestine folds -->
        <path d="M 0 60 C 20 80, -20 100, 20 120 C -20 140, 20 160, 0 170" fill="none" stroke="#1E3A8A" stroke-width="2.2"/>
        <!-- Large Intestine frame -->
        <path d="M -60 150 L -60 70 L 60 70 L 60 150" fill="none" stroke="#1E3A8A" stroke-width="3"/>
        <text x="75" y="125" font-size="16" font-weight="bold">Small Intestine*</text>
        <text x="75" y="145" font-size="14" fill="#047857">*(Site of most absorption)</text>
      </g>

      <!-- QUESTION 7 ANSWER (Nephron Diagram) -->
      <text x="45" y="780" font-size="22" font-weight="bold" fill="#1E293B">Q7.</text>
      <text x="145" y="780">Structure of Nephron:</text>
      <g transform="translate(350, 910)">
        <!-- Bowman's Cup & Glomerulus -->
        <path d="M -90 -40 C -130 -40, -130 20, -90 20 L -50 20" fill="none" stroke="#1E3A8A" stroke-width="2"/>
        <circle cx="-105" cy="-10" r="14" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
        <text x="-195" y="-10" font-size="15">Glomerulus</text>
        <text x="-195" y="15" font-size="15">Bowman's Capsule</text>

        <!-- Proximal Tubule & Loop of Henle -->
        <path d="M -50 20 Q -20 0 0 20 Q 20 40 40 20 L 40 80 C 40 120, 60 120, 60 80 L 60 20 Q 80 0 100 20 L 120 20" fill="none" stroke="#1E3A8A" stroke-width="2"/>
        <text x="65" y="115" font-size="15">Loop of Henle</text>
        <!-- Collecting duct -->
        <line x1="120" y1="-30" x2="120" y2="100" stroke="#1E3A8A" stroke-width="3"/>
        <text x="130" y="30" font-size="15">Collecting Duct</text>
      </g>

      <text x="710" y="1075" font-size="16" fill="#94A3B8">Page 2</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateMockAnswerSheetPage3(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
    <defs>
      <pattern id="page-lines-3" width="100%" height="32" patternUnits="userSpaceOnUse">
        <line x1="0" y1="31" x2="800" y2="31" stroke="#BFDBFE" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>

    <rect width="800" height="1100" fill="#F8FAFC"/>
    <rect width="800" height="1100" fill="url(#page-lines-3)"/>
    <line x1="120" y1="0" x2="120" y2="1100" stroke="#FCA5A5" stroke-width="1.5" opacity="0.85"/>
    <line x1="124" y1="0" x2="124" y2="1100" stroke="#FCA5A5" stroke-width="0.5" opacity="0.5"/>

    <g font-family="'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" fill="#1E3A8A" font-size="20">
      
      <!-- QUESTION 8 ANSWER (Mesophyll differences) -->
      <text x="45" y="95" font-size="22" font-weight="bold" fill="#1E293B">Q8.</text>
      <text x="145" y="95">Palisade mesophyll: Columnar, packed with chloroplasts</text>
      <text x="145" y="127">near the upper surface to maximize light capture.</text>
      <text x="145" y="159">Spongy mesophyll: Loosely packed with air spaces to</text>
      <text x="145" y="191">allow rapid diffusion of CO₂ &amp; O₂ throughout leaf tissues.</text>

      <!-- QUESTION 9 ANSWER (Transpiration) -->
      <text x="45" y="260" font-size="22" font-weight="bold" fill="#1E293B">Q9.</text>
      <text x="145" y="260">Transpiration is the evaporative loss of water vapor</text>
      <text x="145" y="292">from aerial parts of plants, primarily through stomata.</text>
      <text x="145" y="324">Two factors increasing rate: Higher temperature and</text>
      <text x="145" y="356">higher wind velocity (which sweeps away humid boundary layer).</text>

      <!-- QUESTION 10 ANSWER (Xylem structure) -->
      <text x="45" y="425" font-size="22" font-weight="bold" fill="#1E293B">Q10.</text>
      <text x="145" y="425">Xylem vessels are composed of hollow, dead cells with</text>
      <text x="145" y="457">lignified walls. The continuous open lumen facilitates</text>
      <text x="145" y="489">unimpeded bulk flow of water under negative tension.</text>

      <!-- QUESTION 11 (a) ANSWER -->
      <text x="45" y="560" font-size="22" font-weight="bold" fill="#1E293B">Q11a.</text>
      <text x="145" y="560">Plant A received optimal sunlight for photosynthesis,</text>
      <text x="145" y="592">producing chlorophyll and biomass. Plant B experienced</text>
      <text x="145" y="624">etiolation due to light deprivation, resulting in low</text>
      <text x="145" y="656">chlorophyll synthesis (chlorosis) and elongated stem growth.</text>

      <!-- QUESTION 11 (b) ANSWER -->
      <text x="45" y="725" font-size="22" font-weight="bold" fill="#1E293B">Q11b.</text>
      <text x="145" y="725">Gradually move Plant B to moderate indirect sunlight and</text>
      <text x="145" y="757">ensure adequate watering to stimulate green leaf recovery.</text>

      <!-- QUESTION 12 ANSWER (Tidal Volume) -->
      <text x="45" y="830" font-size="22" font-weight="bold" fill="#1E293B">Q12.</text>
      <text x="145" y="830">Total pulmonary ventilation = Tidal volume × Breathing rate</text>
      <text x="145" y="862">= 0.5 L/breath × 12 breaths/min = 6.0 L/min.</text>

      <!-- QUESTION 13 ANSWER (Dead Space Calculation) -->
      <text x="45" y="930" font-size="22" font-weight="bold" fill="#1E293B">Q13.</text>
      <text x="145" y="930">Alveolar Ventilation = (Tidal Volume – Dead Space) × Rate</text>
      <text x="145" y="962">= (0.50 L – 0.15 L) × 12 = 0.35 L × 12 = 4.2 L/min.</text>

      <text x="710" y="1075" font-size="16" fill="#94A3B8">Page 3</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateMockAnswerSheetPage4(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
    <defs>
      <pattern id="page-lines-4" width="100%" height="32" patternUnits="userSpaceOnUse">
        <line x1="0" y1="31" x2="800" y2="31" stroke="#BFDBFE" stroke-width="1" opacity="0.6"/>
      </pattern>
    </defs>

    <rect width="800" height="1100" fill="#F8FAFC"/>
    <rect width="800" height="1100" fill="url(#page-lines-4)"/>
    <line x1="120" y1="0" x2="120" y2="1100" stroke="#FCA5A5" stroke-width="1.5" opacity="0.85"/>
    <line x1="124" y1="0" x2="124" y2="1100" stroke="#FCA5A5" stroke-width="0.5" opacity="0.5"/>

    <g font-family="'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" fill="#1E3A8A" font-size="20">
      
      <!-- QUESTION 6 CONTINUATION (Digestive Absorption mechanism) -->
      <text x="45" y="95" font-size="22" font-weight="bold" fill="#1E293B">Q6 cont.</text>
      <text x="145" y="95">Site of absorption: Villi and microvilli in the ileum provide</text>
      <text x="145" y="127">a massive surface area. Lacteals absorb fatty acids,</text>
      <text x="145" y="159">while blood capillaries absorb glucose and amino acids.</text>

      <!-- UNMATCHED STUDENT WRITING / NOTES (Edge case: student extra answer) -->
      <g stroke="#9333EA" stroke-width="1" fill="#F3E8FF" opacity="0.1">
        <rect x="140" y="240" width="580" height="180" rx="8"/>
      </g>
      <text x="45" y="270" font-size="22" font-weight="bold" fill="#7E22CE">Extra:</text>
      <text x="145" y="270" fill="#7E22CE">Rough Notes on Mendel's Monohybrid Cross (F1 &amp; F2 generation):</text>
      <text x="145" y="302" fill="#7E22CE">Parental: TT × tt → F1 all Tt (Tall)</text>
      <text x="145" y="334" fill="#7E22CE">Selfing: Tt × Tt → Phenotypic ratio 3:1, Genotypic 1:2:1</text>
      <text x="145" y="366" fill="#7E22CE">(Note: Genetics topic from previous week)</text>

      <!-- Signature & End of exam -->
      <text x="145" y="550" font-size="18" fill="#64748B">--- End of Answer Paper ---</text>
      <text x="145" y="590" font-size="18" fill="#64748B">Student: Aarav Sharma | Roll No: 1024 | Section: 10-A</text>

      <text x="710" y="1075" font-size="16" fill="#94A3B8">Page 4</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const MOCK_BIOLOGY_QUESTIONS: QuestionEntry[] = [
  {
    id: "q-1",
    questionNumber: "1",
    fullLabel: "1",
    printedOrder: 1,
    questionText: "Which blood vessel carries blood away from the heart?",
    maxMarks: 2,
    awardedMarks: 2,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Student provided the equation for photosynthesis and chemical conversion along with a diagram. Note: Question paper asked about blood vessels, but student's answer was credited under the photosynthesis section.",
    keyConcepts: ["Arteries", "Systemic Circulation", "Oxygenated Blood"],
    matchedAnswer: {
      answerText: "Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy. 6CO2 + 6H2O -> C6H12O6 + 6O2",
      pageNumbers: [1],
      isMultiPage: false,
      confidenceScore: 0.98,
      detectedHeader: "Q1.",
      boundingBoxes: [
        {
          pageNumber: 1,
          ymin: 90,
          xmin: 35,
          ymax: 540,
          xmax: 740,
          label: "Q1"
        }
      ]
    }
  },
  {
    id: "q-2",
    questionNumber: "2",
    fullLabel: "2",
    printedOrder: 2,
    questionText: "Which of the following organelles is primarily involved in photosynthesis?",
    maxMarks: 2,
    awardedMarks: 2,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!",
    keyConcepts: ["Chloroplast", "Light Reaction", "Dark Reaction"],
    matchedAnswer: {
      answerText: "The process mainly occurs in the chloroplast of the plant cell. It has two main stages: 1. Light reaction – Captures light energy. 2. Dark reaction – Uses energy to make glucose.",
      pageNumbers: [1],
      isMultiPage: false,
      confidenceScore: 0.99,
      detectedHeader: "Q2.",
      boundingBoxes: [
        {
          pageNumber: 1,
          ymin: 575,
          xmin: 35,
          ymax: 785,
          xmax: 745,
          label: "Q2"
        }
      ]
    }
  },
  {
    id: "q-3",
    questionNumber: "3",
    fullLabel: "3",
    printedOrder: 3,
    questionText: "Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.",
    maxMarks: 2,
    awardedMarks: 2,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Thorough explanation covering chlorophyll, carotenoids, thylakoid membranes, and the Calvin cycle in the stroma.",
    keyConcepts: ["Chlorophyll", "Thylakoid", "Stroma", "Calvin Cycle"],
    matchedAnswer: {
      answerText: "Chloroplasts contain chlorophyll (main pigment absorbing blue/red light) and accessory pigments like carotenoids. They convert solar photons into ATP & NADPH...",
      pageNumbers: [1],
      isMultiPage: false,
      confidenceScore: 0.96,
      detectedHeader: "Q3.",
      boundingBoxes: [
        {
          pageNumber: 1,
          ymin: 805,
          xmin: 35,
          ymax: 990,
          xmax: 750,
          label: "Q3"
        }
      ]
    }
  },
  {
    id: "q-4",
    questionNumber: "4",
    fullLabel: "4",
    printedOrder: 4,
    questionText: "Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.",
    maxMarks: 2,
    awardedMarks: 0,
    status: "UNANSWERED",
    evaluation: "NOT_ATTEMPTED",
    aiFeedback: "No answer found for this question on the answer sheet. Ensure you allocate time to complete heart circulatory pathway questions.",
    keyConcepts: ["Tricuspid Valve", "Pulmonary Valve", "Bicuspid/Mitral Valve", "Aortic Valve"]
  },
  {
    id: "q-5",
    questionNumber: "5",
    fullLabel: "5",
    printedOrder: 5,
    questionText: "Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).",
    maxMarks: 2,
    awardedMarks: 2,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Neat diagram clearly showing the alveolar sac, capillary wall, O2 diffusion inwards and CO2 diffusion outwards.",
    keyConcepts: ["Alveolar Sac", "Capillary", "Diffusion", "O2/CO2 Exchange"],
    matchedAnswer: {
      answerText: "Alveolus Gas Exchange Diagram with labeled alveolar sac, capillary wall, and O2 / CO2 exchange arrows.",
      pageNumbers: [2],
      isMultiPage: false,
      confidenceScore: 0.97,
      detectedHeader: "Q5.",
      boundingBoxes: [
        {
          pageNumber: 2,
          ymin: 65,
          xmin: 35,
          ymax: 380,
          xmax: 745,
          label: "Q5"
        }
      ]
    }
  },
  {
    id: "q-6",
    questionNumber: "6",
    fullLabel: "6",
    printedOrder: 6,
    questionText: "Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.",
    maxMarks: 5,
    awardedMarks: 4,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Well-drawn digestive tract spanning two pages. Accurately highlighted small intestine as the primary absorption site. Deducted 1 mark as pancreas was not explicitly labeled in the diagram.",
    keyConcepts: ["Digestive System", "Small Intestine", "Villi Absorption", "Liver", "Stomach"],
    matchedAnswer: {
      answerText: "Human Digestive System Diagram (stomach, liver, small & large intestine) and ileum villi absorption explanation on continuation page.",
      pageNumbers: [2, 4],
      isMultiPage: true,
      confidenceScore: 0.94,
      detectedHeader: "Q6.",
      boundingBoxes: [
        {
          pageNumber: 2,
          ymin: 410,
          xmin: 35,
          ymax: 740,
          xmax: 745,
          label: "Q6 (Part 1)"
        },
        {
          pageNumber: 4,
          ymin: 65,
          xmin: 35,
          ymax: 200,
          xmax: 745,
          label: "Q6 (Cont.)"
        }
      ]
    }
  },
  {
    id: "q-7",
    questionNumber: "7",
    fullLabel: "7",
    printedOrder: 7,
    questionText: "Draw and label a nephron (Bowman's capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).",
    maxMarks: 5,
    awardedMarks: 5,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Exceptional drawing! Every key anatomical landmark including the Glomerulus, Bowman's Capsule, Loop of Henle, and Collecting Duct is labeled correctly.",
    keyConcepts: ["Glomerulus", "Bowman's Capsule", "Loop of Henle", "Collecting Duct"],
    matchedAnswer: {
      answerText: "Structure of Nephron diagram with labeled Bowman's capsule, glomerulus, proximal convoluted tubule, loop of Henle, and collecting duct.",
      pageNumbers: [2],
      isMultiPage: false,
      confidenceScore: 0.99,
      detectedHeader: "Q7.",
      boundingBoxes: [
        {
          pageNumber: 2,
          ymin: 755,
          xmin: 35,
          ymax: 1040,
          xmax: 745,
          label: "Q7"
        }
      ]
    }
  },
  {
    id: "q-8",
    questionNumber: "8",
    fullLabel: "8",
    printedOrder: 8,
    questionText: "Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.",
    maxMarks: 5,
    awardedMarks: 3,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Identified column shape and air spaces correctly. Missed mentioning quantitative chloroplast concentration differences and vertical orientation significance for light transmission.",
    keyConcepts: ["Palisade Mesophyll", "Spongy Mesophyll", "Air Spaces", "Light Absorption"],
    matchedAnswer: {
      answerText: "Palisade mesophyll: Columnar, packed with chloroplasts near upper surface. Spongy mesophyll: Loosely packed with air spaces for CO2/O2 diffusion.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.95,
      detectedHeader: "Q8.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 65,
          xmin: 35,
          ymax: 220,
          xmax: 745,
          label: "Q8"
        }
      ]
    }
  },
  {
    id: "q-9",
    questionNumber: "9",
    fullLabel: "9",
    printedOrder: 9,
    questionText: "Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.",
    maxMarks: 5,
    awardedMarks: 5,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Accurate definition of stomatal evaporative loss. Correctly cited temperature and wind velocity as factors enhancing the transpiration pull.",
    keyConcepts: ["Transpiration", "Stomata", "Temperature", "Wind Velocity"],
    matchedAnswer: {
      answerText: "Transpiration is the evaporative loss of water vapor from aerial parts of plants, primarily through stomata. Two factors: temperature and wind velocity.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.98,
      detectedHeader: "Q9.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 235,
          xmin: 35,
          ymax: 385,
          xmax: 745,
          label: "Q9"
        }
      ]
    }
  },
  {
    id: "q-10",
    questionNumber: "10",
    fullLabel: "10",
    printedOrder: 10,
    questionText: "Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).",
    maxMarks: 5,
    awardedMarks: 4,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Good explanation of hollow dead lumen and negative tension. Mentioning pit pairs for lateral transfer would make it a perfect score.",
    keyConcepts: ["Xylem", "Lignin", "Cohesion-Tension", "Hollow Lumen"],
    matchedAnswer: {
      answerText: "Xylem vessels are composed of hollow, dead cells with lignified walls. The continuous open lumen facilitates unimpeded bulk flow of water under negative tension.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.96,
      detectedHeader: "Q10.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 400,
          xmin: 35,
          ymax: 520,
          xmax: 745,
          label: "Q10"
        }
      ]
    }
  },
  {
    id: "q-11-a",
    questionNumber: "11",
    subPart: "a",
    fullLabel: "11 a.",
    printedOrder: 11,
    questionText: "A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.",
    maxMarks: 2,
    awardedMarks: 2,
    status: "ANSWERED",
    evaluation: "CORRECT",
    aiFeedback: "Identified etiolation and chlorosis mechanisms accurately and compared chlorophyll synthesis between both light environments.",
    keyConcepts: ["Etiolation", "Chlorosis", "Photomorphogenesis"],
    matchedAnswer: {
      answerText: "Plant A received optimal sunlight for photosynthesis, producing chlorophyll and biomass. Plant B experienced etiolation due to light deprivation...",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.98,
      detectedHeader: "Q11a.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 535,
          xmin: 35,
          ymax: 690,
          xmax: 745,
          label: "11 a."
        }
      ]
    }
  },
  {
    id: "q-11-b",
    questionNumber: "11",
    subPart: "b",
    fullLabel: "11 b.",
    printedOrder: 12,
    questionText: "Suggest one practical measure to help Plant B recover.",
    maxMarks: 3,
    awardedMarks: 1,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Partial credit given for gradual light introduction. The response should also address nutrient supplementation (nitrogen/magnesium for chlorophyll synthesis) and pruning etiolated shoots.",
    keyConcepts: ["Gradual Acclimatization", "Chlorophyll Regeneration", "Pruning"],
    matchedAnswer: {
      answerText: "Gradually move Plant B to moderate indirect sunlight and ensure adequate watering to stimulate green leaf recovery.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.92,
      detectedHeader: "Q11b.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 700,
          xmin: 35,
          ymax: 790,
          xmax: 745,
          label: "11 b."
        }
      ]
    }
  },
  {
    id: "q-12",
    questionNumber: "12",
    fullLabel: "12",
    printedOrder: 13,
    questionText: "A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.",
    maxMarks: 5,
    awardedMarks: 4,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Correct formula and product calculated (6.0 L/min). Minor deduction for not stating units clearly in the final line.",
    keyConcepts: ["Tidal Volume", "Pulmonary Ventilation", "Respiratory Rate"],
    matchedAnswer: {
      answerText: "Total pulmonary ventilation = Tidal volume × Breathing rate = 0.5 L/breath × 12 breaths/min = 6.0 L/min.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.97,
      detectedHeader: "Q12.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 805,
          xmin: 35,
          ymax: 890,
          xmax: 745,
          label: "Q12"
        }
      ]
    }
  },
  {
    id: "q-13",
    questionNumber: "13",
    fullLabel: "13",
    printedOrder: 14,
    questionText: "If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.",
    maxMarks: 5,
    awardedMarks: 4,
    status: "ANSWERED",
    evaluation: "PARTIALLY_CORRECT",
    aiFeedback: "Correct step-by-step substitution: (0.50 L - 0.15 L) * 12 = 4.2 L/min. Well done on the arithmetic.",
    keyConcepts: ["Anatomical Dead Space", "Alveolar Ventilation", "Minute Volume"],
    matchedAnswer: {
      answerText: "Alveolar Ventilation = (Tidal Volume – Dead Space) × Rate = (0.50 L – 0.15 L) × 12 = 0.35 L × 12 = 4.2 L/min.",
      pageNumbers: [3],
      isMultiPage: false,
      confidenceScore: 0.99,
      detectedHeader: "Q13.",
      boundingBoxes: [
        {
          pageNumber: 3,
          ymin: 905,
          xmin: 35,
          ymax: 1000,
          xmax: 745,
          label: "Q13"
        }
      ]
    }
  }
];

export const MOCK_UNMATCHED_ANSWERS = [
  {
    id: "unmatched-1",
    pageNumber: 4,
    boundingBox: {
      pageNumber: 4,
      ymin: 235,
      xmin: 135,
      ymax: 425,
      xmax: 725,
      label: "Extra: Genetics"
    },
    transcribedText: "Rough Notes on Mendel's Monohybrid Cross (F1 & F2 generation): Parental TT x tt -> F1 Tt (Tall), Selfing: Tt x Tt -> 3:1 ratio",
    aiNote: "Student wrote rough notes for a genetics question not present on this Unit Test paper.",
    detectedLabel: "Extra Notes"
  }
];

export function getMockAssessmentResult(): AssessmentResult {
  const page1 = generateMockAnswerSheetPage1();
  const page2 = generateMockAnswerSheetPage2();
  const page3 = generateMockAnswerSheetPage3();
  const page4 = generateMockAnswerSheetPage4();

  const totalMax = MOCK_BIOLOGY_QUESTIONS.reduce((acc, q) => acc + q.maxMarks, 0);
  const totalAwarded = MOCK_BIOLOGY_QUESTIONS.reduce((acc, q) => acc + q.awardedMarks, 0);
  const answeredCount = MOCK_BIOLOGY_QUESTIONS.filter((q) => q.status === "ANSWERED").length;
  const unansweredCount = MOCK_BIOLOGY_QUESTIONS.filter((q) => q.status === "UNANSWERED").length;

  return {
    assessmentId: "asm-bio-unit-test-10",
    title: "Class 10 Biology Unit Test",
    subject: "Biology & Human Physiology",
    gradeLevel: "Class 10-A",
    studentName: "Aarav Sharma",
    examDate: "2026-08-26",
    totalPages: 4,
    pageImages: [
      { pageNumber: 1, imageUrl: page1, width: 800, height: 1100, aspectRatio: 800 / 1100 },
      { pageNumber: 2, imageUrl: page2, width: 800, height: 1100, aspectRatio: 800 / 1100 },
      { pageNumber: 3, imageUrl: page3, width: 800, height: 1100, aspectRatio: 800 / 1100 },
      { pageNumber: 4, imageUrl: page4, width: 800, height: 1100, aspectRatio: 800 / 1100 },
    ],
    questions: MOCK_BIOLOGY_QUESTIONS,
    unmatchedAnswers: MOCK_UNMATCHED_ANSWERS,
    summary: {
      totalMarks: totalAwarded,
      maxMarks: totalMax,
      percentage: Math.round((totalAwarded / totalMax) * 100),
      answeredCount,
      unansweredCount,
      outOfOrderCount: 0,
      totalQuestions: MOCK_BIOLOGY_QUESTIONS.length,
      overallFeedback: "Strong conceptual understanding of plant physiology, photosynthesis, and anatomical diagrams (nephron & alveolus). Needs revision on cardiac cycle circulation (Q4 was left unanswered) and plant recovery strategies (Q11b).",
      strengths: [
        "Flawless diagrammatic representation of Nephron structure and Alveolus gas exchange",
        "Clear grasp of photosynthesis chemical formulas and biochemical pathways",
        "Accurate dead-space and minute alveolar ventilation calculations"
      ],
      weaknesses: [
        "Unanswered question on human heart blood flow and valve pathways (Question 4)",
        "Incomplete recovery proposal for etiolated plants (Question 11b)"
      ],
      teacherRecommendation: "Assign targeted practice on cardiac valve sequences and light response experiments in botany."
    }
  };
}
