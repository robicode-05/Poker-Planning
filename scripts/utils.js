/**
 * Retrieve the value of a parameters pass in URI
 * 
 * @param {string} paramName 
 * @returns {string | undefined} the value associated to the parameter
 */
function getURLParamValue(paramName) {
  const url = window.location.href;
  const searchParams = url.split("?")[1];
  if (searchParams === undefined) return;

  const splittedParams = searchParams.split("&");
  const doesParamExist = splittedParams.some((p) => p.includes(paramName));
  if (!doesParamExist) return;

  const matchingParam =  splittedParams.find((p) => p.includes(paramName));
  const value = matchingParam.split("=")[1];
  return value;
}