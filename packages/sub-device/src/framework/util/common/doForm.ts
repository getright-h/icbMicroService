export const DoForm = {
  exchangeToKeyValue(formObject: Record<string, any>) {
    const fieldData: any = [];
    Object.keys(formObject).forEach(key => {
      fieldData.push({ name: key, value: formObject[key] });
    });
    return fieldData;
  }
};
