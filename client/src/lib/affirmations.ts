export const affirmations = [
  "You are stronger than you know.",
  "This moment will pass, and peace will return.",
  "Your feelings are valid and temporary.",
  "You have the power to heal and grow.",
  "Tomorrow is a new beginning.",
  "You are not alone in this journey.",
  "Your heart knows the way to peace.",
  "Every ending is a new beginning.",
  "You are worthy of love and happiness.",
  "Trust in your ability to overcome.",
  "You have survived 100% of your worst days.",
  "Your resilience is your superpower.",
  "Healing happens one breath at a time.",
  "You are enough, exactly as you are.",
  "This too shall pass, like clouds in the sky.",
];

export function getRandomAffirmation(): string {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}
