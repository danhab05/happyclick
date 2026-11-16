/** No diagnosis, numeric thresholds or persistence: only source-linked conversation prompts. */
export function usagePrompts(answers) {
  const prompts = [];
  if ((answers['usage-3'] || []).some(i => [0,1,3,4].includes(i))) prompts.push({text:'Tu as repéré des moments particuliers de la journée. De quelle place des écrans au réveil, pendant les repas ou avant le coucher aimerais-tu discuter ?',page:2});
  if ((answers['usage-9'] || []).some(i => i < 4)) prompts.push({text:'Tu évoques des activités qui prennent moins de place. Laquelle aimerais-tu retrouver, et avec qui pourrais-tu en parler ?',page:1});
  if ((answers['usage-10'] || []).includes(0)) prompts.push({text:'Tu as indiqué avoir le sentiment de passer trop de temps sur les écrans. Qu’aimerais-tu voir changer dans ta journée ?',page:1});
  if ((answers['usage-6'] || []).length || (answers['usage-7'] || []).length) prompts.push({text:'Le questionnaire parle aussi des règles et de l’accompagnement. Qu’est-ce qui t’aide dans les échanges avec les adultes, et qu’aimerais-tu leur expliquer ?',page:1});
  if (!prompts.length) prompts.push({text:'Quel usage te plaît le plus ? Lequel aimerais-tu mieux comprendre ou expliquer à un adulte de confiance ?',page:1});
  return prompts;
}
export function enforceExclusive(selected, changed, exclusive) {
  if (exclusive === null || !selected.includes(exclusive)) return selected;
  return changed === exclusive ? [exclusive] : selected.filter(value=>value!==exclusive);
}
