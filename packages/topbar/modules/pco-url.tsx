// typescript implementation of shared lib https://github.com/planningcenter/pco-url
export default (env: string) => (appName: string ): string => {
  if (!(env && appName)) return;

  switch (env) {
    case "production":
      return `https://${appName}.planningcenteronline.com`;
    case "staging":
      return `https://${appName}-staging.planningcenteronline.com`;
    case "development":
      return `http://${appName}.pco.test`;
    case "test":
      return `http://${appName}.pco.test`;
    default:
      return `http://${appName}.planningcenteronline.com`;
  }
};