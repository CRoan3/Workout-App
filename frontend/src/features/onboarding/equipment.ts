// Searchable equipment catalog for the onboarding questionnaire.
// It doesn't have to be complete: users can also type in anything that's missing.
// Later this list could move to the backend so it can grow without a frontend release.

export const EQUIPMENT_CATEGORIES = [
    "Free weights",
    "Racks & benches",
    "Machines",
    "Cardio",
    "Bands & accessories",
] as const;

// "as const" keeps the exact strings, so this type becomes
// "Free weights" | "Racks & benches" | ... instead of just string
export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number];

export type EquipmentItem = {
    name: string;
    category: EquipmentCategory;
};

// Small helper so the list below stays short and readable
function items(category: EquipmentCategory, names: string[]): EquipmentItem[] {
    return names.map((name) => ({ name, category }));
}

export const EQUIPMENT: EquipmentItem[] = [
    ...items("Free weights", [
        "Dumbbells", "Adjustable dumbbells", "Barbell", "EZ curl bar", "Trap / hex bar", "Weight plates",
        "Kettlebells", "Medicine ball", "Slam ball", "Sandbag", "Weight vest",
    ]),
    ...items("Racks & benches", [
        "Power rack / squat rack", "Smith machine", "Flat bench", "Adjustable bench", "Decline bench",
        "Preacher curl bench", "Pull-up bar", "Dip station", "Glute-ham developer (GHD)",
        "Landmine attachment", "Hip thrust bench",
    ]),
    ...items("Machines", [
        "Cable machine / functional trainer", "Lat pulldown", "Seated cable row", "Leg press", "Hack squat",
        "Leg extension", "Leg curl", "Chest press machine", "Pec deck / rear delt fly", "Shoulder press machine",
        "Assisted pull-up / dip machine", "Calf raise machine", "Hip abductor / adductor", "Belt squat",
        "Reverse hyper", "T-bar row",
    ]),
    ...items("Cardio", [
        "Treadmill", "Stationary bike", "Air bike", "Rowing machine", "Elliptical", "Stair climber",
        "Ski erg", "Jump rope", "Sled",
    ]),
    ...items("Bands & accessories", [
        "Resistance bands", "Mini loop bands", "Suspension trainer (TRX)", "Gymnastic rings", "Ab wheel",
        "Stability ball", "Foam roller", "Yoga mat", "Plyo box", "Battle ropes", "Parallettes",
        "Step platform", "Mobility stick / dowel",
    ]),
];
