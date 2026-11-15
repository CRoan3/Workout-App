import { useState } from "react";
import type { StepProps } from "../onboardingReducer";
import { LOCATION_OPTIONS } from "../options";
import { EQUIPMENT, EQUIPMENT_CATEGORIES } from "../equipment";
import ChoiceGroup from "./ChoiceGroup";

export default function EquipmentStep({ answers, dispatch }: StepProps) {
    // The search text is "UI state": only this component cares about it and it doesn't need saving,
    // so a plain useState is the right tool here, while the answers live in the shared reducer.
    const [search, setSearch] = useState("");

    const query = search.trim().toLowerCase();
    const matches = EQUIPMENT.filter((item) => item.name.toLowerCase().includes(query));

    // Offer "Add ..." when the search text isn't already in the list or already selected
    const alreadyListed =
        EQUIPMENT.some((item) => item.name.toLowerCase() === query) ||
        answers.equipment.some((name) => name.toLowerCase() === query);
    const canAddCustom = query !== "" && !alreadyListed;

    function toggle(name: string) {
        dispatch({ type: "toggleListItem", field: "equipment", item: name });
    }

    function addCustom() {
        toggle(search.trim());
        setSearch("");
    }

    const locationHint =
        answers.location === "gym"
            ? "We'll assume a typical commercial gym. Add anything specific you want to use (or avoid relying on)."
            : "Select what you have access to. Can't find something? Type it in and add it.";

    return (
        <>
            <fieldset className="question">
                <legend>Where will you train?</legend>
                <ChoiceGroup
                    name="location"
                    options={LOCATION_OPTIONS}
                    selected={answers.location ? [answers.location] : []}
                    onToggle={(location) => dispatch({ type: "updateAnswers", changes: { location } })}
                />
            </fieldset>

            <div className="question">
                <label htmlFor="equipmentSearch">What equipment do you have?</label>
                <p className="hint">{locationHint}</p>

                {/* The selected items, shown as removable chips */}
                {answers.equipment.length > 0 && (
                    <ul className="chip-list" aria-label="Selected equipment">
                        {answers.equipment.map((name) => (
                            <li key={name} className="chip">
                                {name}
                                <button type="button" aria-label={`Remove ${name}`} onClick={() => toggle(name)}>
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="search-row">
                    <input
                        id="equipmentSearch"
                        type="search"
                        placeholder="Search equipment, e.g. dumbbells, rower, bands..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            // Enter inside a form normally submits it (which would jump to the next step).
                            // Here, Enter should add the typed item instead.
                            if (event.key === "Enter") {
                                event.preventDefault();
                                if (canAddCustom) addCustom();
                            }
                        }}
                    />
                    {canAddCustom && (
                        <button type="button" className="button secondary" onClick={addCustom}>
                            Add "{search.trim()}"
                        </button>
                    )}
                </div>

                <div className="equipment-list">
                    {EQUIPMENT_CATEGORIES.map((category) => {
                        const items = matches.filter((item) => item.category === category);
                        if (items.length === 0) return null;   // hide categories with no search matches

                        return (
                            <fieldset key={category} className="equipment-category">
                                <legend>{category}</legend>
                                {items.map((item) => (
                                    <label key={item.name} className="checkbox-row">
                                        <input
                                            type="checkbox"
                                            checked={answers.equipment.includes(item.name)}
                                            onChange={() => toggle(item.name)}
                                        />
                                        {item.name}
                                    </label>
                                ))}
                            </fieldset>
                        );
                    })}

                    {matches.length === 0 && <p className="muted">No matches in the list. Use the Add button to include it anyway.</p>}
                </div>
            </div>
        </>
    );
}
