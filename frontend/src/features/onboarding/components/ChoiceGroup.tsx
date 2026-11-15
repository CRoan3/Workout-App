import type { Option } from "../options";

// A set of clickable "cards" that are really radio buttons (pick one) or checkboxes (pick many).
//
// Using real <input>s under the hood (instead of <div onClick>) means the keyboard,
// screen readers and form semantics all work for free; CSS just makes them look like cards.
//
// <T extends string | number> makes this a generic component: the same component works for
// goals (strings) and days per week (numbers), and TypeScript checks that onToggle gets the
// same type as the options.
type ChoiceGroupProps<T extends string | number> = {
    name: string;                  // groups the inputs together (radios with the same name are exclusive)
    options: Option<T>[];
    selected: T[];                 // for single choice, pass [value] or []
    onToggle: (value: T) => void;
    multiple?: boolean;            // true = checkboxes, false = radio buttons
    compact?: boolean;             // smaller cards in a tighter grid, e.g. for numbers
};

export default function ChoiceGroup<T extends string | number>({
    name,
    options,
    selected,
    onToggle,
    multiple = false,
    compact = false,
}: ChoiceGroupProps<T>) {
    return (
        <div className={compact ? "choice-grid compact" : "choice-grid"}>
            {options.map((option) => {
                const isSelected = selected.includes(option.value);

                return (
                    <label key={String(option.value)} className={isSelected ? "choice selected" : "choice"}>
                        <input
                            type={multiple ? "checkbox" : "radio"}
                            name={name}
                            checked={isSelected}
                            onChange={() => onToggle(option.value)}
                        />
                        <span className="choice-label">{option.label}</span>
                        {option.description && <span className="choice-description">{option.description}</span>}
                    </label>
                );
            })}
        </div>
    );
}
