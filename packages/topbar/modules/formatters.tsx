interface App {
  attributes: { name: string; url: string };
}

interface ConnectedPerson {
  id: number;
  attributes: { name: string; organization_name: string };
}

const sortByAttribute = (attr: string) => (arr: any[]): any[] =>
  arr
    .slice()
    .sort((a, b) => a.attributes[attr].localeCompare(b.attributes[attr]));

const withoutItemContainingAttributeValue = (attr: string) => (
  value: string
) => (arr: any[]): any[] =>
  arr.reduce(
    (acc, item) =>
      (item.attributes[attr] || "") === value ? acc : acc.concat([item]),
    []
  );

export const appsMenuFormatter = (
  apps: App[],
  excludedAppName: string
): App[] =>
   withoutItemContainingAttributeValue("name")(excludedAppName)(sortByAttribute("name")(apps))

export const connectedPeopleMenuFormatter = (
  connectedPeople: ConnectedPerson[],
  excludedOrgName: string
): ConnectedPerson[] =>
  withoutItemContainingAttributeValue("name")(excludedOrgName)(sortByAttribute("organization_name")(connectedPeople))
